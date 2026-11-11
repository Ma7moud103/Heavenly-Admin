import { useEffect } from 'react';
import { Controller, FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FieldError } from '@/components/ui/field';
import { Egender, type ISpaTherapists } from '@/interfaces/ISpa';
import { useCreateOrEditSpaTherapist } from '@/hooks/spa/therapists/useCreateOrEditSpaTherapist';
import { SpaTherapistSchema } from '@/utils/schemas';
import CreateTherapistSchedules, { type TherapistFormValues } from './CreateTherapistSchedules';
import TherapistServicesSelect from './TherapistServicesSelect';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  therapist?: ISpaTherapists;
}

const defaultValues: TherapistFormValues = {
  full_name: '',
  phone: '',
  email: '',
  gender: Egender.male,

  avatar_url: null,
  service_ids: [],

  schedules: [],
  draft_status: 'working',
  draft_notes: '',
  draft_slots: [
    { slot_type: 'shift', start_time: '09:00', end_time: '17:00' },
    { slot_type: 'break', start_time: '13:00', end_time: '14:00' },
  ],
};

export function ManageTherapist({ mode, open, onOpenChange, therapist }: Props) {
  const form = useForm<TherapistFormValues>({
    defaultValues: defaultValues,
    resolver: yupResolver(SpaTherapistSchema) as never,
    mode: 'onChange',
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const mutation = useCreateOrEditSpaTherapist(mode, therapist?.id);
  useEffect(() => {
    if (!open) return;

    if (mode === 'edit' && therapist) {
      reset({
        ...defaultValues,
        full_name: therapist.full_name,
        phone: therapist.phone ?? '',
        email: therapist.email ?? '',
        gender: therapist.gender ?? Egender.male,
        avatar_url: therapist.avatar_url,
        service_ids: therapist.services.map((service) => service.id),
      });

      return;
    }

    reset(defaultValues);
  }, [open, mode, therapist, reset]);

  const submit: SubmitHandler<TherapistFormValues> = async ({
    schedules,
    // draft_date: _date,
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
    }
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-2xl min-w-[85%] sm:min-w-auto">
        <SheetHeader>
          <SheetTitle>{mode === 'edit' ? 'Edit The therapist' : 'Add new therapist'}</SheetTitle>
          <SheetDescription>Manage contact details and optional daily schedules.</SheetDescription>
        </SheetHeader>
        <FormProvider {...form}>
          <form className="flex flex-col gap-5 px-4 pb-6" onSubmit={handleSubmit(submit)}>
            <section className="space-y-4 rounded-2xl border border-(--color-border) p-4">
              <h3 className="font-semibold">Therapist information</h3>
              <div className="grid gap-1.5">
                <Label htmlFor="therapist-name">Full name</Label>
                <Input
                  id="therapist-name"
                  placeholder="Therapist name"
                  {...register('full_name')}
                  aria-invalid={Boolean(errors.full_name)}
                />
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
                  {/* <Label>Gender</Label>
                  <div role="group" aria-labelledby="therapist-gender-label" className="flex items-center gap-6 py-1.5">
                    {GENDER_OPTIONS.map(({ value, label }) => (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox
                          id={`therapist-gender-${value}`}
                          checked={gender === value}
                          onCheckedChange={(checked) => {
                            form.setValue('gender', checked === true ? value : '', {
                              shouldValidate: true,
                              shouldDirty: true,
                            });
                          }}
                        />
                        <Label htmlFor={`therapist-gender-${value}`} className="font-normal">
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div> */}
                  <Label>Gender</Label>

                  <Controller
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex items-center gap-6"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="male" id="gender-male" />
                          <Label htmlFor="gender-male" className="cursor-pointer font-normal">
                            Male
                          </Label>
                        </div>

                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="female" id="gender-female" />
                          <Label htmlFor="gender-female" className="cursor-pointer font-normal">
                            Female
                          </Label>
                        </div>
                      </RadioGroup>
                    )}
                  />

                  {form.formState.errors.gender && (
                    <p className="text-sm text-destructive">{form.formState.errors.gender.message}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="therapist-avatar">Avatar URL</Label>
                  <Input
                    id="therapist-avatar"
                    placeholder="Optional image URL"
                    value={therapist?.avatar_url ?? ''}
                    readOnly
                  />
                  <p className="text-xs text-muted-foreground">Storage upload is not configured in this project.</p>
                </div>
              </div>
              <TherapistServicesSelect existingServices={therapist?.services} />
            </section>
            {mode === 'create' && <CreateTherapistSchedules key={open ? 'open' : 'closed'} />}
            <SheetFooter className="border-t border-(--color-border) sm:flex-row sm:justify-end">
              <Button type="button" variant="ghost" disabled={mutation.isPending} onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : mode === 'edit' ? 'Save changes' : 'Create therapist'}
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
