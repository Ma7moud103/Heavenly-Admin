import {
  AlertCircle,
  BedDouble,
  CalendarDays,
  Clock,
} from "lucide-react"
import type { IRecentActivityItem } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface IProps {
  activities: IRecentActivityItem[]
  isLoading: boolean
}

export function RecentActivitySection({
  activities,
  isLoading,
}: IProps) {
  return (
    <div className="card p-5">
      <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-[--color-bg-inset]" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-[--color-bg-inset]" />
                <div className="h-3 w-1/3 rounded bg-[--color-bg-inset]" />
              </div>
            </div>
          ))
        ) : activities.length === 0 ? (
          <p className="text-sm text-[--color-text-muted]">No recent activity found.</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  {
                    "bg-[--color-warning-bg] text-[--color-warning]":
                      activity.type === "booking",
                    "bg-[--color-info-bg] text-[--color-info]": activity.type === "room",
                    "bg-[--color-success-bg] text-[--color-success]":
                      activity.type === "update",
                    "bg-[--color-error-bg] text-[--color-error]":
                      activity.type === "delete",
                  }
                )}
              >
                {activity.type === "booking" && <CalendarDays className="h-4 w-4" />}
                {activity.type === "room" && <BedDouble className="h-4 w-4" />}
                {activity.type === "update" && <Clock className="h-4 w-4" />}
                {activity.type === "delete" && <AlertCircle className="h-4 w-4" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-sm text-[--color-text-sub]">{activity.description}</p>
                <p className="text-xs text-[--color-text-muted]">{activity.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
