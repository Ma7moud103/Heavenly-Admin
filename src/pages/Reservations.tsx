import { useMemo } from "react"
import { toast } from "react-toastify"
import { ReservationsHeader } from "@/features/reservations/components/ReservationsHeader"
import { ReservationsQueues } from "@/features/reservations/components/ReservationsQueues"
import { ReservationsStatsGrid } from "@/features/reservations/components/ReservationsStatsGrid"
import {
  buildReservationStatusPayload,
  daysUntilArrival,
  getReservationStatusName,
  getStatusIdByName,
  getTodayDateKey,
  isReservationStatus,
} from "@/features/reservations/utils"
import UseBookingStatus from "@/hooks/UseBookingStatus"
import UseRoomBookings from "@/hooks/UseRoomBookings"
import UseUpdateBooking from "@/hooks/UseUpdateBooking"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"

export default function Reservations() {
  const { data: bookings = [] } = UseRoomBookings()
  const { data: bookingStatuses = [] } = UseBookingStatus()
  const updateBookingMutation = UseUpdateBooking()

  const today = useMemo(() => getTodayDateKey(), [])
  const todayLabel = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    []
  )

  const reservations = useMemo(
    () =>
      bookings
        .filter((booking) => booking.check_in >= today && isReservationStatus(booking))
        .sort((first, second) => first.check_in.localeCompare(second.check_in)),
    [bookings, today]
  )

  const pendingReservations = useMemo(
    () => reservations.filter((booking) => getReservationStatusName(booking) === "pending"),
    [reservations]
  )

  const confirmedReservations = useMemo(
    () => reservations.filter((booking) => getReservationStatusName(booking) === "confirmed"),
    [reservations]
  )

  const arrivingSoonCount = useMemo(
    () =>
      reservations.filter((booking) => {
        const daysAway = daysUntilArrival(booking.check_in, today)
        return daysAway >= 0 && daysAway <= 3
      }).length,
    [reservations, today]
  )

  const handleStatusUpdate = async (
    booking: IRoomBooking,
    nextStatusName: "confirmed" | "cancelled"
  ) => {
    const nextStatusId = getStatusIdByName(bookingStatuses, nextStatusName)

    if (!nextStatusId) {
      toast.error("Reservation status is not configured")
      return
    }

    try {
      await updateBookingMutation.mutateAsync({
        bookingId: booking.id,
        payload: buildReservationStatusPayload(booking, nextStatusId),
      })

      toast.success(
        nextStatusName === "confirmed"
          ? "Reservation confirmed"
          : "Reservation cancelled"
      )
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update reservation"
      toast.error(message)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <ReservationsHeader
        todayLabel={todayLabel}
        upcomingCount={reservations.length}
        arrivingSoonCount={arrivingSoonCount}
      />
      <ReservationsStatsGrid
        upcomingCount={reservations.length}
        pendingCount={pendingReservations.length}
        confirmedCount={confirmedReservations.length}
        arrivingSoonCount={arrivingSoonCount}
      />
      <ReservationsQueues
        pendingReservations={pendingReservations}
        confirmedReservations={confirmedReservations}
        today={today}
        isUpdating={updateBookingMutation.isPending}
        onConfirm={(booking) => handleStatusUpdate(booking, "confirmed")}
        onCancel={(booking) => handleStatusUpdate(booking, "cancelled")}
      />
    </div>
  )
}
