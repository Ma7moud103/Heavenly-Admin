interface IRoomStats {
  totalRooms: number;
  availableRooms: number;
  occupiedRooms: number;
  maintenanceRooms: number;
}
interface IBookingStats {
  pendingBookings: number;
  checkInsToday: number;
  checkoutsToday: number;
  totalBookings: number;
  totalCheckIns: number;
  totalCheckOuts: number;
  totalPending: number;
  totalConfirmed: number;
  totalCancelled: number;
  checkInsMonthly: number;
}

interface IStats {
  roomStats: IRoomStats;
  bookingStats: IBookingStats;
  guestsInHouse: number;
  occupancyRatePerDay: number;
  occupancyRatePerMonth: number;
  isLoading?: boolean;
  dailyRevenue: number;
  monthlyRevenue: number;
}

export type { IStats, IRoomStats, IBookingStats };
