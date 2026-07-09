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

avatar_url: 'https://iuotdaxbblcetdujhqbw.supabase.co/storage/v1/object/sign/avatars/main%20image%20for%20me.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mY2IxMjg1Zi1kMmZhLTQ2N2YtODdiYi1jMjNkNTE0YTQ0NGQiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhdmF0YXJzL21haW4gaW1hZ2UgZm9yIG1lLmpwZWciLCJpYXQiOjE3NzU1MTA2NTgsImV4cCI6MTgwNzA0NjY1OH0.A8TOcecgTMIWaTkM4TXlMKneIeUPaoOEoKJzmOvGKtw';
country: null;
created_at: '2026-03-04T00:08:20.184975';
email: null;
full_name: 'Youssef';
id: '23575ea7-8c9d-425e-b990-76ca7da8ca35';
is_active: true;
phone: '+201115671984';
role: 'superAdmin';
visits: null;

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
