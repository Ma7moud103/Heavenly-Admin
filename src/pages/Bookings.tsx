import { memo } from 'react';
import { BookingsHeader } from '@/features/bookings/components/BookingsHeader';
import { BookingsStatsGrid } from '@/features/bookings/components/BookingsStatsGrid';
import { BookingsTableSection } from '@/features/bookings/components/BookingsTableSection';
import { CreateBookingAction } from '@/features/bookings/components/actions/CreateBookingAction';
import UseRoomBookings from '@/hooks/rooms&bookings/UseRoomBookings';
import UseRooms from '@/hooks/rooms&bookings/UseRooms';
import UseBookingStatus from '@/hooks/rooms&bookings/UseBookingStatus';
import UseGuests from '@/hooks/UseGuests';

function Bookings() {
  const { data: bookings = [], isFetching: isFetchingBookings } = UseRoomBookings();
  const { data: rooms = [] } = UseRooms();
  const { data: bookingStatuses = [] } = UseBookingStatus();
  const { data: guests = [] } = UseGuests();

  // const guests = useMemo(
  //   () =>
  //     Array.from(
  //       new Map(
  //         bookings
  //           .map((booking) => booking.guest)
  //           .filter((guest): guest is NonNullable<(typeof bookings)[number]["guest"]> => Boolean(guest))
  //           .map((guest) => [guest.id, guest])
  //       ).values()
  //     ),
  //   [bookings]
  // )

  return (
    <div className="flex flex-col gap-6">
      <BookingsHeader>
        <CreateBookingAction rooms={rooms} guests={guests} statuses={bookingStatuses} />
      </BookingsHeader>

      <BookingsStatsGrid />

      <BookingsTableSection bookings={bookings} bookingStatuses={bookingStatuses} guests={guests} rooms={rooms} isLoading={isFetchingBookings} />
    </div>
  );
}

export default memo(Bookings);
