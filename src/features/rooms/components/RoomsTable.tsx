import { memo, useCallback, useMemo, useState } from 'react';
import { Badge } from '@/features/dashboard/components/Badge';
import { DataTable, type Column } from '@/features/dashboard/components/DataTable';
import { RoomActionsMenu } from '@/features/rooms/components/RoomActionsMenu';
import type { IRoom } from '@/interfaces/IRooms';
import RoomIdentityCell from './RoomIdentityCell';
import RoomDetails from './RoomDetails';

const statusVariants: Record<string, 'success' | 'warning' | 'error' | 'purple'> = {
  available: 'success',
  occupied: 'error',
  reserved: 'warning',
  maintenance: 'purple',
};

interface RoomsTableProps {
  rooms: IRoom[];
  onDeleteRoom: (room: IRoom) => void;
  onEditRoom: (room: IRoom) => void;
}

const RoomTypeCell = memo(function RoomTypeCell({ row }: { row: IRoom }) {
  return <span className="font-medium">{row.room_type?.name || row.title || '-'}</span>;
});

const RoomStatusCell = memo(function RoomStatusCell({ row }: { row: IRoom }) {
  const statusLabel = row.status?.label || row.status?.name || 'Unknown';
  const statusKey = statusLabel.toLowerCase();
  const variant = statusVariants[statusKey] || 'purple';

  return <Badge variant={variant}>{statusLabel}</Badge>;
});

const RoomRateCell = memo(function RoomRateCell({ row }: { row: IRoom }) {
  return (
    <span className="font-medium">
      ${row.base_price}
      <span className="text-xs text-[--color-text-muted]">/night</span>
    </span>
  );
});

const RoomActionsCell = memo(function RoomActionsCell({
  row,
  onDeleteRoom,
  onEditRoom,
}: {
  row: IRoom;
  onDeleteRoom: (room: IRoom) => void;
  onEditRoom: (room: IRoom) => void;
}) {
  const handleDelete = useCallback(() => onDeleteRoom(row), [onDeleteRoom, row]);
  const handleEdit = useCallback(() => onEditRoom(row), [onEditRoom, row]);

  return (
    <div className="flex justify-end">
      <RoomActionsMenu onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
});

function RoomsTableComponent({ rooms, onDeleteRoom, onEditRoom }: RoomsTableProps) {
  const [selectedRoomId, setselectedRoomId] = useState<string | null>(null);

  const columns = useMemo<Column<IRoom>[]>(
    () => [
      {
        key: 'id',
        header: 'Room',
        cell: (row) => <RoomIdentityCell setSelectedRoomId={setselectedRoomId} row={row} />,
      },
      {
        key: 'type',
        header: 'Type',
        cell: (row) => <RoomTypeCell row={row} />,
      },
      {
        key: 'status',
        header: 'Status',
        cell: (row) => <RoomStatusCell row={row} />,
      },
      {
        key: 'price',
        header: 'Price',
        cell: (row) => <RoomRateCell row={row} />,
      },
      {
        key: 'actions',
        header: '',
        cell: (row) => <RoomActionsCell row={row} onDeleteRoom={onDeleteRoom} onEditRoom={onEditRoom} />,
        className: 'w-12',
      },
    ],
    [onDeleteRoom, onEditRoom],
  );

  return (
    <>
      <DataTable data={rooms} columns={columns} emptyMessage="No rooms found" />;
      <RoomDetails setSelectedRoomId={setselectedRoomId} selectedRoomId={selectedRoomId} />
    </>
  );
}

export const RoomsTable = memo(RoomsTableComponent);
