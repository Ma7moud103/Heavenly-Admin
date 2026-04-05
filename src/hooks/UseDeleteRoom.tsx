import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRoom } from "@/data/deleteRoom"

const UseDeleteRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (roomId: string) => {
      const { error } = await deleteRoom(roomId)

      if (error) {
        throw new Error(error.message || "Failed to delete room")
      }
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["rooms"] }),
        queryClient.invalidateQueries({ queryKey: ["hotelStats"] }),
        queryClient.invalidateQueries({ queryKey: ["room-types"] }),
      ])
    },
  })
}

export default UseDeleteRoom
