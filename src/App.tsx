import { Route, Routes } from 'react-router-dom';
import Settings from '@/pages/Settings';
import MainLayout from '@/layouts/MainLayout';
import Dashboard from '@/pages/Dashboard';
import Rooms from '@/pages/Rooms';
import Guests from '@/pages/Guests';
import Bookings from '@/pages/Bookings';
import Checkin from '@/pages/Checkin';
import Reservations from '@/pages/Reservations';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import RoomSettings from './pages/RoomSettings';
import SpaCategories from '@/pages/spa/Categories';
import SpaServices from '@/pages/spa/Services';
import SpaPackages from '@/pages/spa/Packages';
import SpaTherapists from '@/pages/spa/Therapists';
import SpaGuests from '@/pages/spa/Guests';
import SpaBookings from '@/pages/spa/Bookings';
import SpaOverview from './pages/spa/SpaOverview';

function App() {
  // HydrateFallback => Search for this method please
  return (
    <Routes>
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="room-types" element={<RoomSettings />} />
        <Route path="spa" element={<SpaOverview />} />
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
  );
}

export default App;
