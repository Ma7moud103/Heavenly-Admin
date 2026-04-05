import { useQuery } from "@tanstack/react-query"
import { getRoomStatuses } from "@/data/getRoomStatuses"
import type { RoomStatus } from "@/interfaces/IRooms"

const UseRoomsStatuses = () => {
  return useQuery<RoomStatus[], Error>({
    queryKey: ["rooms-statuses"],
    queryFn: async () => {
      const { roomStatuses, error } = await getRoomStatuses()

      if (error) {
        throw new Error(error.message || "Failed to fetch room statuses")
      }

      return roomStatuses ?? []
    },
    initialData: [],
  })
}

export default UseRoomsStatuses
