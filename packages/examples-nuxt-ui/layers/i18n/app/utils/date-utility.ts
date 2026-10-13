/**
 * Utility functions for working with dates and locales.
 */
export const dateUtility = {
  /**
   * Returns an array containing the day-of-the-week representations for the specified locale.
   * @param locale The locale string used to determine the first day of the week and the formatting of day names.
   * @returns An array of objects representing the days of the week and their positions.
   */
  getDaysOfWeekArray(locale: string = 'ja-JP') {
    const narrowFormatter = new Intl.DateTimeFormat(locale, { weekday: 'narrow' })
    const shortFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' })
    const longFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long' })

    const { firstDay } = new Intl.Locale(locale).getWeekInfo()
    const weekStartDay = firstDay === 7 ? 0 : firstDay

    const today = new Date()
    const daysSinceWeekStart =
      today.getDay() >= weekStartDay ? today.getDay() - weekStartDay : today.getDay() - weekStartDay + 7
    const weekStart = new Date(today)
    weekStart.setDate(today.getDate() - daysSinceWeekStart)

    return Array.from({ length: 7 }, (_, position) => {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + position)

      return {
        position,
        day: date.getDay(),
        narrow: narrowFormatter.format(date),
        short: shortFormatter.format(date),
        long: longFormatter.format(date),
      }
    })
  },
}
