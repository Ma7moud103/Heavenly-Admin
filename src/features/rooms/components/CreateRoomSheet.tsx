import { useEffect, useState, type FormEvent } from "react"
import { toast } from "react-toastify"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import UseCreateRoom from "@/hooks/UseCreateRoom"
import type { RoomStatus, IRoomsTypes } from "@/interfaces/IRooms"
import {
  buildCreateRoomPayload,
  getDefaultRoomStatusId,
  getDefaultRoomTypeId,
  getRoomTypePrice,
  initialCreateRoomForm,
  validateCreateRoomForm,
  type ICreateRoomFormState,
} from "@/features/rooms/createRoomForm"
import { CreateRoomFormFields } from "@/features/rooms/components/CreateRoomFormFields"

interface IProps {
  open: boolean
  roomStatuses: RoomStatus[]
  roomTypes: IRoomsTypes[]
  onOpenChange: (open: boolean) => void
}

export function CreateRoomSheet({
  open,
  roomStatuses,
  roomTypes,
  onOpenChange,
}: IProps) {
  const createRoomMutation = UseCreateRoom()
  const [form, setForm] = useState<ICreateRoomFormState>(initialCreateRoomForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ICreateRoomFormState, string>>>({})

  useEffect(() => {
    if (!open) {
      return
    }

    const defaultRoomTypeId = getDefaultRoomTypeId(roomTypes)

    setForm((current) => {
      const roomTypeId = current.room_type_id || defaultRoomTypeId

      return {
        ...current,
        room_type_id: roomTypeId,
        status_id: current.status_id || getDefaultRoomStatusId(roomStatuses),
        base_price: current.base_price || getRoomTypePrice(roomTypes, roomTypeId),
      }
    })
  }, [open, roomStatuses, roomTypes])

  const handleChange = <K extends keyof ICreateRoomFormState>(
    field: K,
    value: ICreateRoomFormState[K]
  ) => {
    setForm((current) => {
      if (field === "room_type_id") {
        return {
          ...current,
          room_type_id: value,
          base_price: getRoomTypePrice(roomTypes, value),
        }
      }

      return { ...current, [field]: value }
    })

    setErrors((current) => ({
      ...current,
      [field]: undefined,
      ...(field === "room_type_id" ? { base_price: undefined } : {}),
    }))
  }

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setForm(initialCreateRoomForm)
      setErrors({})
      createRoomMutation.reset()
    }

    onOpenChange(nextOpen)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateCreateRoomForm(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    try {
      await createRoomMutation.mutateAsync(buildCreateRoomPayload(form), {
        onSuccess: () => {
          toast.success("Room created successfully")
          handleClose(false)
        },
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create room"
      toast.error(message)
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Add New Room</SheetTitle>
          <SheetDescription>
            Create a room with pricing, capacity, image, and linked room type and status.
          </SheetDescription>
        </SheetHeader>

        <form className="flex h-full flex-col" onSubmit={handleSubmit}>
          <CreateRoomFormFields
            errors={errors}
            form={form}
            roomStatuses={roomStatuses}
            roomTypes={roomTypes}
            onChange={handleChange}
          />

          {createRoomMutation.isError ? (
            <p className="px-4 text-sm text-[--color-error]">
              {createRoomMutation.error.message}
            </p>
          ) : null}

          <SheetFooter className="border-t border-[--color-border]">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => handleClose(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={createRoomMutation.isPending}
            >
              {createRoomMutation.isPending ? "Saving..." : "Create Room"}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
