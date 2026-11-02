import { lazy } from 'react';

export const MainLayout = lazy(() => import('@/layouts/MainLayout'));
export const Dashboard = lazy(() => import('@/pages/Dashboard'));
export const Settings = lazy(() => import('@/pages/Settings'));
export const Rooms = lazy(() => import('@/pages/rooms/Rooms'));
export const Guests = lazy(() => import('@/pages/guests/Guests'));
export const Bookings = lazy(() => import('@/pages/bookings/Bookings'));
export const Checkin = lazy(() => import('@/pages/bookings/Checkin'));
export const Reservations = lazy(() => import('@/pages/bookings/Reservations'));
export const Register = lazy(() => import('@/features/register/pages/Register'));
export const Login = lazy(() => import('@/features/login/page/Login'));
export const NotFound = lazy(() => import('@/pages/NotFound'));

export const RoomSettings = lazy(() => import('@/pages/rooms/RoomSettings'));

export const Spa = lazy(() => import('@/pages/spa/Spa'));
export const SpaCategories = lazy(() => import('@/pages/spa/Categories'));
export const SpaServices = lazy(() => import('@/pages/spa/Services'));
export const SpaPackages = lazy(() => import('@/pages/spa/Packages'));
export const SpaTherapists = lazy(() => import('@/pages/spa/Therapists'));
export const SpaGuests = lazy(() => import('@/pages/spa/Guests'));
export const SpaBookings = lazy(() => import('@/features/spa/components/bookings/SpaBookingsPage'));
export const BookingDetails = lazy(() => import('@/pages/bookings/BookingDetails'));
export const GuestBookingHistory = lazy(() => import('@/pages/guests/GuestBookingHistory'));

export const TherapistSchedule = lazy(() => import('@/pages/spa/TherapistSchedule'));
