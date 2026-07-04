import type { IHotelStats } from "@/interfaces/HotelStatus";
import { supabase } from "@/services/supabase"




export const fetchHotelStats = async (): Promise<{ data: IHotelStats[] | null; error: Error | null }> => {
  const { data, error } = await supabase.from('hotel_stats').select<'*', IHotelStats>('*')
  return { data, error }
}




export const rooms = [
  { id: "101", type: "Deluxe King", floor: 1, status: "occupied", price: 285 },
  { id: "102", type: "Deluxe Twin", floor: 1, status: "occupied", price: 265 },
  { id: "103", type: "Suite", floor: 1, status: "occupied", price: 450 },
  { id: "104", type: "Standard Queen", floor: 1, status: "available", price: 185 },
  { id: "105", type: "Deluxe King", floor: 1, status: "maintenance", price: 285 },
  { id: "201", type: "Deluxe King", floor: 2, status: "occupied", price: 285 },
  { id: "202", type: "Suite", floor: 2, status: "reserved", price: 450 },
  { id: "203", type: "Deluxe Twin", floor: 2, status: "occupied", price: 265 },
  { id: "204", type: "Standard Queen", floor: 2, status: "available", price: 185 },
  { id: "205", type: "Standard King", floor: 2, status: "occupied", price: 195 },
  { id: "301", type: "Presidential Suite", floor: 3, status: "occupied", price: 850 },
  { id: "302", type: "Suite", floor: 3, status: "available", price: 450 },
  { id: "303", type: "Deluxe King", floor: 3, status: "occupied", price: 285 },
  { id: "304", type: "Suite", floor: 3, status: "reserved", price: 450 },
  { id: "305", type: "Deluxe Twin", floor: 3, status: "maintenance", price: 265 },
];

export const guests = [
  { id: "G001", name: "John Anderson", email: "john.anderson@email.com", phone: "+1 555-0101", country: "United States", visits: 5, totalSpent: 12450, lastVisit: "2026-03-15", status: "vip" },
  { id: "G002", name: "Sarah Mitchell", email: "sarah.m@email.com", phone: "+1 555-0102", country: "Canada", visits: 2, totalSpent: 2850, lastVisit: "2026-03-18", status: "regular" },
  { id: "G003", name: "Robert Chen", email: "robert.chen@email.com", phone: "+1 555-0103", country: "Singapore", visits: 8, totalSpent: 28900, lastVisit: "2026-03-10", status: "vip" },
  { id: "G004", name: "Emily Davis", email: "emily.davis@email.com", phone: "+44 20 7123 4567", country: "United Kingdom", visits: 1, totalSpent: 855, lastVisit: "2026-03-19", status: "regular" },
  { id: "G005", name: "Michael Brown", email: "mbrown@email.com", phone: "+1 555-0105", country: "United States", visits: 3, totalSpent: 4320, lastVisit: "2026-03-20", status: "regular" },
  { id: "G006", name: "Lisa Wang", email: "lisa.wang@email.com", phone: "+86 10 8888 9999", country: "China", visits: 12, totalSpent: 45600, lastVisit: "2026-03-18", status: "vip" },
  { id: "G007", name: "David Kim", email: "david.kim@email.com", phone: "+82 2 1234 5678", country: "South Korea", visits: 4, totalSpent: 5680, lastVisit: "2026-03-17", status: "regular" },
  { id: "G008", name: "Jennifer Lopez", email: "jlo@email.com", phone: "+1 555-0108", country: "United States", visits: 15, totalSpent: 125000, lastVisit: "2026-03-19", status: "vip" },
  { id: "G009", name: "Thomas Wright", email: "t.wright@email.com", phone: "+61 2 9876 5432", country: "Australia", visits: 2, totalSpent: 1990, lastVisit: "2026-03-16", status: "regular" },
  { id: "G010", name: "Amanda Garcia", email: "amanda.g@email.com", phone: "+34 91 123 4567", country: "Spain", visits: 6, totalSpent: 9870, lastVisit: "2026-03-20", status: "regular" },
];

