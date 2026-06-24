import { BedDouble } from 'lucide-react';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { RoomsStatsGridSkeleton } from '@/features/rooms/components/RoomsSkeletons';
import type { IRoomStats } from '@/interfaces/IRoomStats';

interface RoomsStatsGridProps {
  roomStats?: IRoomStats;
  isLoading?: boolean;
  totalRooms: number;
}

export function RoomsStatsGrid({ totalRooms, roomStats, isLoading = false }: RoomsStatsGridProps) {
  if (isLoading) {
    return <RoomsStatsGridSkeleton />;
  }

  const occupiedRooms = roomStats?.occupiedCount ?? 0;
  const availableRooms = roomStats?.availableCount ?? 0;
  const maintenanceRooms = roomStats?.maintenanceCount ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Rooms" value={totalRooms} icon={<BedDouble className="h-5 w-5" />} />
      <StatCard title="Occupied" value={occupiedRooms} variant="error" icon={<BedDouble className="h-5 w-5" />} />
      <StatCard title="Available" value={availableRooms} variant="success" icon={<BedDouble className="h-5 w-5" />} />
      <StatCard
        title="Maintenance"
        value={maintenanceRooms}
        variant="warning"
        icon={<BedDouble className="h-5 w-5" />}
      />
    </div>
  );
}
