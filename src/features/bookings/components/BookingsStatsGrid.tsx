import { CalendarDays } from "lucide-react"
import { BookingsStatsGridSkeleton } from "@/features/bookings/components/BookingsSkeletons"
import { StatCard } from "@/features/dashboard/components/StatCard"

interface BookingsStatsGridProps {
  totalBookings: number
  checkedInCount: number
  confirmedCount: number
  pendingCount: number
  isLoading?: boolean
}

export function BookingsStatsGrid({
  totalBookings,
  checkedInCount,
  confirmedCount,
  pendingCount,
  isLoading = false,
}: BookingsStatsGridProps) {
  if (isLoading) {
    return <BookingsStatsGridSkeleton />
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Bookings"
        value={totalBookings}
        icon={<CalendarDays className="h-5 w-5" />}
      />
      <StatCard
        title="Pending"
        value={pendingCount}
        variant="error"
        icon={<CalendarDays className="h-5 w-5" />}
      />
      <StatCard
        title="Confirmed"
        value={confirmedCount}
        variant="warning"
        icon={<CalendarDays className="h-5 w-5" />}
      />
      <StatCard
        title="Checked In"
        value={checkedInCount}
        variant="success"
        icon={<CalendarDays className="h-5 w-5" />}
      />
    </div>
  )
}
