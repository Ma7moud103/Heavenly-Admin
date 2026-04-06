import type { Dispatch } from "react"
import { Search } from "lucide-react"
import type {
  BookingsFilterAction,
  BookingsFiltersState,
} from "@/features/bookings/filters"

interface BookingsFiltersBarProps {
  filters: BookingsFiltersState
  statusOptions: string[]
  onDispatch: Dispatch<BookingsFilterAction>
}

export function BookingsFiltersBar({
  filters,
  statusOptions,
  onDispatch,
}: BookingsFiltersBarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-[--color-border] p-4 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[--color-text-sub]" />
        <input
          type="text"
          placeholder="Search bookings by guest, room, or type..."
          value={filters.searchTerm}
          onChange={(e) => onDispatch({ type: "SET_SEARCH", value: e.target.value })}
          className="input pl-10"
        />
      </div>

      <div className="flex gap-2">
        <select
          value={filters.statusFilter}
          onChange={(e) => onDispatch({ type: "SET_STATUS", value: e.target.value })}
          className="input w-auto"
        >
          <option value="all">All Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status.toLowerCase()}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
