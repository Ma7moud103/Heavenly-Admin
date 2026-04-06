import type { ICreateBookingPayload } from "@/data/createBooking"
import { updateBooking } from "@/data/updateBooking"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface IUpdateBookingArgs {
  bookingId: string
  payload: ICreateBookingPayload
}

const UseUpdateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ bookingId, payload }: IUpdateBookingArgs) => {
      const { booking, error } = await updateBooking(bookingId, payload)

      if (error) {
        throw new Error(error.message || "Failed to update booking")
      }

      return booking
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["room-bookings"] }),
        queryClient.invalidateQueries({ queryKey: ["hotelStats"] }),
      ])
    },
  })
}

export default UseUpdateBooking
