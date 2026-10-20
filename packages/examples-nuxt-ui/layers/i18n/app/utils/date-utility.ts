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

    // PlainDate.dayOfWeek is 1 (Monday) to 7 (Sunday), same as firstDay.
    const today = Temporal.Now.plainDateISO()
    const daysSinceWeekStart = today.dayOfWeek >= firstDay ? today.dayOfWeek - firstDay : today.dayOfWeek - firstDay + 7
    const weekStart = today.subtract({ days: daysSinceWeekStart })

    return Array.from({ length: 7 }, (_, position) => {
      const date = weekStart.add({ days: position })

      return {
        position,
        day: date.dayOfWeek % 7,
        narrow: narrowFormatter.format(date),
        short: shortFormatter.format(date),
        long: longFormatter.format(date),
      }
    })
  },
}
