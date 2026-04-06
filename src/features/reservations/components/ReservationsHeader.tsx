import { memo } from "react"
import { CalendarClock, ShieldCheck } from "lucide-react"

interface ReservationsHeaderProps {
  todayLabel: string
  upcomingCount: number
  arrivingSoonCount: number
}

function ReservationsHeaderComponent({
  todayLabel,
  upcomingCount,
  arrivingSoonCount,
}: ReservationsHeaderProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-[--color-border] bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.16),_transparent_34%),linear-gradient(135deg,_var(--color-bg-raised),_var(--color-bg-subtle))]">
      <div className="grid gap-6 p-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-[--color-bg-raised]/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[--color-text-sub]">
            <CalendarClock className="h-3.5 w-3.5" />
            Pre-Arrival Pipeline
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
            <p className="max-w-2xl text-sm leading-6 text-[--color-text-sub] sm:text-base">
              Review upcoming stays, confirm pending reservations, and keep the
              pre-arrival queue ready before guests reach the front desk.
            </p>
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl border border-[--color-border] bg-[--color-bg-raised]/85 p-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[--color-text-sub]">
              Today
            </p>
            <p className="mt-1 text-lg font-semibold text-[--color-text]">{todayLabel}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[--color-border] bg-[--color-bg-subtle] p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-[--color-text]">
                <ShieldCheck className="h-4 w-4 text-[--color-warning]" />
                Upcoming
              </div>
              <p className="mt-2 text-2xl font-bold">{upcomingCount}</p>
            </div>
            <div className="rounded-2xl border border-[--color-border] bg-[--color-bg-subtle] p-3">
              <div className="flex items-center gap-2 text-sm font-medium text-[--color-text]">
                <CalendarClock className="h-4 w-4 text-[--color-success]" />
                Arriving Soon
              </div>
              <p className="mt-2 text-2xl font-bold">{arrivingSoonCount}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const ReservationsHeader = memo(ReservationsHeaderComponent)
