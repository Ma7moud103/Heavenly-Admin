import { supabase } from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
