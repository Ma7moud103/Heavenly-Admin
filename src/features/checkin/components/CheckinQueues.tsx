import { useMemo } from "react"
import { toast } from "react-toastify"
import { BedDouble, CalendarDays, User } from "lucide-react"
import { Badge } from "@/features/dashboard/components/Badge"
import { DataTable, type Column } from "@/features/dashboard/components/DataTable"
import { getBookingStatusName } from "@/features/checkin/utils"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"
import type { ICreateBookingPayload } from "@/data/createBooking"
import { formatCurrency } from "@/lib/utils"

const badgeVariants: Record<string, "success" | "warning" | "error" | "info"> = {
  pending: "error",
  confirmed: "warning",
  "checked-in": "success",
  "checked-out": "info",
}

interface CheckinQueuesProps {
  arrivals: IRoomBooking[]
  departures: IRoomBooking[]
  canCheckIn: (booking: IRoomBooking) => boolean
  canCheckOut: (booking: IRoomBooking) => boolean
  getActionPayload: (booking: IRoomBooking, statusName: "checked-in" | "checked-out") => {
    bookingId: string
    payload: ICreateBookingPayload
  } | null
  isUpdating: boolean
  onRunAction: (args: { bookingId: string; payload: ICreateBookingPayload }) => Promise<void>
}

function getGuestName(booking: IRoomBooking) {
  return booking.guest
    ? `${booking.guest.first_name} ${booking.guest.last_name}`
    : "Unknown guest"
}

function QueueTable({
  title,
  emptyMessage,
  bookings,
  actionLabel,
  canRunAction,
  getPayload,
  isUpdating,
  onRunAction,
}: {
  title: string
  emptyMessage: string
  bookings: IRoomBooking[]
  actionLabel: "Check In" | "Check Out"
  canRunAction: (booking: IRoomBooking) => boolean
  getPayload: (
    booking: IRoomBooking
  ) => { bookingId: string; payload: ICreateBookingPayload } | null
  isUpdating: boolean
  onRunAction: (args: { bookingId: string; payload: ICreateBookingPayload }) => Promise<void>
}) {
  const columns = useMemo<Column<IRoomBooking>[]>(
    () => [
      {
        key: "guest",
        header: "Guest",
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[--color-bg-inset]">
              <User className="h-4 w-4 text-[--color-text-sub]" />
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium">{getGuestName(row)}</div>
              <div className="truncate text-xs text-[--color-text-muted]">
                {row.guest?.email || row.guest?.phone || "No guest contact"}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "room",
        header: "Room",
        cell: (row) => (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[--color-bg-inset]">
              <BedDouble className="h-4 w-4 text-[--color-text-sub]" />
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium">{row.room?.title || "Unknown room"}</div>
              <div className="truncate text-xs text-[--color-text-muted]">
                {row.room?.room_type?.name || "Unknown type"}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "stay",
        header: "Stay",
        cell: (row) => (
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-3 w-3 text-[--color-text-muted]" />
              <span>{row.check_in}</span>
            </div>
            <div className="text-xs text-[--color-text-muted]">to {row.check_out}</div>
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        cell: (row) => {
          const statusLabel = row.status?.label || row.status?.name || "Unknown"
          const statusKey = getBookingStatusName(row)
          return <Badge variant={badgeVariants[statusKey] || "default"}>{statusLabel}</Badge>
        },
      },
      {
        key: "total",
        header: "Total",
        cell: (row) => <span className="font-semibold">{formatCurrency(row.total_price)}</span>,
      },
      {
        key: "action",
        header: "",
        cell: (row) => {
          const isEnabled = canRunAction(row)

          return (
            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-primary"
                disabled={!isEnabled || isUpdating}
                onClick={async () => {
                  const nextPayload = getPayload(row)

                  if (!nextPayload) {
                    toast.error("This booking cannot be updated right now")
                    return
                  }

                  await onRunAction(nextPayload)
                }}
              >
                {actionLabel}
              </button>
            </div>
          )
        },
        className: "w-28",
      },
    ],
    [actionLabel, canRunAction, getPayload, isUpdating, onRunAction]
  )

  return (
    <section className="card">
      <div className="flex items-center justify-between border-b border-[--color-border] p-5">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-[--color-text-sub]">{emptyMessage}</p>
        </div>
      </div>
      <DataTable data={bookings} columns={columns} emptyMessage={emptyMessage} />
    </section>
  )
}

export function CheckinQueues({
  arrivals,
  departures,
  canCheckIn,
  canCheckOut,
  getActionPayload,
  isUpdating,
  onRunAction,
}: CheckinQueuesProps) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <QueueTable
        title="Arrivals"
        emptyMessage="No arrivals need check-in right now"
        bookings={arrivals}
        actionLabel="Check In"
        canRunAction={canCheckIn}
        getPayload={(booking) => getActionPayload(booking, "checked-in")}
        isUpdating={isUpdating}
        onRunAction={onRunAction}
      />
      <QueueTable
        title="Departures"
        emptyMessage="No departures need check-out right now"
        bookings={departures}
        actionLabel="Check Out"
        canRunAction={canCheckOut}
        getPayload={(booking) => getActionPayload(booking, "checked-out")}
        isUpdating={isUpdating}
        onRunAction={onRunAction}
      />
    </div>
  )
}
