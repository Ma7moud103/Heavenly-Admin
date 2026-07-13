import { createSpaBooking } from '@/data/spa/Bookings';
import type { IBookingData } from '@/interfaces/ISpa';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UseCreateSpaBooking = () => {
  const QueryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking: IBookingData) => {
      const { data, error } = await createSpaBooking(booking);

      if (error) return error.message || new Error('Failed to create new booking');

      return data;
    },
    onSuccess: async () => {
      //   await Promise.all([]);
      await QueryClient.invalidateQueries({ queryKey: ['spaBookings'] });
    },
  });
};

export default UseCreateSpaBooking;
