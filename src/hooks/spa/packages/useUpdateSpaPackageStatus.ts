import { supabase } from '@/services/supabase';
import type { ISpaPackages } from '@/interfaces/ISpa';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type PackageStatusUpdate = { id: string; isActive: boolean };
type PackageStatusContext = { previousPackages?: ISpaPackages[] };

export const useUpdateSpaPackageStatus = () => {
  const queryClient = useQueryClient();
  const queryKey = ['spaPackages'];

  return useMutation<PackageStatusUpdate, Error, PackageStatusUpdate, PackageStatusContext>({
    mutationFn: async ({ id, isActive }) => {
      const { data, error } = await supabase
        .from('spa_packages')
        .update({ is_active: isActive })
        .eq('id', id)
        .select('id, is_active')
        .single();
      if (error) throw new Error(error.message);
      return { id: data.id, isActive: data.is_active };
    },
    onMutate: async ({ id, isActive }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousPackages = queryClient.getQueryData<ISpaPackages[]>(queryKey);
      queryClient.setQueryData<ISpaPackages[]>(queryKey, (current) =>
        current?.map((item) => (item.id === id ? { ...item, is_active: isActive } : item)),
      );
      return { previousPackages };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousPackages) queryClient.setQueryData(queryKey, context.previousPackages);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });
};