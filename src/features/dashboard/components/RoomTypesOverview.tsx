import { RoomTypesSkeleton } from "@/features/dashboard/components/DashboardSkeletons"
import type { IHotelStats } from "@/interfaces/HotelStatus"
import type { IRoomsTypes } from "@/interfaces/IRooms"

interface IProps {
  hotelStats: IHotelStats
  isLoading: boolean
  roomTypes: IRoomsTypes[]
}

export function RoomTypesOverview({

  isLoading,
  roomTypes,
}: IProps) {
  return (
    <div className="card p-5">
      <h2 className="mb-4 text-lg font-semibold">Room Types Overview</h2>
      {isLoading ? (
        <RoomTypesSkeleton />
      ) : (
        <div className="space-y-4">
          {roomTypes.map((room,index) => {
            // const percentage = (room.count / (hotelStats.total_rooms || 1)) * 100

            return (
              <div key={index}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">{room.name}</span>
                  <span className="text-sm text-[--color-text-sub]">{room.count} rooms</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[--color-bg-inset]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[--color-gold-600] to-[--color-gold-400] transition-all duration-500"
                    // style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
