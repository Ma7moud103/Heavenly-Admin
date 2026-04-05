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
import UseUpdateRoom from "@/hooks/UseUpdateRoom"
import type { IRoom, RoomStatus, IRoomsTypes } from "@/interfaces/IRooms"
import {
  buildCreateRoomPayload,
  buildRoomFormState,
  getDefaultRoomStatusId,
  getDefaultRoomTypeId,
  getRoomTypePrice,
  initialCreateRoomForm,
  validateCreateRoomForm,
  type ICreateRoomFormState,
} from "@/features/rooms/createRoomForm"
import { CreateRoomFormFields } from "@/features/rooms/components/CreateRoomFormFields"

interface IProps {
  mode: "create" | "edit"
  open: boolean
  room?: IRoom | null
  roomStatuses: RoomStatus[]
  roomTypes: IRoomsTypes[]
  onOpenChange: (open: boolean) => void
}

export function RoomFormSheet({
  mode,
  open,
  room,
  roomStatuses,
  roomTypes,
  onOpenChange,
}: IProps) {
  const createRoomMutation = UseCreateRoom()
  const updateRoomMutation = UseUpdateRoom()
  const [form, setForm] = useState<ICreateRoomFormState>(initialCreateRoomForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ICreateRoomFormState, string>>>({})

  useEffect(() => {
    if (!open) return

    if (mode === "edit" && room) {
      setForm(buildRoomFormState(room))
      return
    }

    const defaultRoomTypeId = getDefaultRoomTypeId(roomTypes)
    setForm((current) => {
      const roomTypeId = current.room_type_id || defaultRoomTypeId

      return {
        ...initialCreateRoomForm,
        room_type_id: roomTypeId,
        status_id: getDefaultRoomStatusId(roomStatuses),
        base_price: getRoomTypePrice(roomTypes, roomTypeId),
      }
    })
  }, [mode, open, room, roomStatuses, roomTypes])

  const activeMutation = mode === "edit" ? updateRoomMutation : createRoomMutation

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
      updateRoomMutation.reset()
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
      const payload = buildCreateRoomPayload(form)

      if (mode === "edit" && room) {
        await updateRoomMutation.mutateAsync({ roomId: room.id, payload })
        toast.success("Room updated successfully")
      } else {
        await createRoomMutation.mutateAsync(payload)
        toast.success("Room created successfully")
      }

      handleClose(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to ${mode} room`
      toast.error(message)
    }
  }

  const title = mode === "edit" ? "Edit Room" : "Add New Room"
  const description =
    mode === "edit"
      ? "Update room details, pricing, image, type, and status."
      : "Create a room with pricing, capacity, image, and linked room type and status."
  const submitLabel = activeMutation.isPending
    ? mode === "edit"
      ? "Saving..."
      : "Creating..."
    : mode === "edit"
      ? "Save Changes"
      : "Create Room"

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <form className="flex h-full flex-col" onSubmit={handleSubmit}>
          <CreateRoomFormFields
            errors={errors}
            form={form}
            roomStatuses={roomStatuses}
            roomTypes={roomTypes}
            onChange={handleChange}
          />

          {activeMutation.isError ? (
            <p className="px-4 text-sm text-[--color-error]">{activeMutation.error.message}</p>
          ) : null}

          <SheetFooter className="border-t border-[--color-border] sm:flex-row sm:justify-end">
            <button type="button" className="btn btn-ghost" onClick={() => handleClose(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={activeMutation.isPending}>
              {submitLabel}
            </button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
