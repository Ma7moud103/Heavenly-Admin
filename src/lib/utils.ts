import type { IAuditLog, IRoomAuditData, IRoomBookingAuditData } from "@/interfaces/IAuditLog";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  }).format(amount);
}




export interface IRecentActivityItem {
  id: string
  type: "booking" | "room" | "update" | "delete"
  title: string
  description: string
  time: string
}

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
})

export function parseUtcTimestamp(value: string) {
  const normalizedValue = /[zZ]|[+-]\d{2}:\d{2}$/.test(value)
    ? value
    : `${value}Z`;
  return new Date(normalizedValue);
}

function formatRelativeTime(value: string) {
  const date = parseUtcTimestamp(value)
  const seconds = Math.round((date.getTime() - Date.now()) / 1000)
  const intervals = [
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
  ] as const

  for (const interval of intervals) {
    if (Math.abs(seconds) >= interval.seconds) {
      return relativeTimeFormatter.format(
        Math.round(seconds / interval.seconds),
        interval.unit
      )
    }
  }

  return relativeTimeFormatter.format(seconds, "second")
}

function formatLabel(value: string | null | undefined, fallback: string) {
  if (!value) return fallback
  return value
    .split(/[_-]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function getRoomChanges(
  oldData: IRoomAuditData | null,
  newData: IRoomAuditData | null
) {
  if (!oldData || !newData) return "Room details were updated"

  const changes: string[] = []

  if (oldData.type !== newData.type) {
    changes.push(
      `type from ${formatLabel(oldData.type, "Unknown")} to ${formatLabel(newData.type, "Unknown")}`
    )
  }

  if (oldData.status !== newData.status) {
    changes.push(
      `status from ${formatLabel(oldData.status, "Unknown")} to ${formatLabel(newData.status, "Unknown")}`
    )
  }

  if (oldData.base_price !== newData.base_price) {
    changes.push(
      `price from ${formatCurrency(oldData.base_price)} to ${formatCurrency(newData.base_price)}`
    )
  }

  if (oldData.capacity !== newData.capacity) {
    changes.push(`capacity from ${oldData.capacity} to ${newData.capacity}`)
  }

  if (oldData.title !== newData.title) {
    changes.push(`title from ${oldData.title} to ${newData.title}`)
  }

  return changes.length > 0 ? `Changed ${changes[0]}` : "Room details were updated"
}

function getBookingChanges(
  oldData: IRoomBookingAuditData | null,
  newData: IRoomBookingAuditData | null
) {
  if (!oldData || !newData) return "Booking details were updated"

  const changes: string[] = []

  if (oldData.check_in !== newData.check_in || oldData.check_out !== newData.check_out) {
    changes.push(`stay from ${oldData.check_in} - ${oldData.check_out} to ${newData.check_in} - ${newData.check_out}`)
  }

  if (oldData.total_price !== newData.total_price) {
    changes.push(
      `total from ${formatCurrency(oldData.total_price)} to ${formatCurrency(newData.total_price)}`
    )
  }

  if (oldData.status_id !== newData.status_id) {
    changes.push("booking status")
  }

  return changes.length > 0 ? `Updated ${changes[0]}` : "Booking details were updated"
}

export function mapAuditToActivity(log: IAuditLog): IRecentActivityItem {
  if (log.table_name === "rooms") {
    const newRoom = log.new_data as IRoomAuditData | null
    const oldRoom = log.old_data as IRoomAuditData | null
    const roomTitle =
      newRoom?.title || oldRoom?.title || newRoom?.type || oldRoom?.type || "Room"

    if (log.action.toLowerCase().includes("delete")) {
      return {
        id: log.id,
        type: "delete",
        title: "Room removed",
        description: `${roomTitle} was removed from rooms`,
        time: formatRelativeTime(log.created_at),
      }
    }

    if (log.action.toLowerCase().includes("create")) {
      return {
        id: log.id,
        type: "room",
        title: "Room created",
        description: `${roomTitle} was added to rooms`,
        time: formatRelativeTime(log.created_at),
      }
    }

    return {
      id: log.id,
      type: "update",
      title: "Room updated",
      description: `${roomTitle}: ${getRoomChanges(oldRoom, newRoom)}`,
      time: formatRelativeTime(log.created_at),
    }
  }

  const newBooking = log.new_data as IRoomBookingAuditData | null
  const oldBooking = log.old_data as IRoomBookingAuditData | null
  const bookingDates = newBooking
    ? `${newBooking.check_in} to ${newBooking.check_out}`
    : oldBooking
      ? `${oldBooking.check_in} to ${oldBooking.check_out}`
      : "booking dates unavailable"

  if (log.action.toLowerCase().includes("delete")) {
    return {
      id: log.id,
      type: "delete",
      title: "Booking removed",
      description: `Booking for ${bookingDates} was removed`,
      time: formatRelativeTime(log.created_at),
    }
  }

  if (log.action.toLowerCase().includes("create")) {
    return {
      id: log.id,
      type: "booking",
      title: "Booking created",
      description: `New booking scheduled for ${bookingDates}`,
      time: formatRelativeTime(log.created_at),
    }
  }

  return {
    id: log.id,
    type: "update",
    title: "Booking updated",
    description: getBookingChanges(oldBooking, newBooking),
    time: formatRelativeTime(log.created_at),
  }
}



