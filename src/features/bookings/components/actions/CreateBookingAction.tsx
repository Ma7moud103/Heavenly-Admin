import { memo, useState } from 'react';
import { Plus } from 'lucide-react';
import type { IBookingStatus } from '@/interfaces/IBooking';
import type { IRoom } from '@/interfaces/IRooms';
import type { IGuest } from '@/interfaces/IGuest';
import type { IRoomBooking } from '@/interfaces/IRoomBookings';
import { BookingForm } from './BookingForm';

interface CreateBookingActionProps {
  rooms: IRoom[];
  guests: IGuest[];
  statuses: IBookingStatus[];
  bookings: IRoomBooking[];
}

function CreateBookingActionComponent({ rooms, guests, statuses, bookings }: CreateBookingActionProps) {
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);

  return (
    <>
      <button className="btn btn-primary" onClick={() => setIsCreateBookingOpen(true)} type="button">
        <Plus className="h-4 w-4" />
        Add New Booking
      </button>

      <BookingForm
        mode="create"
        open={isCreateBookingOpen}
        rooms={rooms}
        guests={guests}
        statuses={statuses}
        bookings={bookings}
        onOpenChange={setIsCreateBookingOpen}
      />
    </>
  );
}

export const CreateBookingAction = memo(CreateBookingActionComponent);
