import { memo, useState } from 'react';
import { Plus } from 'lucide-react';
import type { IBookingStatus } from '@/interfaces/IBooking';
import type { IRoom } from '@/interfaces/IRooms';
import type { IGuest } from '@/interfaces/IGuest';
import { BookingForm } from './BookingForm';

interface CreateBookingActionProps {
  rooms: IRoom[];
  guests: IGuest[];
  statuses: IBookingStatus[];
}

function CreateBookingActionComponent({ rooms, guests, statuses }: CreateBookingActionProps) {
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);

  return (
    <>
      <button className="btn btn-primary" onClick={() => setIsCreateBookingOpen(true)} type="button">
        <Plus className="h-4 w-4" />
        Create New Booking
      </button>

      <BookingForm mode="create" open={isCreateBookingOpen} rooms={rooms} guests={guests} statuses={statuses} onOpenChange={setIsCreateBookingOpen} />
    </>
  );
}

export const CreateBookingAction = memo(CreateBookingActionComponent);
