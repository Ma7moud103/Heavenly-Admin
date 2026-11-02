import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import UseGuests from '@/hooks/UseGuests';
import UseRoomBookings from '@/hooks/rooms&bookings/UseRoomBookings';
import UseSpaBookings from '@/hooks/spa/bookings/UseSpaBookings';
import RoomBookingCard from '@/features/spa/guests/RoomBookingCard';
import SpaBookingCard from '@/features/spa/components/bookings/SpaBookingCard';

export default function GuestBookingHistory() {
  const { guestId, kind } = useParams<{ guestId: string; kind: string }>();
  const id = Number(guestId);
  const { data: guests = [], isLoading: guestsLoading } = UseGuests();
  const { data: roomBookings = [], isLoading: roomsLoading } = UseRoomBookings();
  const { data: spaBookings = [], isLoading: spaLoading } = UseSpaBookings();

  const guest = guests.find((item) => item.id === id);
  const roomHistory = kind === 'room' ? roomBookings.filter((booking) => booking.guest_id === id) : [];
  const email = guest?.email?.trim().toLowerCase();
  const spaHistory =
    kind === 'spa' && email
      ? spaBookings.filter((booking) => typeof booking.customer_id !== 'string' && booking.customer_id.email?.trim().toLowerCase() === email)
      : [];
  const loading = guestsLoading || roomsLoading || spaLoading;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <Link to="/guests" className="inline-flex items-center gap-2 text-sm font-medium text-(--color-text-sub) hover:text-(--color-text)">
        <ArrowLeft className="size-4" />
        Back to guests
      </Link>
      {loading ? (
        <p className="rounded-2xl border p-10 text-center text-sm text-(--color-text-sub)">Loading booking history…</p>
      ) : !guest || (kind !== 'room' && kind !== 'spa') ? (
        <p className="rounded-2xl border p-10 text-center">Guest or booking type not found.</p>
      ) : (
        <>
          <header className="rounded-3xl borderbg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.19),transparent_35%),linear-gradient(135deg,var(--color-bg-raised),var(--color-bg-subtle))] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--color-text-gold)">
              {kind === 'room' ? 'Room booking history' : 'Spa booking history'}
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              {guest.first_name} {guest.last_name}
            </h1>
            <p className="mt-2 text-(--color-text-sub)">
              {kind === 'room'
                ? `${roomHistory.length} room booking${roomHistory.length === 1 ? '' : 's'}`
                : `${spaHistory.length} spa booking${spaHistory.length === 1 ? '' : 's'}`}
            </p>
          </header>
          <section className="flex flex-col gap-4">
            {kind === 'room' ? (
              roomHistory.length ? (
                roomHistory.map((booking) => <RoomBookingCard key={booking.id} booking={booking} />)
              ) : (
                <p className="rounded-2xl border p-10 text-center text-sm text-(--color-text-sub)">No room bookings found for this guest.</p>
              )
            ) : spaHistory.length ? (
              spaHistory.map((booking) => <SpaBookingCard key={booking.id} booking={booking} />)
            ) : (
              <p className="rounded-2xl border p-10 text-center text-sm text-(--color-text-sub)">No matching spa bookings found for this guest.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
