import { supabase } from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('spa_categories').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spaCategories'],
      });
    },
  });
};
