import { memo, useCallback, useState } from "react"
import { CreateRoomAction } from "@/features/rooms/components/CreateRoomAction"
import { DeleteRoomSheet } from "@/features/rooms/components/DeleteRoomSheet"
import { EditRoomSheet } from "@/features/rooms/components/EditRoomSheet"
import { RoomsHeader } from "@/features/rooms/components/RoomsHeader"
import { RoomsStatsGrid } from "@/features/rooms/components/RoomsStatsGrid"
import { RoomsTableSection } from "@/features/rooms/components/RoomsTableSection"
import { useHotelStats } from "@/hooks/getHotelStats"
import UseRooms from "@/hooks/UseRooms"
import UseRoomsStatuses from "@/hooks/UseRoomsStatuses"
import UseRoomsTypes from "@/hooks/UseRoomsTypes"
import type { IRoom } from "@/interfaces/IRooms"

function Rooms() {
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false)
  const [isDeleteRoomOpen, setIsDeleteRoomOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null)
  const { data: hotelStats } = useHotelStats()
  const { data: rooms = [] } = UseRooms()
  const { data: roomTypes = [] } = UseRoomsTypes()
  const { data: roomStatuses = [] } = UseRoomsStatuses()

  const handleEditRoom = useCallback((room: IRoom) => {
    setSelectedRoom(room)
    setIsEditRoomOpen(true)
  }, [])

  const handleDeleteRoom = useCallback((room: IRoom) => {
    setSelectedRoom(room)
    setIsDeleteRoomOpen(true)
  }, [])

  const handleEditRoomOpenChange = useCallback((open: boolean) => {
    setIsEditRoomOpen(open)
    if (!open) {
      setSelectedRoom(null)
    }
  }, [])

  const handleDeleteRoomOpenChange = useCallback((open: boolean) => {
    setIsDeleteRoomOpen(open)
    if (!open) {
      setSelectedRoom(null)
    }
  }, [])

  return (
    <>
      <div className="flex flex-col gap-6">
        <RoomsHeader>
          <CreateRoomAction roomStatuses={roomStatuses} roomTypes={roomTypes} />
        </RoomsHeader>
        <RoomsStatsGrid hotelStats={hotelStats} />

        {/* Search/filter state lives in the table section so header and stats do not re-render on each keystroke. */}
        <RoomsTableSection
          rooms={rooms}
          roomTypes={roomTypes}
          onDeleteRoom={handleDeleteRoom}
          onEditRoom={handleEditRoom}
        />
      </div>

      <EditRoomSheet
        open={isEditRoomOpen}
        onOpenChange={handleEditRoomOpenChange}
        room={selectedRoom}
        roomStatuses={roomStatuses}
        roomTypes={roomTypes}
      />

      <DeleteRoomSheet
        open={isDeleteRoomOpen}
        onOpenChange={handleDeleteRoomOpenChange}
        room={selectedRoom}
      />
    </>
  )
}

export default memo(Rooms)
