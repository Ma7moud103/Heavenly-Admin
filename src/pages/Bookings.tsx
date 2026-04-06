import { memo, useMemo } from "react"
import { BookingsHeader } from "@/features/bookings/components/BookingsHeader"
import { BookingsStatsGrid } from "@/features/bookings/components/BookingsStatsGrid"
import { BookingsTableSection } from "@/features/bookings/components/BookingsTableSection"
import { CreateBookingAction } from "@/features/bookings/components/CreateBookingAction"
import UseRoomBookings from "@/hooks/UseRoomBookings"
import UseRooms from "@/hooks/UseRooms"

function Bookings() {
  const { data: bookings = [], isFetching: isFetchingBookings } = UseRoomBookings()
  const { data: rooms = [] } = UseRooms()

  const bookingStatuses = useMemo(
    () =>
      Array.from(
        new Map(
          bookings
            .map((booking) => booking.status)
            .filter((status): status is NonNullable<(typeof bookings)[number]["status"]> => Boolean(status))
            .map((status) => [status.id, status])
        ).values()
      ),
    [bookings]
  )

  const guests = useMemo(
    () =>
      Array.from(
        new Map(
          bookings
            .map((booking) => booking.guest)
            .filter((guest): guest is NonNullable<(typeof bookings)[number]["guest"]> => Boolean(guest))
            .map((guest) => [guest.id, guest])
        ).values()
      ),
    [bookings]
  )

  const bookingStats = useMemo(() => {
    return bookings.reduce(
      (stats, booking) => {
        const status = (booking.status?.label || booking.status?.name || "").toLowerCase()

        if (status === "checked-in") {
          stats.checkedInCount += 1
        }

        if (status === "confirmed" || status === "reserved") {
          stats.reservedCount += 1
        }

        if (status === "pending") {
          stats.pendingCount += 1
        }

        return stats
      },
      {
        totalBookings: bookings.length,
        checkedInCount: 0,
        reservedCount: 0,
        pendingCount: 0,
      }
    )
  }, [bookings])

  return (
    <div className="flex flex-col gap-6">
      <BookingsHeader>
        <CreateBookingAction rooms={rooms} guests={guests} statuses={bookingStatuses} />
      </BookingsHeader>

      <BookingsStatsGrid
        totalBookings={bookingStats.totalBookings}
        checkedInCount={bookingStats.checkedInCount}
        reservedCount={bookingStats.reservedCount}
        pendingCount={bookingStats.pendingCount}
        isLoading={isFetchingBookings}
      />

      <BookingsTableSection
        bookings={bookings}
        bookingStatuses={bookingStatuses}
        guests={guests}
        rooms={rooms}
        isLoading={isFetchingBookings}
      />
    </div>
  )
}

export default memo(Bookings)
