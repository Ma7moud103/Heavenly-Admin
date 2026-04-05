import { Filter, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type {
  RoomsFilterAction,
  RoomsFiltersState,
} from "@/features/rooms/filters"

interface RoomsFiltersBarProps {
  filters: RoomsFiltersState
  roomTypeOptions: string[]
  onDispatch: React.Dispatch<RoomsFilterAction>
}

export function RoomsFiltersBar({
  filters,
  roomTypeOptions,
  onDispatch,
}: RoomsFiltersBarProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-[--color-border] p-4 sm:flex-row">
      <div className="relative flex-1 ">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[--color-text-sub]" />
        <input
          type="text"
          placeholder="Search rooms by name, type, or description..."
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
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="reserved">Reserved</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="btn btn-ghost">
              <Filter className="h-4 w-4" />
              More Filters
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-3">
            <DropdownMenuLabel className="px-0 text-[--color-text-sub]">
              Refine Rooms
            </DropdownMenuLabel>
            <div className="mt-2 grid gap-3">
              <label className="grid gap-1 text-xs text-[--color-text-sub]">
                Room Type
                <select
                  value={filters.typeFilter}
                  onChange={(e) => onDispatch({ type: "SET_TYPE", value: e.target.value })}
                  className="input h-9"
                >
                  <option value="all">All Types</option>
                  {roomTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1 text-xs text-[--color-text-sub]">
                  Min Price
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={filters.minPrice}
                    onChange={(e) => onDispatch({ type: "SET_MIN_PRICE", value: e.target.value })}
                    className="input h-9"
                    placeholder="0"
                  />
                </label>
                <label className="grid gap-1 text-xs text-[--color-text-sub]">
                  Max Price
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={filters.maxPrice}
                    onChange={(e) => onDispatch({ type: "SET_MAX_PRICE", value: e.target.value })}
                    className="input h-9"
                    placeholder="500"
                  />
                </label>
              </div>

              <label className="grid gap-1 text-xs text-[--color-text-sub]">
                Minimum Capacity
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={filters.minCapacity}
                  onChange={(e) =>
                    onDispatch({ type: "SET_MIN_CAPACITY", value: e.target.value })
                  }
                  className="input h-9"
                  placeholder="2"
                />
              </label>

              <div className="grid gap-2">
                <label className="flex items-center gap-2 text-sm text-[--color-text-sub]">
                  <input
                    type="checkbox"
                    checked={filters.hasImage}
                    onChange={(e) =>
                      onDispatch({ type: "TOGGLE_IMAGE", value: e.target.checked })
                    }
                  />
                  Has image
                </label>
                <label className="flex items-center gap-2 text-sm text-[--color-text-sub]">
                  <input
                    type="checkbox"
                    checked={filters.hasDescription}
                    onChange={(e) =>
                      onDispatch({
                        type: "TOGGLE_DESCRIPTION",
                        value: e.target.checked,
                      })
                    }
                  />
                  Has description
                </label>
              </div>
            </div>
            <DropdownMenuSeparator className="my-3" />
            <div className="flex justify-end gap-2">
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
