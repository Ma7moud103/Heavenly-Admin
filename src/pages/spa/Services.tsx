import { Scissors } from 'lucide-react';
import { SpaSectionCard } from '@/features/spa/components/shared/SpaSectionCard';
import { SpaHeader } from '@/features/spa/components/shared/SpaHeader';
import UseSpaServices from '@/hooks/spa/services/UseSpaServices';
import { SpaPackagesSkeleton } from '@/features/spa/components/packages/SpaPackagesSkeleton';
import { Button } from '@/components/ui/button';
import ServiceModels from '@/features/spa/components/services/Models';
import { useService } from '@/stores/spa/Services.store';
import UseSpaBookingLocks from '@/hooks/spa/bookings/UseSpaBookingLocks';
import { DataTable, type Column } from '@/components/shared/DataTable';
import { SpaStatusPill } from '@/features/spa/components/shared/SpaStatusPill';
import ServiceActions from '@/features/spa/components/services/ServiceActions';
import type { ISpaServices } from '@/interfaces/ISpa';

export default function SpaServicesPage() {
  const { data: spaServices = [], isLoading, isError } = UseSpaServices();
  const bookingLocks = UseSpaBookingLocks();
  const lockMessage = bookingLocks.isLoading
    ? 'Checking booking history…'
    : bookingLocks.isError
      ? 'Booking history is unavailable; editing and deleting are disabled.'
      : 'This service has booking history and is protected.';
  const { setOpenAddService, setSelectedService, setOpenUpdateService, setOpenDeleteModal } = useService();

  const columns: Column<ISpaServices>[] = [
    {
      key: 'service',
      header: 'Service',
      cell: (service) => <div className="flex min-w-52 items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--color-bg-inset)] text-[var(--color-text-gold)]"><Scissors className="size-4"/></span><div className="min-w-0"><p className="font-semibold">{service.name}</p><p className="mt-1 max-w-md text-xs leading-5 text-[var(--color-text-muted)]">{service.description || 'No description provided'}</p></div></div>,
    },
    { key: 'category', header: 'Category', cell: (service) => <SpaStatusPill label={service.category_id?.name || 'No category'}/> },
    { key: 'duration', header: 'Duration', cell: (service) => <span className="whitespace-nowrap text-sm">{service.duration} min</span> },
    { key: 'price', header: 'Price', cell: (service) => <span className="whitespace-nowrap font-semibold text-[var(--color-text-gold)]">{service.price}</span> },
    {
      key: 'actions',
      header: 'Actions',
      className: 'w-28',
      cell: (service) => {
        const locked = bookingLocks.isLoading || bookingLocks.isError || Boolean(bookingLocks.data?.serviceIds.has(service.id));
        return <ServiceActions locked={locked} lockMessage={lockMessage} onEdit={() => { setSelectedService(service); setOpenUpdateService(true); }} onDelete={() => { setSelectedService(service); setOpenDeleteModal(true); }} />;
      },
    },
  ];

  return (
    <SpaHeader eyebrow="Spa Services" title="Manage spa services." description="Review each treatment’s category, duration, and price in one consistent service table." actions={<Button onClick={() => setOpenAddService(true)} className="w-full rounded-xl bg-[var(--color-text-gold)] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 sm:w-auto">Create new service</Button>}>
      <SpaSectionCard title="Services" description="Service details and management actions.">
        {isLoading ? <SpaPackagesSkeleton/> : isError ? <div className="rounded-2xl border p-10 text-center text-sm text-[var(--color-text-sub)]">Unable to load services.</div> : <DataTable data={spaServices} columns={columns} emptyMessage="No services found."/>}
      </SpaSectionCard>
      <ServiceModels/>
    </SpaHeader>
  );
}