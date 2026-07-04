import { Gift } from 'lucide-react';
import { SpaStatusPill } from './SpaStatusPill';

interface SpaPackageProps {
  name: string;
  description: string;
  price: number;
  services?: Array<{
    id: string;
    name: string;
  }>;
}

const SpaPackage = ({ name, description, price, services = [] }: SpaPackageProps) => {
  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(248,250,252,0.92))] p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Gift className="size-4 text-[var(--color-text-gold)]" />
            <h3 className="text-lg font-semibold text-[var(--color-text)]">{name}</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-sub)]">{description}</p>
        </div>
        <div className="w-full rounded-2xl bg-[var(--color-text-gold)] px-4 py-2 text-center text-white sm:w-auto sm:text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-90">Fixed price</p>
          <p className="text-xl font-semibold">{price}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {services.map((service) => (
          <SpaStatusPill key={service.id} label={service.name} />
        ))}
      </div>
    </div>
  );
};

export default SpaPackage;
