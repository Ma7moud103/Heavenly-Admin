import { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DeleteItem } from '@/components/shared/Delete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDeleteTherapistSchedule, useSaveTherapistSchedule, useTherapistSchedules } from '@/hooks/spa/UseTherapistSchedules';
import type { DailyScheduleStatus, DailyTimeSlotType, ISpaTherapists, TherapistScheduleSlotInput } from '@/interfaces/ISpa';
import { getTodayInCairo } from '@/utils/dates';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  therapist: ISpaTherapists;
}
interface ScheduleForm {
  status: DailyScheduleStatus;
  notes: string;
  slots: TherapistScheduleSlotInput[];
}
const pad = (value: number) => String(value).padStart(2, '0');
const dateKey = (date: Date) => date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
const monthLabel = (date: Date) => new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(date);
const toMinutes = (value: string) => {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
};

function validateSlots(status: DailyScheduleStatus, slots: TherapistScheduleSlotInput[]) {
  if (status === 'off' && slots.length) return 'A day off cannot contain shifts or breaks.';
  if (status === 'working' && !slots.some((slot) => slot.slot_type === 'shift')) return 'Add at least one working shift.';
  if (slots.some((slot) => !slot.start_time || !slot.end_time || toMinutes(slot.start_time) >= toMinutes(slot.end_time)))
    return 'Each slot must start before it ends.';
  const sorted = [...slots].sort((a, b) => a.start_time.localeCompare(b.start_time));
  if (sorted.some((slot, index) => index > 0 && slot.start_time < sorted[index - 1].end_time)) return 'Shifts and breaks cannot overlap.';
  if (
    slots.some(
      (slot) =>
        slot.slot_type === 'break' &&
        !slots.some((shift) => shift.slot_type === 'shift' && shift.start_time <= slot.start_time && shift.end_time >= slot.end_time),
    )
  )
    return 'Each break must fit inside a working shift.';
  return null;
}

