import type { IAuditLog } from '@/interfaces/IAuditLog';
import { parseUtcTimestamp } from '@/lib/utils';

function handleDateSort(first: IAuditLog, second: IAuditLog) {
  return parseUtcTimestamp(second.created_at).getTime() - parseUtcTimestamp(first.created_at).getTime();
}

export function timeNormalization(time: string): string {
  if (!time?.trim()) {
    return '-';
  }

  const [hoursPart = '', minutesPart = ''] = time.trim().split(':');
  const hours = Number(hoursPart);
  const minutes = Number(minutesPart);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return time;
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const normalizedHours = hours % 12 || 12;

  return `${normalizedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

function getTodayInCairo() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Cairo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === 'year')?.value ?? '';
  const month = parts.find((part) => part.type === 'month')?.value ?? '';
  const day = parts.find((part) => part.type === 'day')?.value ?? '';

  return `${year}-${month}-${day}`;
}

function getCurrentMonthInCairo() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Cairo',
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === 'year')?.value ?? '';
  const month = parts.find((part) => part.type === 'month')?.value ?? '';

  return `${year}-${month}`;
}

export { handleDateSort, getCurrentMonthInCairo, getTodayInCairo };
