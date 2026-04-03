import { fetchHotelStats } from "@/data/hotelData";
import type { IHotelStats } from "@/interfaces/HotelStatus";
import { useQuery } from "@tanstack/react-query";

const defaultStats: IHotelStats = {
  total_rooms: 0,
  available_rooms: 0,
  occupied_rooms: 0,
  maintenance_rooms: 0,
  total_guests: 0,
  checkins_today: 0,
  checkouts_today: 0,
  pending_bookings: 0,
  revenue_today: 0,
  revenue_month: 0,
  occupancy_rate: 0,
  avg_room_rate: 0,
};

export const useHotelStats = () => {
  return useQuery<IHotelStats, Error>({
    queryKey: ["hotelStats"],
    queryFn: async () => {
      const { data, error } = await fetchHotelStats();
      if (error) {
        console.error("Error fetching hotel stats:", error);
        throw error;
      }
      return data?.[0] ?? defaultStats;
    },
    staleTime: 30000,
    initialData: defaultStats,
    placeholderData: defaultStats,
  });
};
