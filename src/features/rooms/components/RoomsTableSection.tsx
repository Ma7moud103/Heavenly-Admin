import { memo, useDeferredValue, useMemo, useReducer } from "react"
import { RoomsFiltersBar } from "@/features/rooms/components/RoomsFiltersBar"
import { RoomsTable } from "@/features/rooms/components/RoomsTable"
import {
  initialRoomsFilters,
  roomsFilterReducer,
} from "@/features/rooms/filters"
import type { IRoom, IRoomsTypes } from "@/interfaces/IRooms"

interface IProps {
  rooms: IRoom[]
  roomTypes: IRoomsTypes[]
  onDeleteRoom: (room: IRoom) => void
  onEditRoom: (room: IRoom) => void
}

function RoomsTableSectionComponent({
  rooms,
  roomTypes,
  onDeleteRoom,
  onEditRoom,
}: IProps) {
  const [filters, dispatch] = useReducer(roomsFilterReducer, initialRoomsFilters)
  const deferredSearchTerm = useDeferredValue(filters.searchTerm)

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
    // Keep search/filter recomputation inside the table section so the rest of the page stays calm.
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

  return (
    <section className="card">
      <RoomsFiltersBar
        filters={filters}
        roomTypeOptions={roomTypeOptions}
        onDispatch={dispatch}
      />
      <RoomsTable
        rooms={filteredRooms}
        onDeleteRoom={onDeleteRoom}
        onEditRoom={onEditRoom}
      />
    </section>
  )
}

export const RoomsTableSection = memo(RoomsTableSectionComponent)
