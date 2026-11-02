import type { IRoomBooking } from '@/interfaces/IRoomBookings';
import { Link } from 'react-router-dom';
import Info from './Info';
import { CalendarDays, CreditCard, DoorOpen } from 'lucide-react';

export default function RoomBookingCard({ booking }: { booking: IRoomBooking }) {
  return (
    <article className="rounded-2xl border bg-[var(--color-bg-raised)] p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">Room booking · {booking.id.slice(0, 8)}</p>
          <h2 className="mt-1 text-lg font-semibold">{booking.room?.title ?? 'Room reservation'}</h2>
        </div>
        <span className="rounded-full border px-3 py-1 text-xs font-medium">{booking.status?.label ?? booking.status?.name ?? 'Unknown status'}</span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Info icon={DoorOpen} label="Room" value={booking.room?.title} />
        <Info icon={CalendarDays} label="Check in" value={booking.check_in} />
        <Info icon={CalendarDays} label="Check out" value={booking.check_out} />
        <Info icon={CreditCard} label="Total" value={booking.total_price} />
      </div>
      <Link
        className="mt-5 inline-flex text-sm font-semibold text-[var(--color-text-gold)] hover:underline"
        to={`/booking-history/room/${booking.id}`}
      >
        Open full booking details →
      </Link>
    </article>
  );
}
