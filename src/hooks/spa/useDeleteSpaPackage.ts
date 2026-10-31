import { supabase } from '@/services/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ensurePackageHasNoBookings } from '@/data/spa/BookingGuards';

export const useDeleteSpaPackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await ensurePackageHasNoBookings(id);
      const { error: linksError } = await supabase.from('spa_package_services').delete().eq('package_id', id);
      if (linksError) throw new Error(linksError.message);
      const { error } = await supabase.from('spa_packages').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['spaPackages'] }),
  });
};