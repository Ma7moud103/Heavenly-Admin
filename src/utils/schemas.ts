import type { IForm, ILoginForm } from '@/interfaces/IRegisterForm';
import { EStatus, type DailyScheduleStatus, type DailyTimeSlotType, type IBookingData, type ICreatePackage, type TherapistDailyScheduleInput } from '@/interfaces/ISpa';
import * as yup from 'yup';

const spaBookingSchema: yup.ObjectSchema<IBookingData> = yup
  .object({
    booking_date: yup.string().required('You must pick a booking date'),

    customer_id: yup.string().required('You must select a customer'),

    start_time: yup.string().required('Please select the start time'),

    end_time: yup.string().required('Please select the end time'),

    notes: yup.string().defined(),

    package_id: yup.string().nullable().defined(),

    service_id: yup.string().nullable().defined(),

    status: yup.mixed<EStatus>().oneOf(Object.values(EStatus)).nullable().required('Please select a status'),

    therapist_id: yup.string().required('Please select a therapist'),
    total_price: yup.number().required(),
  })
  .test('service-or-package', 'You must select either a service or a package', (value) => {
    if (!value) return false;

    const hasService = !!value.service_id;
    const hasPackage = !!value.package_id;

    return hasService || hasPackage;
  })
  .test('time-range', 'End time must be later than start time', function (value) {
    if (!value?.start_time || !value.end_time) return true;
    return value.end_time > value.start_time || this.createError({ path: 'end_time', message: 'End time must be later than start time' });
  });

const spaPackageSchema: yup.ObjectSchema<ICreatePackage> = yup.object({
  name: yup.string().required('you must type name'),
  price: yup.number().required('you must type price').positive('price must be positive').nullable(),
  is_active: yup.bool().required(),
  description: yup.string().required('you must type description'),
  category_id: yup.string().required('you must select category'),
  services: yup.array().of(yup.string().required()).min(1, 'Select at least one service').required(),
});

const Registerschema: yup.ObjectSchema<IForm> = yup.object({
  full_name: yup
    .string()
    .trim()
    .required('Full name is required')
    .min(3, 'Full name must be at least 3 characters')
    .max(100, 'Full name must not exceed 100 characters'),

  phone: yup
    .string()
    .trim()
    .required('Phone number is required')
    .matches(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number'),

  avatar_url: yup.string().trim().url('Please enter a valid avatar URL').optional(),

  role: yup.mixed<IForm['role']>().oneOf(['user', 'admin', 'superAdmin'], 'Invalid role').required('Role is required'),

  is_active: yup.boolean().default(false),

  email: yup.string().trim().lowercase().email('Please enter a valid email').required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),

  confirm_password: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  country: yup.string().trim().required('Country is required').default('Egypt'),
  visits: yup.number().integer().min(0).default(0),
});
const Loginschema: yup.ObjectSchema<ILoginForm> = yup.object({
  email: yup.string().trim().lowercase().email('Please enter a valid email').required('Email is required'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
});

const SpaServicesSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  duration: yup
    .number()
    // .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('Duration is required')
    .positive('Duration must be a positive number')
    .integer('Duration must be an integer'),
  price: yup
    .number()
    // .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .required('Price is required')
    .positive('Price must be a positive number'),
  is_active: yup.boolean().required(),
  category_id: yup.string().required('Category is required'),
});
const therapistTimeSlotSchema = yup.object({
  slot_type: yup.mixed<DailyTimeSlotType>().oneOf(['shift', 'break']).required('Slot type is required'),
  start_time: yup.string().matches(/^([01]\d|2[0-3]):[0-5]\d$/, 'Enter a valid start time').required('Start time is required'),
  end_time: yup.string().matches(/^([01]\d|2[0-3]):[0-5]\d$/, 'Enter a valid end time').required('End time is required'),
}).required();

export const TherapistDailyScheduleSchema: yup.ObjectSchema<TherapistDailyScheduleInput> = yup.object({
  schedule_date: yup.string().required('Choose a schedule date'),
  status: yup.mixed<DailyScheduleStatus>().oneOf(['working', 'off']).required('Choose a day status'),
  notes: yup.string().defined(),
  slots: yup.array().of(therapistTimeSlotSchema).required(),
}).test('valid-daily-slots', function (schedule) {
  if (!schedule) return true;
  const { status, slots } = schedule;
  if (status === 'off' && slots.length) return this.createError({ path: 'slots', message: 'A day off cannot contain shifts or breaks.' });
  if (status === 'working' && !slots.some((slot) => slot.slot_type === 'shift')) return this.createError({ path: 'slots', message: 'Add at least one working shift.' });
  const minutes = (time: string) => { const [hours, mins] = time.split(':').map(Number); return hours * 60 + mins; };
  if (slots.some((slot) => minutes(slot.start_time) >= minutes(slot.end_time))) return this.createError({ path: 'slots', message: 'Each slot must start before it ends.' });
  const sorted = [...slots].sort((left, right) => left.start_time.localeCompare(right.start_time));
  if (sorted.some((slot, index) => index > 0 && slot.start_time < sorted[index - 1].end_time)) return this.createError({ path: 'slots', message: 'Shifts and breaks cannot overlap.' });
  if (slots.some((slot) => slot.slot_type === 'break' && !slots.some((shift) => shift.slot_type === 'shift' && shift.start_time <= slot.start_time && shift.end_time >= slot.end_time))) return this.createError({ path: 'slots', message: 'Each break must fit inside a working shift.' });
  return true;
});

export const TherapistSchedulesSchema = yup.array().of(TherapistDailyScheduleSchema).required().test('unique-schedule-dates', 'Only one schedule can be added for each date.', (schedules) => {
  if (!schedules) return true;
  const dates = schedules.map((schedule) => schedule.schedule_date);
  return new Set(dates).size === dates.length;
});
const SpaTherapistSchema = yup.object({
  full_name: yup.string().trim().required('Name is required'),
  phone: yup.string().trim().defined(),
  email: yup
    .string()
    .trim()
    .test('email', 'Enter a valid email address', (value) => !value || yup.string().email().isValidSync(value))
    .defined(),
  gender: yup.string().defined(),
  service_ids: yup.array().of(yup.string().uuid().required()).min(1, 'Pick at least one service').required(),
  avatar_url: yup.string().nullable().defined(),


  schedules: TherapistSchedulesSchema.default([]),
});
export { spaBookingSchema, spaPackageSchema, Registerschema, Loginschema, SpaServicesSchema, SpaTherapistSchema };


