import { fetchRoomBookingsData } from "@/data/rooms&bookings/fetchRoomBookingsData"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"
import { useQuery } from "@tanstack/react-query"

const UseRoomBookings = () => {
  return useQuery<IRoomBooking[], Error>({
    queryKey: ["room-bookings"],
    queryFn: async () => {
      const { bookings, error } = await fetchRoomBookingsData()
      if (error) {
        throw new Error(error.message || "Failed to fetch room bookings")
      }
      return bookings ?? []
    },
    initialData: [],
  })
}

export default UseRoomBookings
