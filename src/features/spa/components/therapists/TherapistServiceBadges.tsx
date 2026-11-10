import type { TherapistService } from '@/interfaces/ISpa';

interface Props {
  services: TherapistService[];
  limit?: number;
  className?: string;
}

export default function TherapistServiceBadges({ services, limit = 3, className = '' }: Props) {
  if (!services.length) return <span className="text-xs text-muted-foreground">No services</span>;

  const visibleServices = services.slice(0, limit);
  const remaining = services.length - visibleServices.length;

  return (
    <div className={'flex flex-wrap items-center gap-1.5 ' + className}>
      {visibleServices.map((service) => (
        <span key={service.id} className="inline-flex max-w-full truncate rounded-full border border-(--color-border) bg-(--color-bg-subtle) px-2 py-0.5 text-xs">
          {service.name}
        </span>
      ))}
      {remaining > 0 && <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">+{remaining}</span>}
    </div>
  );
}
