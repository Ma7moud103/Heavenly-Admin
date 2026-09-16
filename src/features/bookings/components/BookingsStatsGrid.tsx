import { CalendarDays } from 'lucide-react';
import { BookingsStatsGridSkeleton } from '@/features/bookings/components/BookingsSkeletons';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { useStats } from '@/hooks/rooms&bookings/useStats';

export function BookingsStatsGrid() {
  const {
    isLoading,
    bookingStats: { totalBookings, totalPending, totalConfirmed, totalCheckIns },
  } = useStats();
  if (isLoading) {
    return <BookingsStatsGridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Bookings" value={totalBookings} icon={<CalendarDays className="h-5 w-5" />} />
      <StatCard title="Pending" value={totalPending} variant="error" icon={<CalendarDays className="h-5 w-5" />} />
      <StatCard title="Confirmed" value={totalConfirmed} variant="warning" icon={<CalendarDays className="h-5 w-5" />} />
      <StatCard title="Checked In" value={totalCheckIns} variant="success" icon={<CalendarDays className="h-5 w-5" />} />
    </div>
  );
}
