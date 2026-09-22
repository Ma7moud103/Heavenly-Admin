import type { IBookingStatus } from '@/interfaces/IBooking';
import type { IGuest } from '@/interfaces/IGuest';
import type { IRoomBooking } from '@/interfaces/IRoomBookings';
import type { IRoom } from '@/interfaces/IRooms';
import { BookingForm } from './BookingForm';

interface IProps {
  open: boolean;
  booking: IRoomBooking | null;
  rooms: IRoom[];
  guests: IGuest[];
  statuses: IBookingStatus[];
  onOpenChange: (open: boolean) => void;
}

export function EditBookingSheet({ open, booking, rooms, guests, statuses, onOpenChange }: IProps) {
  return <BookingForm mode="edit" open={open} booking={booking} rooms={rooms} guests={guests} statuses={statuses} onOpenChange={onOpenChange} />;
}
