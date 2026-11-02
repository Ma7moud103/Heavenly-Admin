import { useEffect } from 'react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FieldError } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ISpaTherapists } from '@/interfaces/ISpa';
import { useCreateOrEditSpaTherapist } from '@/hooks/spa/therapists/useCreateOrEditSpaTherapist';
import { SpaTherapistSchema } from '@/utils/schemas';
import CreateTherapistSchedules, { type TherapistFormValues } from './CreateTherapistSchedules';

interface Props {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  therapist?: ISpaTherapists;
}
const defaults: TherapistFormValues = {
  full_name: '',
  phone: '',
  email: '',
  gender: '',
  specialty: '',
  avatar_url: null,
  availability: 'off',
  shift_from: '',
  shift_to: '',
  schedules: [],
  draft_date: '',
  draft_status: 'working',
  draft_notes: '',
  draft_slots: [{ slot_type: 'shift', start_time: '09:00', end_time: '17:00' }],
};

export function ManageTherapist({ mode, open, onOpenChange, therapist }: Props) {
  const form = useForm<TherapistFormValues>({ defaultValues: defaults, resolver: yupResolver(SpaTherapistSchema) as never, mode: 'onChange' });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;
  const mutation = useCreateOrEditSpaTherapist(mode, therapist?.id);
  useEffect(() => {
    reset(
      mode === 'edit' && therapist
        ? {
            ...defaults,
            full_name: therapist.full_name,
            phone: therapist.phone ?? '',
            email: therapist.email ?? '',
            gender: therapist.gender ?? '',
            specialty: therapist.specialty ?? '',
            avatar_url: therapist.avatar_url,
            availability: therapist.availability ?? 'off',
            shift_from: therapist.shift_from?.slice(0, 5) ?? '',
            shift_to: therapist.shift_to?.slice(0, 5) ?? '',
          }
        : defaults,
    );
  }, [mode, therapist, open, reset]);

  const submit: SubmitHandler<TherapistFormValues> = async ({
    schedules,
    draft_date: _date,
    draft_status: _status,
    draft_notes: _notes,
    draft_slots: _slots,
    ...data
  }) => {
    try {
      await mutation.mutateAsync({
        therapist: { ...data, avatar_url: therapist?.avatar_url ?? data.avatar_url },
        schedules: mode === 'create' ? schedules : [],
      });
      toast.success(mode === 'edit' ? 'Therapist updated successfully' : 'Therapist and initial schedules created');
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not save therapist');
    } finally {
      onOpenChange(false);
    }
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{mode === 'edit' ? 'Edit therapist' : 'Add therapist'}</SheetTitle>
          <SheetDescription>Manage contact details and optional daily schedules.</SheetDescription>
        </SheetHeader>
        <FormProvider {...form}>
          <form className="flex flex-col gap-5 px-4 pb-6" onSubmit={handleSubmit(submit)}>
            <section className="space-y-4 rounded-2xl border border-[var(--color-border)] p-4">
              <h3 className="font-semibold">Therapist information</h3>
              <div className="grid gap-1.5">
                <Label htmlFor="therapist-name">Full name</Label>
                <Input id="therapist-name" placeholder="Therapist name" {...register('full_name')} aria-invalid={Boolean(errors.full_name)} />
                {errors.full_name?.message && <FieldError>{errors.full_name.message}</FieldError>}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="therapist-phone">Phone (optional)</Label>
                  <Input id="therapist-phone" type="tel" placeholder="Phone number" {...register('phone')} />
                  {errors.phone?.message && <FieldError>{errors.phone.message}</FieldError>}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="therapist-email">Email (optional)</Label>
                  <Input id="therapist-email" type="email" placeholder="name@example.com" {...register('email')} />
                  {errors.email?.message && <FieldError>{errors.email.message}</FieldError>}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label>Gender</Label>
                  <Select
                    value={form.watch('gender') || 'unspecified'}
                    onValueChange={(value) => form.setValue('gender', value === 'unspecified' ? '' : value, { shouldValidate: true })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Not specified" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unspecified">Not specified</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="therapist-specialty">Specialty</Label>
                  <Input id="therapist-specialty" placeholder="e.g. Massage therapy" {...register('specialty')} />
                  {errors.specialty?.message && <FieldError>{errors.specialty.message}</FieldError>}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label>Current availability</Label>
                  <Select
                    value={form.watch('availability')}
                    onValueChange={(value) => form.setValue('availability', value as TherapistFormValues['availability'], { shouldValidate: true })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on">On duty</SelectItem>
                      <SelectItem value="break">On break</SelectItem>
                      <SelectItem value="off">Off duty</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError>{errors.availability?.message}</FieldError>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="therapist-avatar">Avatar URL</Label>
                  <Input id="therapist-avatar" placeholder="Optional image URL" value={therapist?.avatar_url ?? ''} readOnly />
                  <p className="text-xs text-muted-foreground">Storage upload is not configured in this project.</p>
                </div>
              </div>
              <fieldset className="grid gap-4 rounded-xl border border-(--color-border) p-4 sm:grid-cols-2">
                <legend className="px-1 text-sm font-semibold">Legacy shift hours</legend>
                <div className="grid gap-1.5">
                  <Label htmlFor="shift-from">Starts at</Label>
                  <Input id="shift-from" type="time" {...register('shift_from')} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="shift-to">Ends at</Label>
                  <Input id="shift-to" type="time" {...register('shift_to')} />
                </div>
              </fieldset>
            </section>
            {mode === 'create' && <CreateTherapistSchedules key={open ? "open" : "closed"} />}
            <SheetFooter className="border-t border-(--color-border) sm:flex-row sm:justify-end">
              <Button type="button" variant="ghost" disabled={mutation.isPending} onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!isValid || mutation.isPending}>
                {mutation.isPending ? 'Saving...' : mode === 'edit' ? 'Save changes' : 'Create therapist'}
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