export const bookings = [
  { id: "B001", roomId: "101", roomType: "Deluxe King", guest: "John Anderson", guestId: "G001", checkIn: "2026-03-15", checkOut: "2026-03-20", status: "checked-in", total: 1425, payment: "paid" },
  { id: "B002", roomId: "102", roomType: "Deluxe Twin", guest: "Sarah Mitchell", guestId: "G002", checkIn: "2026-03-17", checkOut: "2026-03-21", status: "checked-in", total: 1060, payment: "paid" },
  { id: "B003", roomId: "103", roomType: "Suite", guest: "Robert Chen", guestId: "G003", checkIn: "2026-03-10", checkOut: "2026-03-25", status: "checked-in", total: 6750, payment: "paid" },
  { id: "B004", roomId: "201", roomType: "Deluxe King", guest: "Emily Davis", guestId: "G004", checkIn: "2026-03-19", checkOut: "2026-03-22", status: "checked-in", total: 855, payment: "paid" },
  { id: "B005", roomId: "202", roomType: "Suite", guest: "Michael Brown", guestId: "G005", checkIn: "2026-03-20", checkOut: "2026-03-25", status: "reserved", total: 2250, payment: "pending" },
  { id: "B006", roomId: "203", roomType: "Deluxe Twin", guest: "Lisa Wang", guestId: "G006", checkIn: "2026-03-16", checkOut: "2026-03-21", status: "checked-in", total: 1325, payment: "paid" },
  { id: "B007", roomId: "205", roomType: "Standard King", guest: "David Kim", guestId: "G007", checkIn: "2026-03-17", checkOut: "2026-03-20", status: "checked-in", total: 585, payment: "paid" },
  { id: "B008", roomId: "301", roomType: "Presidential Suite", guest: "Jennifer Lopez", guestId: "G008", checkIn: "2026-03-18", checkOut: "2026-03-22", status: "checked-in", total: 3400, payment: "paid" },
  { id: "B009", roomId: "303", roomType: "Deluxe King", guest: "Thomas Wright", guestId: "G009", checkIn: "2026-03-16", checkOut: "2026-03-19", status: "checked-in", total: 855, payment: "paid" },
  { id: "B010", roomId: "304", roomType: "Suite", guest: "Amanda Garcia", guestId: "G010", checkIn: "2026-03-20", checkOut: "2026-03-25", status: "reserved", total: 2250, payment: "pending" },
  { id: "B011", roomId: "104", roomType: "Standard Queen", guest: "New Guest", guestId: null, checkIn: "2026-03-21", checkOut: "2026-03-23", status: "pending", total: 370, payment: "pending" },
  { id: "B012", roomId: "204", roomType: "Standard Queen", guest: "James Wilson", guestId: null, checkIn: "2026-03-22", checkOut: "2026-03-24", status: "pending", total: 370, payment: "pending" },
];

export const recentActivity = [
  { id: 1, type: "check-in", guest: "Emily Davis", room: "201", time: "10 minutes ago" },
  { id: 2, type: "check-out", guest: "Mark Thompson", room: "105", time: "25 minutes ago" },
  { id: 3, type: "booking", guest: "Michael Brown", room: "202", time: "1 hour ago" },
  { id: 4, type: "maintenance", room: "105", description: "AC unit repaired", time: "2 hours ago" },
  { id: 5, type: "payment", guest: "John Anderson", amount: "$1,425", time: "3 hours ago" },
];

export const roomTypes = [
  { type: "Standard Queen", count: 45, price: 185 },
  { type: "Standard King", count: 30, price: 195 },
  { type: "Deluxe Twin", count: 25, price: 265 },
  { type: "Deluxe King", count: 35, price: 285 },
  { type: "Suite", count: 15, price: 450 },
  { type: "Presidential Suite", count: 6, price: 850 },
];

export const weeklyRevenue = [
  { day: "Mon", revenue: 28500 },
  { day: "Tue", revenue: 32100 },
  { day: "Wed", revenue: 29800 },
  { day: "Thu", revenue: 35600 },
  { day: "Fri", revenue: 41200 },
  { day: "Sat", revenue: 48500 },
  { day: "Sun", revenue: 42800 },
];
