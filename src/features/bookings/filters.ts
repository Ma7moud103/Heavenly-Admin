export interface BookingsFiltersState {
  searchTerm: string
  statusFilter: string
}

interface SetSearchAction {
  type: "SET_SEARCH"
  value: string
}

interface SetStatusAction {
  type: "SET_STATUS"
  value: string
}

interface ResetFiltersAction {
  type: "RESET"
}

export type BookingsFilterAction =
  | SetSearchAction
  | SetStatusAction
  | ResetFiltersAction

export const initialBookingsFilters: BookingsFiltersState = {
  searchTerm: "",
  statusFilter: "all",
}

export function bookingsFilterReducer(
  state: BookingsFiltersState,
  action: BookingsFilterAction
): BookingsFiltersState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchTerm: action.value }
    case "SET_STATUS":
      return { ...state, statusFilter: action.value }
    case "RESET":
      return initialBookingsFilters
    default:
      return state
  }
}
