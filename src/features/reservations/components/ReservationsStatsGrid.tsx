import { CalendarClock, CircleAlert, CircleCheckBig, ShieldBan } from "lucide-react"
import { StatCard } from "@/features/dashboard/components/StatCard"

interface ReservationsStatsGridProps {
  upcomingCount: number
  pendingCount: number
  confirmedCount: number
  arrivingSoonCount: number
}

export function ReservationsStatsGrid({
  upcomingCount,
  pendingCount,
  confirmedCount,
  arrivingSoonCount,
}: ReservationsStatsGridProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Reservation Snapshot</h2>
        <p className="text-sm text-[--color-text-sub]">
          Keep an eye on pending approvals and near-term arrivals.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Upcoming Reservations"
          value={upcomingCount}
          icon={<CalendarClock className="h-5 w-5" />}
        />
        <StatCard
          title="Pending Confirmation"
          value={pendingCount}
          variant="error"
          icon={<CircleAlert className="h-5 w-5" />}
        />
        <StatCard
          title="Confirmed"
          value={confirmedCount}
          variant="success"
          icon={<CircleCheckBig className="h-5 w-5" />}
        />
        <StatCard
          title="Arriving Soon"
          value={arrivingSoonCount}
          variant="warning"
          icon={<ShieldBan className="h-5 w-5" />}
        />
      </div>
    </section>
  )
}
