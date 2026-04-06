import { BookingFormSheet } from "@/features/bookings/components/BookingFormSheet"
import type { IBookingStatus } from "@/interfaces/IBooking"
import type { IGuest } from "@/interfaces/IGuest"
import type { IRoom } from "@/interfaces/IRooms"

interface CreateBookingSheetProps {
  open: boolean
  rooms: IRoom[]
  guests: IGuest[]
  statuses: IBookingStatus[]
  onOpenChange: (open: boolean) => void
}

export function CreateBookingSheet({
  open,
  rooms,
  guests,
  statuses,
  onOpenChange,
}: CreateBookingSheetProps) {
  return (
    <BookingFormSheet
      mode="create"
      open={open}
      rooms={rooms}
      guests={guests}
      statuses={statuses}
      onOpenChange={onOpenChange}
    />
  )
}
