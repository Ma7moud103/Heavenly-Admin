import { Skeleton } from '@/components/ui/skeleton';

export function SpaPackagesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-3">
              <Skeleton className="h-5 w-44 rounded-full" />
              <Skeleton className="h-4 w-full max-w-72 rounded-full" />
              <div className="flex flex-wrap gap-2 pt-1">
                <Skeleton className="h-7 w-24 rounded-full" />
                <Skeleton className="h-7 w-28 rounded-full" />
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>
            </div>
            <div className="space-y-2 rounded-2xl bg-[var(--color-bg-raised)] px-4 py-3 text-center sm:text-right">
              <Skeleton className="h-3 w-16 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
