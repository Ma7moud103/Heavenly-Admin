import { getServices } from '@/data/spa/Services';
import type { ISpaServices } from '@/interfaces/ISpa';
import { useQuery } from '@tanstack/react-query';

const UseSpaServices = () => {
  return useQuery<ISpaServices[]>({
    queryKey: ['spaServices'],
    queryFn: async () => {
      const { data, error } = await getServices();

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
  });
};

export default UseSpaServices;
