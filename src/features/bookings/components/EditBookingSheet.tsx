import { BookingFormSheet } from "@/features/bookings/components/BookingFormSheet"
import type { IBookingStatus } from "@/interfaces/IBooking"
import type { IGuest } from "@/interfaces/IGuest"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"
import type { IRoom } from "@/interfaces/IRooms"

interface EditBookingSheetProps {
  open: boolean
  booking: IRoomBooking | null
  rooms: IRoom[]
  guests: IGuest[]
  statuses: IBookingStatus[]
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
