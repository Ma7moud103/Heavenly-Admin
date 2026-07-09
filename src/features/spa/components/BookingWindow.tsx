import { Controller, useForm, useWatch } from 'react-hook-form';
import { CalendarDays, DollarSign, Save, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { UseSpaPackagesWithoutServices } from '@/hooks/spa/UseSpaPackages';
import UseSpaServices from '@/hooks/spa/UseSpaServices';
import UseSpaTherapists from '@/hooks/spa/UseSpaTherapists';

import SelectBox from './SelectBox';
import { EStatus } from '@/interfaces/ISpa';
import UseSpaCustomers from '@/hooks/spa/UseSpaCusteomers';

interface IBookingData {
  booking_date: string;
  customer_id: string;
  end_time: string;
  notes: string;
  package_id: string;
  service_id: string;
  start_time: string;
  status: EStatus | null;
  therapist_id: string;
  total_price: string;
}

const today = new Date().toISOString().slice(0, 10);

const BookingWindow = () => {
  const ArrOfStatues = [...Object.values(EStatus)];

  const { data: services = [] } = UseSpaServices();
  const { data: packages = [] } = UseSpaPackagesWithoutServices();
  const { data: therapists = [] } = UseSpaTherapists();
  const { data: customers = [] } = UseSpaCustomers();

  const selectOptions = {
    customer: customers.map((customer) => ({ value: customer.id, label: customer.full_name })),
    therapist: therapists.length > 0 ? therapists.map((therapist) => ({ value: therapist.id, label: therapist.full_name })) : [],
    service: services.length > 0 ? services.map((service) => ({ value: service.id, label: service.name })) : [],
    package: packages.length > 0 ? packages.map((spaPackage) => ({ value: spaPackage.id, label: spaPackage.name })) : [],
    statuses: ArrOfStatues.map((status) => ({ value: status, label: status })),
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IBookingData>({
    defaultValues: {
      booking_date: '',
      customer_id: '',
      end_time: '',
      notes: '',
      package_id: '',
      service_id: '',
      start_time: '',
      status: null,
      therapist_id: '',
      total_price: '',
    },
  });

  useWatch({ control });

  const onSubmit = (data: IBookingData) => {
    console.log('New booking data:', data);
    reset();
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--color-text-gold)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-transform hover:-translate-y-0.5 sm:w-auto"
        >
          <CalendarDays className="size-4" />
          New Booking
        </button>
      </DrawerTrigger>

      <DrawerContent className="sm:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <DrawerHeader className="  px-4 py-5 pr-12 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-text-gold)] text-white">
                <Sparkles className="size-5" />
              </span>
              <div className="min-w-0">
                <DrawerTitle className="text-xl text-[var(--color-text)] sm:text-2xl">Create New Booking</DrawerTitle>
                <DrawerDescription className="mt-1 text-sm leading-6 text-[var(--color-text-sub)]">
                  Build a spa booking with customer, treatment, therapist, date, time, status, and price details.
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <FieldGroup className="grid gap-4 md:grid-cols-2">
              <SelectBox
                label="Customer"
                name="customer_id"
                options={selectOptions.customer}
                placeholder="Select customer"
                control={control}
                rules={{ required: true }}
              />
              <SelectBox label="Therapist" name="therapist_id" options={selectOptions.therapist} placeholder="Select therapist" control={control} />
              <SelectBox label="Service" name="service_id" options={selectOptions.service} placeholder="Select service" control={control} />
              <SelectBox label="Package" name="package_id" options={selectOptions.package} placeholder="Select package" control={control} />

              <Field>
                <Label htmlFor="booking_date">Booking Date</Label>
                <Controller
                  name="booking_date"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <DatePicker value={field.value} onChange={field.onChange} placeholder="Pick booking date" />}
                />
              </Field>

              <SelectBox label="Status" name="status" options={selectOptions.statuses} placeholder="Select status" control={control} />

              <Field>
                <Label htmlFor="start_time">Start Time</Label>
                <Input id="start_time" type="time" {...register('start_time', { required: true })} />
              </Field>

              <Field>
                <Label htmlFor="end_time">End Time</Label>
                <Input id="end_time" type="time" {...register('end_time', { required: true })} />
              </Field>

              <Field>
                <Label htmlFor="total_price">Total Price</Label>
                <div className="relative">
                  <DollarSign className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <Input id="total_price" type="number" step="0.01" min="0" placeholder="0.00" className="pl-9" {...register('total_price')} />
                </div>
              </Field>

              <Field className="md:col-span-2">
                <Label htmlFor="notes">Booking Notes</Label>
                <textarea
                  id="notes"
                  rows={5}
                  placeholder="Add special requests or internal notes"
                  className="flex min-h-32 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  {...register('notes')}
                />
              </Field>
            </FieldGroup>
          </div>

          <DrawerFooter className=" px-4 py-4 ">
            <DrawerClose asChild>
              <Button type="button" variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit" className="w-full gap-2 bg-[var(--color-text-gold)] text-white hover:bg-[var(--color-text-gold)]/90 sm:w-auto">
              <Save className="size-4" />
              Save Booking
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default BookingWindow;
