import { memo, useCallback, useMemo } from 'react';
import { BedDouble, CalendarDays, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/features/dashboard/components/Badge';
import { DataTable, type Column } from '@/components/shared/DataTable';
import type { IRoomBooking } from '@/interfaces/IRoomBookings';
import { formatCurrency } from '@/lib/utils';
import { ActionsMenu } from './ActionsMenu';

interface BookingsTableProps {
  bookings: IRoomBooking[];
  onDeleteBooking: (booking: IRoomBooking) => void;
  onEditBooking: (booking: IRoomBooking) => void;
}

const statusVariants: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
  'checked-in': 'success',
  confirmed: 'warning',
  pending: 'error',
  'checked-out': 'info',
  cancelled: 'info',
};

function BookingActionsCell({ row, onDeleteBooking, onEditBooking }: {
  row: IRoomBooking;
  onDeleteBooking: (booking: IRoomBooking) => void;
  onEditBooking: (booking: IRoomBooking) => void;
}) {
  const handleDelete = useCallback(() => onDeleteBooking(row), [onDeleteBooking, row]);
  const handleEdit = useCallback(() => onEditBooking(row), [onEditBooking, row]);
  const status = row.status?.name.toLowerCase();
  if (status === 'checked-out' || status === 'cancelled') return <div className="flex justify-end"><ActionsMenu onDelete={handleDelete} /></div>;
  return <div className="flex justify-end"><ActionsMenu onDelete={handleDelete} onEdit={handleEdit} /></div>;
}

function BookingsTableComponent({ bookings, onDeleteBooking, onEditBooking }: BookingsTableProps) {
  const columns = useMemo<Column<IRoomBooking>[]>(() => [
    {
      key: 'guest',
      header: 'Guest',
      cell: (row) => <Link to={'/booking-history/room/' + row.id} className="flex items-center gap-3 rounded-lg hover:text-[var(--color-text-gold)]">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[--color-bg-inset]"><User className="size-4 text-[--color-text-sub]" /></span>
        <span className="min-w-0"><span className="block truncate font-medium">{row.guest ? row.guest.first_name + ' ' + row.guest.last_name : 'Unknown guest'}</span><span className="block truncate text-xs text-[--color-text-muted]">{row.guest?.email || row.guest?.phone || 'Open booking details'}</span></span>
      </Link>,
    },
    {
      key: 'room',
      header: 'Room',
      cell: (row) => <Link to={'/booking-history/room/' + row.id} className="flex items-center gap-3 rounded-lg hover:text-[var(--color-text-gold)]">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[--color-bg-inset]"><BedDouble className="size-4 text-[--color-text-sub]" /></span>
        <span className="min-w-0"><span className="block truncate font-medium">{row.room?.title || 'Unknown room'}</span><span className="block truncate text-xs text-[--color-text-muted]">{row.room?.room_type?.name || 'View stay details'}</span></span>
      </Link>,
    },
    {
      key: 'dates',
      header: 'Dates',
      cell: (row) => <Link to={'/booking-history/room/' + row.id} className="block text-sm hover:underline">
        <span className="flex items-center gap-2"><CalendarDays className="size-3 text-[--color-text-muted]" />{row.check_in}</span>
        <span className="pl-5 text-xs text-[--color-text-muted]">to {row.check_out}</span>
      </Link>,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => {
        const statusLabel = row.status?.label || row.status?.name || 'Unknown';
        const key = row.status?.name.toLowerCase() ?? statusLabel.toLowerCase().replace(/\s+/g, '-');
        return <Badge variant={statusVariants[key] || 'info'}>{statusLabel}</Badge>;
      },
    },
    { key: 'total', header: 'Total', cell: (row) => <span className="font-semibold">{formatCurrency(row.total_price)}</span> },
    {
      key: 'actions',
      header: '',
      cell: (row) => <BookingActionsCell row={row} onDeleteBooking={onDeleteBooking} onEditBooking={onEditBooking} />,
      className: 'w-12',
    },
  ], [onDeleteBooking, onEditBooking]);

  return <DataTable data={bookings} columns={columns} emptyMessage="No bookings found" />;
}

export const BookingsTable = memo(BookingsTableComponent);