import { CalendarDays, DoorClosed, DoorOpen, Users } from "lucide-react"
import { StatCard } from "@/features/dashboard/components/StatCard"

interface CheckinStatsGridProps {
  arrivalsToday: number
  departuresToday: number
  inHouse: number
  dueNow: number
}

export function CheckinStatsGrid({
  arrivalsToday,
  departuresToday,
  inHouse,
  dueNow,
}: CheckinStatsGridProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Daily Snapshot</h2>
        <p className="text-sm text-[--color-text-sub]">
          A quick pulse on movement at the front desk today.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Arrivals Today"
          value={arrivalsToday}
          icon={<CalendarDays className="h-5 w-5" />}
        />
        <StatCard
          title="Departures Today"
          value={departuresToday}
          variant="warning"
          icon={<DoorClosed className="h-5 w-5" />}
        />
        <StatCard
          title="In House"
          value={inHouse}
          variant="success"
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Actions Due Now"
          value={dueNow}
          variant="error"
          icon={<DoorOpen className="h-5 w-5" />}
        />
      </div>
    </section>
  )
}
