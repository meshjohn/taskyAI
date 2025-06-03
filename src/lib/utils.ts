import { clsx, type ClassValue } from 'clsx';
import {
  format,
  formatRelative,
  isBefore,
  isSameYear,
  isToday,
  isTomorrow,
  startOfToday,
} from 'date-fns';
import { redirect } from 'react-router';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str: String) {
  return str[0].toUpperCase + str.slice(1);
}

export function formatCustomDate(date: string | number | Date) {
  const today = new Date();
  const relativeDay = formatRelative(date, today).split(' at ')[0];
  const relativeDays = [
    'Today',
    'Tomorrow',
    'Yesterday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];
  if (relativeDays.includes(relativeDay)) {
    return relativeDay;
  }
  if (isSameYear(date, today)) {
    return format(date, 'dd MMM');
  } else {
    return format(date, 'dd MMM yyyy');
  }
}

export function getTaskDueDateColorClass(
  dueDate: Date | null,
  completed?: boolean,
) {
  if (dueDate === null || completed === undefined) return;
  if (isBefore(dueDate, startOfToday()) && !completed) {
    return 'text-red-500';
  }
  if (isToday(dueDate)) {
    return 'text-emerald-500';
  }
  if (isTomorrow(dueDate) && !completed) {
    return 'text-amber-500';
  }
}

export function generateID() {
  return Math.random().toString(36).slice(8) + Date.now().toString(36);
}

export function getUserId() {
  const clerkUserId = localStorage.getItem('clerkUserId');
  if (!clerkUserId) {
    redirect('/auth-sync');
    return '';
  }
  return clerkUserId;
}

export function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return `${str.slice(0, maxLength - 1)}...`;
  }
  return str;
}
