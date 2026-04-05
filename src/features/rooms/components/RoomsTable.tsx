import { BedDouble, Layers, MoreHorizontal } from "lucide-react"
import { Badge } from "@/features/dashboard/components/Badge"
import { DataTable, type Column } from "@/features/dashboard/components/DataTable"
import type { IRoom } from "@/interfaces/IRooms"

const statusVariants: Record<string, "success" | "warning" | "error" | "purple"> = {
  available: "success",
  occupied: "error",
  reserved: "warning",
  maintenance: "purple",
}

interface RoomsTableProps {
  rooms: IRoom[]
}

const columns: Column<IRoom>[] = [
  {
    key: "id",
    header: "Room",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[--color-bg-inset]">
          {row.image_url ? (
            <img
              src={row.image_url}
              alt={row.title || `Room ${row.id}`}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="40px"
              className="h-full w-full object-cover"
            />
          ) : (
            <BedDouble className="h-5 w-5 text-[--color-text-sub]" />
          )}
        </div>
        <div>
          <div className="font-semibold">{row.title || row.id}</div>
          <div className="flex items-center gap-1 text-xs text-[--color-text-muted]">
            <Layers className="h-3 w-3" /> Capacity {row.capacity}
          </div>
        </div>
      </div>
    ),
  },
  {
    key: "type",
    header: "Type",
    cell: (row) => <span className="font-medium">{row.room_type?.name || row.title || "-"}</span>,
  },
  {
    key: "status",
    header: "Status",
    cell: (row) => {
      const statusLabel = row.status?.label || row.status?.name || "Unknown"
      const statusKey = statusLabel.toLowerCase()
      const variant = statusVariants[statusKey] || "purple"

      return <Badge variant={variant}>{statusLabel}</Badge>
    },
  },
  {
    key: "price",
    header: "Rate",
    cell: (row) => (
      <span className="font-medium">
        ${row.base_price}
        <span className="text-xs text-[--color-text-muted]">/night</span>
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    cell: () => (
      <button className="rounded-lg p-2 transition-colors hover:bg-[--color-bg-subtle]">
        <MoreHorizontal className="h-4 w-4 text-[--color-text-muted]" />
      </button>
    ),
    className: "w-10",
  },
]

export function RoomsTable({ rooms }: RoomsTableProps) {
  return <DataTable data={rooms} columns={columns} emptyMessage="No rooms found" />
}
