import { memo, useCallback, useMemo } from "react"
import { BedDouble, CalendarDays, User } from "lucide-react"
import { BookingActionsMenu } from "@/features/bookings/components/BookingActionsMenu"
import { Badge } from "@/features/dashboard/components/Badge"
import { DataTable, type Column } from "@/features/dashboard/components/DataTable"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"
import { formatCurrency } from "@/lib/utils"

const statusVariants: Record<string, "success" | "warning" | "error" | "info"> = {
  "checked-in": "success",
  confirmed: "warning",
  reserved: "warning",
  pending: "error",
  "checked-out": "info",
}

const BookingGuestCell = memo(function BookingGuestCell({ row }: { row: IRoomBooking }) {
  const guestName = row.guest
    ? `${row.guest.first_name} ${row.guest.last_name}`
    : "Unknown"
  const guestMeta = row.guest?.email || row.guest?.phone || "No guest contact"

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[--color-bg-inset]">
        <User className="h-4 w-4 text-[--color-text-sub]" />
      </div>
      <div className="min-w-0">
        <div className="truncate font-medium">{guestName}</div>
        <div className="truncate text-xs text-[--color-text-muted]">{guestMeta}</div>
      </div>
    </div>
  )
})

const BookingRoomCell = memo(function BookingRoomCell({ row }: { row: IRoomBooking }) {
  return (
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
  )
})

const BookingDatesCell = memo(function BookingDatesCell({ row }: { row: IRoomBooking }) {
  return (
    <div className="text-sm">
      <div className="flex items-center gap-2">
        <CalendarDays className="h-3 w-3 text-[--color-text-muted]" />
        <span>{row.check_in}</span>
      </div>
      <div className="text-xs text-[--color-text-muted]">to {row.check_out}</div>
    </div>
  )
})

const BookingStatusCell = memo(function BookingStatusCell({ row }: { row: IRoomBooking }) {
  const statusLabel = row.status?.label || row.status?.name || "Unknown"
  const statusKey = statusLabel.toLowerCase().replace(/\s+/g, "-")
  const variant = statusVariants[statusKey] || "info"

  return <Badge variant={variant}>{statusLabel}</Badge>
})

const BookingTotalCell = memo(function BookingTotalCell({ row }: { row: IRoomBooking }) {
  return <span className="font-semibold">{formatCurrency(row.total_price)}</span>
})

const BookingActionsCell = memo(function BookingActionsCell({
  row,
  onDeleteBooking,
  onEditBooking,
}: {
  row: IRoomBooking
  onDeleteBooking: (booking: IRoomBooking) => void
  onEditBooking: (booking: IRoomBooking) => void
}) {
  const handleDelete = useCallback(() => onDeleteBooking(row), [onDeleteBooking, row])
  const handleEdit = useCallback(() => onEditBooking(row), [onEditBooking, row])

  return (
    <div className="flex justify-end">
      <BookingActionsMenu onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  )
})

interface BookingsTableProps {
  bookings: IRoomBooking[]
  onDeleteBooking: (booking: IRoomBooking) => void
  onEditBooking: (booking: IRoomBooking) => void
}

function BookingsTableComponent({
  bookings,
  onDeleteBooking,
  onEditBooking,
}: BookingsTableProps) {
  const columns = useMemo<Column<IRoomBooking>[]>(
    () => [
      {
        key: "guest",
        header: "Guest",
        cell: (row) => <BookingGuestCell row={row} />,
      },
      {
        key: "room",
        header: "Room",
        cell: (row) => <BookingRoomCell row={row} />,
      },
      {
        key: "dates",
        header: "Dates",
        cell: (row) => <BookingDatesCell row={row} />,
      },
      {
        key: "status",
        header: "Status",
        cell: (row) => <BookingStatusCell row={row} />,
      },
      {
        key: "total",
        header: "Total",
        cell: (row) => <BookingTotalCell row={row} />,
      },
      {
        key: "actions",
        header: "",
        cell: (row) => (
          <BookingActionsCell
            row={row}
            onDeleteBooking={onDeleteBooking}
            onEditBooking={onEditBooking}
          />
        ),
        className: "w-12",
      },
    ],
    [onDeleteBooking, onEditBooking]
  )

  return (
    <DataTable data={bookings} columns={columns} emptyMessage="No bookings found" />
  )
}

export const BookingsTable = memo(BookingsTableComponent)
