import { memo, useMemo } from "react"
import { BookingsHeader } from "@/features/bookings/components/BookingsHeader"
import { BookingsStatsGrid } from "@/features/bookings/components/BookingsStatsGrid"
import { BookingsTableSection } from "@/features/bookings/components/BookingsTableSection"
import { CreateBookingAction } from "@/features/bookings/components/CreateBookingAction"
import UseRoomBookings from "@/hooks/UseRoomBookings"
import UseRooms from "@/hooks/UseRooms"
import UseBookingStatus from "@/hooks/UseBookingStatus"
import UseGuests from "@/hooks/UseGuests"

function Bookings() {
  const { data: bookings = [], isFetching: isFetchingBookings } = UseRoomBookings()
  const { data: rooms = [] } = UseRooms()
  const { data: bookingStatuses = [] } = UseBookingStatus()

  // const guests = useMemo(
  //   () =>
  //     Array.from(
  //       new Map(
  //         bookings
  //           .map((booking) => booking.guest)
  //           .filter((guest): guest is NonNullable<(typeof bookings)[number]["guest"]> => Boolean(guest))
  //           .map((guest) => [guest.id, guest])
  //       ).values()
  //     ),
  //   [bookings]
  // )

  const { data: guests = [] } = UseGuests()

  const bookingStats = useMemo(() => {
    return bookings.reduce(
      (stats, booking) => {
        const status = (booking.status?.label || booking.status?.name || "").toLowerCase()

        if (status === "checked-in") {
          stats.checkedInCount += 1
        }

        if (status === "confirmed") {
          stats.confirmedCount += 1
        }

        if (status === "pending") {
          stats.pendingCount += 1
        }

        return stats
      },
      {
        totalBookings: bookings.length,
        checkedInCount: 0,
        confirmedCount: 0,
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
        confirmedCount={bookingStats.confirmedCount}
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
