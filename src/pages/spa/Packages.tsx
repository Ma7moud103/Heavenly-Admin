import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DeleteItem } from '@/components/shared/Delete';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaHeader } from '@/features/spa/components/SpaHeader';
import { SpaPackagesSkeleton } from '@/features/spa/components/SpaPackagesSkeleton';
import SpaPackage from '@/features/spa/components/SpaPackage';
import PackageWindow from '@/features/spa/modals/PackageWindow';
import { UseSpaPackages } from '@/hooks/spa/UseSpaPackages';
import UseSpaBookingLocks from '@/hooks/spa/UseSpaBookingLocks';
import { useDeleteSpaPackage } from '@/hooks/spa/useDeleteSpaPackage';
import type { ISpaPackages } from '@/interfaces/ISpa';
import { toast } from 'react-toastify';

export default function SpaPackagesPage() {
  const { data: packages, isLoading, isError, error } = UseSpaPackages();
  const bookingLocks = UseSpaBookingLocks();
  const deletePackage = useDeleteSpaPackage();
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ISpaPackages>();
  const mode = selectedPackage && isPackageOpen ? 'edit' : 'create';

  const openEdit = (item: ISpaPackages) => {
    setSelectedPackage(item);
    setIsPackageOpen(true);
  };
  const openDelete = (item: ISpaPackages) => {
    setSelectedPackage(item);
    setIsDeleteOpen(true);
  };
  const handlePackageOpenChange = (open: boolean) => {
    setIsPackageOpen(open);
    if (!open) setSelectedPackage(undefined);
  };
  const handleDelete = async () => {
    if (!selectedPackage) return;
    try {
      await deletePackage.mutateAsync(selectedPackage.id);
      toast.success('Package deleted successfully.');
      setIsDeleteOpen(false);
      setSelectedPackage(undefined);
    } catch (deleteError) {
      toast.error(deleteError instanceof Error ? deleteError.message : 'Could not delete package.');
    }
  };

  const lockMessage = bookingLocks.isLoading
    ? 'Checking booking history. Editing and deleting are temporarily disabled.'
    : bookingLocks.isError
      ? 'Booking history could not be checked. Editing and deleting are disabled for safety.'
      : 'This package has booking history and cannot be edited or deleted.';

  return (
    <SpaHeader
      eyebrow="Spa Packages"
      title="Package collections with fixed prices."
      description="Packages are collections of services with their own final price for the booking flow."
      actions={<Button onClick={() => { setSelectedPackage(undefined); setIsPackageOpen(true); }} className="inline-flex w-full items-center justify-center rounded-xl bg-(--color-text-gold) px-5 py-3 text-sm font-semibold text-white sm:w-auto">Create New Package</Button>}
    >
      <SpaSectionCard title="Packages" description="Each package shows its category, included services, price, status, and booking protection.">
        <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)]">
          <div className="hidden grid-cols-[1.15fr_1.4fr_0.85fr_1.35fr_0.7fr_0.7fr_auto] gap-4 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-sub)] sm:grid">
            <span>Package</span><span>Description</span><span>Category</span><span>Included services</span><span>Price</span><span>Status</span><span className="text-right">Actions</span>
          </div>
          {isLoading ? <div className="p-4"><SpaPackagesSkeleton /></div> : isError ? (
            <p className="p-6 text-sm text-[var(--color-error)]">Failed to load packages{error instanceof Error ? `: ${error.message}` : '.'}</p>
          ) : packages?.length ? (
            <div className="divide-y divide-[var(--color-border)]">
              {packages.map((item) => {
                const lockCheckFailed = bookingLocks.isLoading || bookingLocks.isError;
                const locked = lockCheckFailed || Boolean(bookingLocks.data?.packageIds.has(item.id));
                return <SpaPackage key={item.id} packageItem={item} locked={locked} lockMessage={lockMessage} onEdit={openEdit} onDelete={openDelete} />;
              })}
            </div>
          ) : <p className="p-6 text-sm text-[var(--color-text-sub)]">No packages available.</p>}
        </div>
      </SpaSectionCard>
      <PackageWindow mode={mode} open={isPackageOpen} onOpenChange={handlePackageOpenChange} packageItem={selectedPackage} />
      <DeleteItem open={isDeleteOpen} onOpenChange={(open) => { setIsDeleteOpen(open); if (!open) setSelectedPackage(undefined); }} onConfirm={handleDelete} isDeleting={deletePackage.isPending} itemName={selectedPackage?.name} title="Delete package?" description="This package will be removed from the catalog. Packages with booking history are protected and cannot be deleted." />
    </SpaHeader>
  );
}