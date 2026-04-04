import { useReducer } from "react"
import { Search, Filter, Plus, MoreHorizontal, BedDouble, Layers } from "lucide-react"
import { StatCard } from "@/features/dashboard/components/StatCard"
import { DataTable } from "@/features/dashboard/components/DataTable"
import { Badge } from "@/features/dashboard/components/Badge"
import { useHotelStats } from "@/hooks/getHotelStats"
import UseRooms from "@/hooks/UseRooms"
import type { IRoom } from "@/interfaces/IRooms"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const statusVariants: Record<string, "success" | "warning" | "error" | "purple"> = {
  available: "success",
  occupied: "error",
  reserved: "warning",
  maintenance: "purple",
}


interface IState {
  searchTerm: string
  statusFilter: string
  typeFilter: string
  minPrice: string
  maxPrice: string
  minCapacity: string
  hasImage: boolean
  hasDescription: boolean
}

interface SetSearchAction {
  type: "SET_SEARCH"
  value: string
}

interface SetStatusAction {
  type: "SET_STATUS"
  value: string
}

interface SetTypeAction {
  type: "SET_TYPE"
  value: string
}

interface SetMinPriceAction {
  type: "SET_MIN_PRICE"
  value: string
}

interface SetMaxPriceAction {
  type: "SET_MAX_PRICE"
  value: string
}

interface SetMinCapacityAction {
  type: "SET_MIN_CAPACITY"
  value: string
}

interface ToggleImageAction {
  type: "TOGGLE_IMAGE"
  value: boolean
}

interface ToggleDescriptionAction {
  type: "TOGGLE_DESCRIPTION"
  value: boolean
}

interface ResetFiltersAction {
  type: "RESET"
}

type RoomsFilterAction =
  | SetSearchAction
  | SetStatusAction
  | SetTypeAction
  | SetMinPriceAction
  | SetMaxPriceAction
  | SetMinCapacityAction
  | ToggleImageAction
  | ToggleDescriptionAction
  | ResetFiltersAction


  const initialValues :IState = {
    searchTerm: "",
    statusFilter: "all",
    typeFilter: "all",
    minPrice: "",
    maxPrice: "",
    minCapacity: "",
    hasImage: false,
    hasDescription: false,
  };

