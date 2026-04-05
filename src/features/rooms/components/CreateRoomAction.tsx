import { memo, useState } from "react"
import { Plus } from "lucide-react"
import { CreateRoomSheet } from "@/features/rooms/components/CreateRoomSheet"
import type { RoomStatus, IRoomsTypes } from "@/interfaces/IRooms"

interface IProps {
  roomStatuses: RoomStatus[]
  roomTypes: IRoomsTypes[]
}

function CreateRoomActionComponent({ roomStatuses, roomTypes }: IProps) {
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false)

  return (
    <>
      {/* Keep create-sheet state local so open/close does not bubble through the full page. */}
      <button
        className="btn btn-primary"
        onClick={() => setIsCreateRoomOpen(true)}
        type="button"
      >
        <Plus className="h-4 w-4" />
        Add Room
      </button>

      <CreateRoomSheet
        open={isCreateRoomOpen}
        onOpenChange={setIsCreateRoomOpen}
        roomStatuses={roomStatuses}
        roomTypes={roomTypes}
      />
    </>
  )
}

export const CreateRoomAction = memo(CreateRoomActionComponent)
