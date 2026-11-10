export function SpaStatusPill({ label }: { label?: string }) {
  return (
    <span className="inline-flex max-w-full items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-center text-xs font-semibold text-[var(--color-text-sub)]">
      {label}
    </span>
  );
}
