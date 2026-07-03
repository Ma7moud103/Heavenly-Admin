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
    <section className="space-y-4 rounded-[2rem] border border-[--color-border] bg-[--color-bg-raised] p-6 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-[--color-text]">{title}</h2>
        <p className="max-w-2xl text-sm leading-6 text-[--color-text-sub]">{description}</p>
      </div>
      {children}
    </section>
  );
}
