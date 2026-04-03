import { 
  BedDouble, 
  Users, 
  DollarSign, 
  CalendarDays, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Wrench,
  CreditCard
} from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { StatCard } from "@/components/dashboard/StatCard"
import { DataTable } from "@/components/dashboard/DataTable"
import { Badge } from "@/components/dashboard/Badge"
import { bookings, recentActivity, roomTypes } from "@/data/hotelData"
import { formatCurrency } from "@/lib/utils"
import {  useHotelStats } from "@/hooks/getHotelStats"


export default function Dashboard() {
  const { data: hotelStats, isLoading: isGettingHotelStats } = useHotelStats();

 
  
 
 

  const bookingColumns = [
    {
      key: "guest",
      header: "Guest",
      cell: (row: typeof bookings[0]) => (
        <div>
          <div className="font-medium">{row.guest}</div>
          <div className="text-xs text-[--color-text-muted]">{row.roomId} • {row.roomType}</div>
        </div>
      ),
    },
    {
      key: "checkIn",
      header: "Check-in",
      cell: (row: typeof bookings[0]) => (
        <div className="text-sm">
          <div>{row.checkIn}</div>
          <div className="text-xs text-[--color-text-muted]">to {row.checkOut}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: typeof bookings[0]) => {
        const variants: Record<string, "success" | "warning" | "error" | "info"> = {
          "checked-in": "success",
          "reserved": "warning",
          "pending": "error",
          "checked-out": "info",
        }
        return <Badge variant={variants[row.status]}>{row.status.replace("-", " ")}</Badge>
      },
    },
    {
      key: "total",
      header: "Total",
      cell: (row: typeof bookings[0]) => (
        <span className="font-medium">{formatCurrency(row.total)}</span>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      cell: (row: typeof bookings[0]) => (
        <Badge variant={row.payment === "paid" ? "success" : "warning"}>
          {row.payment}
        </Badge>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-[--color-text-sub]">
            Welcome back! Here's what's happening at Heavenly Hotel.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[--color-text-sub]">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Rooms"
          value={isGettingHotelStats ? "-" : (hotelStats?.total_rooms ?? "-")}
          change="156 total"
          changeType="neutral"
          icon={<BedDouble className="w-5 h-5" />}
        />
        <StatCard
          title="Occupancy Rate"
          value={isGettingHotelStats ? "-" : `${hotelStats?.occupancy_rate}%`}
          change="+2.4%"
          changeType="positive"
          icon={<TrendingUp className="w-5 h-5" />}
          variant="gold"
        />
        <StatCard
          title="Guests In House"
          value={
            isGettingHotelStats ? "-" : (hotelStats?.occupied_rooms ?? "-")
          }
          change={`${hotelStats?.checkins_today} check-ins today`}
          changeType="neutral"
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          title="Today's Revenue"
          value={
            isGettingHotelStats
              ? "-"
              : formatCurrency(hotelStats?.revenue_today || 0)
          }
          change="+12.5%"
          changeType="positive"
          icon={<DollarSign className="w-5 h-5" />}
          variant="success"
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between p-5 border-b border-[--color-border]">
              <h2 className="font-semibold text-lg">Recent Bookings</h2>
              <Link
                to="/bookings"
                className="text-sm text-[--color-text-gold] hover:text-[--color-text-gold-muted] flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <DataTable
              data={bookings.slice(0, 6)}
              columns={bookingColumns}
              emptyMessage="No bookings found"
            />
          </div>
        </div>

        {/* Room Types Overview */}
        <div className="card p-5">
          <h2 className="font-semibold text-lg mb-4">Room Types Overview</h2>
          <div className="space-y-4">
            {roomTypes.slice(0, 5).map((room) => {
              const percentage =
                (room.count / (hotelStats?.total_rooms || 1)) * 100;
              return (
                <div key={room.type}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{room.type}</span>
                    <span className="text-sm text-[--color-text-sub]">
                      {room.count} rooms
                    </span>
                  </div>
                  <div className="h-2 bg-[--color-bg-inset] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[--color-gold-600] to-[--color-gold-400] rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-[--color-border-subtle]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[--color-text-sub]">Avg. Room Rate</span>
              <span className="font-semibold text-[--color-text-gold]">
                {formatCurrency(hotelStats?.avg_room_rate || 0)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card p-5">
          <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    {
                      "bg-[--color-success-bg] text-[--color-success]":
                        activity.type === "check-in",
                      "bg-[--color-info-bg] text-[--color-info]":
                        activity.type === "check-out",
                      "bg-[--color-warning-bg] text-[--color-warning]":
                        activity.type === "booking",
                      "bg-purple-900/30 text-purple-400":
                        activity.type === "maintenance",
                      "bg-[--color-gold-950] text-[--color-gold-400]":
                        activity.type === "payment"
                    }
                  )}
                >
                  {activity.type === "check-in" && (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  {activity.type === "check-out" && (
                    <Clock className="w-4 h-4" />
                  )}
                  {activity.type === "booking" && (
                    <CalendarDays className="w-4 h-4" />
                  )}
                  {activity.type === "maintenance" && (
                    <Wrench className="w-4 h-4" />
                  )}
                  {activity.type === "payment" && (
                    <CreditCard className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    {activity.type === "check-in" && (
                      <>
                        <span className="font-medium">{activity.guest}</span>{" "}
                        checked into room {activity.room}
                      </>
                    )}
                    {activity.type === "check-out" && (
                      <>
                        <span className="font-medium">{activity.guest}</span>{" "}
                        checked out from room {activity.room}
                      </>
                    )}
                    {activity.type === "booking" && (
                      <>
                        <span className="font-medium">{activity.guest}</span>{" "}
                        booked room {activity.room}
                      </>
                    )}
                    {activity.type === "maintenance" && (
                      <>
                        {activity.description} for room {activity.room}
                      </>
                    )}
                    {activity.type === "payment" && (
                      <>
                        <span className="font-medium">{activity.guest}</span>{" "}
                        paid {activity.amount}
                      </>
                    )}
                  </p>
                  <p className="text-xs text-[--color-text-muted]">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Quick Stats */}
        <div className="card p-5">
          <h2 className="font-semibold text-lg mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[--color-bg-inset] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[--color-success]" />
                <span className="text-sm text-[--color-text-sub]">
                  Available
                </span>
              </div>
              <div className="text-2xl font-bold">
                {hotelStats?.available_rooms}
              </div>
            </div>
            <div className="p-4 bg-[--color-bg-inset] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-[--color-warning]" />
                <span className="text-sm text-[--color-text-sub]">Pending</span>
              </div>
              <div className="text-2xl font-bold">
                {hotelStats?.pending_bookings}
              </div>
            </div>
            <div className="p-4 bg-[--color-bg-inset] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[--color-info]" />
                <span className="text-sm text-[--color-text-sub]">
                  Check-ins Today
                </span>
              </div>
              <div className="text-2xl font-bold">
                {hotelStats?.checkins_today}
              </div>
            </div>
            <div className="p-4 bg-[--color-bg-inset] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[--color-error]" />
                <span className="text-sm text-[--color-text-sub]">
                  Check-outs Today
                </span>
              </div>
              <div className="text-2xl font-bold">
                {hotelStats?.checkouts_today}
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gradient-to-r from-[--color-gold-900]/50 to-[--color-gold-800]/30 rounded-lg border border-[--color-border-gold]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[--color-text-sub]">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-bold text-[--color-text-gold]">
                  {formatCurrency(hotelStats?.revenue_month || 0)}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-[--color-gold-400]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
