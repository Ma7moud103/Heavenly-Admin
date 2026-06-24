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

function App() {
  // HydrateFallback => Search for this method please
  return (
    <Routes>
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="room-types" element={<RoomSettings />} />
        <Route path="floor-plan" element={<p className="text-xl font-semibold">Floor Plan Management Coming Soon!</p>} />
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
