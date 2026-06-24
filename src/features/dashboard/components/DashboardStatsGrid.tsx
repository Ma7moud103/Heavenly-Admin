import { BedDouble, DollarSign, TrendingUp, Users } from 'lucide-react';
import { StatCardSkeleton } from '@/features/dashboard/components/DashboardSkeletons';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { formatCurrency } from '@/lib/utils';
import { useStats } from '@/hooks/useStats';

function formatOccupancyRate(value: number) {
  const disabledValue = value <= 1 ? value * 100 : value;
  return `${Math.round(disabledValue)}%`;
}

export function DashboardStatsGrid() {
  const { roomStats, guestsInHouse, occupancyRate, isLoading: IsLoadingStats, dailyRevenue } = useStats();
  const { totalRooms } = roomStats;

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {IsLoadingStats ? (
        Array.from({ length: 4 }).map((_, index) => <StatCardSkeleton key={index} />)
      ) : (
        <>
          <StatCard title="Total Rooms" value={totalRooms} changeType="neutral" icon={<BedDouble className="h-5 w-5" />} />
          <StatCard
            title="Occupancy Rate"
            value={formatOccupancyRate(occupancyRate)}
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5" />}
            variant="gold"
          />
          <StatCard title="Guests In House" value={guestsInHouse} changeType="neutral" icon={<Users className="h-5 w-5" />} />
          <StatCard
            title="Today's Revenue"
            value={formatCurrency(dailyRevenue)}
            changeType="positive"
            icon={<DollarSign className="h-5 w-5" />}
            variant="success"
          />
        </>
      )}
    </section>
  );
}
