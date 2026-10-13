import { CalendarDate, parseDate, getLocalTimeZone, type DateValue } from '@internationalized/date'

/**
 * Mutual conversion utility based on JS standard `Date` object.
 * Dates are interpreted in UTC so that results do not depend on the runtime's time zone.
 */
export const dateConverter = {
  /**
   * Convert from Date to CalendarDate
   */
  toCalendarDate(date: Date): CalendarDate {
    return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
  },

  /**
   * Convert CalendarDate to Date
   */
  fromCalendarDate(calendarDate: DateValue, timeZone?: string): Date {
    return calendarDate.toDate(timeZone ?? getLocalTimeZone())
  },

  /**
   * Convert from ISO string (YYYY-MM-DD) or Temporal to CalendarDate
   */
  toCalendarDateFromISO(isoSource: { toString(): string } | string): CalendarDate {
    const isoString = typeof isoSource === 'string' ? isoSource : isoSource.toString()
    return parseDate(isoString)
  },
} as const
