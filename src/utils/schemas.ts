import type { IForm } from '@/interfaces/IRegisterForm';
import { EStatus, type IBookingData, type ICreatePackage } from '@/interfaces/ISpa';
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
  });

const spaPackageSchema: yup.ObjectSchema<ICreatePackage> = yup.object({
  name: yup.string().required('you must type name'),
  price: yup.number().required('you must type price').nullable(),
  is_active: yup.bool().default(false),
  description: yup.string().required('you must type description'),
  category_id: yup.string().required('you must select category'),
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

export { spaBookingSchema, spaPackageSchema, Registerschema };
