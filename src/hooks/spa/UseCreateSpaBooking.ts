import { createSpaBooking } from '@/data/spa/Bookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const UserseCreateSpaBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSpaBooking,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['spaBookings'],
      });
    },

    onError: (error) => {
      console.log(error.message);
      return new Error(error.message);
    },
  });
};

export default UserseCreateSpaBooking;
