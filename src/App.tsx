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
  SpaGuests,
  SpaPackages,
  SpaServices,
  SpaTherapists,
} from './pages/lazy-pages';
import { Suspense } from 'react';
import { LoadingPage } from './pages/LoadingPage';
import { AuthProtectedRouteGuard } from './components/AuthProtectedRoute';
import { ProtectedLayout } from './components/ProtectedLayout';
import AuthProvider from './components/AuthProvider';

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<AuthProtectedRouteGuard />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="room-types" element={<RoomSettings />} />
              <Route path="spa" element={<Spa />} />
              <Route path="spa/categories" element={<SpaCategories />} />
              <Route path="spa/services" element={<SpaServices />} />
              <Route path="spa/packages" element={<SpaPackages />} />
              <Route path="spa/therapists" element={<SpaTherapists />} />
              <Route path="spa/guests" element={<SpaGuests />} />
              <Route path="spa/bookings" element={<SpaBookings />} />

              <Route path="guests" element={<Guests />} />
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
