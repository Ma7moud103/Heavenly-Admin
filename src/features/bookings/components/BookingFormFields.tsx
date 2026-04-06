import { CalendarDays, Hotel, User } from "lucide-react"
import type { IBookingStatus } from "@/interfaces/IBooking"
import type { IRoom } from "@/interfaces/IRooms"
import type { BookingFormState } from "@/features/bookings/bookingForm"
import { calculateBookingNights, calculateBookingTotal } from "@/features/bookings/bookingForm"
import { formatCurrency } from "@/lib/utils"
import type { IGuest } from "@/interfaces/IGuest"

interface BookingFormFieldsProps {
  form: BookingFormState
  errors: Partial<Record<keyof BookingFormState, string>>
  rooms: IRoom[]
  guests: IGuest[]
  statuses: IBookingStatus[]
  onChange: <K extends keyof BookingFormState>(field: K, value: BookingFormState[K]) => void
}

export function BookingFormFields({
  form,
  errors,
  rooms,
  guests,
  statuses,
  onChange,
}: BookingFormFieldsProps) {
  const nights = calculateBookingNights(form.check_in, form.check_out)
  const total = calculateBookingTotal(form, rooms)

  return (
    <div className="grid gap-5 px-4 pb-6">
      <label className="grid gap-2 text-sm text-[--color-text-sub]">
        <span className="flex items-center gap-2 font-medium text-[--color-text]">
          <Hotel className="h-4 w-4" />
          Room
        </span>
        <select
          value={form.room_id}
          onChange={(e) => onChange("room_id", e.target.value)}
          className="input"
        >
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.title || room.id} | {room.room_type?.name || "Room"}
            </option>
          ))}
        </select>
        {errors.room_id ? <span className="text-xs text-[--color-error]">{errors.room_id}</span> : null}
      </label>

      <label className="grid gap-2 text-sm text-[--color-text-sub]">
        <span className="flex items-center gap-2 font-medium text-[--color-text]">
          <User className="h-4 w-4" />
          Guest
        </span>
        <select
          value={form.guest_id}
          onChange={(e) =>
            onChange("guest_id", e.target.value === "" ? "" : Number(e.target.value))
          }
          className="input"
        >
          <option value="">Select a guest</option>
          {guests.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.first_name} {guest.last_name}
            </option>
          ))}
        </select>
        {errors.guest_id ? <span className="text-xs text-[--color-error]">{errors.guest_id}</span> : null}
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-[--color-text-sub]">
          <span className="flex items-center gap-2 font-medium text-[--color-text]">
            <CalendarDays className="h-4 w-4" />
            Check-in
          </span>
          <input
            type="date"
            value={form.check_in}
            onChange={(e) => onChange("check_in", e.target.value)}
            className="input"
          />
          {errors.check_in ? <span className="text-xs text-[--color-error]">{errors.check_in}</span> : null}
        </label>

        <label className="grid gap-2 text-sm text-[--color-text-sub]">
          <span className="flex items-center gap-2 font-medium text-[--color-text]">
            <CalendarDays className="h-4 w-4" />
            Check-out
          </span>
          <input
            type="date"
            value={form.check_out}
            onChange={(e) => onChange("check_out", e.target.value)}
            className="input"
          />
          {errors.check_out ? <span className="text-xs text-[--color-error]">{errors.check_out}</span> : null}
        </label>
      </div>

      <label className="grid gap-2 text-sm text-[--color-text-sub]">
        <span className="font-medium text-[--color-text]">Status</span>
        <select
          value={form.status_id}
          onChange={(e) => onChange("status_id", e.target.value)}
          className="input"
        >
          <option value="">Select a status</option>
          {statuses.map((status) => (
            <option key={status.id} value={String(status.id)}>
              {status.label || status.name}
            </option>
          ))}
        </select>
        {errors.status_id ? <span className="text-xs text-[--color-error]">{errors.status_id}</span> : null}
      </label>

      <div className="rounded-2xl border border-[--color-border] bg-[--color-bg-subtle] p-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-[--color-text-sub]">Stay length</span>
          <span className="font-semibold text-[--color-text]">
            {nights > 0 ? `${nights} night${nights > 1 ? "s" : ""}` : "-"}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-[--color-text-sub]">Estimated total</span>
          <span className="font-semibold text-[--color-text-gold]">
            {total > 0 ? formatCurrency(total) : "-"}
          </span>
        </div>
      </div>
    </div>
  )
}
