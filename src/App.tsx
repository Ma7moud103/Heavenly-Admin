import { Route, Routes } from "react-router-dom"
import Settings from "@/pages/Settings"
import MainLayout from "@/layouts/MainLayout"
import Dashboard from "@/pages/Dashboard"
import Rooms from "@/pages/Rooms"
import Guests from "@/pages/Guests"
import Bookings from "@/pages/Bookings"
import NotFound from "@/pages/NotFound"

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route
          path="room-types"
          element={
            <p className="text-xl font-semibold">
              Room Types Management Coming Soon!
            </p>
          }
        />
        <Route
          path="floor-plan"
          element={
            <p className="text-xl font-semibold">
              Floor Plan Management Coming Soon!
            </p>
          }
        />
        <Route path="guests" element={<Guests />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App
