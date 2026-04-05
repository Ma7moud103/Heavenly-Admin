import { memo, useCallback, useMemo } from "react"
import { BedDouble, Layers } from "lucide-react"
import { Badge } from "@/features/dashboard/components/Badge"
import { DataTable, type Column } from "@/features/dashboard/components/DataTable"
import { RoomActionsMenu } from "@/features/rooms/components/RoomActionsMenu"
import type { IRoom } from "@/interfaces/IRooms"

const statusVariants: Record<string, "success" | "warning" | "error" | "purple"> = {
  available: "success",
  occupied: "error",
  reserved: "warning",
  maintenance: "purple",
}

interface RoomsTableProps {
  rooms: IRoom[]
  onDeleteRoom: (room: IRoom) => void
  onEditRoom: (room: IRoom) => void
}

const RoomIdentityCell = memo(function RoomIdentityCell({ row }: { row: IRoom }) {
  return (
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
      <div className="min-w-0">
        <div className="truncate font-semibold">{row.title || row.id}</div>
        <div className="flex items-center gap-1 text-xs text-[--color-text-muted]">
          <Layers className="h-3 w-3" /> Capacity {row.capacity}
        </div>
      </div>
    </div>
  )
})

const RoomTypeCell = memo(function RoomTypeCell({ row }: { row: IRoom }) {
  return <span className="font-medium">{row.room_type?.name || row.title || "-"}</span>
})

const RoomStatusCell = memo(function RoomStatusCell({ row }: { row: IRoom }) {
  const statusLabel = row.status?.label || row.status?.name || "Unknown"
  const statusKey = statusLabel.toLowerCase()
  const variant = statusVariants[statusKey] || "purple"

  return <Badge variant={variant}>{statusLabel}</Badge>
})

const RoomRateCell = memo(function RoomRateCell({ row }: { row: IRoom }) {
  return (
    <span className="font-medium">
      ${row.base_price}
      <span className="text-xs text-[--color-text-muted]">/night</span>
    </span>
  )
})

const RoomActionsCell = memo(function RoomActionsCell({
  row,
  onDeleteRoom,
  onEditRoom,
}: {
  row: IRoom
  onDeleteRoom: (room: IRoom) => void
  onEditRoom: (room: IRoom) => void
  })
{
  const handleDelete = useCallback(() => onDeleteRoom(row), [onDeleteRoom, row])
  const handleEdit = useCallback(() => onEditRoom(row), [onEditRoom, row])

  return (
    <div className="flex justify-end">
      <RoomActionsMenu onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  )
})

function RoomsTableComponent({ rooms, onDeleteRoom, onEditRoom }: RoomsTableProps) {
  const columns = useMemo<Column<IRoom>[]>(
    () => [
      {
        key: "id",
        header: "Room",
        cell: (row) => <RoomIdentityCell row={row} />,
      },
      {
        key: "type",
        header: "Type",
        cell: (row) => <RoomTypeCell row={row} />,
      },
      {
        key: "status",
        header: "Status",
        cell: (row) => <RoomStatusCell row={row} />,
      },
      {
        key: "price",
        header: "Rate",
        cell: (row) => <RoomRateCell row={row} />,
      },
      {
        key: "actions",
        header: "",
        cell: (row) => (
          <RoomActionsCell
            row={row}
            onDeleteRoom={onDeleteRoom}
            onEditRoom={onEditRoom}
          />
        ),
        className: "w-12",
      },
    ],
    [onDeleteRoom, onEditRoom]
  )

  return <DataTable data={rooms} columns={columns} emptyMessage="No rooms found" />
}

export const RoomsTable = memo(RoomsTableComponent)
