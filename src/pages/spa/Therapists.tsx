import { Sparkles } from 'lucide-react';
import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaPageShell } from '@/features/spa/components/SpaPageShell';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaStatusPill } from '@/features/spa/components/SpaStatusPill';
import { spaTherapists } from '@/features/spa/data';

export default function SpaTherapistsPage() {
  return (
    <SpaPageShell
      eyebrow="Spa Therapists"
      title="Therapist roster and availability."
      description="Therapists are selected during booking. Their availability can be managed later."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Therapists" description="Static roster cards for later CRUD handling.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {spaTherapists.map((therapist) => (
            <div key={therapist.name} className="rounded-3xl border border-[--color-border] bg-[--color-bg-subtle] p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_rgba(212,175,55,0.18),_rgba(255,255,255,0.9))]">
                  <Sparkles className="size-5 text-[--color-text-gold]" />
                </div>
                <SpaStatusPill label={therapist.status} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[--color-text]">{therapist.name}</h3>
              <p className="mt-1 text-sm text-[--color-text-sub]">{therapist.specialty}</p>
              <p className="mt-4 text-sm text-[--color-text-sub]">{therapist.shift}</p>
            </div>
          ))}
        </div>
      </SpaSectionCard>
    </SpaPageShell>
  );
}
