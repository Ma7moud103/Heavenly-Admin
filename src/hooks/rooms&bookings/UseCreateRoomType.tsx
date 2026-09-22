import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRoomType, type RoomTypePayload } from '@/data/rooms&bookings/createRoomType';

const UseCreateRoomType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RoomTypePayload) => {
      const { error } = await createRoomType(payload);

      if (error) throw new Error(error.message || 'Failed to create room type');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['room-types'] }),
  });
};

export default UseCreateRoomType;
