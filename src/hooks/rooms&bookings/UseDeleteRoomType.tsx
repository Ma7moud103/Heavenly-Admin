import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRoomType } from '@/data/rooms&bookings/deleteRoomType';

const UseDeleteRoomType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roomTypeId: string) => {
      const { error } = await deleteRoomType(roomTypeId);

      if (error) throw new Error(error.message || 'Failed to delete room type');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['room-types'] }),
  });
};

export default UseDeleteRoomType;
