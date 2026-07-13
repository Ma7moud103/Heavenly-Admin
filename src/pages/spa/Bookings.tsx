import { SpaHeader } from '@/features/spa/components/SpaHeader';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';

import UseSpaBookings from '@/hooks/spa/UseSpaBookings';
import SpaBookingTable from '@/features/spa/modals/SpaBookingTable';
import SpaBookingCard from '@/features/spa/modals/SpaBookingCard';
import { SpaPackagesSkeleton } from '@/features/spa/components/SpaPackagesSkeleton';
import BookingWindow from '@/features/spa/modals/BookingWindow';

export default function SpaBookingsPage() {
  const { data: spaBookingsData, isLoading, isError } = UseSpaBookings();
  return (
    <SpaHeader
      eyebrow="Spa Bookings"
      title="Track service and package bookings."
      description="Bookings connect customer, therapist, slot, and service-or-package in one record."
      actions={<BookingWindow />}
    >
      <SpaSectionCard title="Bookings table" description="Static booking rows prepared for future CRUD operations.">
        <div className="overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
          <div className="hidden grid-cols-[1.2fr_1.1fr_1fr_0.7fr_0.7fr_0.7fr] gap-4 border-b border-[var(--color-border)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-sub)] sm:grid">
            <span>Customer</span>
            <span>Service / Package</span>
            <span>Therapist</span>
            <span>Slot</span>
            <span>Status</span>
            <span>Total</span>
          </div>
          <div className="hidden divide-y divide-[var(--color-border)] sm:block">
            {isLoading ? (
              <SpaPackagesSkeleton />
            ) : isError ? (
              <div className="flex items-center justify-center py-10 text-sm font-medium text-[var(--color-text-sub)]">Error loading bookings.</div>
            ) : spaBookingsData && spaBookingsData.length > 0 ? (
              spaBookingsData.map((booking) => <SpaBookingTable booking={booking} key={booking.id} />)
            ) : (
              <div className="flex items-center justify-center py-10 text-sm font-medium text-[var(--color-text-sub)]">No bookings found.</div>
            )}
          </div>
          <div className="space-y-3 p-4 sm:hidden">
            {isLoading ? (
              <SpaPackagesSkeleton />
            ) : isError ? (
              <div className="flex items-center justify-center py-10 text-sm font-medium text-[var(--color-text-sub)]">Error loading bookings.</div>
            ) : spaBookingsData && spaBookingsData.length > 0 ? (
              spaBookingsData.map((booking) => <SpaBookingCard booking={booking} key={booking.id} />)
            ) : (
              <div className="flex items-center justify-center py-10 text-sm font-medium text-[var(--color-text-sub)]">No bookings found.</div>
            )}
          </div>
        </div>
      </SpaSectionCard>
    </SpaHeader>
  );
}
