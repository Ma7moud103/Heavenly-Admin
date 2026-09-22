import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRoomType } from '@/data/rooms&bookings/updateRoomType';
import type { RoomTypePayload } from '@/data/rooms&bookings/createRoomType';

interface UpdateRoomTypeArgs {
  roomTypeId: string;
  payload: RoomTypePayload;
}

const UseUpdateRoomType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roomTypeId, payload }: UpdateRoomTypeArgs) => {
      const { error } = await updateRoomType(roomTypeId, payload);

      if (error) throw new Error(error.message || 'Failed to update room type');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['room-types'] }),
  });
};

export default UseUpdateRoomType;
