import type { ReactNode } from 'react';

interface SpaHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function SpaHeader({ eyebrow, title, description, actions, children }: SpaHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(135deg,_var(--color-bg-raised),_var(--color-bg-subtle))]">
        <div className="space-y-6 px-6 py-8 lg:px-8">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text-sub)]">{eyebrow}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text)] md:text-5xl">{title}</h1>
            <p className="max-w-3xl text-base leading-7 text-[var(--color-text-sub)]">{description}</p>
          </div>

          {actions ? <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
        </div>
      </section>

      {children}
    </div>
  );
}
