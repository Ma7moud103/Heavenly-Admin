import { createNewPackage } from '@/data/spa/Packages';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UseCreatePackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewPackage,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['spaPackages', 'spaPackagesWithoutServices'],
      });
    },

    onError: (error) => {
      console.log(error.message);
      return new Error(error.message);
    },
  });
};

export default UseCreatePackage;
