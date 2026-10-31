import { supabase } from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ensureServiceHasNoBookings } from '@/data/spa/BookingGuards';

export const useDeleteSpaService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await ensureServiceHasNoBookings(id);
      const { error } = await supabase.from('spa_services').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spaServices'] });
      queryClient.invalidateQueries({ queryKey: ['spaBookingReferences'] });
    },
  });
};