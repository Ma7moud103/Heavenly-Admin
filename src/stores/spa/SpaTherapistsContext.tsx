import { createContext, useCallback, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { toast } from 'react-toastify';
import UseSpaTherapists from '@/hooks/spa/UseSpaTherapists';
import UseSpaTherapistBooking from '@/hooks/spa/UseSpaTherapistBooking';
import UseTherapistDaySchedules from '@/hooks/spa/UseTherapistDaySchedules';
import { useDeleteSpaTherapist } from '@/hooks/spa/useDeleteSpaTherapist';
import type { ISpaTherapists } from '@/interfaces/ISpa';
import { getTodayInCairo } from '@/utils/dates';

type TherapistList = ReturnType<typeof UseSpaTherapists>;
const EMPTY_THERAPISTS: NonNullable<TherapistList['data']> = [];
type DaySchedule = NonNullable<ReturnType<typeof UseTherapistDaySchedules>['data']>[number];
interface RosterContextValue {
  therapists: NonNullable<TherapistList['data']>;
  isLoading: boolean;
  isError: boolean;
  error: TherapistList['error'];
  specialties: string[];
}

interface ScheduleContextValue {
  todayMap: Map<string, DaySchedule>;
  todayScheduleError: boolean;
}
interface BookingContextValue {
  bookedIds?: Set<string>;
  bookingsLoading: boolean;
  bookingsError: boolean;
}
interface FilterContextValue {
  search: string;
  specialty: string;
  availability: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setSpecialty: Dispatch<SetStateAction<string>>;
  setAvailability: Dispatch<SetStateAction<string>>;
}
interface UiContextValue {
  selected?: ISpaTherapists;
  formOpen: boolean;
  scheduleOpen: boolean;
  detailsOpen: boolean;
  deleteOpen: boolean;
  deletePending: boolean;
  deleteLocked: boolean;
  deleteReason: string;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  setScheduleOpen: Dispatch<SetStateAction<boolean>>;
  setDetailsOpen: Dispatch<SetStateAction<boolean>>;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => Promise<void>;
}
interface ActionContextValue {
  openCreate: () => void;
  openView: (therapist: ISpaTherapists) => void;
  openEdit: (therapist: ISpaTherapists) => void;
  openSchedule: (therapist: ISpaTherapists) => void;
  openDelete: (therapist: ISpaTherapists) => void;
}
const RosterContext = createContext<RosterContextValue | null>(null);
const ScheduleContext = createContext<ScheduleContextValue | null>(null);
const BookingContext = createContext<BookingContextValue | null>(null);
const FilterContext = createContext<FilterContextValue | null>(null);
const UiContext = createContext<UiContextValue | null>(null);
const ActionContext = createContext<ActionContextValue | null>(null);

export function SpaTherapistsProvider({ children }: { children: ReactNode }) {
  const query = UseSpaTherapists();
  const therapistData = query.data ?? EMPTY_THERAPISTS;
  const bookings = UseSpaTherapistBooking();
  const bookedIds = bookings.data;
  const bookingsLoading = bookings.isLoading;
  const bookingsError = bookings.isError;
  const todayQuery = UseTherapistDaySchedules(getTodayInCairo());
  const remove = useDeleteSpaTherapist();
  const deletePending = remove.isPending;
  const mutateDelete = remove.mutateAsync;
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [selected, setSelected] = useState<ISpaTherapists>();
  const [formOpen, setFormOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const specialties = useMemo(
    () => [...new Set(therapistData.map((item) => item.specialty).filter((item): item is string => Boolean(item)))].sort(),
    [therapistData],
  );
  const todayMap = useMemo(() => new Map((todayQuery.data ?? []).map((item) => [item.therapist_id, item])), [todayQuery.data]);
  const rosterValue = useMemo<RosterContextValue>(
    () => ({ therapists: therapistData, isLoading: query.isLoading, isError: query.isError, error: query.error, specialties }),
    [therapistData, query.isLoading, query.isError, query.error, specialties],
  );
  const scheduleValue = useMemo(() => ({ todayMap, todayScheduleError: todayQuery.isError }), [todayMap, todayQuery.isError]);
  const bookingValue = useMemo(() => ({ bookedIds, bookingsLoading, bookingsError }), [bookedIds, bookingsLoading, bookingsError]);
  const filterValue = useMemo(
    () => ({ search, specialty, availability, setSearch, setSpecialty, setAvailability }),
    [search, specialty, availability],
  );
  const openCreate = useCallback(() => {
    setSelected(undefined);
    setFormOpen(true);
  }, []);
  const openView = useCallback((therapist: ISpaTherapists) => {
    setSelected(therapist);
    setDetailsOpen(true);
  }, []);
  const openEdit = useCallback((therapist: ISpaTherapists) => {
    setSelected(therapist);
    setFormOpen(true);
  }, []);
  const openSchedule = useCallback((therapist: ISpaTherapists) => {
    setSelected(therapist);
    setScheduleOpen(true);
  }, []);
  const openDelete = useCallback((therapist: ISpaTherapists) => {
    setSelected(therapist);
    setDeleteOpen(true);
  }, []);
  const actionValue = useMemo(
    () => ({ openCreate, openView, openEdit, openSchedule, openDelete }),
    [openCreate, openView, openEdit, openSchedule, openDelete],
  );
  const handleDelete = useCallback(async () => {
    if (!selected) return;
    try {
      await mutateDelete(selected.id);
      toast.success('Therapist deleted');
      setDeleteOpen(false);
      setSelected(undefined);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not delete therapist');
    }
  }, [selected, mutateDelete]);
  const deleteLocked = bookingsLoading || bookingsError || Boolean(selected && bookedIds?.has(selected.id));
  const deleteReason = bookingsError
    ? 'Booking history could not be checked; deletion is disabled.'
    : bookingsLoading
      ? 'Checking booking history…'
      : 'This therapist has booking history and cannot be deleted.';
  const uiValue = useMemo<UiContextValue>(
    () => ({
      selected,
      formOpen,
      scheduleOpen,
      detailsOpen,
      deleteOpen,
      deletePending,
      deleteLocked,
      deleteReason,
      setFormOpen,
      setScheduleOpen,
      setDetailsOpen,
      setDeleteOpen,
      handleDelete,
    }),
    [selected, formOpen, scheduleOpen, detailsOpen, deleteOpen, deletePending, deleteLocked, deleteReason, handleDelete],
  );

  return (
    <RosterContext.Provider value={rosterValue}>
      <ScheduleContext.Provider value={scheduleValue}>
        <BookingContext.Provider value={bookingValue}>
          <FilterContext.Provider value={filterValue}>
            <ActionContext.Provider value={actionValue}>
              <UiContext.Provider value={uiValue}>{children}</UiContext.Provider>
            </ActionContext.Provider>
          </FilterContext.Provider>
        </BookingContext.Provider>
      </ScheduleContext.Provider>
    </RosterContext.Provider>
  );
}
function required<T>(value: T | null, name: string): T {
  if (!value) throw new Error(name + ' must be used inside SpaTherapistsProvider');
  return value;
}
export const useTherapistRosterContext = () => required(useContext(RosterContext), 'useTherapistRosterContext');
export const useTherapistScheduleContext = () => required(useContext(ScheduleContext), 'useTherapistScheduleContext');
export const useTherapistBookingContext = () => required(useContext(BookingContext), 'useTherapistBookingContext');
export const useTherapistFilterContext = () => required(useContext(FilterContext), 'useTherapistFilterContext');
export const useTherapistUiContext = () => required(useContext(UiContext), 'useTherapistUiContext');
export const useTherapistActionsContext = () => required(useContext(ActionContext), 'useTherapistActionsContext');
