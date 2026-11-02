import { SpaHeader } from '@/features/spa/components/SpaHeader';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import UseSpaBookings from '@/hooks/spa/bookings/UseSpaBookings';
import { SpaPackagesSkeleton } from '@/features/spa/components/packages/SpaPackagesSkeleton';
import BookingWindow from '@/features/spa/modals/BookingWindow';
import { SpaBookingActions } from '@/features/spa/components/bookings/SpaBookingActions';
import { CalendarPlus, CalendarDays } from 'lucide-react';
import { EStatus, type IBookingData, type ISpaBookings } from '@/interfaces/ISpa';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { timeNormalization } from '@/utils/dates';
import { Link } from 'react-router-dom';

const defaults: IBookingData = { booking_date: '', customer_id: '', end_time: '', notes: '', package_id: null, service_id: null, start_time: '', status: EStatus.Pending, therapist_id: '', total_price: 0 };
const label = (booking: ISpaBookings) => booking.service_id?.name ?? booking.package_id?.name ?? 'Spa booking';
const customer = (booking: ISpaBookings) => typeof booking.customer_id === 'string' ? 'Guest' : booking.customer_id.full_name;

function BookingRow({ booking }: { booking: ISpaBookings }) {
  return <div className="grid grid-cols-[1.1fr_1fr_1fr_0.9fr_0.8fr_0.7fr_auto] items-center gap-3 px-4 py-4 sm:px-5">
    <Link to={'/booking-history/spa/' + booking.id} className="flex min-w-0 items-center gap-2 hover:underline"><CalendarDays className="size-4 shrink-0 text-[var(--color-text-gold)]"/><span className="truncate font-semibold">{customer(booking)}</span></Link>
    <Link to={'/booking-history/spa/' + booking.id} className="truncate text-sm hover:underline">{label(booking)}</Link>
    <span className="truncate text-sm text-[var(--color-text-sub)]">{booking.therapist_id?.full_name ?? '—'}</span>
    <span className="text-sm text-[var(--color-text)]">{String(booking.booking_date).slice(0, 10)} · {timeNormalization(booking.start_time)}</span>
    <SpaStatusPill label={booking.status}/>
    <span className="text-sm font-semibold text-[var(--color-text-gold)]">{booking.total_price}</span>
    <SpaBookingActions booking={booking}/>
  </div>;
}

export default function SpaBookingsPage() {
  const { data: bookings = [], isLoading, isError } = UseSpaBookings();
  return <SpaHeader eyebrow="Spa Bookings" title="Spa appointments" description="Review upcoming treatments, booking details, and customer history across the spa." actions={<BookingWindow initialValues={defaults}><button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-text-gold)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"><CalendarPlus className="size-4"/>Add booking</button></BookingWindow>}>
    <SpaSectionCard title="Bookings" description="Upcoming bookings can be changed before their scheduled start time.">
      <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
        <div className="grid min-w-[980px] grid-cols-[1.1fr_1fr_1fr_0.9fr_0.8fr_0.7fr_auto] gap-3 border-b px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-sub)] sm:px-5"><span>Guest</span><span>Treatment</span><span>Therapist</span><span>Date · time</span><span>Status</span><span>Total</span><span>Actions</span></div>
        <div className="min-w-[980px] divide-y divide-[var(--color-border)]">{isLoading ? <SpaPackagesSkeleton/> : isError ? <p className="p-10 text-center text-sm text-red-600">Unable to load spa bookings.</p> : bookings.length ? bookings.map((booking) => <BookingRow key={booking.id} booking={booking}/>) : <p className="p-10 text-center text-sm text-[var(--color-text-sub)]">No bookings yet. Add your first spa appointment.</p>}</div>
      </div>
    </SpaSectionCard>
  </SpaHeader>;
}

