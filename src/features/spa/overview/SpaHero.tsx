import { CalendarDays, WandSparkles } from 'lucide-react';
import BookingWindow from '../modals/BookingWindow';
import PackageWindow from '../modals/PackageWindow';
import type { IBookingData, ICreatePackage } from '@/interfaces/ISpa';
const bookingDefaultValues: IBookingData = {
  booking_date: '',
  customer_id: '',
  end_time: '',
  notes: '',
  package_id: null,
  service_id: null,
  start_time: '',
  status: null,
  therapist_id: '',
  total_price: 0,
};

const packageDefaultValues: ICreatePackage = {
  category_id: '',
  description: '',
  is_active: false,
  name: '',
  price: null,
};
const SpaHero = () => {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(135deg,_var(--color-bg-raised),_var(--color-bg-subtle))]">
      <div className="space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text-sub)]">Spa Overview</p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl md:text-5xl">
            Manage spa operations from one central workspace.
          </h1>
          <p className="max-w-3xl text-base leading-7 text-[var(--color-text-sub)]">
            The spa is organized around categories, services, packages, therapists, customers, and bookings with dynamic time-slot planning.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <BookingWindow initialValues={bookingDefaultValues}>
            <button
              type="button"
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-text-gold)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              <CalendarDays className="size-4" />
              New Booking
            </button>
          </BookingWindow>

          <PackageWindow initialValues={packageDefaultValues}>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-white/70 px-5 py-3 text-sm font-semibold text-[var(--color-text)] backdrop-blur transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              <WandSparkles className="size-4 text-[var(--color-text-gold)]" />
              Build Package
            </button>
          </PackageWindow>
        </div>
      </div>
    </section>
  );
};

export default SpaHero;
