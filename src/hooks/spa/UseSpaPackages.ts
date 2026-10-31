import { getSpaPackages } from '@/data/spa/Packages';
import type { ISpaPackages } from '@/interfaces/ISpa';
import { useQuery } from '@tanstack/react-query';

const UseSpaPackages = () => {
  return useQuery<ISpaPackages[]>({
    queryKey: ['spaPackages'],
    queryFn: async () => {
      const { data: packages, error } = await getSpaPackages();

      if (error) {
        throw new Error(error.message);
      }

      return packages ?? [];
    },
  });
};

export { UseSpaPackages };
