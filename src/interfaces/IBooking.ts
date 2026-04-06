type BookingStatusName =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "checked-in"
  | "checked-out";

interface IBookingStatus {
  id: number;
  name: BookingStatusName;
  label: string;
  color: string;
  created_at: string; 
}

export type { IBookingStatus, BookingStatusName };