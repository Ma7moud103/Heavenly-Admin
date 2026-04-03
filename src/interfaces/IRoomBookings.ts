import type { IRoom } from "@/interfaces/IRooms"

export interface BookingStatus {
  id: string
  name: string
  label?: string
  color?: string
  created_at?: string
}

export interface GuestProfile {
  id: string
  full_name: string
  phone?: string
  avatar_url?: string | null
  role_id?: string
  is_active?: boolean
  created_at?: string
  email?: string
  country?: string
  visits?: number
}

export interface IRoomBooking {
  id: string
  room_id: string
  user_id: string
  check_in: string
  check_out: string
  total_price: number
  created_at?: string
  status_id: string
  room?: IRoom | null
  status?: BookingStatus | null
  guest?: GuestProfile | null
}
