import { createRoom, type ICreateRoomPayload } from "@/data/createRoom"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const UseCreateRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: ICreateRoomPayload) => {
      const { room, error } = await createRoom(payload)

      if (error) {
        throw new Error(error.message || "Failed to create room")
      }

      return room
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

export default UseCreateRoom
