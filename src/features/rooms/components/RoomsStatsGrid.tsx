import { BedDouble } from "lucide-react"
import { StatCard } from "@/features/dashboard/components/StatCard"
import { RoomsStatsGridSkeleton } from "@/features/rooms/components/RoomsSkeletons"
import type { IHotelStats } from "@/interfaces/HotelStatus"

interface RoomsStatsGridProps {
  hotelStats: IHotelStats | undefined
  isLoading?: boolean
}

export function RoomsStatsGrid({ hotelStats, isLoading = false }: RoomsStatsGridProps) {
  if (isLoading) {
    return <RoomsStatsGridSkeleton />
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Rooms"
        value={hotelStats?.total_rooms ?? 0}
        icon={<BedDouble className="h-5 w-5" />}
      />
      <StatCard
        title="Occupied"
        value={hotelStats?.occupied_rooms ?? 0}
        variant="error"
        icon={<BedDouble className="h-5 w-5" />}
      />
      <StatCard
        title="Available"
        value={hotelStats?.available_rooms ?? 0}
        variant="success"
        icon={<BedDouble className="h-5 w-5" />}
      />
      <StatCard
        title="Maintenance"
        value={hotelStats?.maintenance_rooms ?? 0}
        variant="warning"
        icon={<BedDouble className="h-5 w-5" />}
      />
    </div>
  )
}
