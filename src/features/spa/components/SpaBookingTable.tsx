import type { ISpaBookings } from '@/interfaces/ISpa';
import { CalendarCheck2 } from 'lucide-react';
import { SpaStatusPill } from './SpaStatusPill';
import { timeNormalization } from '@/utils/dates';

const SpaBookingTable = ({ booking }: { booking: ISpaBookings }) => {
  const bookingServiceOrPackage =
    booking.service_id !== null
      ? booking.service_id.name.split(' ').slice(1).join('').toLowerCase() !== 'service'
        ? `${booking.service_id.name} Service`
        : booking.service_id.name
      : booking.package_id !== null
        ? booking.package_id.name.split(' ').slice(1).join('').toLowerCase() !== 'package'
          ? `${booking.package_id.name} Package`
          : booking.package_id.name
        : '';

  return (
    <div key={booking.id} className="grid grid-cols-[1.2fr_1.1fr_1fr_0.7fr_0.7fr_0.7fr] gap-4 px-5 py-4">
      <div className="flex items-center gap-2">
        <CalendarCheck2 className="size-4 text-[var(--color-text-gold)]" />
        <p className="font-semibold text-[var(--color-text)]">{typeof booking.customer_id !== 'string' && booking.customer_id.full_name}</p>
      </div>
      <div className="text-sm">{bookingServiceOrPackage}</div>
      <div className="text-sm text-[var(--color-text-sub)]">{booking.therapist_id.full_name}</div>
      <div className="text-sm text-[var(--color-text)]">{timeNormalization(booking.start_time)}</div>
      <SpaStatusPill label={booking.status} />
      <div className="text-sm font-semibold text-[var(--color-text-gold)]">{booking.total_price}</div>
    </div>
  );
};

export default SpaBookingTable;
