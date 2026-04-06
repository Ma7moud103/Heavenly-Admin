import { memo } from "react"

function CheckinHeaderComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Check-in/out</h1>
      <p className="text-[--color-text-sub]">
        Track today&apos;s arrivals and departures and complete desk actions quickly.
      </p>
    </div>
  )
}

export const CheckinHeader = memo(CheckinHeaderComponent)
