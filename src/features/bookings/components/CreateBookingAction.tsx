import { memo, useState } from "react"
import { Plus } from "lucide-react"
import { CreateBookingSheet } from "@/features/bookings/components/CreateBookingSheet"
import type { IBookingStatus } from "@/interfaces/IBooking"
import type { IRoom } from "@/interfaces/IRooms"
import type { IGuest } from "@/interfaces/IGuest"

interface CreateBookingActionProps {
  rooms: IRoom[]
  guests: IGuest[]
  statuses: IBookingStatus[]
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
