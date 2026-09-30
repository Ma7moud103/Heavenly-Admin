import { toast } from 'react-toastify';
import type { IRoom } from '@/interfaces/IRooms';
import UseDeleteRoom from '@/hooks/rooms&bookings/UseDeleteRoom';
import { DeleteItem } from '@/components/shared/Delete';

interface IProps {
  open: boolean;
  room: IRoom | null;
  onOpenChange: (open: boolean) => void;
}

export function DeleteRoomSheet({ open, room, onOpenChange }: IProps) {
  const deleteRoomMutation = UseDeleteRoom();

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      deleteRoomMutation.reset();
    }

    onOpenChange(nextOpen);
  };

  const handleDelete = async () => {
    if (!room) return;

    try {
      await deleteRoomMutation.mutateAsync(room.id);
      toast.success('Room deleted successfully');
      handleClose(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete room';
      toast.error(message);
    }
  };

  return (
    <DeleteItem
      open={open}
      onOpenChange={onOpenChange}
      title="Delete room?"
      itemName={room?.title}
      onConfirm={handleDelete}
      isDeleting={deleteRoomMutation.isPending}
    />
  );
}
