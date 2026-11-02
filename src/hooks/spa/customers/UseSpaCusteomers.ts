import { getSpaCustomers } from '@/data/spa/Customres';
import type { ISpaCustomer } from '@/interfaces/ISpa';
import { useQuery } from '@tanstack/react-query';

const UseSpaCustomers = () => {
  return useQuery<ISpaCustomer[]>({
    queryKey: ['spaCustomers'],
    queryFn: async () => {
      const { data, error } = await getSpaCustomers();

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
  });
};

export default UseSpaCustomers;
