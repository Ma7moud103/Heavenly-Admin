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

export interface ISpaCustomer {
  id: string;
  guest_id: string;
  customer_type: string;
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
