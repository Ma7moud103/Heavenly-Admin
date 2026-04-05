import type { ICreateRoomPayload } from "@/data/createRoom"
import type { IRoom, RoomStatus, IRoomsTypes } from "@/interfaces/IRooms"

export interface ICreateRoomFormState {
  title: string
  base_price: string
  capacity: string
  description: string
  image_url: string
  room_type_id: string
  status_id: string
}

export const initialCreateRoomForm: ICreateRoomFormState = {
  title: "",
  base_price: "",
  capacity: "",
  description: "",
  image_url: "",
  room_type_id: "",
  status_id: "",
}

export function buildCreateRoomPayload(
  form: ICreateRoomFormState
): ICreateRoomPayload {
  return {
    title: form.title.trim(),
    base_price: Number(form.base_price),
    capacity: Number(form.capacity),
    description: form.description.trim() || null,
    image_url: form.image_url.trim() || null,
    room_type_id: form.room_type_id,
    status_id: form.status_id,
  }
}

export function buildRoomFormState(room: IRoom): ICreateRoomFormState {
  return {
    title: room.title || "",
    base_price: String(room.base_price || ""),
    capacity: String(room.capacity || ""),
    description: room.description || "",
    image_url: room.image_url || "",
    room_type_id: room.room_type_id || room.room_type?.id || "",
    status_id: room.status_id || room.status?.id || "",
  }
}

export function validateCreateRoomForm(form: ICreateRoomFormState) {
  const errors: Partial<Record<keyof ICreateRoomFormState, string>> = {}

  if (!form.title.trim()) {
    errors.title = "Room title is required"
  }

  if (!form.base_price.trim() || Number(form.base_price) <= 0) {
    errors.base_price = "Base price must be greater than 0"
  }

  if (!form.capacity.trim() || Number(form.capacity) <= 0) {
    errors.capacity = "Capacity must be greater than 0"
  }

  if (!form.room_type_id) {
    errors.room_type_id = "Room type is required"
  }

  if (!form.status_id) {
    errors.status_id = "Room status is required"
  }

  return errors
}

export function getDefaultRoomTypeId(roomTypes: IRoomsTypes[]) {
  return roomTypes[0]?.id ?? ""
}

export function getDefaultRoomStatusId(statuses: RoomStatus[]) {
  return statuses[0]?.id ?? ""
}

export function getRoomTypePrice(roomTypes: IRoomsTypes[], roomTypeId: string) {
  const selectedType = roomTypes.find((type) => type.id === roomTypeId)
  return selectedType ? String(selectedType.price) : ""
}
