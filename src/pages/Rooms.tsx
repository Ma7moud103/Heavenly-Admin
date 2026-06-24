import { memo, useMemo } from 'react';
import { CreateRoomAction } from '@/features/rooms/components/CreateRoomAction';
import { RoomsArea } from '@/features/rooms/components/RoomsArea';
import { RoomsHeader } from '@/features/rooms/components/RoomsHeader';
import { RoomsStatsGrid } from '@/features/rooms/components/RoomsStatsGrid';
import UseRooms from '@/hooks/UseRooms';
import UseRoomsStatuses from '@/hooks/UseRoomsStatuses';
import UseRoomsTypes from '@/hooks/UseRoomsTypes';
import type { IRoomStats } from '@/interfaces/IRoomStats';

type TRoomStatus = 'available' | 'occupied' | 'maintenance' | 'out_of_service' | 'cleaning';
function Rooms() {
  // const { data: hotelStats, isFetching: isFetchingHotelStats } = useHotelStats();
  const { data: rooms = [], isLoading: isFetchingRooms } = UseRooms();
  const { data: roomTypes = [] } = UseRoomsTypes();
  const { data: roomStatuses = [] } = UseRoomsStatuses();

  const roomStats = useMemo<IRoomStats>(() => {
    return rooms.reduce<IRoomStats>(
      (stats, room) => {
        const status = (room.status?.label || room.status?.name || '').toLowerCase() as TRoomStatus | '';

        switch (status) {
          case 'available':
            stats.availableCount += 1;
            break;
          case 'occupied':
            stats.occupiedCount += 1;
            break;
          case 'maintenance':
            stats.maintenanceCount += 1;
            break;
          case 'out_of_service':
            stats.outOfServiceCount += 1;
            break;
          case 'cleaning':
            stats.cleaningCount += 1;
            break;

          default:
            return stats;
        }

        return stats;
      },
      {
        availableCount: 0,
        occupiedCount: 0,
        maintenanceCount: 0,
        outOfServiceCount: 0,
        cleaningCount: 0,
      },
    );
  }, [rooms]);

  return (
    <div className="flex flex-col gap-6">
      <RoomsHeader>
        <CreateRoomAction roomStatuses={roomStatuses} roomTypes={roomTypes} />
      </RoomsHeader>
      <RoomsStatsGrid totalRooms={rooms.length} isLoading={isFetchingRooms} roomStats={roomStats} />
      <RoomsArea isLoading={isFetchingRooms} rooms={rooms} roomStatuses={roomStatuses} roomTypes={roomTypes} />
    </div>
  );
}

export default memo(Rooms);
