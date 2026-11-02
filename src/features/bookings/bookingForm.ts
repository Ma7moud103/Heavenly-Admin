import type { ICreateBookingPayload } from '@/data/rooms&bookings/createBooking';
import type { IBookingStatus } from '@/interfaces/IBooking';
import type { IGuest } from '@/interfaces/IGuest';
import type { IRoomBooking } from '@/interfaces/IRoomBookings';
import type { IRoom } from '@/interfaces/IRooms';

export interface BookingFormState {
  room_id: string;
  guest_id: number | '';
  status_id: string;
  check_in: string;
  check_out: string;
}

export const initialBookingForm: BookingFormState = {
  room_id: '',
  guest_id: '',
  status_id: '',
  check_in: '',
  check_out: '',
};

function getDateValue(value: string) {
  return new Date(`${value}T12:00:00`);
}

export function calculateBookingNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;

  const start = getDateValue(checkIn);
  const end = getDateValue(checkOut);
  const diff = end.getTime() - start.getTime();

  if (Number.isNaN(diff) || diff <= 0) {
    return 0;
  }

  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function calculateBookingTotal(form: BookingFormState, rooms: IRoom[]) {
  const selectedRoom = rooms.find((room) => room.id === form.room_id);
  const nights = calculateBookingNights(form.check_in, form.check_out);

  if (!selectedRoom || nights <= 0) {
    return 0;
  }

  return Number(selectedRoom.base_price || 0) * nights;
}

export function buildBookingFormState(booking: IRoomBooking): BookingFormState {
  return {
    room_id: booking.room_id,
    guest_id: booking.guest_id,
    status_id: String(booking.status_id),
    check_in: booking.check_in,
    check_out: booking.check_out,
  };
}

export function getDefaultBookingStatusId(statuses: IBookingStatus[]) {
  return (
    statuses
      .find((status) => {
        return status.name.toLowerCase() === 'pending';
      })
      ?.id?.toString() ||
    statuses[0]?.id?.toString() ||
    ''
  );
}

export function getDefaultGuestId(guests: IGuest[]) {
  return guests[0]?.id || '';
}

export function getDefaultRoomId(rooms: IRoom[]) {
  return rooms[0]?.id || '';
}

export function buildCreateBookingFormState(rooms: IRoom[], guests: IGuest[], statuses: IBookingStatus[]): BookingFormState {
  const checkIn = new Date();
  const checkOut = new Date();
  checkOut.setDate(checkOut.getDate() + 1);
  const toDateInput = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return {
    room_id: getDefaultRoomId(rooms),
    guest_id: getDefaultGuestId(guests),
    status_id: getDefaultBookingStatusId(statuses),
    check_in: toDateInput(checkIn),
    check_out: toDateInput(checkOut),
  };
}

export function getAvailableRooms(rooms: IRoom[], bookings: IRoomBooking[], checkIn: string, checkOut: string, excludeBookingId?: string) {
  if (!checkIn || !checkOut || calculateBookingNights(checkIn, checkOut) <= 0) return rooms;
  return rooms.filter((room) => !bookings.some((booking) => {
    if (booking.id === excludeBookingId || booking.room_id !== room.id) return false;
    const status = booking.status?.name.toLowerCase();
    if (status === 'cancelled' || status === 'checked-out') return false;
    return booking.check_in < checkOut && checkIn < booking.check_out;
  }));
}

export function getNextBookingStatuses(statuses: IBookingStatus[], currentStatus: string) {
  const nextByStatus: Record<string, string[]> = {
    pending: ['pending', 'confirmed', 'cancelled'],
    confirmed: ['confirmed', 'checked-in', 'cancelled'],
    'checked-in': ['checked-in', 'checked-out', 'cancelled'],
    'checked-out': [],
    cancelled: [],
  };
  const allowed = nextByStatus[currentStatus.toLowerCase()] ?? [];
  return allowed.flatMap((name) => {
    const status = statuses.find((item) => item.name.toLowerCase() === name);
    return status ? [status] : [];
  });
}

export function validateBookingForm(form: BookingFormState, rooms: IRoom[], guests: IGuest[], statuses: IBookingStatus[]) {
  const errors: Partial<Record<keyof BookingFormState, string>> = {};

  if (!form.room_id) {
    errors.room_id = 'Room is required';
  } else if (!rooms.some((room) => room.id === form.room_id)) {
    errors.room_id = 'Select a valid room';
  }

  if (!form.guest_id) {
    errors.guest_id = 'Guest is required';
  } else if (!guests.some((guest) => guest.id === form.guest_id)) {
    errors.guest_id = 'Select a valid guest';
  }

  if (!form.status_id) {
    errors.status_id = 'Status is required';
  } else if (!statuses.some((status) => String(status.id) === form.status_id)) {
    errors.status_id = 'Select a valid status';
  }

  if (!form.check_in) {
    errors.check_in = 'Check-in date is required';
  }

  if (!form.check_out) {
    errors.check_out = 'Check-out date is required';
  }

  if (form.check_in && form.check_out) {
    const nights = calculateBookingNights(form.check_in, form.check_out);

    if (nights <= 0) {
      errors.check_out = 'Check-out must be after check-in';
    }
  }

  return errors;
}

export function buildCreateBookingPayload(form: BookingFormState, rooms: IRoom[]): ICreateBookingPayload {
  if (form.guest_id === '') {
    throw new Error('Guest is required');
  }

  return {
    room_id: form.room_id,
    guest_id: form.guest_id,
    status_id: form.status_id,
    check_in: form.check_in,
    check_out: form.check_out,
    total_price: calculateBookingTotal(form, rooms),
  };
}
