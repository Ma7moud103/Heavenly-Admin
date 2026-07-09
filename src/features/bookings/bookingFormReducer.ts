import type { BookingFormState } from '@/features/bookings/bookingForm';
import { buildBookingFormState, initialBookingForm } from '@/features/bookings/bookingForm';
import type { IRoomBooking } from '@/interfaces/IRoomBookings';

export interface BookingFormReducerState {
  form: BookingFormState;
  errors: Partial<Record<keyof BookingFormState, string>>;
}

export const initialBookingFormReducerState: BookingFormReducerState = {
  form: initialBookingForm,
  errors: {},
};

export type BookingFormReducerAction =
  | {
      type: 'setField';
      field: keyof BookingFormState;
      value: BookingFormState[keyof BookingFormState];
    }
  | {
      type: 'setErrors';
      errors: Partial<Record<keyof BookingFormState, string>>;
    }
  | {
      type: 'hydrate';
      booking: IRoomBooking;
    }
  | {
      type: 'initialize';
      form: BookingFormState;
    }
  | {
      type: 'reset';
    };

export function bookingFormReducer(
  state: BookingFormReducerState,
  action: BookingFormReducerAction,
): BookingFormReducerState {
  switch (action.type) {
    case 'setField':
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };
    case 'setErrors':
      return {
        ...state,
        errors: action.errors,
      };
    case 'hydrate':
      return {
        form: buildBookingFormState(action.booking),
        errors: {},
      };
    case 'initialize':
      return {
        form: action.form,
        errors: {},
      };
    case 'reset':
      return initialBookingFormReducerState;
    default:
      return state;
  }
}
