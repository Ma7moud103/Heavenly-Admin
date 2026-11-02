import { Navigate, Route, Routes } from 'react-router-dom';
import {
  Bookings,
  Checkin,
  Dashboard,
  Guests,
  Login,
  MainLayout,
  NotFound,
  Register,
  Reservations,
  RoomSettings,
  Rooms,
  Settings,
  Spa,
  SpaBookings,
  SpaCategories,
  SpaPackages,
  SpaServices,
  SpaTherapists,
  TherapistSchedule,
  BookingDetails,
  GuestBookingHistory,
} from './pages/lazy-pages';
import { Suspense } from 'react';
import { LoadingPage } from './pages/LoadingPage';
import { AuthProtectedRouteGuard } from './components/auth/AuthProtectedRoute';
import { ProtectedLayout } from './components/auth/ProtectedLayout';
import AuthProvider from './components/auth/AuthProvider';
import ForgetPassword from './features/forget-password/ForgetPassword';
import ResetPassword from './features/reset-password/ResetPassword';
import { CategoryProvider } from './stores/spa/Categories.store';
import { ServiceProvider } from './stores/spa/Services.store';

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          <Route element={<AuthProtectedRouteGuard />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="rooms" element={<Rooms />} />

              <Route path="room-types" element={<RoomSettings />} />
              <Route path="spa" element={<Spa />} />
              <Route
                path="spa/categories"
                element={
                  <CategoryProvider>
                    <SpaCategories />
                  </CategoryProvider>
                }
              />
              <Route
                path="spa/services"
                element={
                  <ServiceProvider>
                    <SpaServices />
                  </ServiceProvider>
                }
              />
              <Route path="spa/packages" element={<SpaPackages />} />
              <Route path="spa/therapists" element={<SpaTherapists />} />
              <Route path="spa/therapists/:therapistId/schedule" element={<TherapistSchedule />} />
              <Route path="spa/guests" element={<Navigate to="/guests" replace />} />
              <Route path="spa/bookings" element={<SpaBookings />} />

              <Route path="guests" element={<Guests />} />
              <Route path="guests/:guestId/bookings/:kind" element={<GuestBookingHistory />} />
              <Route path="booking-history/:kind/:bookingId" element={<BookingDetails />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="checkin" element={<Checkin />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
