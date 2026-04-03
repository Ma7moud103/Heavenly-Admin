import type { IRoom } from "@/interfaces/IRooms"
import { fetchRoomsData } from "@/data/fetchRoomsData"
import { useQuery } from "@tanstack/react-query"

const UseRooms = () => {
  return useQuery<IRoom[], Error>({
    queryKey: ["rooms"],

    queryFn: async () => {
      const { rooms, error } = await fetchRoomsData()
      if (error) {
        throw new Error(error.message || "Failed to fetch rooms")
      }
      return rooms ?? []
    },
    initialData: []
  })
}

export default UseRooms
