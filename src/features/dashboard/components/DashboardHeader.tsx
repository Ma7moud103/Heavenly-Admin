interface DashboardHeaderProps {
  lastUpdated: string
}

export function DashboardHeader({ lastUpdated }: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-[--color-text-sub]">
          Welcome back! Here&apos;s what&apos;s happening at Heavenly Hotel.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-[--color-text-sub]">
          Last updated: {lastUpdated}
        </span>
      </div>
    </header>
  )
}
