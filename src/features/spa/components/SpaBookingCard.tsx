import type { ISpaBookings } from '@/interfaces/ISpa';
import { SpaStatusPill } from './SpaStatusPill';
import { timeNormalization } from '@/utils/dates';

const SpaBookingCard = ({ booking }: { booking: ISpaBookings }) => {
  return (
    <div key={booking.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-[var(--color-text)]">{typeof booking.customer_id !== 'string' && booking.customer_id.full_name}</p>
          <p className="mt-1 text-sm text-[var(--color-text-sub)]">{booking.service_id?.name || booking.package_id?.name}</p>
        </div>
        <SpaStatusPill label={booking.status} />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <span className="text-[var(--color-text-sub)]">Therapist</span>
        <span className="text-right text-[var(--color-text)]">{booking.therapist_id.full_name}</span>
        <span className="text-[var(--color-text-sub)]">Slot</span>
        <span className="text-right text-[var(--color-text)]">{timeNormalization(booking.start_time)}</span>
        <span className="text-[var(--color-text-sub)]">Total</span>
        <span className="text-right font-semibold text-[var(--color-text-gold)]">{booking.total_price}</span>
      </div>
    </div>
  );
};

export default SpaBookingCard;
