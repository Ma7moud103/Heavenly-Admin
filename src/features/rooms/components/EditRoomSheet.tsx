import type { IRoom, RoomStatus, IRoomsTypes } from "@/interfaces/IRooms"
import { RoomFormSheet } from "@/features/rooms/components/RoomFormSheet"

interface IProps {
  open: boolean
  room: IRoom | null
  roomStatuses: RoomStatus[]
  roomTypes: IRoomsTypes[]
  onOpenChange: (open: boolean) => void
}

export function EditRoomSheet({
  open,
  room,
  roomStatuses,
  roomTypes,
  onOpenChange,
}: IProps) {
  return (
    <RoomFormSheet
      mode="edit"
      open={open}
      room={room}
      roomStatuses={roomStatuses}
      roomTypes={roomTypes}
      onOpenChange={onOpenChange}
    />
  )
}
