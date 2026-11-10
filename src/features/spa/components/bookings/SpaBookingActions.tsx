import { Button } from '@/components/ui/button';
import BookingWindow from '@/features/spa/modals/bookings/BookingWindow';
import { UseDeleteSpaBooking } from '@/hooks/spa/bookings/UseSpaBookingActions';
import type { IBookingData, ISpaBookings } from '@/interfaces/ISpa';
import { toast } from 'react-toastify';
import { Pencil, Trash2 } from 'lucide-react';

export function SpaBookingActions({ booking }: { booking: ISpaBookings }) {
  const { mutateAsync: deleteBooking, isPending } = UseDeleteSpaBooking();
  const startsAt = new Date(String(booking.booking_date).slice(0, 10) + 'T' + booking.start_time);
  const canManage = startsAt.getTime() > Date.now() && !['completed', 'cancelled', 'no_show'].includes(booking.status);
  if (!canManage) return <span className="text-xs text-[var(--color-text-muted)]">Locked after start</span>;
  const initialValues: IBookingData = {
    booking_date: String(booking.booking_date).slice(0, 10),
    customer_id: typeof booking.customer_id === 'string' ? booking.customer_id : booking.customer_id.id,
    therapist_id: typeof booking.therapist_id === 'string' ? booking.therapist_id : booking.therapist_id.id,
    service_id: typeof booking.service_id === 'object' && booking.service_id ? booking.service_id.id : null,
    package_id: typeof booking.package_id === 'object' && booking.package_id ? booking.package_id.id : null,
    start_time: String(booking.start_time).slice(0, 5),
    end_time: String(booking.end_time).slice(0, 5),
    total_price: Number(booking.total_price),
    status: booking.status as IBookingData['status'],
    notes: booking.notes ?? '',
  };
  return <div className="flex items-center justify-end gap-2">
    <BookingWindow initialValues={initialValues} booking={booking}><Button type="button" variant="outline" size="sm" aria-label="Edit booking"><Pencil className="mr-1 size-3.5"/>Edit</Button></BookingWindow>
    <Button type="button" variant="ghost" size="sm" disabled={isPending} aria-label="Delete booking" onClick={async () => {
      if (!window.confirm('Delete this upcoming booking?')) return;
      try { await deleteBooking(booking.id); toast.success('Booking deleted.'); }
      catch (error) { toast.error(error instanceof Error ? error.message : 'Unable to delete booking.'); }
    }}><Trash2 className="mr-1 size-3.5"/>Delete</Button>
  </div>;
}

