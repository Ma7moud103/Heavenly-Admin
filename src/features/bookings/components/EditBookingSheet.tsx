import { BookingFormSheet } from "@/features/bookings/components/BookingFormSheet"
import type { BookingStatus, GuestProfile, IRoomBooking } from "@/interfaces/IRoomBookings"
import type { IRoom } from "@/interfaces/IRooms"

interface EditBookingSheetProps {
  open: boolean
  booking: IRoomBooking | null
  rooms: IRoom[]
  guests: GuestProfile[]
  statuses: BookingStatus[]
  onOpenChange: (open: boolean) => void
}

export function EditBookingSheet({
  open,
  booking,
  rooms,
  guests,
  statuses,
  onOpenChange,
}: EditBookingSheetProps) {
  return (
    <BookingFormSheet
      mode="edit"
      open={open}
      booking={booking}
      rooms={rooms}
      guests={guests}
      statuses={statuses}
      onOpenChange={onOpenChange}
    />
  )
}
