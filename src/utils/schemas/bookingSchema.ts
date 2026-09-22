import * as yup from 'yup';

export const bookingSchema = yup
  .object({
    room_id: yup.string().required('Room is required'),
    guest_id: yup.number().typeError('Guest is required').required('Guest is required'),
    status_id: yup.string().required('Status is required'),
    check_in: yup.string().required('Check-in date is required'),
    check_out: yup.string().required('Check-out date is required'),
  })
  .test('valid-stay', 'Check-out must be after check-in', (value) => {
    if (!value?.check_in || !value.check_out) return true;
    return new Date(`${value.check_out}T12:00:00`) > new Date(`${value.check_in}T12:00:00`);
  });
