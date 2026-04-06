import type { BookingStatusName, IBookingStatus } from "@/interfaces/IBooking"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"

export function getTodayDateKey() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function getBookingStatusName(booking: IRoomBooking) {
  return (booking.status?.name || booking.status?.label || "").toLowerCase()
}

export function getStatusIdByName(
  statuses: IBookingStatus[],
  statusName: BookingStatusName
) {
  return statuses.find((status) => status.name === statusName)?.id?.toString() || ""
}

export function canCheckIn(booking: IRoomBooking, today: string) {
  const status = getBookingStatusName(booking)

  return (
    (status === "confirmed" || status === "pending") &&
    booking.check_in <= today
  )
}

export function canCheckOut(booking: IRoomBooking, today: string) {
  const status = getBookingStatusName(booking)

  return status === "checked-in" && booking.check_out <= today
}
