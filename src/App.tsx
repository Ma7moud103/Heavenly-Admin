import { Route, Routes } from 'react-router-dom'
import Settings from "@/pages/Settings"
import MainLayout from "@/layouts/MainLayout"
import Dashboard from "@/pages/Dashboard"
import Rooms from "@/pages/Rooms"
import Guests from "@/pages/Guests"
import Bookings from "@/pages/Bookings"

function App() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="guests" element={<Guests />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

export default App
