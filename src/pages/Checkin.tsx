import { useMemo } from "react"
import { toast } from "react-toastify"
import { CheckinHeader } from "@/features/checkin/components/CheckinHeader"
import { CheckinQueues } from "@/features/checkin/components/CheckinQueues"
import { CheckinStatsGrid } from "@/features/checkin/components/CheckinStatsGrid"
import {
  canCheckIn,
  canCheckOut,
  getBookingStatusName,
  getStatusIdByName,
  getTodayDateKey,
} from "@/features/checkin/utils"
import UseBookingStatus from "@/hooks/UseBookingStatus"
import UseRoomBookings from "@/hooks/UseRoomBookings"
import UseUpdateBooking from "@/hooks/UseUpdateBooking"
import type { ICreateBookingPayload } from "@/data/createBooking"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"

export default function Checkin() {
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

  const arrivals = useMemo(
    () => bookings.filter((booking) => booking.check_in === today && booking.status?.name.toLowerCase() !== "checked-out" && booking.status?.name.toLowerCase() !== "checked-in" && booking.status?.name.toLowerCase() !== "cancelled"),
    [bookings, today]
  )

  
  const departures = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          booking.check_out === today &&
          booking.status?.name.toLowerCase() === "checked-in"
      ),
    [bookings, today],
  );

  const stats = useMemo(() => {
    const inHouse = bookings.filter(
      (booking) => getBookingStatusName(booking) === "checked-in"
    ).length
    const dueNow =
      arrivals.filter((booking) => canCheckIn(booking, today)).length +
      departures.filter((booking) => canCheckOut(booking, today)).length

    return {
      arrivalsToday: arrivals.length,
      departuresToday: departures.length,
      inHouse,
      dueNow,
    }
  }, [arrivals, bookings, departures, today])

  const getActionPayload = (
    booking: IRoomBooking,
    statusName: "checked-in" | "checked-out"
  ): { bookingId: string; payload: ICreateBookingPayload } | null => {
    const nextStatusId = getStatusIdByName(bookingStatuses, statusName)

    if (!nextStatusId)  return null

    return {
      bookingId: booking.id,
      payload: {
        room_id: booking.room_id,
        guest_id: booking.guest_id,
        check_in: booking.check_in,
        check_out: booking.check_out,
        total_price: booking.total_price,
        status_id: nextStatusId,
      },
    }
  }

  const handleRunAction = async (args: {
    bookingId: string
    payload: ICreateBookingPayload
  }) => {
    try {
      await updateBookingMutation.mutateAsync(args)

      const actionLabel =
        args.payload.status_id === getStatusIdByName(bookingStatuses, "checked-in")
          ? "Guest checked in"
          : "Guest checked out"

      toast.success(actionLabel)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to update booking status"
      toast.error(message)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <CheckinHeader
        todayLabel={todayLabel}
        arrivalsToday={stats.arrivalsToday}
        departuresToday={stats.departuresToday}
      />
      <CheckinStatsGrid
        arrivalsToday={stats.arrivalsToday}
        departuresToday={stats.departuresToday}
        inHouse={stats.inHouse}
        dueNow={stats.dueNow}
      />
      <CheckinQueues
        arrivals={arrivals}
        departures={departures}
        canCheckIn={(booking) => canCheckIn(booking, today)}
        canCheckOut={(booking) => canCheckOut(booking, today)}
        getActionPayload={getActionPayload}
        isUpdating={updateBookingMutation.isPending}
        onRunAction={handleRunAction}
      />
    </div>
  )
}
