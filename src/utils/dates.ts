import type { IAuditLog } from '@/interfaces/IAuditLog';
import { parseUtcTimestamp } from '@/lib/utils';

function handleDateSort(first: IAuditLog, second: IAuditLog) {
  return parseUtcTimestamp(second.created_at).getTime() - parseUtcTimestamp(first.created_at).getTime();
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
