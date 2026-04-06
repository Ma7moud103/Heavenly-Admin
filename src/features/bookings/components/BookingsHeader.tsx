import { memo, type ReactNode } from "react"

interface BookingsHeaderProps {
  children?: ReactNode
}

function BookingsHeaderComponent({ children }: BookingsHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
        <p className="text-[--color-text-sub]">
          Manage hotel reservations and bookings
        </p>
      </div>
      {children}
    </div>
  )
}

export const BookingsHeader = memo(BookingsHeaderComponent)
