import { toast } from "react-toastify"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import UseDeleteRoom from "@/hooks/UseDeleteRoom"
import type { IRoom } from "@/interfaces/IRooms"

interface IProps {
  open: boolean
  room: IRoom | null
  onOpenChange: (open: boolean) => void
}

export function DeleteRoomSheet({ open, room, onOpenChange }: IProps) {
  const deleteRoomMutation = UseDeleteRoom()

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      deleteRoomMutation.reset()
    }

    onOpenChange(nextOpen)
  }

  const handleDelete = async () => {
    if (!room) return

    try {
      await deleteRoomMutation.mutateAsync(room.id)
      toast.success("Room deleted successfully")
      handleClose(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete room"
      toast.error(message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className=" space-y-4">
          <DialogTitle className="text-xl text-center">Delete this room?</DialogTitle>
          <DialogDescription className="text-center">
            {room?.title
              ? `Are you sure you want to delete ${room.title}? This action cannot be undone.`
              : "Are you sure you want to delete this room? This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>

        {deleteRoomMutation.isError ? (
          <p className="px-4 text-sm text-[--color-error]">{deleteRoomMutation.error.message}</p>
        ) : null}

        <DialogFooter className="border-t border-[--color-border]">
          <button type="button" className="btn btn-ghost" onClick={() => handleClose(false)}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary bg-[--color-error] text-white hover:bg-[--color-error]/90"
            onClick={handleDelete}
            disabled={deleteRoomMutation.isPending}
          >
            {deleteRoomMutation.isPending ? "Deleting..." : "Delete Room"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
