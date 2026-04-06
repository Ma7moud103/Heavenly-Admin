import type { IGuest } from "@/interfaces/IGuest"
import type { IRoom } from "@/interfaces/IRooms"

export interface BookingStatus {
  id: string
  name: string
  label?: string
  color?: string
  created_at?: string
}

export interface IRoomBooking {
  id: string
  room_id: string
  guest_id: number
  check_in: string
  check_out: string
  total_price: number
  created_at?: string
  status_id: string
  room?: IRoom | null
  status?: BookingStatus | null
  guest?: IGuest | null
}
