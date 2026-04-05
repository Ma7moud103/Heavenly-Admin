import { SharedInput } from "@/components/shared/SharedInput"
import type { ICreateRoomFormState } from "@/features/rooms/createRoomForm"
import type { RoomStatus, IRoomsTypes } from "@/interfaces/IRooms"

interface CreateRoomFormFieldsProps {
  errors: Partial<Record<keyof ICreateRoomFormState, string>>
  form: ICreateRoomFormState
  roomStatuses: RoomStatus[]
  roomTypes: IRoomsTypes[]
  onChange: <K extends keyof ICreateRoomFormState>(
    field: K,
    value: ICreateRoomFormState[K]
  ) => void
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null

  return <p className="text-xs text-[--color-error]">{message}</p>
}

export function CreateRoomFormFields({
  errors,
  form,
  roomStatuses,
  roomTypes,
  onChange,
}: CreateRoomFormFieldsProps) {
  return (
    <div className="grid gap-4 p-4">
      <SharedInput
        label="Room Title"
        type="text"
        value={form.title}
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="Deluxe King 101"
        error={errors.title}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SharedInput
          label="Base Price"
          type="number"
          min={0}
          inputMode="decimal"
          value={form.base_price}
          onChange={(e) => onChange("base_price", e.target.value)}
          placeholder="250"
          error={errors.base_price}
        />

        <SharedInput
          label="Capacity"
          type="number"
          min={1}
          inputMode="numeric"
          value={form.capacity}
          onChange={(e) => onChange("capacity", e.target.value)}
          placeholder="2"
          error={errors.capacity}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-[--color-text-sub]">Room Type</span>
          <select
            value={form.room_type_id}
            onChange={(e) => onChange("room_type_id", e.target.value)}
            className="input"
          >
            <option value="">Select room type</option>
            {roomTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <FieldError message={errors.room_type_id} />
        </label>

        <label className="grid gap-1.5 text-sm">
          <span className="text-[--color-text-sub]">Room Status</span>
          <select
            value={form.status_id}
            onChange={(e) => onChange("status_id", e.target.value)}
            className="input"
          >
            <option value="">Select room status</option>
            {roomStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label || status.name}
              </option>
            ))}
          </select>
          <FieldError message={errors.status_id} />
        </label>
      </div>

      <SharedInput
        label="Image URL"
        type="url"
        value={form.image_url}
        onChange={(e) => onChange("image_url", e.target.value)}
        placeholder="https://example.com/room.jpg"
      />

      <label className="grid gap-1.5 text-sm">
        <span className="text-[--color-text-sub]">Description</span>
        <textarea
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="min-h-28 rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          placeholder="Add room details, amenities, or location notes..."
        />
      </label>
    </div>
  )
}
