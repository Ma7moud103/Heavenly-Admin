import { useMemo } from "react"
import { CalendarDays, CircleAlert, CircleCheckBig, User } from "lucide-react"
import { Badge } from "@/features/dashboard/components/Badge"
import { DataTable, type Column } from "@/features/dashboard/components/DataTable"
import { daysUntilArrival, getReservationStatusName } from "@/features/reservations/utils"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"
import { formatCurrency } from "@/lib/utils"

const badgeVariants: Record<string, "success" | "warning" | "error" | "info"> = {
  pending: "error",
  confirmed: "warning",
}

interface ReservationsQueuesProps {
  pendingReservations: IRoomBooking[]
  confirmedReservations: IRoomBooking[]
  today: string
  isUpdating: boolean
  onConfirm: (booking: IRoomBooking) => Promise<void>
  onCancel: (booking: IRoomBooking) => Promise<void>
}

function getGuestName(booking: IRoomBooking) {
  return booking.guest
    ? `${booking.guest.first_name} ${booking.guest.last_name}`
    : "Unknown guest"
}

function ReservationTable({
  title,
  description,
  bookings,
  emptyMessage,
  accent,
  primaryAction,
  onCancel,
  isUpdating,
  today,
}: {
  title: string
  description: string
  bookings: IRoomBooking[]
  emptyMessage: string
  accent: "pending" | "confirmed"
  primaryAction?: {
    label: string
    onClick: (booking: IRoomBooking) => Promise<void>
  }
  onCancel: (booking: IRoomBooking) => Promise<void>
  isUpdating: boolean
  today: string
}) {
  const columns = useMemo<Column<IRoomBooking>[]>(
    () => [
      {
        key: "guest",
        header: "Reservation",
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[--color-bg-inset]">
              <User className="h-4 w-4 text-[--color-text-sub]" />
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium">{getGuestName(row)}</div>
              <div className="truncate text-xs text-[--color-text-muted]">
                {row.room?.title || "Unknown room"} | {row.room?.room_type?.name || "Unknown type"}
              </div>
              <div className="truncate text-xs text-[--color-text-muted]">
                {row.guest?.email || row.guest?.phone || "No guest contact"}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "arrival",
        header: "Arrival",
        cell: (row) => {
          const delta = daysUntilArrival(row.check_in, today)
          const arrivalLabel =
            delta === 0 ? "Today" : delta === 1 ? "Tomorrow" : `In ${delta} days`

          return (
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-3 w-3 text-[--color-text-muted]" />
                <span>{row.check_in}</span>
              </div>
              <div className="text-xs text-[--color-text-muted]">{arrivalLabel}</div>
            </div>
          )
        },
      },
      {
        key: "status",
        header: "Status",
        cell: (row) => {
          const statusLabel = row.status?.label || row.status?.name || "Unknown"
          const statusKey = getReservationStatusName(row)
          return <Badge variant={badgeVariants[statusKey] || "default"}>{statusLabel}</Badge>
        },
      },
      {
        key: "total",
        header: "Value",
        cell: (row) => (
          <div className="text-sm">
            <div className="font-semibold">{formatCurrency(row.total_price)}</div>
            <div className="text-xs text-[--color-text-muted]">to {row.check_out}</div>
          </div>
        ),
      },
      {
        key: "actions",
        header: "",
        cell: (row) => (
          <div className="flex justify-end gap-2">
            {primaryAction ? (
              <button
                type="button"
                className="btn btn-primary"
                disabled={isUpdating}
                onClick={async () => {
                  await primaryAction.onClick(row)
                }}
              >
                {primaryAction.label}
              </button>
            ) : null}
            <button
              type="button"
              className="btn btn-ghost text-[--color-error] hover:bg-[--color-error]/10"
              disabled={isUpdating}
              onClick={async () => {
                await onCancel(row)
              }}
            >
              Cancel
            </button>
          </div>
        ),
        className: "w-40",
      },
    ],
    [isUpdating, onCancel, primaryAction, today]
  )

  return (
    <section className="overflow-hidden rounded-3xl border border-[--color-border] bg-[--color-bg-raised] shadow-sm">
      <div
        className={`border-b border-[--color-border] p-5 ${
          accent === "pending"
            ? "bg-[linear-gradient(135deg,rgba(239,68,68,0.12),transparent_60%)]"
            : "bg-[linear-gradient(135deg,rgba(34,197,94,0.10),transparent_60%)]"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {accent === "pending" ? (
                <CircleAlert className="h-5 w-5 text-[--color-error]" />
              ) : (
                <CircleCheckBig className="h-5 w-5 text-[--color-success]" />
              )}
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <p className="mt-1 text-sm text-[--color-text-sub]">{description}</p>
          </div>
          <div className="rounded-2xl border border-[--color-border] bg-[--color-bg-raised]/80 px-3 py-2 text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[--color-text-sub]">
              Queue
            </p>
            <p className="text-2xl font-bold">{bookings.length}</p>
          </div>
        </div>
      </div>
      <DataTable data={bookings} columns={columns} emptyMessage={emptyMessage} />
    </section>
  )
}

export function ReservationsQueues({
  pendingReservations,
  confirmedReservations,
  today,
  isUpdating,
  onConfirm,
  onCancel,
}: ReservationsQueuesProps) {
  const pendingColumns = useMemo(
    () => ({
      label: "Confirm",
      onClick: onConfirm,
    }),
    [onConfirm]
  )

  const confirmedColumns = useMemo(() => undefined, [])

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold">Reservation Queues</h2>
        <p className="text-sm text-[--color-text-sub]">
          Confirm upcoming stays, keep the pipeline healthy, and cancel anything that should no longer hold inventory.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ReservationTable
          title="Pending Queue"
          description="Reservations that still need front desk confirmation before arrival."
          bookings={pendingReservations}
          emptyMessage="No pending reservations right now"
          accent="pending"
          primaryAction={pendingColumns}
          onCancel={onCancel}
          isUpdating={isUpdating}
          today={today}
        />
        <ReservationTable
          title="Confirmed Queue"
          description="Upcoming stays that are confirmed and ready for pre-arrival follow-up."
          bookings={confirmedReservations}
          emptyMessage="No confirmed reservations right now"
          accent="confirmed"
          primaryAction={confirmedColumns}
          onCancel={onCancel}
          isUpdating={isUpdating}
          today={today}
        />
      </div>
    </section>
  )
}
