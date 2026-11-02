import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Mail, Phone, Search, UserRound } from 'lucide-react';
import { DataTable, type Column } from '@/components/shared/DataTable';
import UseGuests from '@/hooks/UseGuests';
import UseRoomBookings from '@/hooks/rooms&bookings/UseRoomBookings';
import UseSpaBookings from '@/hooks/spa/bookings/UseSpaBookings';
import type { IGuest } from '@/interfaces/IGuest';
import type { ISpaBookings } from '@/interfaces/ISpa';

const getSpaCustomerEmail = (booking: ISpaBookings) =>
  typeof booking.customer_id === 'string' ? '' : (booking.customer_id.email?.trim().toLowerCase() ?? '');

export default function Guests() {
  const [search, setSearch] = useState('');
  const { data: guests = [], isLoading: guestsLoading, isError: guestsError } = UseGuests();
  const { data: roomBookings = [], isLoading: roomsLoading } = UseRoomBookings();
  const { data: spaBookings = [], isLoading: spaLoading } = UseSpaBookings();

  const filteredGuests = guests.filter((guest) =>
    `${guest.first_name} ${guest.last_name} ${guest.email} ${guest.phone}`.toLowerCase().includes(search.toLowerCase()),
  );

  const columns: Column<IGuest>[] = [
    {
      key: 'name',
      header: 'Guest',
      cell: (row) => (
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-[var(--color-bg-inset)]">
            <UserRound className="size-4 text-[var(--color-text-sub)]" />
          </span>
          <div>
            <div className="font-semibold">
              {row.first_name} {row.last_name}
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">Guest ID: {row.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      header: 'Contact',
      cell: (row) => (
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2 text-[var(--color-text-sub)]">
            <Mail className="size-3.5" />
            {row.email || 'No email'}
          </div>
          <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
            <Phone className="size-3.5" />
            {row.phone || 'No phone'}
          </div>
        </div>
      ),
    },
    {
      key: 'roomHistory',
      header: 'Room bookings',
      cell: (row) => {
        const count = roomBookings.reduce((total, booking) => total + (booking.guest_id === row.id ? 1 : 0), 0);
        return count ? (
          <Link
            className="inline-flex min-w-10 items-center justify-center rounded-full border px-3 py-1 text-sm font-semibold hover:bg-[var(--color-bg-subtle)]"
            to={`/guests/${row.id}/bookings/room`}
            aria-label={`${count} room bookings for ${row.first_name} ${row.last_name}`}
          >
            {count}
          </Link>
        ) : (
          <span className="text-sm text-[var(--color-text-muted)]">0</span>
        );
      },
    },
    {
      key: 'spaHistory',
      header: 'Spa bookings',
      cell: (row) => {
        const email = row.email?.trim().toLowerCase() ?? '';
        const count = email ? spaBookings.reduce((total, booking) => total + (getSpaCustomerEmail(booking) === email ? 1 : 0), 0) : 0;
        return count ? (
          <Link
            className="inline-flex min-w-10 items-center justify-center rounded-full border px-3 py-1 text-sm font-semibold hover:bg-[var(--color-bg-subtle)]"
            to={`/guests/${row.id}/bookings/spa`}
            aria-label={`${count} spa bookings for ${row.first_name} ${row.last_name}`}
          >
            {count}
          </Link>
        ) : (
          <span className="text-sm text-[var(--color-text-muted)]">0</span>
        );
      },
    },
    {
      key: 'lastBooking',
      header: 'Last booking',
      cell: (row) => {
        const latest = [
          ...roomBookings
            .filter((booking) => booking.guest_id === row.id)
            .map((b) => ({
              date: new Date(b.check_in ?? '').getTime(),
              label: b.check_in ?? '',
              path: `/booking-history/room/${b.id}`,
            })),
          ...spaBookings
            .filter((booking) => getSpaCustomerEmail(booking) === (row.email?.trim().toLowerCase() ?? ''))
            .map((b) => ({
              date: new Date(`${String(b.booking_date).slice(0, 10)}T${b.start_time}`).getTime(),
              label: String(b.booking_date).slice(0, 10),
              path: `/booking-history/spa/${b.id}`,
            })),
        ].sort((a, b) => b.date - a.date)[0];
        return latest ? (
          <Link className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline" to={latest.path}>
            <CalendarDays className="size-3.5" />
            {latest.label}
          </Link>
        ) : (
          <span className="text-sm text-[var(--color-text-muted)]">No bookings</span>
        );
      },
    },
  ];
  const isLoading = guestsLoading || roomsLoading || spaLoading;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-text-gold)]">Guest directory</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Guests</h1>
          <p className="mt-1 text-[var(--color-text-sub)]">Contact details and booking history across rooms and spa.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border bg-[var(--color-bg-raised)] px-4 py-3">
            <div className="text-[var(--color-text-muted)]">Profiles</div>
            <strong>{guests.length}</strong>
          </div>
          <div className="rounded-xl border bg-[var(--color-bg-raised)] px-4 py-3">
            <div className="text-[var(--color-text-muted)]">Bookings</div>
            <strong>{roomBookings.length + spaBookings.length}</strong>
          </div>
        </div>
      </header>
      <section className="overflow-hidden rounded-2xl border bg-[var(--color-bg-raised)]">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              className="input pl-10"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by guest name, email, or phone"
            />
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">Select a booking to view its full details.</p>
        </div>
        {guestsError ? (
          <p className="p-8 text-center text-sm text-red-600">Unable to load guest profiles from Supabase.</p>
        ) : isLoading ? (
          <p className="p-8 text-center text-sm text-[var(--color-text-sub)]">Loading guest records and booking history…</p>
        ) : (
          <DataTable data={filteredGuests} columns={columns} emptyMessage="No matching guests found." />
        )}
      </section>
    </div>
  );
}
