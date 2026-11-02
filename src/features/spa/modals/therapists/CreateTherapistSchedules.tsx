import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import { TherapistSchedulesSchema } from '@/utils/schemas';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { DailyScheduleStatus, DailyTimeSlotType, TherapistDailyScheduleInput } from '@/interfaces/ISpa';
import { getTodayInCairo } from '@/utils/dates';

export interface TherapistFormValues {
  full_name: string;
  phone: string;
  email: string;
  gender: string;
  specialty: string;
  avatar_url: string | null;
  availability: 'on' | 'off' | 'break';
  shift_from: string;
  shift_to: string;
  schedules: TherapistDailyScheduleInput[];
  draft_date: string;
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
  const draftDate = useWatch({ control, name: 'draft_date' });
  const addSchedule = async () => {
    const schedule: TherapistDailyScheduleInput = {
      schedule_date: getValues('draft_date'),
      status: getValues('draft_status'),
      notes: getValues('draft_notes'),
      slots: getValues('draft_slots'),
    };
    try {
      const validated = await TherapistSchedulesSchema.validate([...getValues('schedules'), schedule], { abortEarly: false });

      clearErrors(['draft_date', 'draft_slots']);
      schedules.append(validated[validated.length - 1]);
      setValue('draft_date', '');
      setValue('draft_notes', '');
      setValue('draft_status', 'working');
      slots.replace([{ slot_type: 'shift', start_time: '09:00', end_time: '17:00' }]);
    } catch (error) {
      const validationError = error instanceof yup.ValidationError ? error : undefined;
      const issue = validationError?.inner[0] ?? validationError;
      const field = issue?.path?.includes('slots') ? 'draft_slots' : 'draft_date';
      setError(field, { type: 'validate', message: issue?.message ?? 'Check this schedule and try again.' });
    }
  };
  return (
    <section className="space-y-4 rounded-2xl border border-[var(--color-border)] p-4">
      <div>
        <h3 className="font-semibold">
          Initial schedules <span className="font-normal text-muted-foreground">(optional)</span>
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">Add dates now or configure schedules later.</p>
      </div>
      {schedules.fields.length > 0 && (
        <ul className="space-y-2">
          {schedules.fields.map((item, index) => (
            <li key={item.id} className="flex items-center justify-between gap-3 rounded-xl bg-muted px-3 py-2 text-sm">
              <span>
                <strong>{item.schedule_date}</strong> � {item.status === 'off' ? 'Day off' : item.slots.length + ' time slots'}
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="initial-date">Schedule date</Label>
          <Input id="initial-date" type="date" min={getTodayInCairo()} {...register('draft_date')} />
          {errors.draft_date?.message && (
            <p role="alert" className="text-sm text-destructive">
              {errors.draft_date.message}
            </p>
          )}
        </div>
        <div className="grid gap-1.5">
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
                  if (next === 'off') slots.replace([]);
                  else if (!getValues('draft_slots').length) slots.replace([{ slot_type: 'shift', start_time: '09:00', end_time: '17:00' }]);
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
          {/* <Select
            value={status}
            onValueChange={(value) => {
              const next = value as DailyScheduleStatus;
              setValue('draft_status', next);
              if (next === 'off') slots.replace([]);
              else if (!getValues('draft_slots').length) slots.replace([{ slot_type: 'shift', start_time: '09:00', end_time: '17:00' }]);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="working">Working</SelectItem>
              <SelectItem value="off">Day off</SelectItem>
            </SelectContent>
          </Select> */}
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
                    <Select value={field.value} onValueChange={field.onChange}>
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
                <Input type="time" {...register(('draft_slots.' + index + '.start_time') as `draft_slots.${number}.start_time`)} />
              </div>
              <div className="grid gap-1">
                <Label className="text-xs">End</Label>
                <Input type="time" {...register(('draft_slots.' + index + '.end_time') as `draft_slots.${number}.end_time`)} />
              </div>
              <Button type="button" variant="ghost" size="icon" aria-label="Remove slot" onClick={() => slots.remove(index)}>
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
                onClick={() => slots.append({ slot_type: type, start_time: '09:00', end_time: '10:00' })}
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
      <Button type="button" variant="secondary" disabled={!draftDate} onClick={addSchedule}>
        Add date to summary
      </Button>
    </section>
  );
}
