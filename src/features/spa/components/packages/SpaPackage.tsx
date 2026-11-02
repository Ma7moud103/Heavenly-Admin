import { Gift, LockKeyhole, PencilLine, Trash2 } from 'lucide-react';
import { SpaStatusPill } from '../SpaStatusPill';
import { Checkbox } from '@/components/ui/checkbox';
import { useUpdateSpaPackageStatus } from '@/hooks/spa/packages/useUpdateSpaPackageStatus';
import { toast } from 'react-toastify';
import type { ISpaPackages } from '@/interfaces/ISpa';

interface SpaPackageProps {
  packageItem: ISpaPackages;
  locked: boolean;
  lockMessage: string;
  onEdit: (item: ISpaPackages) => void;
  onDelete: (item: ISpaPackages) => void;
}

interface IPackageActionsProps {
  item: ISpaPackages;
  locked: boolean;
  lockMessage: string;
  onEdit: (item: ISpaPackages) => void;
  onDelete: (item: ISpaPackages) => void;
}

const PackageActions = ({ item, locked, lockMessage, onEdit, onDelete }: IPackageActionsProps) => (
  <div className="flex items-center justify-end gap-1">
    {locked ? (
      <span title={lockMessage} className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
        <LockKeyhole className="size-4" />
        Protected
      </span>
    ) : (
      <>
        <button
          type="button"
          onClick={() => onEdit(item)}
          title="Edit package"
          aria-label={`Edit ${item.name}`}
          className="rounded-lg p-2 text-[var(--color-text-sub)] transition-colors hover:bg-amber-50 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <PencilLine className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(item)}
          title="Delete package"
          aria-label={`Delete ${item.name}`}
          className="rounded-lg p-2 text-[var(--color-error)] transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Trash2 className="size-4" />
        </button>
      </>
    )}
  </div>
);

const SpaPackage = ({ packageItem, locked, lockMessage, onEdit, onDelete }: SpaPackageProps) => {
  const services = packageItem.services ?? [];
  const updateStatus = useUpdateSpaPackageStatus();
  const handleStatusChange = async (checked: boolean | 'indeterminate') => {
    if (checked === 'indeterminate') return;
    try {
      await updateStatus.mutateAsync({ id: packageItem.id, isActive: checked });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not update package status.');
    }
  };
  const statusControl = (
    <label className="inline-flex items-center gap-2 text-sm font-medium">
      <Checkbox checked={packageItem.is_active} onCheckedChange={handleStatusChange} disabled={updateStatus.isPending} aria-label={packageItem.is_active ? `Deactivate ${packageItem.name}` : `Activate ${packageItem.name}`} />
      <span className={packageItem.is_active ? 'text-emerald-700' : 'text-[var(--color-text-sub)]'}>{packageItem.is_active ? 'Active' : 'Inactive'}</span>
    </label>
  );
  return (
    <>
      <div className="hidden grid-cols-[1.15fr_1.4fr_0.85fr_1.35fr_0.7fr_0.7fr_auto] items-center gap-4 px-5 py-4 sm:grid">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Gift className="size-4 shrink-0 text-[var(--color-text-gold)]" />
            <p className="truncate font-semibold text-[var(--color-text)]">{packageItem.name}</p>
          </div>
        </div>
        <p className="line-clamp-2 text-sm leading-5 text-[var(--color-text-sub)]">{packageItem.description}</p>
        <SpaStatusPill label={packageItem.category_id?.name ?? 'Uncategorized'} />
        <div className="flex flex-wrap gap-1.5">
          {services.length ? (
            services.map((service) => <SpaStatusPill key={service.id} label={service.name} />)
          ) : (
            <span className="text-xs text-[var(--color-text-sub)]">No services</span>
          )}
        </div>
        <p className="font-semibold text-[var(--color-text-gold)]">{packageItem.price}</p>
        {statusControl}
        <PackageActions item={packageItem} locked={locked} lockMessage={lockMessage} onEdit={onEdit} onDelete={onDelete} />
      </div>
      <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 sm:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Gift className="size-4 shrink-0 text-[var(--color-text-gold)]" />
              <h3 className="font-semibold text-[var(--color-text)]">{packageItem.name}</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-sub)]">{packageItem.description}</p>
            {locked && <p className="mt-2 text-xs font-medium text-amber-800">{lockMessage}</p>}
          </div>
          <PackageActions item={packageItem} locked={locked} lockMessage={lockMessage} onEdit={onEdit} onDelete={onDelete} />
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs text-[var(--color-text-sub)]">Category</dt>
            <dd className="mt-1">
              <SpaStatusPill label={packageItem.category_id?.name ?? 'Uncategorized'} />
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--color-text-sub)]">Status</dt>
            <dd className="mt-1">
              {statusControl}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--color-text-sub)]">Price</dt>
            <dd className="mt-1 font-semibold text-[var(--color-text-gold)]">{packageItem.price}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-xs text-[var(--color-text-sub)]">Included services</dt>
            <dd className="mt-1 flex flex-wrap gap-1.5">
              {services.length ? services.map((service) => <SpaStatusPill key={service.id} label={service.name} />) : 'No services'}
            </dd>
          </div>
        </dl>
      </article>
    </>
  );
};

export default SpaPackage;
