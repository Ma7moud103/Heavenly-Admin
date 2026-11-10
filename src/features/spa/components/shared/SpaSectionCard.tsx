import type { ReactNode } from 'react';

export function SpaSectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-4 shadow-sm sm:p-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--color-text)] sm:text-2xl">{title}</h2>
        <p className="max-w-2xl text-sm leading-6 text-[var(--color-text-sub)]">{description}</p>
      </div>
      {children}
    </section>
  );
}
