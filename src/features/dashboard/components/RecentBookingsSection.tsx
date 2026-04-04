import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Badge } from "@/features/dashboard/components/Badge"
import { BookingsTableSkeleton } from "@/features/dashboard/components/DashboardSkeletons"
import {
  DataTable,
  type Column,
} from "@/features/dashboard/components/DataTable"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"
import { formatCurrency } from "@/lib/utils"

const bookingColumns: Column<IRoomBooking>[] = [
  {
    key: "guest",
    header: "Guest",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.guest?.full_name || "Unknown guest"}</div>
        <div className="text-xs text-[--color-text-muted]">
          {row.room?.title || "Unknown room"} | {row.room?.room_type?.name || "Unknown type"}
        </div>
      </div>
    ),
  },
  {
    key: "checkIn",
    header: "Check-in",
    cell: (row) => (
      <div className="text-sm">
        <div>{row.check_in}</div>
        <div className="text-xs text-[--color-text-muted]">to {row.check_out}</div>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => {
      const variants: Record<string, "success" | "warning" | "error" | "info"> = {
        "checked-in": "success",
        reserved: "warning",
        pending: "error",
        "checked-out": "info",
      }
      const statusLabel = row.status?.label || row.status?.name || "Unknown"
      const statusKey = statusLabel.toLowerCase().replace(/\s+/g, "-")

      return <Badge variant={variants[statusKey] || "info"}>{statusLabel}</Badge>
    },
  },
  {
    key: "total",
    header: "Total",
    cell: (row) => <span className="font-medium">{formatCurrency(row.total_price)}</span>,
  },
]

interface IProps {
  bookings: IRoomBooking[]
  isLoading: boolean
}

export function RecentBookingsSection({
  bookings,
  isLoading,
}: IProps) {
  return (
    <div className="lg:col-span-2">
      <div className="card">
        <div className="flex items-center justify-between border-b border-[--color-border] p-5">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
          <Link
            to="/bookings"
            className="flex items-center gap-1 text-sm text-[--color-text-gold] transition-colors hover:text-[--color-text-gold-muted]"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <BookingsTableSkeleton />
        ) : (
          <DataTable
            data={bookings.slice(0, 6)}
            columns={bookingColumns}
            emptyMessage="No bookings found"
          />
        )}
      </div>
    </div>
  )
}
