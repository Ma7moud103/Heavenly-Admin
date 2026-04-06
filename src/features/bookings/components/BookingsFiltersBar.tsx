import type { Dispatch } from "react"
import { Filter, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="btn btn-ghost" type="button">
              <Filter className="h-4 w-4" />
              More Filters
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-3">
            <DropdownMenuLabel className="px-0 text-[--color-text-sub]">
              Refine Bookings
            </DropdownMenuLabel>
            <div className="mt-2 grid gap-3">
              <label className="grid gap-1 text-xs text-[--color-text-sub]">
                Status
                <select
                  value={filters.statusFilter}
                  onChange={(e) =>
                    onDispatch({ type: "SET_STATUS", value: e.target.value })
                  }
                  className="input h-9"
                >
                  <option value="all">All Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status.toLowerCase()}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <DropdownMenuSeparator className="my-3" />
            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => onDispatch({ type: "RESET" })}
              >
                Reset
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
