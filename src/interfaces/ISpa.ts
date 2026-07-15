import type { ElementType } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

export interface ISpaCategories {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISpaPackages {
  id: string;
  name: string;
  description: string;
  price: number;
  is_Active: boolean;
  createdAt: string;
  updatedAt: string;
  category_id?: ISpaCategories;
}

export interface ISpaServices {
  id: string;
  name: string;
  category_id?: ISpaCategories;
  description: string;
  duration: number;
  price: number;
  is_Active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ISpaPackageServices extends ISpaPackages {
  id: string;
  services: ISpaServices[];
}

export interface ISpaTherapists {
  id: string;
  full_name: string;
  gender: 'male' | 'female';
  phone: string;
  specialty: string;
  shift_from: string;
  shift_to: string;
  availability: 'on' | 'off' | 'break';
  createdAt: string;
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
  status: 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
  notes: string;
  created_at: string;
}

export enum EStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  CheckedIn = 'checked_in',
  Completed = 'completed',
  Cancelled = 'cancelled',
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
}

export interface IPacageInputs<T extends FieldValues> {
  labelName: string;
  name: FieldPath<T>;
  type?: React.HTMLInputTypeAttribute;
  InputType: ElementType;
}
