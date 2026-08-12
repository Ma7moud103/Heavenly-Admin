import { lazy } from 'react';

export const MainLayout = lazy(() => import('@/layouts/MainLayout'));
export const Dashboard = lazy(() => import('@/pages/Dashboard'));
export const Settings = lazy(() => import('@/pages/Settings'));
export const Rooms = lazy(() => import('@/pages/Rooms'));
export const Guests = lazy(() => import('@/pages/Guests'));
export const Bookings = lazy(() => import('@/pages/Bookings'));
export const Checkin = lazy(() => import('@/pages/Checkin'));
export const Reservations = lazy(() => import('@/pages/Reservations'));
export const Register = lazy(() => import('@/features/register/pages/Register'));
export const Login = lazy(() => import('@/features/login/page/Login'));
export const NotFound = lazy(() => import('@/pages/NotFound'));

export const RoomSettings = lazy(() => import('@/pages/RoomSettings'));

export const Spa = lazy(() => import('@/pages/Spa'));
export const SpaCategories = lazy(() => import('@/pages/spa/Categories'));
export const SpaServices = lazy(() => import('@/pages/spa/Services'));
export const SpaPackages = lazy(() => import('@/pages/spa/Packages'));
export const SpaTherapists = lazy(() => import('@/pages/spa/Therapists'));
export const SpaGuests = lazy(() => import('@/pages/spa/Guests'));
export const SpaBookings = lazy(() => import('@/pages/spa/Bookings'));
