import { memo, useCallback, useDeferredValue, useMemo, useReducer, useState } from "react"
import { BookingsFiltersBar } from "@/features/bookings/components/BookingsFiltersBar"
import { BookingsTableSectionSkeleton } from "@/features/bookings/components/BookingsSkeletons"
import { BookingsTable } from "@/features/bookings/components/BookingsTable"
import { DeleteBookingSheet } from "@/features/bookings/components/DeleteBookingSheet"
import { EditBookingSheet } from "@/features/bookings/components/EditBookingSheet"
import {
  bookingsFilterReducer,
  initialBookingsFilters,
} from "@/features/bookings/filters"
import type { BookingStatus, GuestProfile, IRoomBooking } from "@/interfaces/IRoomBookings"
import type { IRoom } from "@/interfaces/IRooms"

interface BookingsTableSectionProps {
  bookings: IRoomBooking[]
  bookingStatuses: BookingStatus[]
  guests: GuestProfile[]
  rooms: IRoom[]
  isLoading?: boolean
}

function BookingsTableSectionComponent({
  bookings,
  bookingStatuses,
  guests,
  rooms,
  isLoading = false,
}: BookingsTableSectionProps) {
  const [selectedBooking, setSelectedBooking] = useState<IRoomBooking | null>(null)
  const [isEditBookingOpen, setIsEditBookingOpen] = useState(false)
  const [isDeleteBookingOpen, setIsDeleteBookingOpen] = useState(false)
  const [filters, dispatch] = useReducer(
    bookingsFilterReducer,
    initialBookingsFilters
  )
  const deferredSearchTerm = useDeferredValue(filters.searchTerm)

  const statusOptions = useMemo(
    () =>
      Array.from(
        new Set(
          bookingStatuses
            .map((status) => status.label || status.name)
            .filter((status): status is string => Boolean(status))
        )
      ),
    [bookingStatuses]
  )

  const normalizedFilters = useMemo(
    () => ({
      searchTerm: deferredSearchTerm.trim().toLowerCase(),
      statusFilter: filters.statusFilter,
    }),
    [deferredSearchTerm, filters.statusFilter]
  )

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const guestName = (booking.guest?.full_name || "").toLowerCase()
      const roomTitle = (booking.room?.title || "").toLowerCase()
      const roomType = (booking.room?.room_type?.name || "").toLowerCase()
      const statusLabel = (
        booking.status?.label ||
        booking.status?.name ||
        ""
      ).toLowerCase()

      const matchesSearch =
        normalizedFilters.searchTerm.length === 0 ||
        guestName.includes(normalizedFilters.searchTerm) ||
        roomTitle.includes(normalizedFilters.searchTerm) ||
        roomType.includes(normalizedFilters.searchTerm)

      const matchesStatus =
        normalizedFilters.statusFilter === "all" ||
        statusLabel === normalizedFilters.statusFilter

      return matchesSearch && matchesStatus
    })
  }, [bookings, normalizedFilters])

  const handleEditBooking = useCallback((booking: IRoomBooking) => {
    setSelectedBooking(booking)
    setIsEditBookingOpen(true)
  }, [])

  const handleDeleteBooking = useCallback((booking: IRoomBooking) => {
    setSelectedBooking(booking)
    setIsDeleteBookingOpen(true)
  }, [])

  const handleEditBookingOpenChange = useCallback((open: boolean) => {
    setIsEditBookingOpen(open)
    if (!open) {
      setSelectedBooking(null)
    }
  }, [])

  const handleDeleteBookingOpenChange = useCallback((open: boolean) => {
    setIsDeleteBookingOpen(open)
    if (!open) {
      setSelectedBooking(null)
    }
  }, [])

  if (isLoading) {
    return <BookingsTableSectionSkeleton />
  }

  return (
    <>
      <section className="card">
        <BookingsFiltersBar
          filters={filters}
          statusOptions={statusOptions}
          onDispatch={dispatch}
        />
        <BookingsTable
          bookings={filteredBookings}
          onDeleteBooking={handleDeleteBooking}
          onEditBooking={handleEditBooking}
        />
      </section>

      <EditBookingSheet
        open={isEditBookingOpen}
        onOpenChange={handleEditBookingOpenChange}
        booking={selectedBooking}
        rooms={rooms}
        guests={guests}
        statuses={bookingStatuses}
      />

      <DeleteBookingSheet
        open={isDeleteBookingOpen}
        onOpenChange={handleDeleteBookingOpenChange}
        booking={selectedBooking}
      />
    </>
  )
}

export const BookingsTableSection = memo(BookingsTableSectionComponent)
