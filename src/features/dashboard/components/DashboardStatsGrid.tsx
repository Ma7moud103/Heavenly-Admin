import { DollarSign, TrendingUp, Users, BedDouble } from 'lucide-react';
import { StatCardSkeleton } from '@/features/dashboard/components/DashboardSkeletons';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { formatCurrency } from '@/lib/utils';
import { useStats } from '@/hooks/rooms&bookings/useStats';

function formatOccupancyRate(value: number) {
  const disabledValue = value <= 1 ? value * 100 : value;
  return `${Math.round(disabledValue)}%`;
}

export function DashboardStatsGrid() {
  const {
    guestsInHouse,
    occupancyRatePerDay,
    occupancyRatePerMonth,
    isLoading: IsLoadingStats,
    dailyRevenue,
    monthlyRevenue,
    roomStats: { availableRooms },
  } = useStats();

  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {IsLoadingStats ? (
        Array.from({ length: 4 }).map((_, index) => <StatCardSkeleton key={index} />)
      ) : (
        <>
          <StatCard title="Available Rooms" value={availableRooms} changeType="neutral" icon={<BedDouble className="h-5 w-5" />} />
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(monthlyRevenue)}
            changeType="positive"
            icon={<DollarSign className="h-5 w-5" />}
            variant="success"
          />{' '}
          <StatCard
            title="Occupancy Rate (Monthly)"
            value={formatOccupancyRate(occupancyRatePerMonth)}
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5" />}
            variant="gold"
          />
          <StatCard
            title="Occupancy Rate (Daily)"
            value={formatOccupancyRate(occupancyRatePerDay)}
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5" />}
            variant="gold"
          />
          <StatCard title="Guests In House" value={guestsInHouse} changeType="neutral" icon={<Users className="h-5 w-5" />} />
          <StatCard
            title="Daily Revenue"
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
