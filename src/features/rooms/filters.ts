export interface RoomsFiltersState {
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

export type RoomsFilterAction =
  | SetSearchAction
  | SetStatusAction
  | SetTypeAction
  | SetMinPriceAction
  | SetMaxPriceAction
  | SetMinCapacityAction
  | ToggleImageAction
  | ToggleDescriptionAction
  | ResetFiltersAction

export const initialRoomsFilters: RoomsFiltersState = {
  searchTerm: "",
  statusFilter: "all",
  typeFilter: "all",
  minPrice: "",
  maxPrice: "",
  minCapacity: "",
  hasImage: false,
  hasDescription: false,
}

export function roomsFilterReducer(
  state: RoomsFiltersState,
  action: RoomsFilterAction
): RoomsFiltersState {
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
      return initialRoomsFilters
    default:
      return state
  }
}
