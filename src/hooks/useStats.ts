import { useMemo } from 'react';
import UseRoomBookings from '@/hooks/UseRoomBookings';
import UseRooms from '@/hooks/UseRooms';
import { normalizeStrings } from '@/utils/normalizations';
import { getCurrentMonthInCairo, getTodayInCairo } from '@/utils/dates';
import type { IBookingStats, IRoomStats, IStats } from '@/interfaces/IStats';

export function useStats(): IStats {
  const { data: rooms = [], isLoading: isLoadingRooms } = UseRooms();
  const { data: bookings = [], isLoading: isLoadingBookings } = UseRoomBookings();

  const roomsStats = useMemo(() => {
    const roomStats = rooms.reduce<IRoomStats>(
      (acc, room) => {
        const status = normalizeStrings(room.status?.label || room.status?.name);

        if (status === 'available') acc.availableRooms += 1;
        if (status === 'occupied') acc.occupiedRooms += 1;
        if (status === 'maintenance') acc.maintenanceRooms += 1;

        return acc;
      },

      {
        totalRooms: rooms.length,
        availableRooms: 0,
        occupiedRooms: 0,
        maintenanceRooms: 0,
      },
    );

    return roomStats;
  }, [rooms]);

  const bookingsStats = useMemo(() => {
    let dailyRevenue: number = 0;
    let monthlyRevenue: number = 0;

    const today = getTodayInCairo();
    const currentMonth = getCurrentMonthInCairo();
    const checkedInGuestIds = new Set<string>();

    const bookingStats = bookings.reduce<IBookingStats>(
      (acc, booking) => {
        const status = normalizeStrings(booking.status?.label || booking.status?.name);
        const bookingMonth = (booking.created_at || booking.check_in)?.slice(0, 7);

        if (status === 'checked in' && booking.check_in === today) {
          dailyRevenue += booking.total_price || 0;
          const guestId = booking.guest_id || booking.guest?.id;
          if (guestId !== null && guestId !== undefined) {
            checkedInGuestIds.add(String(guestId));
          }
        }

        if (status !== 'cancelled' && status !== 'pending' && status !== 'confirmed' && bookingMonth === currentMonth) {
          monthlyRevenue += booking.total_price || 0;
        }

        if (status === 'pending' || status === 'reserved' || status === 'confirmed') acc.pendingBookings += 1;

        if (booking.check_in === today) acc.checkInsToday += 1;

        if (booking.check_out === today) acc.checkoutsToday += 1;

        return acc;
      },
      {
        pendingBookings: 0,
        checkInsToday: 0,
        checkoutsToday: 0,
      },
    );

    return {
      bookingStats,
      guestsInHouse: checkedInGuestIds.size,
      dailyRevenue,
      monthlyRevenue,
    };
  }, [bookings]);

  const occupancyRate = roomsStats.totalRooms === 0 ? 0 : Math.round((roomsStats.occupiedRooms / roomsStats.totalRooms) * 100);

  return {
    bookingStats: bookingsStats.bookingStats,
    guestsInHouse: bookingsStats.guestsInHouse,
    roomStats: roomsStats,
    occupancyRate,
    dailyRevenue: bookingsStats.dailyRevenue,
    monthlyRevenue: bookingsStats.monthlyRevenue,
    isLoading: isLoadingRooms || isLoadingBookings,
  };
}
