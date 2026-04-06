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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        title="Actions Due"
        value={dueNow}
        variant="error"
        icon={<DoorOpen className="h-5 w-5" />}
      />
    </div>
  )
}
