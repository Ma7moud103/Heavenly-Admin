import { createContext, useCallback, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { toast } from 'react-toastify';
import UseSpaTherapistBooking from '@/hooks/spa/therapists/UseSpaTherapistBooking';
import { useDeleteSpaTherapist } from '@/hooks/spa/therapists/useDeleteSpaTherapist';
import type { ISpaTherapists } from '@/interfaces/ISpa';

interface IFilterContextValue {
  search: string;
  serviceId: string;
  availability: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setServiceId: Dispatch<SetStateAction<string>>;
  setAvailability: Dispatch<SetStateAction<string>>;
}
interface IUiContextValue {
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
interface IActionContextValue {
  openCreate: () => void;
  openView: (therapist: ISpaTherapists) => void;
  openEdit: (therapist: ISpaTherapists) => void;
  openSchedule: (therapist: ISpaTherapists) => void;
  openDelete: (therapist: ISpaTherapists) => void;
}
const FilterContext = createContext<IFilterContextValue | null>(null);
const UiContext = createContext<IUiContextValue | null>(null);
const ActionContext = createContext<IActionContextValue | null>(null);

export function SpaTherapistsProvider({ children }: { children: ReactNode }) {
  const { data: bookings, isLoading: bookingsLoading, isError: bookingsError } = UseSpaTherapistBooking();
  const { isPending: deletePending, mutateAsync: mutateDelete } = useDeleteSpaTherapist();


  const [search, setSearch] = useState('');
  const [serviceId, setServiceId] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [selected, setSelected] = useState<ISpaTherapists>();
  const [formOpen, setFormOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filterValue = useMemo<IFilterContextValue>(
    () => ({ search, serviceId, availability, setSearch, setServiceId, setAvailability }),
    [search, serviceId, availability],
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

  const actionValue = useMemo<IActionContextValue>(
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
  const deleteLocked = bookingsLoading || bookingsError || Boolean(selected && bookings?.has(selected.id));
  const deleteReason = bookingsError
    ? 'Booking history could not be checked; deletion is disabled.'
    : bookingsLoading
      ? 'Checking booking historyأ¢â‚¬آ¦'
      : 'This therapist has booking history and cannot be deleted.';
  const uiValue = useMemo<IUiContextValue>(
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
    <FilterContext.Provider value={filterValue}>
      <ActionContext.Provider value={actionValue}>
        <UiContext.Provider value={uiValue}>{children}</UiContext.Provider>
      </ActionContext.Provider>
    </FilterContext.Provider>
  );
}
function checkValue<T>(value: T | null, name: string): T {
  if (!value) throw new Error(name + ' must be used inside SpaTherapistsProvider');
  return value;
}

export const useTherapistFilterContext = () => checkValue(useContext(FilterContext), 'useTherapistFilterContext');
export const useTherapistUiContext = () => checkValue(useContext(UiContext), 'useTherapistUiContext');
export const useTherapistActionsContext = () => checkValue(useContext(ActionContext), 'useTherapistActionsContext');
