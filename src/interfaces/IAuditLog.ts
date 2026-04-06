import type { IGuest } from "./IGuest"

export interface IRoomAuditData {
  id: string
  title: string
  base_price: number
  capacity: number
  description: string | null
  image_url: string | null
  status: string | null
  type: string | null
  created_at: string
}

export interface IRoomBookingAuditData {
  id: string
  room_id: string
  user_id: string | null
  check_in: string
  check_out: string
  total_price: number
  status_id: string | null
  created_at: string
}

export interface IAuditLog {
  id: string
  action: string
  table_name: "rooms" | "room_bookings"
  record_id: string
  performed_by: string | null
  user: IGuest | null
  old_data: IRoomAuditData | IRoomBookingAuditData | null
  new_data: IRoomAuditData | IRoomBookingAuditData | null
  created_at: string
}
