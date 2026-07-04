import { getTherapists } from '@/data/spa/Therapists';
import type { ISpaTherapists } from '@/interfaces/ISpa';
import { useQuery } from '@tanstack/react-query';

const UseSpaTherapists = () => {
  return useQuery<ISpaTherapists[]>({
    queryKey: ['spaTherapists'],
    queryFn: async () => {
      const { data, error } = await getTherapists();

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
  });
};

export default UseSpaTherapists;
