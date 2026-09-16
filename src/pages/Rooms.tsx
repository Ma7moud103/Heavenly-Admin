import { memo } from 'react';
import { CreateRoomAction } from '@/features/rooms/components/CreateRoomAction';
import { RoomsArea } from '@/features/rooms/components/RoomsArea';
import { RoomsHeader } from '@/features/rooms/components/RoomsHeader';
import { RoomsStatsGrid } from '@/features/rooms/components/RoomsStatsGrid';

import UseRooms from '@/hooks/rooms&bookings/UseRooms';
import UseRoomsTypes from '@/hooks/rooms&bookings/UseRoomsTypes';
import UseRoomsStatuses from '@/hooks/rooms&bookings/UseRoomsStatuses';

function Rooms() {
  // const { data: hotelStats, isFetching: isFetchingHotelStats } = useHotelStats();
  const { data: rooms = [], isLoading: isFetchingRooms } = UseRooms();
  const { data: roomTypes = [] } = UseRoomsTypes();
  const { data: roomStatuses = [] } = UseRoomsStatuses();

  return (
    <div className="flex flex-col gap-6">
      <RoomsHeader>
        <CreateRoomAction roomStatuses={roomStatuses} roomTypes={roomTypes} />
      </RoomsHeader>
      <RoomsStatsGrid />
      <RoomsArea isLoading={isFetchingRooms} rooms={rooms} roomStatuses={roomStatuses} roomTypes={roomTypes} />
    </div>
  );
}

export default memo(Rooms);
