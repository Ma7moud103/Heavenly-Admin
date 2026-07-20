import { Route, Routes } from 'react-router-dom';
import {
  Register,
  Bookings,
  Checkin,
  Dashboard,
  Guests,
  MainLayout,
  NotFound,
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
// import { Suspense } from 'react';
// import LoadingPage from './pages/LoadingPage';

function App() {
  // HydrateFallback => Search for this method please
  return (
    // <Suspense fallback={<LoadingPage />}>
    <Routes>
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
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
    </Routes>
    // </Suspense>
  );
}

export default App;
