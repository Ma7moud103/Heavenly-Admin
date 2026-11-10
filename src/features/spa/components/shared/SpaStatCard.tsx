import type { LucideIcon } from 'lucide-react';
import { memo } from 'react';

interface IProps {
  icon: LucideIcon;
  title: string;
  value: number | string;
  note: string;
  isLoading?: boolean;
}

const SpaStatCard = ({ icon: Icon, title, value, note, isLoading = false }: IProps) => {
  if (isLoading) {
    return <LoadingStatCard />;
  }

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(180deg,_var(--color-bg-raised),_var(--color-bg-subtle))] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-text-sub)]">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-text)]">{value}</p>
          <p className="mt-2 text-sm text-[var(--color-text-sub)]">{note}</p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white/60 text-[var(--color-text-gold)] shadow-sm">
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
};

function LoadingStatCard() {
  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(180deg,_var(--color-bg-raised),_var(--color-bg-subtle))] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="h-4 w-24 rounded bg-[var(--color-bg-subtle)]" />
          <p className="mt-2 h-8 w-32 rounded bg-[var(--color-bg-subtle)]" />
          <p className="mt-2 h-4 w-20 rounded bg-[var(--color-bg-subtle)]" />
        </div>
        <div className="flex size-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-white/60 text-[var(--color-text-gold)] shadow-sm">
          <div className="h-5 w-5 animate-pulse rounded bg-[var(--color-bg-subtle)]" />
        </div>
      </div>
    </div>
  );
}

export default memo(SpaStatCard);
