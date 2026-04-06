import { BookingFormSheet } from "@/features/bookings/components/BookingFormSheet"
import type { BookingStatus, GuestProfile } from "@/interfaces/IRoomBookings"
import type { IRoom } from "@/interfaces/IRooms"

interface CreateBookingSheetProps {
  open: boolean
  rooms: IRoom[]
  guests: GuestProfile[]
  statuses: BookingStatus[]
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
