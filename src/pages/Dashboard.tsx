import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader"
import { DashboardStatsGrid } from "@/features/dashboard/components/DashboardStatsGrid"
import { QuickStatsSection } from "@/features/dashboard/components/QuickStatsSection"
import { RecentActivitySection } from "@/features/dashboard/components/RecentActivitySection"
import { RecentBookingsSection } from "@/features/dashboard/components/RecentBookingsSection"
import { RoomTypesOverview } from "@/features/dashboard/components/RoomTypesOverview"
import { useHotelStats } from "@/hooks/getHotelStats"
import UseAuditLogs from "@/hooks/UseAuditLogs"
import UseRoomBookings from "@/hooks/UseRoomBookings"
import UseRoomsTypes from "@/hooks/UseRoomsTypes"
import { mapAuditToActivity, parseUtcTimestamp } from "@/lib/utils"

export default function Dashboard() {
  const { data: hotelStats, isLoading: isGettingHotelStats } = useHotelStats()
  const { data: bookingsData, isLoading: isLoadingBookings } = UseRoomBookings()
  const { data: roomTypesData, isLoading: isLoadingRoomTypes } = UseRoomsTypes()
  const { data: auditLogsData, isLoading: isLoadingAuditLogs } = UseAuditLogs()

  const recentAuditActivity = (auditLogsData ?? [])
    .slice()
    .sort(
      (first, second) =>
        parseUtcTimestamp(second.created_at).getTime() -
        parseUtcTimestamp(first.created_at).getTime()
    )
    .slice(0, 5)
    .map(mapAuditToActivity)

  const lastUpdated = new Date().toLocaleTimeString("en-EG", {
    timeZone: "Africa/Cairo",
  })

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader lastUpdated={lastUpdated} />

      <DashboardStatsGrid hotelStats={hotelStats} isLoading={isGettingHotelStats} />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
        <RecentBookingsSection
          bookings={bookingsData ?? []}
          isLoading={isLoadingBookings}
        />
        <RoomTypesOverview
          hotelStats={hotelStats}
          isLoading={isLoadingRoomTypes}
          roomTypes={roomTypesData}
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivitySection
          activities={recentAuditActivity}
          isLoading={isLoadingAuditLogs}
        />
        <QuickStatsSection hotelStats={hotelStats} />
      </section>
    </div>
  )
}
