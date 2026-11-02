import type { CalendarDays } from 'lucide-react';

export default function Info({ label, value, icon: Icon }: { label: string; value: string | number | null | undefined; icon: typeof CalendarDays }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Icon className="mt-0.5 size-4 shrink-0 text-[var(--color-text-gold)]" />
      <div>
        <span className="text-[var(--color-text-muted)]">{label}</span>
        <div className="font-medium">{value || 'Not provided'}</div>
      </div>
    </div>
  );
}
