import { Skeleton } from "@/components/ui/skeleton"

export function RoomsStatsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="card flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <div className="flex items-end justify-between gap-3">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function RoomsTableSectionSkeleton() {
  return (
    <section className="card">
      <div className="flex flex-col gap-4 border-b border-[--color-border] p-4 sm:flex-row">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>

      <div className="hidden min-h-[22rem] overflow-x-auto md:block">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 border-b border-[--color-border] px-4 py-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>

        <div className="space-y-0 px-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] items-center gap-4 border-b border-[--color-border-subtle] py-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-4 w-16" />
              <div className="flex justify-end">
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 p-3 md:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-[--color-border] bg-[--color-bg-subtle] p-4 shadow-sm"
          >
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, fieldIndex) => (
                <div
                  key={fieldIndex}
                  className="flex items-start justify-between gap-4 border-b border-[--color-border-subtle] pb-3 last:border-b-0 last:pb-0"
                >
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
