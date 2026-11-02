import { deleteSpaBooking, updateSpaBooking } from '@/data/spa/Bookings';
import type { IBookingData } from '@/interfaces/ISpa';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function UseUpdateSpaBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, booking }: { id: string; booking: IBookingData }) => updateSpaBooking(id, booking),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaBookings'] });
    },
  });
}

export function UseDeleteSpaBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSpaBooking,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaBookings'] });
    },
  });
}
