import { Plus } from "lucide-react"

interface RoomsHeaderProps {
  onAddRoom: () => void
}

export function RoomsHeader({ onAddRoom }: RoomsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rooms</h1>
        <p className="text-[--color-text-sub]">Manage hotel rooms and availability</p>
      </div>
      <button className="btn btn-primary" onClick={onAddRoom} type="button">
        <Plus className="h-4 w-4" />
        Add Room
      </button>
    </div>
  )
}
