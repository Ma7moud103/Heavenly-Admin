import { toast } from "react-toastify"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
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
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Delete Room</SheetTitle>
          <SheetDescription>
            This will permanently delete {room?.title || "this room"}. This action cannot be undone.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="rounded-2xl border border-[--color-error]/20 bg-[--color-error-bg] p-4 text-sm text-[--color-text]">
            Room ID: <span className="font-medium">{room?.id || "-"}</span>
          </div>

          {deleteRoomMutation.isError ? (
            <p className="text-sm text-[--color-error]">{deleteRoomMutation.error.message}</p>
          ) : null}
        </div>

        <SheetFooter className="border-t border-[--color-border] sm:flex-row sm:justify-end">
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
