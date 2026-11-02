import type { ElementType } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

export interface ISpaCategories {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface ICategoryWithCounts extends ISpaCategories {
  servicesCount: number;
  packagesCount: number;
}

export interface ISpaPackages {
  id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  services?: ISpaServices[];
  category_id?: ISpaCategories;
}

export interface ISpaServices {
  id: string;
  name: string;
  category_id?: ISpaCategories;
  description: string;
  duration: number;
  price: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSpaService {
  name: string;
  description: string;
  duration: number;
  price: number;
  is_active: boolean;
  category_id: string;
}

export interface ISpaPackageServices extends ISpaPackages {
  id: string;
  services: ISpaServices[];
}

export type TherapistAvailability = 'on' | 'break' | 'off';
export type DailyScheduleStatus = 'working' | 'off';
export type DailyTimeSlotType = 'shift' | 'break';

export interface TherapistDailyTimeSlot {
  id: string;
  daily_schedule_id: string;
  start_time: string;
  end_time: string;
  slot_type: DailyTimeSlotType;
}
export interface TherapistScheduleSlotInput {
  start_time: string;
  end_time: string;
  slot_type: DailyTimeSlotType;
}
export interface TherapistDailyScheduleInput {
  schedule_date: string;
  status: DailyScheduleStatus;
  notes: string;
  slots: TherapistScheduleSlotInput[];
}
export interface TherapistDailySchedule extends Omit<TherapistDailyScheduleInput, 'slots'> {
  id: string;
  therapist_id: string;
  created_at: string;
  updated_at: string;
  slots: TherapistDailyTimeSlot[];
}
export interface ISpaTherapists {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  gender: string | null;
  specialty: string | null;
  avatar_url: string | null;
  shift_from: string | null;
  shift_to: string | null;
  availability: TherapistAvailability | null;
  created_at: string;
  updated_at: string;
}
export interface ICreateSpaTherapist {
  full_name: string;
  phone: string;
  email: string;
  gender: string;
  specialty: string;
  avatar_url: string | null;
  availability: TherapistAvailability;
  shift_from: string;
  shift_to: string;
}
export interface IGuest {
  avatar_url: string;
  country: string | null;
  email: string;
  full_name: string;
  id: string;
  is_active: boolean;
  phone: string;
  role: string;
  visits: number | null;
}

export interface ISpaCustomer {
  id: string;
  guest_id: string | IGuest;
  customer_type: ECustomerType;
  full_name: string;
  phone: string;
  email: string;
  created_at: string;
}

export interface ISpaBookings {
  id: string;
  customer_id: ISpaCustomer | string;
  therapist_id: ISpaTherapists;
  service_id: ISpaServices | null;
  package_id: ISpaPackageServices | null;
  booking_date: Date;
  start_time: string;
  end_time: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  notes: string;
  created_at: string;
}

export enum EStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Completed = 'completed',
  Cancelled = 'cancelled',
  NoShow = 'no_show',
}

export enum ECustomerType {
  external = 'external',
  hotel_guest = 'hotel_guest',
}

export interface IBookingData {
  booking_date: string;
  customer_id: string;
  start_time: string;
  end_time: string;
  notes: string;
  package_id: string | null;
  service_id: string | null;
  status: EStatus | null;
  therapist_id: string;
  total_price: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ICreatePackage {
  name: string;
  description: string;
  price: number | null;
  is_active: boolean;
  category_id: string;
  services: string[];
}

export interface IPacageInputs<T extends FieldValues> {
  labelName: string;
  name: FieldPath<T>;
  type?: React.HTMLInputTypeAttribute;
  InputType: ElementType;
}
