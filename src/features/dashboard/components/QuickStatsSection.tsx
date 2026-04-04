import {
  AlertCircle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react"
import type { IHotelStats } from "@/interfaces/HotelStatus"
import { formatCurrency } from "@/lib/utils"

interface IProps {
  hotelStats: IHotelStats
}

export function QuickStatsSection({ hotelStats }: IProps) {
  return (
    <div className="card p-5">
      <h2 className="mb-4 text-lg font-semibold">Quick Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-[--color-bg-inset] p-4">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[--color-success]" />
            <span className="text-sm text-[--color-text-sub]">Available</span>
          </div>
          <div className="text-2xl font-bold">{hotelStats.available_rooms}</div>
        </div>
        <div className="rounded-lg bg-[--color-bg-inset] p-4">
          <div className="mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-[--color-warning]" />
            <span className="text-sm text-[--color-text-sub]">Pending</span>
          </div>
          <div className="text-2xl font-bold">{hotelStats.pending_bookings}</div>
        </div>
        <div className="rounded-lg bg-[--color-bg-inset] p-4">
          <div className="mb-2 flex items-center gap-2">
            <Users className="h-4 w-4 text-[--color-info]" />
            <span className="text-sm text-[--color-text-sub]">Check-ins Today</span>
          </div>
          <div className="text-2xl font-bold">{hotelStats.checkins_today}</div>
        </div>
        <div className="rounded-lg bg-[--color-bg-inset] p-4">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-[--color-error]" />
            <span className="text-sm text-[--color-text-sub]">Check-outs Today</span>
          </div>
          <div className="text-2xl font-bold">{hotelStats.checkouts_today}</div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-[--color-border-gold] bg-gradient-to-r from-[--color-gold-900]/50 to-[--color-gold-800]/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[--color-text-sub]">Monthly Revenue</p>
            <p className="text-2xl font-bold text-[--color-text-gold]">
              {formatCurrency(hotelStats.revenue_month)}
            </p>
          </div>
          <TrendingUp className="h-8 w-8 text-[--color-gold-400]" />
        </div>
      </div>
    </div>
  )
}
