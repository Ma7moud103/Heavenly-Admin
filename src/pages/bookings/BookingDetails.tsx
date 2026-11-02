import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock3, DoorOpen, Sparkles, UserRound, Mail, Phone, Hash, BedDouble } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import UseRoomBookings from '@/hooks/rooms&bookings/UseRoomBookings';
import UseSpaBookings from '@/hooks/spa/bookings/UseSpaBookings';
import { timeNormalization } from '@/utils/dates';

function dateLabel(value?: string) {
  if (!value) return 'Not provided';
  const date = new Date(value.slice(0, 10) + 'T12:00:00');
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
function money(value?: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value ?? 0));
}
function DetailItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value?: string | number | null }) {
  return (
    <div className="flex gap-3 rounded-xl bg-[var(--color-bg-subtle)] p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-[var(--color-text-gold)] shadow-sm">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{label}</p>
        <p className="mt-1 break-words font-medium text-[var(--color-text)]">{value || 'Not provided'}</p>
      </div>
    </div>
  );
}

export default function BookingDetails() {
  const { kind, bookingId } = useParams<{ kind: string; bookingId: string }>();
  const roomQuery = UseRoomBookings();
  const spaQuery = UseSpaBookings();
  const isSpa = kind === 'spa';
  const room = isSpa ? undefined : roomQuery.data?.find((item) => item.id === bookingId);
  const spa = isSpa ? spaQuery.data?.find((item) => item.id === bookingId) : undefined;
  const loading = isSpa ? spaQuery.isLoading : roomQuery.isLoading;
  const guestName = isSpa
    ? typeof spa?.customer_id === 'string'
      ? 'Guest'
      : spa?.customer_id.full_name
    : ((room?.guest?.first_name ?? '') + ' ' + (room?.guest?.last_name ?? '')).trim() || 'Guest';
  const treatment = spa?.service_id?.name ?? spa?.package_id?.name;
  const title = isSpa ? (treatment ?? 'Spa appointment') : (room?.room?.title ?? 'Room reservation');
  const status = isSpa ? spa?.status?.replace('_', ' ') : (room?.status?.label ?? room?.status?.name);
  const backPath = isSpa ? '/spa/bookings' : '/bookings';
  const email = isSpa ? (typeof spa?.customer_id === 'string' ? '' : spa?.customer_id.email) : room?.guest?.email;
  const phone = isSpa ? (typeof spa?.customer_id === 'string' ? '' : spa?.customer_id.phone) : room?.guest?.phone;

  if (loading)
    return (
      <div className="mx-auto w-full max-w-5xl rounded-3xl border bg-[var(--color-bg-raised)] p-12 text-center text-[var(--color-text-sub)]">
        Loading booking details…
      </div>
    );
  if ((!room && !spa) || (kind !== 'room' && kind !== 'spa'))
    return (
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <Link to={backPath} className="inline-flex items-center gap-2 text-sm hover:underline">
          <ArrowLeft className="size-4" />
          Back to bookings
        </Link>
        <div className="rounded-3xl border p-12 text-center">Booking not found.</div>
      </div>
    );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <Link
        to={backPath}
        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--color-text-sub)] hover:text-[var(--color-text)]"
      >
        <ArrowLeft className="size-4" />
        Back to {isSpa ? 'spa bookings' : 'room bookings'}
      </Link>
      <header className="relative isolate overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[linear-gradient(125deg,#17211d_0%,#243a32_52%,#67532e_100%)] p-6 text-white shadow-xl sm:p-9">
        <div className="absolute -right-10 -top-20 -z-10 size-72 rounded-full border-[36px] border-white/5" />
        <div className="absolute -bottom-24 right-1/4 -z-10 size-56 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/65">
              <span className="grid size-8 place-items-center rounded-lg bg-white/10">
                {isSpa ? <Sparkles className="size-4" /> : <BedDouble className="size-4" />}
              </span>
              {isSpa ? 'Spa experience' : 'Room reservation'} · {bookingId?.slice(0, 8)}
            </div>
            <h1 style={{ color: 'white' }} className="mt-5 text-3xl font-semibold text-amber-50 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-white/70">A complete overview of this guest booking.</p>
          </div>
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold capitalize backdrop-blur">{status}</span>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/15 pt-5">
          <span className="grid size-11 place-items-center rounded-full bg-white/15 text-lg font-semibold">{guestName?.trim().charAt(0) || 'G'}</span>
          <div>
            <p className="font-semibold">{guestName}</p>
            <p className="text-sm text-white/60">{isSpa ? 'Spa guest' : 'Hotel guest'}</p>
          </div>
        </div>
      </header>
      <div className="grid gap-5 lg:grid-cols-[1.45fr_0.75fr]">
        <section className="rounded-3xl border bg-[var(--color-bg-raised)] p-5 sm:p-7">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-gold)]">Booking itinerary</p>
            <h2 className="mt-1 text-xl font-semibold">Your reservation details</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {isSpa ? (
              <>
                <DetailItem icon={Sparkles} label="Treatment" value={treatment} />
                <DetailItem icon={UserRound} label="Therapist" value={spa?.therapist_id?.full_name} />
                <DetailItem icon={CalendarDays} label="Date" value={dateLabel(String(spa?.booking_date ?? ''))} />
                <DetailItem
                  icon={Clock3}
                  label="Appointment time"
                  value={timeNormalization(spa!.start_time) + ' – ' + timeNormalization(spa!.end_time)}
                />
              </>
            ) : (
              <>
                <DetailItem icon={DoorOpen} label="Room" value={room?.room?.title} />
                <DetailItem icon={BedDouble} label="Room type" value={room?.room?.room_type?.name} />
                <DetailItem icon={CalendarDays} label="Check-in" value={dateLabel(room?.check_in)} />
                <DetailItem icon={CalendarDays} label="Check-out" value={dateLabel(room?.check_out)} />
              </>
            )}
          </div>
          {isSpa && spa?.notes ? (
            <div className="mt-4 rounded-2xl border border-dashed p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-(--color-text-muted)">Guest notes</p>
              <p className="mt-2 text-sm leading-6">{spa.notes}</p>
            </div>
          ) : null}
        </section>
        <aside className="flex flex-col gap-5">
          <section className="rounded-3xl border bg-[var(--color-bg-raised)] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-gold)]">Guest contact</p>
            <h2 className="mt-1 text-lg font-semibold">{guestName}</h2>
            <div className="mt-4 space-y-3 text-sm">
              <p className="flex items-center gap-2 text-[var(--color-text-sub)]">
                <Mail className="size-4" />
                {email || 'No email on file'}
              </p>
              <p className="flex items-center gap-2 text-[var(--color-text-sub)]">
                <Phone className="size-4" />
                {phone || 'No phone on file'}
              </p>
            </div>
          </section>
          <section className="overflow-hidden rounded-3xl border border-emerald-950 bg-emerald-950 p-5 text-white shadow-lg sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/70">Payment summary</p>
            <p className="mt-5 text-4xl font-semibold">{money(isSpa ? spa?.total_price : room?.total_price)}</p>
            <p className="mt-1 text-sm text-emerald-100/60">Total booking amount</p>
            <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4 text-sm">
              <span className="text-emerald-100/70">Reference</span>
              <span className="inline-flex items-center gap-1 font-mono">
                <Hash className="size-3" />
                {bookingId?.slice(0, 8).toUpperCase()}
              </span>
            </div>
          </section>
          <DetailItem
            icon={CalendarDays}
            label="Created at"
            value={
              (isSpa ? spa?.created_at : room?.created_at) ? new Date((isSpa ? spa?.created_at : room?.created_at)!).toLocaleString() : 'Not provided'
            }
          />
        </aside>
      </div>
    </div>
  );
}
