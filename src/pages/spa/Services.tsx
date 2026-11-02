import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaHeader } from '@/features/spa/components/SpaHeader';
import UseSpaServices from '@/hooks/spa/services/UseSpaServices';
import { SpaPackagesSkeleton } from '@/features/spa/components/packages/SpaPackagesSkeleton';
import SpaService from '@/features/spa/components/services/SpaService';
import { Button } from '@/components/ui/button';
import ServiceModels from '@/features/spa/components/services/Models';
import { useService } from '@/stores/spa/Services.store';
import UseSpaBookingLocks from '@/hooks/spa/bookings/UseSpaBookingLocks';

export default function SpaServicesPage() {
  const { data: spaServices, isLoading, isError } = UseSpaServices();
  const bookingLocks = UseSpaBookingLocks();
  const lockMessage = bookingLocks.isLoading
    ? 'Checking booking history…'
    : bookingLocks.isError
      ? 'Booking history is unavailable; editing and deleting are disabled.'
      : 'This service has booking history and is protected.';
  const { setOpenAddService } = useService();
  return (
    <SpaHeader
      eyebrow="Spa Services"
      title="Manage single spa services."
      description="Each service belongs to a category and has its own duration, price, and description."
      actions={
        <Button
          onClick={() => setOpenAddService(true)}
          className=" inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-(--color-text-gold)  p-5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          Create New Service
        </Button>
      }
    >
      <SpaSectionCard title="Services list" description="Manage spa services and their category, duration, and price.">
        <div className="overflow-hidden rounded-[1.75rem] border border-(--color-border) bg-(--color-bg-subtle)">
          <div className="hidden grid-cols-[1.5fr_0.7fr_0.7fr_0.7fr_auto] gap-4 border-b border-(--color-border) px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-(--color-text-sub) sm:grid">
            <span>Service</span>
            <span>Category</span>
            <span>Duration</span>
            <span>Price</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="hidden divide-y divide-(--color-border) sm:block">
            {isLoading ? (
              <SpaPackagesSkeleton />
            ) : isError ? (
              <div className="flex items-center justify-center py-10 text-sm font-medium text-(--color-text-sub)">Error loading services.</div>
            ) : spaServices && spaServices.length > 0 ? (
              spaServices.map((service) => (
                <SpaService
                  key={service.id}
                  service={service}
                  locked={bookingLocks.isLoading || bookingLocks.isError || Boolean(bookingLocks.data?.serviceIds.has(service.id))}
                  lockMessage={lockMessage}
                />
              ))
            ) : (
              <div className="flex items-center justify-center py-10 text-sm font-medium text-(--color-text-sub)">No services found.</div>
            )}
          </div>
          <div className="space-y-3 p-4 sm:hidden">
            {isLoading ? (
              <SpaPackagesSkeleton />
            ) : isError ? (
              <div className="py-8 text-center text-sm font-medium text-(--color-text-sub)">Error loading services.</div>
            ) : spaServices && spaServices.length > 0 ? (
              spaServices.map((service) => (
                <SpaService
                  key={service.id}
                  service={service}
                  locked={bookingLocks.isLoading || bookingLocks.isError || Boolean(bookingLocks.data?.serviceIds.has(service.id))}
                  lockMessage={lockMessage}
                />
              ))
            ) : (
              <div className="py-8 text-center text-sm font-medium text-(--color-text-sub)">No services found.</div>
            )}
          </div>
        </div>
      </SpaSectionCard>
      <ServiceModels />
    </SpaHeader>
  );
}
