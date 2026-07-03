import { CalendarCheck2 } from 'lucide-react';
import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaPageShell } from '@/features/spa/components/SpaPageShell';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { spaBookings } from '@/features/spa/data';

export default function SpaBookingsPage() {
  return (
    <SpaPageShell
      eyebrow="Spa Bookings"
      title="Track service and package bookings."
      description="Bookings connect customer, therapist, slot, and service-or-package in one record."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Bookings table" description="Static booking rows prepared for future CRUD operations.">
        <div className="overflow-hidden rounded-[1.75rem] border border-[--color-border] bg-[--color-bg-subtle]">
          <div className="grid grid-cols-[1.2fr_1.1fr_1fr_0.7fr_0.7fr_0.7fr] gap-4 border-b border-[--color-border] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[--color-text-sub]">
            <span>Customer</span>
            <span>Service / Package</span>
            <span>Therapist</span>
            <span>Slot</span>
            <span>Status</span>
            <span>Total</span>
          </div>
          <div className="divide-y divide-[--color-border]">
            {spaBookings.map((booking) => (
              <div key={`${booking.customer}-${booking.slot}`} className="grid grid-cols-[1.2fr_1.1fr_1fr_0.7fr_0.7fr_0.7fr] gap-4 px-5 py-4">
                <div className="flex items-center gap-2">
                  <CalendarCheck2 className="size-4 text-[--color-text-gold]" />
                  <p className="font-semibold text-[--color-text]">{booking.customer}</p>
                </div>
                <div className="text-sm text-[--color-text-sub]">{booking.service}</div>
                <div className="text-sm text-[--color-text-sub]">{booking.therapist}</div>
                <div className="text-sm text-[--color-text]">{booking.slot}</div>
                <SpaStatusPill label={booking.status} />
                <div className="text-sm font-semibold text-[--color-text-gold]">{booking.total}</div>
              </div>
            ))}
          </div>
        </div>
      </SpaSectionCard>
    </SpaPageShell>
  );
}
