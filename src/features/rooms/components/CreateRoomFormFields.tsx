import type { RoomStatus, IRoomsTypes } from "@/interfaces/IRooms"
import type { ICreateRoomFormState } from "@/features/rooms/createRoomForm"

interface CreateRoomFormFieldsProps {
  errors: Partial<Record<keyof ICreateRoomFormState, string>>
  form: ICreateRoomFormState
  roomStatuses: RoomStatus[]
  roomTypes: IRoomsTypes[]
  onChange: <K extends keyof ICreateRoomFormState>(field: K, value: ICreateRoomFormState[K]) => void
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
      <label className="grid gap-1.5 text-sm">
        <span className="text-[--color-text-sub]">Room Title</span>
        <input
          type="text"
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          className="input"
          placeholder="Deluxe King 101"
        />
        <FieldError message={errors.title} />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm">
          <span className="text-[--color-text-sub]">Base Price</span>
          <input
            type="number"
            min={0}
            inputMode="decimal"
            value={form.base_price}
            onChange={(e) => onChange("base_price", e.target.value)}
            className="input"
            placeholder="250"
          />
          <FieldError message={errors.base_price} />
        </label>

        <label className="grid gap-1.5 text-sm">
          <span className="text-[--color-text-sub]">Capacity</span>
          <input
            type="number"
            min={1}
            inputMode="numeric"
            value={form.capacity}
            onChange={(e) => onChange("capacity", e.target.value)}
            className="input"
            placeholder="2"
          />
          <FieldError message={errors.capacity} />
        </label>
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

      <label className="grid gap-1.5 text-sm">
        <span className="text-[--color-text-sub]">Image URL</span>
        <input
          type="url"
          value={form.image_url}
          onChange={(e) => onChange("image_url", e.target.value)}
          className="input"
          placeholder="https://example.com/room.jpg"
        />
      </label>

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
