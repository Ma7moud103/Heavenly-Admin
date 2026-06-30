import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { DashboardStatsGrid } from '@/features/dashboard/components/DashboardStatsGrid';
import { QuickStatsSection } from '@/features/dashboard/components/QuickStatsSection';
import { RecentActivitySection } from '@/features/dashboard/components/RecentActivitySection';
import { RecentBookingsSection } from '@/features/dashboard/components/RecentBookingsSection';
import { RoomTypesOverview } from '@/features/dashboard/components/RoomTypesOverview';
import UseAuditLogs from '@/hooks/UseAuditLogs';
import UseRoomBookings from '@/hooks/UseRoomBookings';
import UseRoomsTypes from '@/hooks/UseRoomsTypes';
import { mapAuditToActivity } from '@/lib/utils';
import { handleDateSort } from '@/utils/dates';

export default function Dashboard() {
  const { data: bookingsData, isLoading: isLoadingBookings } = UseRoomBookings();
  const { data: roomTypesData, isLoading: isLoadingRoomTypes } = UseRoomsTypes();

  const { data: auditLogsData, isLoading: isLoadingAuditLogs } = UseAuditLogs();

  const recentAuditActivity = (auditLogsData ?? []).slice().sort(handleDateSort).slice(0, 5).map(mapAuditToActivity);

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />

      <DashboardStatsGrid />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
        <RecentBookingsSection bookings={bookingsData ?? []} isLoading={isLoadingBookings} />
        <RoomTypesOverview isLoading={isLoadingRoomTypes} roomTypes={roomTypesData} />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivitySection activities={recentAuditActivity} isLoading={isLoadingAuditLogs} />
        <QuickStatsSection />
      </section>
    </div>
  );
}
