import type { LucideIcon } from 'lucide-react';

export function SpaStatCard({
  icon: Icon,
  title,
  value,
  note,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  note: string;
}) {
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
}
