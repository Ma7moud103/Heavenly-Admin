import { useEffect, useMemo, useState, type FormEvent } from "react"
import { toast } from "react-toastify"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { BookingFormFields } from "@/features/bookings/components/BookingFormFields"
import {
  buildBookingFormState,
  buildCreateBookingPayload,
  getDefaultBookingStatusId,
  getDefaultGuestId,
  getDefaultRoomId,
  initialBookingForm,
  validateBookingForm,
  type BookingFormState,
} from "@/features/bookings/bookingForm"
import UseCreateBooking from "@/hooks/UseCreateBooking"
import UseUpdateBooking from "@/hooks/UseUpdateBooking"
import type { BookingStatus, GuestProfile, IRoomBooking } from "@/interfaces/IRoomBookings"
import type { IRoom } from "@/interfaces/IRooms"

interface BookingFormSheetProps {
  mode: "create" | "edit"
  open: boolean
  booking?: IRoomBooking | null
  rooms: IRoom[]
  guests: GuestProfile[]
  statuses: BookingStatus[]
  onOpenChange: (open: boolean) => void
}

export function BookingFormSheet({
  mode,
  open,
  booking,
  rooms,
  guests,
  statuses,
  onOpenChange,
}: BookingFormSheetProps) {
  const createBookingMutation = UseCreateBooking()
  const updateBookingMutation = UseUpdateBooking()
  const [form, setForm] = useState<BookingFormState>(initialBookingForm)
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormState, string>>>({})

  useEffect(() => {
    if (!open) return

    if (mode === "edit" && booking) {
      setForm(buildBookingFormState(booking))
      return
    }

    setForm({
      room_id: getDefaultRoomId(rooms),
      user_id: getDefaultGuestId(guests),
      status_id: getDefaultBookingStatusId(statuses),
      check_in: "",
      check_out: "",
    })
  }, [booking, guests, mode, open, rooms, statuses])

  const activeMutation = mode === "edit" ? updateBookingMutation : createBookingMutation
  const hasRequiredOptions = useMemo(
    () => rooms.length > 0 && guests.length > 0 && statuses.length > 0,
    [guests.length, rooms.length, statuses.length]
  )

  const handleChange = <K extends keyof BookingFormState>(
    field: K,
    value: BookingFormState[K]
  ) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setForm(initialBookingForm)
      setErrors({})
      createBookingMutation.reset()
      updateBookingMutation.reset()
    }

    onOpenChange(nextOpen)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!hasRequiredOptions) {
      toast.error("Booking setup data is incomplete")
      return
    }

    const nextErrors = validateBookingForm(form, rooms, guests, statuses)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    try {
      const payload = buildCreateBookingPayload(form, rooms)

      if (mode === "edit" && booking) {
        await updateBookingMutation.mutateAsync({ bookingId: booking.id, payload })
        toast.success("Booking updated successfully")
      } else {
        await createBookingMutation.mutateAsync(payload)
        toast.success("Booking created successfully")
      }

      handleClose(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to ${mode} booking`
      toast.error(message)
    }
  }

  const title = mode === "edit" ? "Edit Booking" : "Add New Booking"
  const description =
    mode === "edit"
      ? "Update the guest, room, stay dates, and reservation status."
      : "Create a new reservation with a guest, room, stay dates, and status."
  const submitLabel = activeMutation.isPending
    ? mode === "edit"
      ? "Saving..."
      : "Creating..."
    : mode === "edit"
      ? "Save Changes"
      : "Create Booking"

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <form className="flex h-full flex-col" onSubmit={handleSubmit}>
          <BookingFormFields
            form={form}
            errors={errors}
            rooms={rooms}
            guests={guests}
            statuses={statuses}
            onChange={handleChange}
          />

          {!hasRequiredOptions ? (
            <p className="px-4 text-sm text-[--color-text-sub]">
              Rooms, guests, and booking statuses must be available before you can save a booking.
            </p>
          ) : null}

          {activeMutation.isError ? (
            <p className="px-4 text-sm text-[--color-error]">{activeMutation.error.message}</p>
          ) : null}

          <SheetFooter className="border-t border-[--color-border] sm:flex-row sm:justify-end">
            <button type="button" className="btn btn-ghost" onClick={() => handleClose(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={activeMutation.isPending || !hasRequiredOptions}
            >
              {submitLabel}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
