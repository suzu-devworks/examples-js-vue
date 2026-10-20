import { FILE_NAME } from '../plugins/init-holidays'

/**
 * An API that retrieves CSV data and returns a list of public holidays.
 */
export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event)
    const startDate = query.start ? Temporal.PlainDate.from(query.start as string) : undefined
    const endDate = query.end ? Temporal.PlainDate.from(query.end as string) : undefined

    const storage = useStorage('assets:server')
    try {
      const csvBuffer = await storage.getItemRaw(FILE_NAME)

      if (!csvBuffer) {
        throw new Error(`${FILE_NAME} not found.`)
      }

      const decoder = new TextDecoder('shift-jis')
      const csvText = decoder.decode(csvBuffer)

      const lines = csvText.split(/(\r)?\n/)
      const holidayDates: { date: string; name?: string }[] = []

      // The first line is a header ("National holidays/Holidays..."), so loop from the second line
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i]?.trim()
        if (!line) continue

        // Split by comma (e.g. "2026/1/1, New Year's Day" ➔ ["2026/1/1", "New Year's Day"])
        const cols = line.split(',')
        const rawDate = cols[0] // "2026/1/1"
        const holidayName = cols[1] // "New Year's Day"

        if (rawDate) {
          // In order to match the calendar side specifications (ISO 8601: YYYY-MM-DD),
          // Perform padding conversion to "2026/1/1" ➔ "2026-01-01"
          const dateParts = rawDate.split('/')
          if (dateParts.length === 3) {
            const year = dateParts[0]!
            const month = dateParts[1]!.padStart(2, '0')
            const day = dateParts[2]!.padStart(2, '0')
            const formatted = `${year}-${month}-${day}`
            const formattedDate = Temporal.PlainDate.from(formatted)

            if (startDate && Temporal.PlainDate.compare(formattedDate, startDate) < 0) continue
            if (endDate && Temporal.PlainDate.compare(formattedDate, endDate) > 0) continue

            holidayDates.push({ date: formatted, name: holidayName })
          }
        }
      }

      // Eliminate duplicates and return to front desk
      return {
        holidays: [...new Set(holidayDates)],
      }
    } catch (error: unknown) {
      // Handling server errors
      const message = error instanceof Error ? error.message : ''

      event.node.res.statusCode = 500
      return {
        error: true,
        message: message || 'Failed to process holiday data',
      }
    }
  },
  {
    // ==========================================
    // ⚡ Nitro cache configuration options ⚡
    // ==========================================
    maxAge: 60 * 60 * 24, // Cache expiry: 24 hours (1 day)

    /**
     * A function that generates a "key" to uniquely identify a cache
     */
    getKey: (event) => {
      const query = getQuery(event)
      const start = query.start || 'default-start'
      const end = query.end || 'default-end'
      return `holidays-${start}-${end}`
    },
  },
)
