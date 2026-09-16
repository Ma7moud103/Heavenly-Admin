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
}

interface IStats {
  roomStats: IRoomStats;
  bookingStats: IBookingStats;
  guestsInHouse: number;
  occupancyRate: number;
  isLoading?: boolean;
  dailyRevenue: number;
  monthlyRevenue: number;
}

export type { IStats, IRoomStats, IBookingStats };
