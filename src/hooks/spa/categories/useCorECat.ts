import { supabase } from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ICreateSpaService } from '@/interfaces/ISpa';
import { ensureServiceHasNoBookings } from '@/data/spa/BookingGuards';

export interface IPayload {
  name: string;
  description: string;
}
export const useCOrECat = (mode: 'create' | 'edit', id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: IPayload) => {
      if (mode === 'create') {
        const { data, error } = await supabase.from('spa_categories').insert(category).select().single();

        if (error) throw new Error(error.message);

        return data;
      }

      if (!id) {
        throw new Error('Category ID is required for editing');
      }

      const { data, error } = await supabase.from('spa_categories').update(category).eq('id', id).select().single();

      if (error) throw new Error(error.message);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spaCategories'],
      });
    },
  });
};

export const useCreateOrEditSpaService = (mode: 'create' | 'edit', id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (service: ICreateSpaService) => {
      if (mode === 'create') {
        const { data, error } = await supabase.from('spa_services').insert(service).select().single();
        if (error) throw new Error(error.message);
        return data;
      }

      if (!id) throw new Error('Service ID is required for editing');
      await ensureServiceHasNoBookings(id);
      const { data, error } = await supabase.from('spa_services').update(service).eq('id', id).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spaServices'] });
    },
  });
};
