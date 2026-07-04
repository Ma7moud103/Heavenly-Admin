import { Scissors } from 'lucide-react';
import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { SpaHeader } from '@/features/spa/components/SpaHeader';
import UseSpaServices from '@/hooks/spa/UseSpaServices';
import { SpaPackagesSkeleton } from '@/features/spa/components/SpaPackagesSkeleton';
import SpaService from '@/features/spa/components/SpaService';

export default function SpaServicesPage() {
  const { data: spaServices, isLoading, isError } = UseSpaServices();
  return (
    <SpaHeader
      eyebrow="Spa Services"
      title="Manage single spa services."
      description="Each service belongs to a category and has its own duration, price, and description."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Services list" description="Static service cards ready for future create, edit, delete, and view actions.">
        <div className="overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
          <div className="hidden grid-cols-[1.5fr_0.7fr_0.7fr_0.7fr] gap-4 border-b border-[var(--color-border)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-sub)] sm:grid">
            <span>Service</span>
            <span>Category</span>
            <span>Duration</span>
            <span>Price</span>
          </div>
          <div className="hidden divide-y divide-[var(--color-border)] sm:block">
            {isLoading ? (
              <SpaPackagesSkeleton />
            ) : isError ? (
              <div className="flex items-center justify-center py-10 text-sm font-medium text-[var(--color-text-sub)]">Error loading services.</div>
            ) : spaServices && spaServices.length > 0 ? (
              spaServices.map((service) => <SpaService key={service.id} service={service} />)
            ) : (
              <div className="flex items-center justify-center py-10 text-sm font-medium text-[var(--color-text-sub)]">No services found.</div>
            )}
          </div>
          <div className="space-y-3 p-4 sm:hidden">
            {isLoading ? (
              <SpaPackagesSkeleton />
            ) : isError ? (
              <div className="py-8 text-center text-sm font-medium text-[var(--color-text-sub)]">Error loading services.</div>
            ) : spaServices && spaServices.length > 0 ? (
              spaServices.map((service) => <SpaService key={service.id} service={service} />)
            ) : (
              <div className="py-8 text-center text-sm font-medium text-[var(--color-text-sub)]">No services found.</div>
            )}
          </div>
        </div>
      </SpaSectionCard>
    </SpaHeader>
  );
}