export default function Rooms() {
  
  const [filters, dispatch] = useReducer(
    (state: IState, action: RoomsFilterAction) => {
      switch (action.type) {
        case "SET_SEARCH":
          return { ...state, searchTerm: action.value }
        case "SET_STATUS":
          return { ...state, statusFilter: action.value }
        case "SET_TYPE":
          return { ...state, typeFilter: action.value }
        case "SET_MIN_PRICE":
          return { ...state, minPrice: action.value }
        case "SET_MAX_PRICE":
          return { ...state, maxPrice: action.value }
        case "SET_MIN_CAPACITY":
          return { ...state, minCapacity: action.value }
        case "TOGGLE_IMAGE":
          return { ...state, hasImage: action.value }
        case "TOGGLE_DESCRIPTION":
          return { ...state, hasDescription: action.value }
        case "RESET":
          return {
            searchTerm: "",
            statusFilter: "all",
            typeFilter: "all",
            minPrice: "",
            maxPrice: "",
            minCapacity: "",
            hasImage: false,
            hasDescription: false,
          }
        default:
          return state
      }
    }, initialValues
  )
  const { data: hotelStats } = useHotelStats()
  const { data: rooms } = UseRooms()
  const roomsData = rooms ?? []
  console.log(roomsData)

  const roomTypeOptions = Array.from(
    new Set(roomsData.map((room) => room.room_type?.name).filter(Boolean))
  ) as string[]


  const filteredRooms = roomsData.filter((room) => {
    // Search across name, type, and description.
    const term = filters.searchTerm.trim().toLowerCase()
    const titleMatch = (room.title || "").toLowerCase().includes(term)
    const typeMatch = (room.room_type?.name || "").toLowerCase().includes(term)
    const descMatch = (room.description || "").toLowerCase().includes(term)
    const matchesSearch = term.length === 0 || titleMatch || typeMatch || descMatch

    // Status filter (matches by label or name).
    const statusLabel = (room.status?.label || room.status?.name || "").toLowerCase()
    const matchesStatus =
      filters.statusFilter === "all" || statusLabel === filters.statusFilter

    // Type filter (exact match).
    const matchesType =
      filters.typeFilter === "all" ||
      (room.room_type?.name || "") === filters.typeFilter

    // Numeric filters.
    const roomPrice = Number(room.base_price || 0)
    const minPriceValue =
      filters.minPrice.trim() === "" ? null : Number(filters.minPrice)
    const maxPriceValue =
      filters.maxPrice.trim() === "" ? null : Number(filters.maxPrice)
    const matchesMinPrice = minPriceValue === null || roomPrice >= minPriceValue
    const matchesMaxPrice = maxPriceValue === null || roomPrice <= maxPriceValue

    const roomCapacity = Number(room.capacity || 0)
    const minCapacityValue =
      filters.minCapacity.trim() === "" ? null : Number(filters.minCapacity)
    const matchesCapacity =
      minCapacityValue === null || roomCapacity >= minCapacityValue

    // Attribute toggles.
    const matchesImage = !filters.hasImage || Boolean(room.image_url)
    const matchesDescription =
      !filters.hasDescription || Boolean(room.description?.trim())

    return (
      matchesSearch &&
      matchesStatus &&
      matchesType &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesCapacity &&
      matchesImage &&
      matchesDescription
    )
  })

  const columns = [
    {
      key: "id",
      header: "Room",
      cell: (row: IRoom) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[--color-bg-inset] flex items-center justify-center">
            <BedDouble className="w-5 h-5 text-[--color-text-sub]" />
          </div>
          <div>
            <div className="font-semibold">{row.title || row.id}</div>
            <div className="text-xs text-[--color-text-muted] flex items-center gap-1">
              <Layers className="w-3 h-3" /> Capacity {row.capacity}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      cell: (row: IRoom) => (
        <span className="font-medium">{row.room_type?.name || row.title || "â€”"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: IRoom) => {
        const statusLabel = row.status?.label || row.status?.name || "Unknown"
        const statusKey = statusLabel.toLowerCase()
        const variant = statusVariants[statusKey] || "purple"
        return <Badge variant={variant}>{statusLabel}</Badge>
      },
    },
    {
      key: "price",
      header: "Rate",
      cell: (row: IRoom) => (
        <span className="font-medium">${row.base_price}<span className="text-[--color-text-muted] text-xs">/night</span></span>
      ),
    },
    {
      key: "actions",
      header: "",
      cell: () => (
        <button className="p-2 hover:bg-[--color-bg-subtle] rounded-lg transition-colors">
          <MoreHorizontal className="w-4 h-4 text-[--color-text-muted]" />
        </button>
      ),
      className: "w-10",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Rooms</h1>
          <p className="text-[--color-text-sub]">Manage hotel rooms and availability</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Rooms"
          value={hotelStats?.total_rooms}
          icon={<BedDouble className="w-5 h-5" />}
        />
        <StatCard
          title="Occupied"
          value={hotelStats?.occupied_rooms}
          variant="error"
          icon={<BedDouble className="w-5 h-5" />}
        />
        <StatCard
          title="Available"
          value={hotelStats?.available_rooms}
          variant="success"
          icon={<BedDouble className="w-5 h-5" />}
        />
        <StatCard
          title="Maintenance"
          value={hotelStats?.maintenance_rooms}
          variant="warning"
          icon={<BedDouble className="w-5 h-5" />}
        />
      </div>

      <section className="card">
        <div className="p-4 border-b border-[--color-border] flex flex-col sm:flex-row gap-4">


          {/* search bar and filters */}

          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[--color-text-sub]" />
            <input
              type="text"
              placeholder="Search rooms by name, type, or description..."
              value={filters.searchTerm}
              onChange={(e) =>
                dispatch({ type: "SET_SEARCH", value: e.target.value })
              }
              className="input pl-10"
            />
          </div>


          <div className="flex gap-2">
            <select
              value={filters.statusFilter}
              onChange={(e) =>
                dispatch({ type: "SET_STATUS", value: e.target.value })
              }
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
                  <Filter className="w-4 h-4" />
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
                      onChange={(e) =>
                        dispatch({ type: "SET_TYPE", value: e.target.value })
                      }
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
                        onChange={(e) =>
                          dispatch({ type: "SET_MIN_PRICE", value: e.target.value })
                        }
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
                        onChange={(e) =>
                          dispatch({ type: "SET_MAX_PRICE", value: e.target.value })
                        }
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
                        dispatch({
                          type: "SET_MIN_CAPACITY",
                          value: e.target.value,
                        })
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
                          dispatch({ type: "TOGGLE_IMAGE", value: e.target.checked })
                        }
                      />
                      Has image
                    </label>
                    <label className="flex items-center gap-2 text-sm text-[--color-text-sub]">
                      <input
                        type="checkbox"
                        checked={filters.hasDescription}
                        onChange={(e) =>
                          dispatch({
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
                    onClick={() => dispatch({ type: "RESET" })}
                  >
                    Reset
                  </button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <DataTable
          data={filteredRooms}
          columns={columns}
          emptyMessage="No rooms found"
        />
      </section>
    </div>
  )
}
