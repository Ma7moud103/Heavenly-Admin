import { Gift } from 'lucide-react';
import { SpaStatusPill } from '../SpaStatusPill';
import type { ISpaPackages } from '@/interfaces/ISpa';
import PackageActions from './PackageActions';

interface SpaPackageProps {
  packageItem: ISpaPackages;
  locked: boolean;
  lockMessage: string;
  onEdit: (item: ISpaPackages) => void;
  onDelete: (item: ISpaPackages) => void;
}




const SpaPackage = ({ packageItem, locked, lockMessage, onEdit, onDelete }: SpaPackageProps) => {
  const services = packageItem.services ?? [];
  const status = <SpaStatusPill label={packageItem.is_active ? 'Active' : 'Inactive'} />;
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
        {status}
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
              {status}
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
