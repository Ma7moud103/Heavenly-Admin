export function SpaTableHeader({ columns }: { columns: string[] }) {
  return (
    <div className={`grid gap-4 border-b border-[var(--color-border)] px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-sub)]`} style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
      {columns.map((column) => (
        <span key={column}>{column}</span>
      ))}
    </div>
  );
}
