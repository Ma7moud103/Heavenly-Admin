import { Scissors } from 'lucide-react';
import { SpaStatusPill } from './SpaStatusPill';
import type { ISpaServices } from '@/interfaces/ISpa';

const SpaService = ({ service }: { service: ISpaServices }) => {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-5 sm:py-4">
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1.5fr_0.7fr_0.7fr_0.7fr] sm:gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Scissors className="size-4 text-[var(--color-text-gold)]" />
            <p className="font-semibold text-[var(--color-text)]">{service.name}</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-sub)]">{service.description}</p>
        </div>
        <div className="sm:self-start">
          <SpaStatusPill label={service.category_id?.name || 'No Category'} />
        </div>
        <div className="flex items-center justify-between text-sm sm:block sm:justify-start sm:font-medium sm:text-[var(--color-text)]">
          <span className="text-[var(--color-text-sub)] sm:hidden">Duration</span>
          <span>{service.duration}</span>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold text-[var(--color-text-gold)] sm:block sm:text-[var(--color-text-gold)]">
          <span className="text-[var(--color-text-sub)] sm:hidden">Price</span>
          <span>{service.price}</span>
        </div>
      </div>
    </div>
  );
};

export default SpaService;
