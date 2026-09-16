import { BedDouble } from 'lucide-react';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { RoomsStatsGridSkeleton } from '@/features/rooms/components/RoomsSkeletons';
import { useStats } from '@/hooks/rooms&bookings/useStats';

export function RoomsStatsGrid() {
  const {
    isLoading,
    roomStats: { availableRooms, maintenanceRooms, occupiedRooms, totalRooms },
  } = useStats();
  if (isLoading) {
    return <RoomsStatsGridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Rooms" value={totalRooms} icon={<BedDouble className="h-5 w-5" />} />
      <StatCard title="Occupied" value={occupiedRooms} variant="error" icon={<BedDouble className="h-5 w-5" />} />
      <StatCard title="Available" value={availableRooms} variant="success" icon={<BedDouble className="h-5 w-5" />} />
      <StatCard title="Maintenance" value={maintenanceRooms} variant="warning" icon={<BedDouble className="h-5 w-5" />} />
    </div>
  );
}
