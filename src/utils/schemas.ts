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

export { spaBookingSchema, spaPackageSchema };
