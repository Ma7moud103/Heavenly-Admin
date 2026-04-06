import { toast } from "react-toastify"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import UseDeleteBooking from "@/hooks/UseDeleteBooking"
import type { IRoomBooking } from "@/interfaces/IRoomBookings"

interface DeleteBookingSheetProps {
  open: boolean
  booking: IRoomBooking | null
  onOpenChange: (open: boolean) => void
}

export function DeleteBookingSheet({
  open,
  booking,
  onOpenChange,
}: DeleteBookingSheetProps) {
  const deleteBookingMutation = UseDeleteBooking()

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      deleteBookingMutation.reset()
    }

    onOpenChange(nextOpen)
  }

  const handleDelete = async () => {
    if (!booking) return

    try {
      await deleteBookingMutation.mutateAsync(booking.id)
      toast.success("Booking deleted successfully")
      handleClose(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete booking"
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center text-xl">Delete this booking?</DialogTitle>
          <DialogDescription className="text-center">
            {booking?.guest?.full_name
              ? `Are you sure you want to delete the booking for ${booking.guest.full_name}? This action cannot be undone.`
              : "Are you sure you want to delete this booking? This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>

        {deleteBookingMutation.isError ? (
          <p className="px-4 text-sm text-[--color-error]">{deleteBookingMutation.error.message}</p>
        ) : null}

        <DialogFooter className="border-t border-[--color-border]">
          <button type="button" className="btn btn-ghost" onClick={() => handleClose(false)}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary bg-[--color-error] text-white hover:bg-[--color-error]/90"
            onClick={handleDelete}
            disabled={deleteBookingMutation.isPending}
          >
            {deleteBookingMutation.isPending ? "Deleting..." : "Delete Booking"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
