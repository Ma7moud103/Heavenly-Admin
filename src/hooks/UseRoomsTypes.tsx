import { getRoomTypes } from "@/data/getRoomTypes"
import type { IRoomsTypes } from "@/interfaces/IRooms"
import { useQuery } from "@tanstack/react-query"

const UseRoomsTypes = () => {
  return useQuery<IRoomsTypes[], Error>({
    queryKey: ["room-types"],
    queryFn: async () => {
      const { roomTypes, error } = await getRoomTypes()

      if (error) {
        throw new Error(error.message || "Failed to fetch room types")
      }

      return roomTypes ?? []
    },
    initialData: [],
  })
}

export default UseRoomsTypes
