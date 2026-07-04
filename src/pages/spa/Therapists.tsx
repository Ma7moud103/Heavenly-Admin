import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaHeader } from '@/features/spa/components/SpaHeader';
import UseSpaTherapists from '@/hooks/spa/UseSpaTherapists';
import SpaTherapist from '@/features/spa/components/SpaTherapist';
import { SpaPackagesSkeleton } from '@/features/spa/components/SpaPackagesSkeleton';

export default function SpaTherapistsPage() {
  const { data: spaTherapists, isLoading, isError } = UseSpaTherapists();
  return (
    <SpaHeader
      eyebrow="Spa Therapists"
      title="Therapist roster and availability."
      description="Therapists are selected during booking. Their availability can be managed later."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Therapists" description="Static roster cards for later CRUD handling.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {isLoading ? (
            <SpaPackagesSkeleton />
          ) : isError ? (
            <div className="col-span-full flex items-center justify-center py-10 text-sm font-medium text-[var(--color-text-sub)]">
              Error loading therapists.
            </div>
          ) : spaTherapists && spaTherapists.length > 0 ? (
            spaTherapists.map((therapist) => <SpaTherapist key={therapist.id} therapist={therapist} />)
          ) : (
            <div className="col-span-full flex items-center justify-center py-10 text-sm font-medium text-[var(--color-text-sub)]">
              No therapists found.
            </div>
          )}
        </div>
      </SpaSectionCard>
    </SpaHeader>
  );
}
