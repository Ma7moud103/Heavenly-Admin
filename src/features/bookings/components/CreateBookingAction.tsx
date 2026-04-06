import { memo, useState } from "react"
import { Plus } from "lucide-react"
import { CreateBookingSheet } from "@/features/bookings/components/CreateBookingSheet"
import type { BookingStatus, GuestProfile } from "@/interfaces/IRoomBookings"
import type { IRoom } from "@/interfaces/IRooms"

interface CreateBookingActionProps {
  rooms: IRoom[]
  guests: GuestProfile[]
  statuses: BookingStatus[]
}

function CreateBookingActionComponent({
  rooms,
  guests,
  statuses,
}: CreateBookingActionProps) {
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false)

  return (
    <>
      <button className="btn btn-primary" onClick={() => setIsCreateBookingOpen(true)} type="button">
        <Plus className="h-4 w-4" />
        New Booking
      </button>

      <CreateBookingSheet
        open={isCreateBookingOpen}
        onOpenChange={setIsCreateBookingOpen}
        rooms={rooms}
        guests={guests}
        statuses={statuses}
      />
    </>
  )
}

export const CreateBookingAction = memo(CreateBookingActionComponent)