export default function TherapistScheduleManager({ open, onOpenChange, therapist }: Props) {
  const today = getTodayInCairo();
  const [month, setMonth] = useState(() => new Date(Number(today.slice(0, 4)), Number(today.slice(5, 7)) - 1, 1));
  const [selectedDate, setSelectedDate] = useState(today);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const from = dateKey(new Date(month.getFullYear(), month.getMonth(), 1));
  const to = dateKey(new Date(month.getFullYear(), month.getMonth() + 1, 0));
  const schedulesQuery = useTherapistSchedules(therapist.id, from, to);
  const schedules = schedulesQuery.data ?? [];
  const activeSchedule = schedules.find((schedule) => schedule.schedule_date === selectedDate);
  const form = useForm<ScheduleForm>({ defaultValues: { status: 'working', notes: '', slots: [] } });
  const { control, register, reset, setValue, handleSubmit } = form;
  const slotArray = useFieldArray({ control, name: 'slots' });
  const status = useWatch({ control, name: 'status' });
  const slotValues = useWatch({ control, name: 'slots' }) ?? [];
  const validation = validateSlots(status, slotValues);
  const save = useSaveTherapistSchedule(therapist.id, from, to);
  const remove = useDeleteTherapistSchedule(therapist.id, from, to);
  const calendarDays = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const blanks = (first.getDay() + 6) % 7;
    return [...Array(blanks).fill(null), ...Array.from({ length: count }, (_, index) => index + 1)];
  }, [month]);

  useEffect(() => {
    reset({
      status: activeSchedule?.status ?? 'working',
      notes: activeSchedule?.notes ?? '',
      slots: (activeSchedule?.slots ?? []).map(({ start_time, end_time, slot_type }) => ({
        start_time: start_time.slice(0, 5),
        end_time: end_time.slice(0, 5),
        slot_type,
      })),
    });
  }, [activeSchedule, selectedDate, reset]);

  const saveSchedule = handleSubmit(async (data) => {
    if (validation) {
      toast.error(validation);
      return;
    }
    try {
      await save.mutateAsync({ schedule_date: selectedDate, status: data.status, notes: data.notes, slots: data.slots });
      toast.success('Daily schedule saved');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not save schedule');
    }
  });
  const deleteSchedule = async () => {
    if (!activeSchedule) return;
    try {
      await remove.mutateAsync(activeSchedule.id);
      toast.success('Daily schedule removed');
      setConfirmDelete(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not remove schedule');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-[calc(100%-1rem)] overflow-y-auto p-0 sm:max-w-5xl">
          <DialogHeader className="px-5 pt-5 pr-12">
            <DialogTitle>Schedule: {therapist.full_name}</DialogTitle>
            <DialogDescription>
              Choose a date, then configure working hours, breaks, and notes. Unconfigured dates are not days off.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 px-4 pb-5 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="rounded-2xl border border-[var(--color-border)] p-4">
              <div className="mb-4 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Previous month"
                  onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                >
                  <ChevronLeft />
                </Button>
                <h3 className="font-semibold">{monthLabel(month)}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Next month"
                  onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                >
                  <ChevronRight />
                </Button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <span key={day} className="py-2">
                    {day}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (!day) return <span key={'blank-' + index} />;
                  const key = dateKey(new Date(month.getFullYear(), month.getMonth(), day));
                  const schedule = schedules.find((item) => item.schedule_date === key);
                  const selected = key === selectedDate;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedDate(key)}
                      aria-label={key + (schedule ? ', ' + schedule.status : ', not configured')}
                      aria-pressed={selected}
                      className={
                        'relative aspect-square rounded-xl text-sm transition-colors ' +
                        (selected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted')
                      }
                    >
                      {day}
                      {schedule && (
                        <span
                          className={
                            'absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full ' +
                            (selected ? 'bg-primary-foreground' : schedule.status === 'working' ? 'bg-emerald-600' : 'bg-slate-400')
                          }
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Green: working · Gray: day off · No marker: not configured</p>
            </section>
            <section className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Selected date</p>
                <h3 className="mt-1 text-lg font-semibold">
                  {new Intl.DateTimeFormat(undefined, { dateStyle: 'full' }).format(new Date(selectedDate + 'T12:00:00'))}
                </h3>
              </div>
              {schedulesQuery.isLoading ? (
                <p className="py-8 text-center text-sm text-muted-foreground">Loading schedule…</p>
              ) : schedulesQuery.isError ? (
                <p role="alert" className="text-sm text-destructive">
                  Could not load schedules. Check administrator access and try again.
                </p>
              ) : (
                <form className="space-y-4" onSubmit={saveSchedule}>
                  <div className="grid gap-1.5">
                    <Label>Day status</Label>
                    <Select
                      value={status}
                      onValueChange={(value) => {
                        const next = value as DailyScheduleStatus;
                        setValue('status', next);
                        if (next === 'off') slotArray.replace([]);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="working">Working</SelectItem>
                        <SelectItem value="off">Day off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {status === 'working' && (
                    <div className="space-y-3">
                      {slotArray.fields.map((slot, index) => (
                        <div
                          key={slot.id}
                          className="grid grid-cols-1 items-end gap-2 rounded-xl border border-[var(--color-border)] p-3 sm:grid-cols-[0.75fr_1fr_1fr_auto]"
                        >
                          <div className="grid gap-1">
                            <Label className="text-xs">Type</Label>
                            <Select
                              value={slotValues[index]?.slot_type}
                              onValueChange={(value) => setValue(`slots.${index}.slot_type`, value as DailyTimeSlotType)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="shift">Shift</SelectItem>
                                <SelectItem value="break">Break</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-1">
                            <Label className="text-xs">Start</Label>
                            <Input type="time" {...register(`slots.${index}.start_time`)} />
                          </div>
                          <div className="grid gap-1">
                            <Label className="text-xs">End</Label>
                            <Input type="time" {...register(`slots.${index}.end_time`)} />
                          </div>
                          <Button type="button" variant="ghost" size="icon" aria-label="Remove time slot" onClick={() => slotArray.remove(index)}>
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex flex-wrap gap-2">
                        {(['shift', 'break'] as const).map((type) => (
                          <Button
                            key={type}
                            type="button"
                            variant="outline"
                            onClick={() => slotArray.append({ slot_type: type, start_time: '09:00', end_time: '10:00' })}
                          >
                            <Plus />
                            Add {type}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid gap-1.5">
                    <Label htmlFor="therapist-schedule-notes">Notes</Label>
                    <Textarea id="therapist-schedule-notes" placeholder="Optional notes for this date" {...register('notes')} />
                  </div>
                  {validation && (
                    <p role="alert" className="text-sm text-destructive">
                      {validation}
                    </p>
                  )}
                  <div className="flex flex-wrap justify-between gap-2 border-t border-[var(--color-border)] pt-4">
                    {activeSchedule && (
                      <Button type="button" variant="destructive" onClick={() => setConfirmDelete(true)} disabled={remove.isPending}>
                        Delete day
                      </Button>
                    )}
                    <Button type="submit" className="ml-auto" disabled={save.isPending || Boolean(validation)}>
                      {save.isPending ? 'Saving…' : 'Save schedule'}
                    </Button>
                  </div>
                </form>
              )}
            </section>
          </div>
        </DialogContent>
      </Dialog>
      <DeleteItem
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        onConfirm={deleteSchedule}
        isDeleting={remove.isPending}
        itemName={selectedDate}
        title="Delete this daily schedule?"
      />
    </>
  );
}
