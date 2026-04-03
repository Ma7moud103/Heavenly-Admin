export interface IHotelStats {
  id?: number
  total_rooms: number
  available_rooms: number
  occupied_rooms: number
  maintenance_rooms: number
  total_guests: number
  checkins_today: number
  checkouts_today: number
  pending_bookings: number
  revenue_today: number
  revenue_month: number
  occupancy_rate: number
  avg_room_rate: number
  created_at?: string
}