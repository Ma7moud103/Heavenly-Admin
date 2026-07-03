export function SpaStatusPill({ label }: { label: string }) {
  return <span className="rounded-full border border-[--color-border] bg-white px-3 py-1 text-xs font-semibold text-[--color-text-sub]">{label}</span>;
}
