import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { useState } from 'react';
import * as yup from 'yup';
import { SelectedScheduleDatesSchema, TherapistSchedulesSchema } from '@/utils/schemas';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { DailyScheduleStatus, DailyTimeSlotType, Egender, TherapistDailyScheduleInput } from '@/interfaces/ISpa';
import TherapistTimeSelect from '@/features/spa/components/therapists/TherapistTimeSelect';
import { getTodayInCairo } from '@/utils/dates';

export interface TherapistFormValues {
  full_name: string;
  phone: string;
  email: string;
  gender: Egender;

  avatar_url: string | null;
  service_ids: string[];

  schedules: TherapistDailyScheduleInput[];
  draft_status: DailyScheduleStatus;
  draft_notes: string;
  draft_slots: { slot_type: DailyTimeSlotType; start_time: string; end_time: string }[];
}
export default function CreateTherapistSchedules() {
  const {
    control,
    register,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<TherapistFormValues>();

  const schedules = useFieldArray({ control, name: 'schedules' });
  const slots = useFieldArray({ control, name: 'draft_slots' });
  const status = useWatch({ control, name: 'draft_status' });
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const existingScheduleDates = schedules.fields.map((schedule) => schedule.schedule_date);

  const addBreak = () => {
    const currentSlots = getValues('draft_slots');

    const toMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const toTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
    };

    const shifts = currentSlots
      .map((slot, index) => ({ ...slot, index }))
      .filter((slot) => slot.slot_type === 'shift')
      .sort((a, b) => a.start_time.localeCompare(b.start_time));

    for (const shift of shifts) {
      const shiftBreaks = currentSlots
        .filter(
          (slot) =>
            slot.slot_type === 'break' && slot.start_time >= shift.start_time && slot.end_time <= shift.end_time,
        )
        .sort((a, b) => a.end_time.localeCompare(b.end_time));

      // Start after the last existing break, or at shift start.
      const startTime = shiftBreaks.length > 0 ? shiftBreaks[shiftBreaks.length - 1].end_time : shift.start_time;

      const startMinutes = toMinutes(startTime);

      // Find the next occupied slot inside this shift.
      const nextOccupiedSlot = currentSlots
        .filter(
          (slot, index) => index !== shift.index && slot.start_time >= startTime && slot.start_time < shift.end_time,
        )
        .sort((a, b) => a.start_time.localeCompare(b.start_time))[0];

      const endMinutes = nextOccupiedSlot ? toMinutes(nextOccupiedSlot.start_time) : toMinutes(shift.end_time);

      const availableMinutes = endMinutes - startMinutes;

      // Keep a minimum duration of 15 minutes.
      if (availableMinutes < 15) continue;

      // Maximum duration: 60 minutes, rounded down to 15-minute increments.
      const duration = Math.min(60, Math.floor(availableMinutes / 15) * 15);

      slots.append({
        slot_type: 'break',
        start_time: startTime,
        end_time: toTime(startMinutes + duration),
      });

      clearErrors('draft_slots');
      return;
    }

    setError('draft_slots', {
      type: 'manual',
      message: 'No available space for a break inside your shifts.',
    });
  };

  const addShift = () => {
    const currentSlots = getValues('draft_slots');

    const toMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const toTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
    };

    const latestEndTime = currentSlots.reduce((latest, slot) => Math.max(latest, toMinutes(slot.end_time)), 9 * 60);

    const startMinutes = latestEndTime;

    const endMinutes = startMinutes + 60;

    // The last available time in TherapistTimeSelect is 23:45.
    if (endMinutes > 23 * 60 + 45) {
      setError('draft_slots', {
        type: 'manual',
        message: 'No available time to add another shift.',
      });
      return;
    }

    const newShift = {
      slot_type: 'shift' as const,
      start_time: toTime(startMinutes),
      end_time: toTime(endMinutes),
    };

    // Check the new slot against existing slots.
    const overlaps = currentSlots.some(
      (slot) => newShift.start_time < slot.end_time && newShift.end_time > slot.start_time,
    );

    if (overlaps) {
      setError('draft_slots', {
        type: 'manual',
        message: 'The new shift overlaps with an existing slot.',
      });
      return;
    }

    slots.append(newShift);
    clearErrors('draft_slots');
  };

  const addSchedule = async () => {
    const dates = selectedDates
      .map(
        (date) =>
          `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
      )
      .sort();

    try {
      const validatedDates = await SelectedScheduleDatesSchema.validate(dates, { abortEarly: false });

      const draft = {
        status: getValues('draft_status'),
        notes: getValues('draft_notes'),
        slots: getValues('draft_slots'),
      };

      const additions = validatedDates.map((schedule_date) => ({
        schedule_date,
        status: draft.status,
        notes: draft.notes,
        slots: draft.slots.map((slot) => ({ ...slot })),
      }));

      const existingSchedules = getValues('schedules');

      const validatedSchedules = await TherapistSchedulesSchema.validate([...existingSchedules, ...additions], {
        abortEarly: false,
      });

      clearErrors('root.schedule');
      schedules.append(validatedSchedules.slice(existingSchedules.length));

      setSelectedDates([]);
      setValue('draft_notes', '');
      setValue('draft_status', 'working');

      slots.replace([
        { slot_type: 'shift', start_time: '09:00', end_time: '17:00' },
        { slot_type: 'break', start_time: '13:00', end_time: '14:00' },
      ]);
      clearErrors('draft_slots');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setError('root.schedule', {
          type: 'validation',
          message: error.errors[0],
        });
        return;
      }

      setError('root.schedule', {
        type: 'server',
        message: 'Something went wrong while adding schedules.',
      });
    }
  };

  //     .map(
  //       (date) =>
  //         `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
  //     )
  //     .sort();
  //   // if (!dates.length) {
  //   //   setError('draft_date', { type: 'required', message: 'Choose at least one schedule date.' });
  //   //   return;
  //   // }

  //     const validatedDates = await SelectedScheduleDatesSchema.validate(dates, {
  //       abortEarly: false,
  //     });
  //   // if (dates.some((date) => date < getTodayInCairo())) {
  //   //   // setError('draft_date', { type: 'validate', message: 'Choose today or a future date.' });
  //   //   return;
  //   // }
  //   const draft = {
  //     status: getValues('draft_status'),
  //     notes: getValues('draft_notes'),
  //     slots: getValues('draft_slots'),
  //   };
  //   const additions = dates.map((schedule_date) => ({
  //     status: draft.status,
  //     notes: draft.notes,
  //     schedule_date,
  //     slots: draft.slots.map((slot) => ({ ...slot })),
  //   }));

  //   try {
  //     const validated = await TherapistSchedulesSchema.validate([...getValues('schedules'), ...additions], {
  //       abortEarly: false,
  //     });
  //     // clearErrors(['draft_date', 'draft_slots']);
  //     schedules.append(validated.slice(-additions.length));
  //     setSelectedDates([]);
  //     // setValue('draft_date', '');
  //     setValue('draft_notes', '');
  //     setValue('draft_status', 'working');
  //     slots.replace([
  //       { slot_type: 'shift', start_time: '09:00', end_time: '17:00' },
  //       { slot_type: 'break', start_time: '13:00', end_time: '14:00' },
  //     ]);
  //   } catch (error) {
  //     // const validationError = error instanceof yup.ValidationError ? error : undefined;
  //     // const issue = validationError?.inner[0] ?? validationError;
  //     // const field = issue?.path?.includes('slots') ? 'draft_slots' : 'draft_date';
  //     // setError(field, { type: 'validate', message: issue?.message ?? 'Check these schedules and try again.' });
  //   }
  // };
  return (
    <section className="space-y-4 rounded-2xl border border-(--color-border) p-4">
      <div>
        <h3 className="font-semibold">
          Add schedules <span className="font-normal text-muted-foreground">(optional)</span>
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">Add dates now or configure schedules later.</p>
      </div>
      {schedules.fields.length > 0 && (
        <ul className="space-y-2">
          {schedules.fields.map((item, index) => (
            <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-muted px-3 py-2 text-sm">
              <span>
                <strong>{item.schedule_date}</strong>{' '}
                {item.status === 'off' ? 'Day off' : item.slots.length + ' time slots'}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={'Remove schedule for ' + item.schedule_date}
                onClick={() => schedules.remove(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <div className="grid gap-4 sm:grid-cols-[1fr]">
        <div className="grid gap-1.5">
          <div className="flex max-w-sm items-center justify-between">
            <Label>Schedule dates</Label>
            <span className="text-xs text-muted-foreground">{selectedDates.length} selected</span>
          </div>
          <Calendar
            mode="multiple"
            className="max-w-sm rounded-xl border border-(--color-border) bg-(--color-bg-raised) p-3"
            selected={selectedDates}
            disabled={(date) => {
              const dateString = [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, '0'),
                String(date.getDate()).padStart(2, '0'),
              ].join('-');

              return dateString < getTodayInCairo() || existingScheduleDates.includes(dateString);
            }}
            onSelect={(dates) => {
              setSelectedDates(dates);
              clearErrors('root.schedule');
            }}
          />
          <p className="text-xs text-muted-foreground">
            Select one or more dates. Example: 09:00–17:00 shift with a 13:00–14:00 break. Each date gets the same
            settings.
          </p>
          {errors.root?.schedule?.message && (
            <p role="alert" className="text-sm text-destructive">
              {errors.root.schedule.message}
            </p>
          )}
        </div>
        <div className="grid content-start gap-1.5">
          <Label>Day status</Label>
          <Controller
            control={control}
            name={`draft_status`}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  const next = value as DailyScheduleStatus;
                  setValue('draft_status', next);
                  clearErrors('draft_slots');

                  if (next === 'off') slots.replace([]);
                  else if (!getValues('draft_slots').length)
                    slots.replace([
                      { slot_type: 'shift', start_time: '09:00', end_time: '17:00' },
                      { slot_type: 'break', start_time: '13:00', end_time: '14:00' },
                    ]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="working">Working</SelectItem>
                  <SelectItem value="off">Day off</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      {status === 'working' && (
        <div className="space-y-2">
          {slots.fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 items-end gap-2 sm:grid-cols-[0.75fr_1fr_1fr_auto]">
              <div className="grid gap-1">
                <Label className="text-xs">Type</Label>
                <Controller
                  control={control}
                  name={`draft_slots.${index}.slot_type`}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors('draft_slots');
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shift">Shift</SelectItem>
                        <SelectItem value="break">Break</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-xs">Start</Label>
                <Controller
                  control={control}
                  name={`draft_slots.${index}.start_time` as const}
                  render={({ field }) => (
                    <TherapistTimeSelect
                      label={`Slot ${index + 1} start time`}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors('draft_slots');
                      }}
                    />
                  )}
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-xs">End</Label>
                <Controller
                  control={control}
                  name={`draft_slots.${index}.end_time` as const}
                  render={({ field }) => (
                    <TherapistTimeSelect
                      label={`Slot ${index + 1} end time`}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors('draft_slots');
                      }}
                    />
                  )}
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Remove slot"
                onClick={() => {
                  // if (type === 'break') {
                  //   addBreak();
                  //   return;
                  // }
                  slots.remove(index);
                  clearErrors('draft_slots');
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            {(['shift', 'break'] as const).map((type) => (
              <Button
                key={type}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (type === 'shift') {
                    addShift();
                    return;
                  }

                  addBreak();
                }}
              >
                <Plus />
                {type === 'shift' ? 'Shift' : 'Break'}
              </Button>
            ))}
          </div>
        </div>
      )}
      <div className="grid gap-1.5">
        <Label htmlFor="initial-notes">Notes</Label>
        <Input id="initial-notes" placeholder="Optional notes for this date" {...register('draft_notes')} />
      </div>
      {errors.draft_slots?.message && (
        <p role="alert" className="text-sm text-destructive">
          {errors.draft_slots.message}
        </p>
      )}
      <Button type="button" variant="secondary" onClick={addSchedule}>
        Add selected dates to summary
      </Button>
    </section>
  );
}
