import { memo, useState } from 'react';
import { Plus } from 'lucide-react';
// import { CreateRoomSheet } from '@/features/rooms/components/CreateRoomSheet';
import type { RoomStatus, IRoomsTypes } from '@/interfaces/IRooms';
import { RoomFormSheet } from './RoomFormSheet';

interface IProps {
  roomStatuses: RoomStatus[];
  roomTypes: IRoomsTypes[];
}

function CreateRoomActionComponent({ roomStatuses, roomTypes }: IProps) {
  const [open, onOpenChange] = useState(false);

  return (
    <>
      {/* Keep create-sheet state local so open/close does not bubble through the full page. */}
      <button className="btn btn-primary" onClick={() => onOpenChange(true)} type="button">
        <Plus className="h-4 w-4" />
        Create New Room
      </button>

      <RoomFormSheet mode="create" open={open} roomStatuses={roomStatuses} roomTypes={roomTypes} onOpenChange={onOpenChange} />
    </>
  );
}

export const CreateRoomTrigger = memo(CreateRoomActionComponent);
