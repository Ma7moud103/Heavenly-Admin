import type { BookingStatusName, IBookingStatus } from "@/interfaces/IBooking"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"
import type { ICreateBookingPayload } from "@/data/createBooking"

export function getTodayDateKey() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function getReservationStatusName(booking: IRoomBooking) {
  return (booking.status?.name || booking.status?.label || "").toLowerCase()
}

export function getStatusIdByName(
  statuses: IBookingStatus[],
  statusName: BookingStatusName
) {
  return statuses.find((status) => status.name === statusName)?.id?.toString() || ""
}

export function isReservationStatus(booking: IRoomBooking) {
  const status = getReservationStatusName(booking)
  return status === "pending" || status === "confirmed"
}

export function daysUntilArrival(checkIn: string, today: string) {
  const start = new Date(`${today}T12:00:00`)
  const end = new Date(`${checkIn}T12:00:00`)
  const diff = end.getTime() - start.getTime()

  return Math.round(diff / (1000 * 60 * 60 * 24))
}

export function buildReservationStatusPayload(
  booking: IRoomBooking,
  statusId: string
): ICreateBookingPayload {
  return {
    room_id: booking.room_id,
    guest_id: booking.guest_id,
    check_in: booking.check_in,
    check_out: booking.check_out,
    total_price: booking.total_price,
    status_id: statusId,
  }
}
