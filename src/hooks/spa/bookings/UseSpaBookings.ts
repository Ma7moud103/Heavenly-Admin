import { getBookings } from '@/data/spa/Bookings';
import type { ISpaBookings } from '@/interfaces/ISpa';
import { useQuery } from '@tanstack/react-query';

const UseSpaBookings = () => {
  return useQuery<ISpaBookings[]>({
    queryKey: ['spaBookings'],
    queryFn: async () => {
      const { data, error } = await getBookings();

      if (error) {
        throw new Error(error.message);
      }

      return data ?? [];
    },
  });
};

export default UseSpaBookings;
