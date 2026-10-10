import { CalendarDate, parseDate } from '@internationalized/date'

const DEFAULT_TIMEZONE = 'Asia/Tokyo'

/**
 * Mutual conversion utility based on JS standard `Date` object
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
  fromCalendarDate(calendarDate: CalendarDate, timeZone: string = DEFAULT_TIMEZONE): Date {
    return calendarDate.toDate(timeZone)
  },

  /**
   * Convert from ISO string (YYYY-MM-DD) or Temporal to CalendarDate
   */
  toCalendarDateFromISO(isoSource: { toString(): string } | string): CalendarDate {
    const isoString = typeof isoSource === 'string' ? isoSource : isoSource.toString()
    return parseDate(isoString)
  },
} as const
