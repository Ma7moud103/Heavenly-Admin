import { getCategories } from '@/data/spa/Categories';
import type { ISpaCategories } from '@/interfaces/ISpa';
import { useQuery } from '@tanstack/react-query';

const UseSpaCategories = () => {
  return useQuery<ISpaCategories[]>({
    queryKey: ['spaCategories'],
    queryFn: async () => {
      const { data, error } = await getCategories();

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
  });
};

export default UseSpaCategories;
