import { useDeferredValue, useMemo, useReducer, useState } from "react"
import { CreateRoomSheet } from "@/features/rooms/components/CreateRoomSheet"
import { DeleteRoomSheet } from "@/features/rooms/components/DeleteRoomSheet"
import { EditRoomSheet } from "@/features/rooms/components/EditRoomSheet"
import { RoomsFiltersBar } from "@/features/rooms/components/RoomsFiltersBar"
import { RoomsHeader } from "@/features/rooms/components/RoomsHeader"
import { RoomsStatsGrid } from "@/features/rooms/components/RoomsStatsGrid"
import { RoomsTable } from "@/features/rooms/components/RoomsTable"
import {
  initialRoomsFilters,
  roomsFilterReducer,
} from "@/features/rooms/filters"
import { useHotelStats } from "@/hooks/getHotelStats"
import UseRooms from "@/hooks/UseRooms"
import UseRoomsStatuses from "@/hooks/UseRoomsStatuses"
import UseRoomsTypes from "@/hooks/UseRoomsTypes"
import type { IRoom } from "@/interfaces/IRooms"

export default function Rooms() {
  const [filters, dispatch] = useReducer(roomsFilterReducer, initialRoomsFilters)
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false)
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false)
  const [isDeleteRoomOpen, setIsDeleteRoomOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null)
  const deferredSearchTerm = useDeferredValue(filters.searchTerm)
  const { data: hotelStats } = useHotelStats()
  const { data: rooms = [] } = UseRooms()
  const { data: roomTypes = [] } = UseRoomsTypes()
  const { data: roomStatuses = [] } = UseRoomsStatuses()

  const roomTypeOptions = useMemo(
    () => roomTypes.map((roomType) => roomType.name),
    [roomTypes]
  )

  const cachedFilters = useMemo(
    () => ({
      searchTerm: deferredSearchTerm.trim().toLowerCase(),
      statusFilter: filters.statusFilter,
      typeFilter: filters.typeFilter,
      minPrice: filters.minPrice.trim() === "" ? null : Number(filters.minPrice),
      maxPrice: filters.maxPrice.trim() === "" ? null : Number(filters.maxPrice),
      minCapacity:
        filters.minCapacity.trim() === "" ? null : Number(filters.minCapacity),
      hasImage: filters.hasImage,
      hasDescription: filters.hasDescription,
    }),
    [
      deferredSearchTerm,
      filters.statusFilter,
      filters.typeFilter,
      filters.minPrice,
      filters.maxPrice,
      filters.minCapacity,
      filters.hasImage,
      filters.hasDescription,
    ]
  )

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const title = (room.title || "").toLowerCase()
      const typeName = (room.room_type?.name || "").toLowerCase()
      const description = (room.description || "").toLowerCase()
      const statusLabel = (room.status?.label || room.status?.name || "").toLowerCase()
      const roomPrice = Number(room.base_price || 0)
      const roomCapacity = Number(room.capacity || 0)

      const matchesSearch =
        cachedFilters.searchTerm.length === 0 ||
        title.includes(cachedFilters.searchTerm) ||
        typeName.includes(cachedFilters.searchTerm) ||
        description.includes(cachedFilters.searchTerm)

      const matchesStatus =
        cachedFilters.statusFilter === "all" ||
        statusLabel === cachedFilters.statusFilter

      const matchesType =
        cachedFilters.typeFilter === "all" ||
        (room.room_type?.name || "") === cachedFilters.typeFilter

      const matchesMinPrice =
        cachedFilters.minPrice === null || roomPrice >= cachedFilters.minPrice
      const matchesMaxPrice =
        cachedFilters.maxPrice === null || roomPrice <= cachedFilters.maxPrice
      const matchesCapacity =
        cachedFilters.minCapacity === null ||
        roomCapacity >= cachedFilters.minCapacity
      const matchesImage = !cachedFilters.hasImage || Boolean(room.image_url)
      const matchesDescription =
        !cachedFilters.hasDescription || Boolean(room.description?.trim())

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesCapacity &&
        matchesImage &&
        matchesDescription
      )
    })
  }, [cachedFilters, rooms])

  const handleEditRoom = (room: IRoom) => {
    setSelectedRoom(room)
    setIsEditRoomOpen(true)
  }

  const handleDeleteRoom = (room: IRoom) => {
    setSelectedRoom(room)
    setIsDeleteRoomOpen(true)
  }

  const handleEditRoomOpenChange = (open: boolean) => {
    setIsEditRoomOpen(open)
    if (!open) {
      setSelectedRoom(null)
    }
  }

  const handleDeleteRoomOpenChange = (open: boolean) => {
    setIsDeleteRoomOpen(open)
    if (!open) {
      setSelectedRoom(null)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        <RoomsHeader onAddRoom={() => setIsCreateRoomOpen(true)} />
        <RoomsStatsGrid hotelStats={hotelStats} />

        <section className="card">
          <RoomsFiltersBar
            filters={filters}
            roomTypeOptions={roomTypeOptions}
            onDispatch={dispatch}
          />
          <RoomsTable
            rooms={filteredRooms}
            onDeleteRoom={handleDeleteRoom}
            onEditRoom={handleEditRoom}
          />
        </section>
      </div>

      <CreateRoomSheet
        open={isCreateRoomOpen}
        onOpenChange={setIsCreateRoomOpen}
        roomStatuses={roomStatuses}
        roomTypes={roomTypes}
      />

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
