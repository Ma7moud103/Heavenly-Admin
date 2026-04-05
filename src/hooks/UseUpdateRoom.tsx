import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateRoom } from "@/data/updateRoom"
import type { ICreateRoomPayload } from "@/data/createRoom"

interface IUpdateRoomArgs {
  roomId: string
  payload: ICreateRoomPayload
}

const UseUpdateRoom = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ roomId, payload }: IUpdateRoomArgs) => {
      const { room, error } = await updateRoom(roomId, payload)

      if (error) {
        throw new Error(error.message || "Failed to update room")
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

export default UseUpdateRoom
