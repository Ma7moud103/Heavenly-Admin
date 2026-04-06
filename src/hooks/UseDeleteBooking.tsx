import { deleteBooking } from "@/data/deleteBooking"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const UseDeleteBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (bookingId: string) => {
      const { error } = await deleteBooking(bookingId)

      if (error) {
        throw new Error(error.message || "Failed to delete booking")
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["room-bookings"] }),
        queryClient.invalidateQueries({ queryKey: ["hotelStats"] }),
      ])
    },
  })
}

export default UseDeleteBooking
