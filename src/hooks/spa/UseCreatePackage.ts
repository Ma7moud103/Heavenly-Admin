import { saveSpaPackage } from '@/data/spa/Packages';
import type { ICreatePackage } from '@/interfaces/ISpa';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UseCreatePackage = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (selectedPackage: ICreatePackage) => saveSpaPackage(selectedPackage, id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaPackages'] });
    },
  });
};

export default UseCreatePackage;
