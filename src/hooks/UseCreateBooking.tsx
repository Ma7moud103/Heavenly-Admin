import { createBooking, type ICreateBookingPayload } from "@/data/createBooking"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const UseCreateBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: ICreateBookingPayload) => {
      const { booking, error } = await createBooking(payload)

      if (error) {
        throw new Error(error.message || "Failed to create booking")
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

export default UseCreateBooking
