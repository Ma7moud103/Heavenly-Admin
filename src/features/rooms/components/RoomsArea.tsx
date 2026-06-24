import { memo, useCallback, useDeferredValue, useMemo, useReducer, useState } from 'react';
import { DeleteRoomSheet } from '@/features/rooms/components/DeleteRoomSheet';
import { EditRoomSheet } from '@/features/rooms/components/EditRoomSheet';
import { RoomsFiltersBar } from '@/features/rooms/components/RoomsFiltersBar';
import { RoomsTable } from '@/features/rooms/components/RoomsTable';
import { RoomsTableSectionSkeleton } from '@/features/rooms/components/RoomsSkeletons';
import { initialRoomsFilters, roomsFilterReducer } from '@/features/rooms/filters';
import type { IRoom, IRoomsTypes, RoomStatus } from '@/interfaces/IRooms';

interface RoomsAreaProps {
  isLoading?: boolean;
  rooms: IRoom[];
  roomStatuses: RoomStatus[];
  roomTypes: IRoomsTypes[];
}

function RoomsAreaComponent({ isLoading = false, rooms, roomStatuses, roomTypes }: RoomsAreaProps) {
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
  const [isDeleteRoomOpen, setIsDeleteRoomOpen] = useState(false);
  const [filters, dispatch] = useReducer(roomsFilterReducer, initialRoomsFilters);
  const deferredSearchTerm = useDeferredValue(filters.searchTerm);

  const roomTypeOptions = useMemo(() => roomTypes.map((roomType) => roomType.name), [roomTypes]);

  const normalizedFilters = useMemo(
    () => ({
      searchTerm: deferredSearchTerm.trim().toLowerCase(),
      statusFilter: filters.statusFilter,
      typeFilter: filters.typeFilter,
      minPrice: filters.minPrice.trim() === '' ? null : Number(filters.minPrice),
      maxPrice: filters.maxPrice.trim() === '' ? null : Number(filters.maxPrice),
      minCapacity: filters.minCapacity.trim() === '' ? null : Number(filters.minCapacity),
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
    ],
  );

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const title = (room.title || '').toLowerCase();
      const typeName = (room.room_type?.name || '').toLowerCase();
      const description = (room.description || '').toLowerCase();
      const statusLabel = (room.status?.label || room.status?.name || '').toLowerCase();
      const roomPrice = Number(room.base_price || 0);
      const roomCapacity = Number(room.capacity || 0);

      // search term should match title, type name, or description
      const matchesSearch =
        normalizedFilters.searchTerm.length === 0 ||
        title.includes(normalizedFilters.searchTerm) ||
        typeName.includes(normalizedFilters.searchTerm) ||
        description.includes(normalizedFilters.searchTerm);

      // status filter should match room status unless filter is 'all'
      const matchesStatus = normalizedFilters.statusFilter === 'all' || statusLabel === normalizedFilters.statusFilter;

      // type filter should match room type unless filter is 'all'
      const matchesType =
        normalizedFilters.typeFilter === 'all' || (room.room_type?.name || '') === normalizedFilters.typeFilter;

      // price filters should match rooms with price greater than or equal to minPrice and less than or equal to maxPrice
      const matchesMinPrice = normalizedFilters.minPrice === null || roomPrice >= normalizedFilters.minPrice;
      const matchesMaxPrice = normalizedFilters.maxPrice === null || roomPrice <= normalizedFilters.maxPrice;

      // capacity filter should match rooms with capacity greater than or equal to the filter value
      const matchesCapacity = normalizedFilters.minCapacity === null || roomCapacity >= normalizedFilters.minCapacity;

      // image filter should match rooms that have an image if hasImage is true, or all rooms if hasImage is false
      const matchesImage = !normalizedFilters.hasImage || Boolean(room.image_url);

      // description filter should match rooms that have a description if hasDescription is true, or all rooms if hasDescription is false
      const matchesDescription = !normalizedFilters.hasDescription || Boolean(room.description?.trim());

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesCapacity &&
        matchesImage &&
        matchesDescription
      );
    });
  }, [normalizedFilters, rooms]);

  const handleEditRoom = useCallback((room: IRoom) => {
    setSelectedRoom(room);
    setIsEditRoomOpen(true);
  }, []);

  const handleDeleteRoom = useCallback((room: IRoom) => {
    setSelectedRoom(room);
    setIsDeleteRoomOpen(true);
  }, []);

  const handleEditRoomOpenChange = useCallback((open: boolean) => {
    setIsEditRoomOpen(open);
    if (!open) {
      setSelectedRoom(null);
    }
  }, []);

  const handleDeleteRoomOpenChange = useCallback((open: boolean) => {
    setIsDeleteRoomOpen(open);
    if (!open) {
      setSelectedRoom(null);
    }
  }, []);

  if (isLoading) {
    return <RoomsTableSectionSkeleton />;
  }

  return (
    <>
      <section className="card">
        <RoomsFiltersBar filters={filters} roomTypeOptions={roomTypeOptions} onDispatch={dispatch} />
        <RoomsTable rooms={filteredRooms} onDeleteRoom={handleDeleteRoom} onEditRoom={handleEditRoom} />
      </section>

      <EditRoomSheet
        open={isEditRoomOpen}
        onOpenChange={handleEditRoomOpenChange}
        room={selectedRoom}
        roomStatuses={roomStatuses}
        roomTypes={roomTypes}
      />

      <DeleteRoomSheet open={isDeleteRoomOpen} onOpenChange={handleDeleteRoomOpenChange} room={selectedRoom} />
    </>
  );
}

export const RoomsArea = memo(RoomsAreaComponent);
