import { useState } from "react"
import { Search, Filter, Plus, MoreHorizontal, CalendarDays, User } from "lucide-react"
import { StatCard } from "@/features/dashboard/components/StatCard"
import { DataTable } from "@/features/dashboard/components/DataTable"
import { Badge } from "@/features/dashboard/components/Badge"
import UseRoomBookings from "@/hooks/UseRoomBookings"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount)
}

const statusVariants: Record<string, "success" | "warning" | "error" | "info"> = {
  "checked-in": "success",
  reserved: "warning",
  pending: "error",
  "checked-out": "info",
}

export default function Bookings() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { data: bookings } = UseRoomBookings()
  const bookingsData = bookings ?? []

  const statusOptions = Array.from(
    new Set(
      bookingsData
        .map((booking) => booking.status?.label || booking.status?.name)
        .filter((name): name is string => Boolean(name))
    )
  )

  const filteredBookings = bookingsData.filter((booking) => {
    const term = searchTerm.trim().toLowerCase()
    const guestMatch = (booking.guest?.full_name || "").toLowerCase().includes(term)
    const roomTitleMatch = (booking.room?.title || "").toLowerCase().includes(term)
    const roomTypeMatch = (booking.room?.room_type?.name || "")
      .toLowerCase()
      .includes(term)
    const matchesSearch =
      term.length === 0 || guestMatch || roomTitleMatch || roomTypeMatch

    const statusLabel = (booking.status?.label || booking.status?.name || "").toLowerCase()
    const matchesStatus = statusFilter === "all" || statusLabel === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    {
      key: "id",
      header: "Booking ID",
      cell: (row: IRoomBooking) => (
        <span className="font-mono text-sm">{row.id}</span>
      ),
    },
    {
      key: "guest",
      header: "Guest",
      cell: (row: IRoomBooking) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[--color-bg-inset] flex items-center justify-center">
            <User className="w-4 h-4 text-[--color-text-sub]" />
          </div>
          <div>
            <div className="font-medium">{row.guest?.full_name || "Unknown"}</div>
            <div className="text-xs text-[--color-text-muted]">
              {row.room?.title || "—"} • {row.room?.room_type?.name || "—"}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "dates",
      header: "Dates",
      cell: (row: IRoomBooking) => (
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-3 h-3 text-[--color-text-muted]" />
            <span>{row.check_in}</span>
          </div>
          <div className="text-xs text-[--color-text-muted]">to {row.check_out}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: IRoomBooking) => {
        const statusLabel = row.status?.label || row.status?.name || "Unknown"
        const statusKey = statusLabel.toLowerCase().replace(/\s+/g, "-")
        const variant = statusVariants[statusKey] || "info"
        return <Badge variant={variant}>{statusLabel}</Badge>
      },
    },
    {
      key: "total",
      header: "Total",
      cell: (row: IRoomBooking) => (
        <span className="font-semibold">{formatCurrency(row.total_price)}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: () => (
        <button className="p-2 hover:bg-[--color-bg-subtle] rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4 text-[--color-text-muted]" />
        </button>
      ),
      className: "w-10",
    },
  ]

  const checkedIn = bookingsData.filter(
    (b) => (b.status?.label || b.status?.name || "").toLowerCase() === "checked-in"
  ).length
  const reserved = bookingsData.filter(
    (b) => (b.status?.label || b.status?.name || "").toLowerCase() === "reserved"
  ).length
  const pending = bookingsData.filter(
    (b) => (b.status?.label || b.status?.name || "").toLowerCase() === "pending"
  ).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="text-[--color-text-sub]">Manage hotel reservations and bookings</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          New Booking
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Bookings"
          value={bookingsData.length}
          icon={<CalendarDays className="w-5 h-5" />}
        />
        <StatCard
          title="Checked In"
          value={checkedIn}
          variant="success"
          icon={<CalendarDays className="w-5 h-5" />}
        />
        <StatCard
          title="Reserved"
          value={reserved}
          variant="warning"
          icon={<CalendarDays className="w-5 h-5" />}
        />
        <StatCard
          title="Pending"
          value={pending}
          variant="error"
          icon={<CalendarDays className="w-5 h-5" />}
        />
      </div>

      <div className="card">
        <div className="p-4 border-b border-[--color-border] flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[--color-text-muted]" />
            <input
              type="text"
              placeholder="Search bookings by guest, room, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input w-auto"
            >
              <option value="all">All Status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status.toLowerCase()}>
                  {status}
                </option>
              ))}
            </select>
            <button className="btn btn-ghost">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
        <DataTable
          data={filteredBookings}
          columns={columns}
          emptyMessage="No bookings found"
        />
      </div>
    </div>
  )
}

