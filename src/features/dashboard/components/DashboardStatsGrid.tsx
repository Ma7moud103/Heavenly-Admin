import {
  BedDouble,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react"
import type { IHotelStats } from "@/interfaces/HotelStatus"
import { formatCurrency } from "@/lib/utils"
import { StatCard } from "@/features/dashboard/components/StatCard"
import { StatCardSkeleton } from "@/features/dashboard/components/DashboardSkeletons"

interface IProps {
  hotelStats: IHotelStats
  isLoading: boolean
}

export function DashboardStatsGrid({
  hotelStats,
  isLoading,
}: IProps) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => <StatCardSkeleton key={index} />)
      ) : (
        <>
          <StatCard
            title="Total Rooms"
            value={hotelStats.total_rooms}
            changeType="neutral"
            icon={<BedDouble className="h-5 w-5" />}
          />
          <StatCard
            title="Occupancy Rate"
            value={`${formatCurrency(hotelStats.occupancy_rate)}%`}
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5" />}
            variant="gold"
          />
          <StatCard
            title="Guests In House"
            value={hotelStats.occupied_rooms}
            // change={`${hotelStats.checkins_today} check-ins today`}
            changeType="neutral"
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Today&apos;s Revenue"
            value={formatCurrency(hotelStats.revenue_today)}
            changeType="positive"
            icon={<DollarSign className="h-5 w-5" />}
            variant="success"
          />
        </>
      )}
    </section>
  )
}
