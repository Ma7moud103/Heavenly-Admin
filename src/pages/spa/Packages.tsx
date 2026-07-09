import { SpaCrudButtons } from '@/features/spa/components/SpaCrudButtons';
import { SpaSectionCard } from '@/features/spa/components/SpaSectionCard';
import { SpaHeader } from '@/features/spa/components/SpaHeader';
import { SpaPackagesSkeleton } from '@/features/spa/components/SpaPackagesSkeleton';
import SpaPackage from '@/features/spa/components/SpaPackage';
import { UseSpaPackages } from '@/hooks/spa/UseSpaPackages';

export default function SpaPackagesPage() {
  const { data: packagesWithItsServices, isLoading, isError, error } = UseSpaPackages();
  return (
    <SpaHeader
      eyebrow="Spa Packages"
      title="Package collections with fixed prices."
      description="Packages are treated as collections of services with their own final price for the booking flow."
      actions={<SpaCrudButtons />}
    >
      <SpaSectionCard title="Package cards" description="A later form can create and update these bundles.">
        {isLoading ? (
          <SpaPackagesSkeleton />
        ) : isError ? (
          <p className="text-sm text-[var(--color-error)]">Failed to load packages{error instanceof Error ? `: ${error.message}` : '.'}</p>
        ) : packagesWithItsServices && packagesWithItsServices.length > 0 ? (
          <div className="space-y-4">
            {packagesWithItsServices.map((pack) => (
              <SpaPackage key={pack.id} name={pack.name} description={pack.description} price={pack.price} services={pack.services} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-[var(--color-text-sub)]">No packages available.</p>
          </div>
        )}
      </SpaSectionCard>
    </SpaHeader>
  );
}
