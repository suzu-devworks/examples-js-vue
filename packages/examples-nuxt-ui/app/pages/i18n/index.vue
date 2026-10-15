<script setup lang="ts">
import type { DateValue, CalendarDate } from '@internationalized/date'
import { getDayOfWeek, startOfMonth, endOfMonth } from '@internationalized/date'

useSeoMeta({
  title: 'i18n',
})

const { state: localeState, setLocale, supportedLocales } = useAppLocale()

const value = shallowRef<CalendarDate | undefined>()
const placeholder = shallowRef<CalendarDate | undefined>()

// --- Jump to date in the calendar.
const jumpToToday = () => {
  if (!import.meta.client) return

  const today = dateConverter.toCalendarDate(new Date())
  value.value = today
  placeholder.value = today
}
onMounted(() => jumpToToday())

// Fix the day-of-the-week numbering for the 'ja' locale.
const getWeekday = (date: DateValue) => getDayOfWeek(date, 'ja')

const daysOfWeekArray = computed(() => dateUtility.getDaysOfWeekArray(localeState.value.current.code))
const getDayOfWeekByName = (weekName: string) => {
  return daysOfWeekArray.value.find((d) => d.narrow === weekName || d.short === weekName || d.long === weekName)
}

// --- Add color to weekends and holidays
const showColors = shallowRef(false)

// --- Customize the day of the week header
const showEmojiDays = shallowRef(false)

const emojiDaysDefault = ['☀️', '🌙', '🔥', '💧', '🌳', '🪙', '🪐']
const emojiDaysPattern = [
  { locale: 'fa-IR', emojis: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '🕌', '🗓️'] },
  { locale: 'uk', emojis: ['☀️', '🌱', '🛠️', '⚖️', '🌾', '☕', '🕯️'] },
]
const localeEmojiDays = computed(() => {
  return emojiDaysPattern.find(({ locale }) => locale === localeState.value.current.code)?.emojis ?? emojiDaysDefault
})

// -- Japanese public holidays
const showJapaneseHolidays = shallowRef(false)

const { data, status } = useLazyAsyncData(
  'japanese-holidays',
  async () => {
    if (!placeholder.value || !showJapaneseHolidays.value) {
      return []
    }
    const base = placeholder.value
    const start = startOfMonth(base.subtract({ months: 1 })).toString()
    const end = endOfMonth(base.add({ months: 1 })).toString()

    const response = await $fetch('/api/holidays', {
      query: { start, end },
    })

    if (!('holidays' in response)) {
      return []
    }

    return (
      response.holidays?.map((r) => ({
        date: dateConverter.toCalendarDate(new Date(r.date)),
        name: r.name,
      })) ?? []
    )
  },
  {
    // Monitor calendar changes and automatically refetch when they change
    watch: [showJapaneseHolidays, placeholder],

    // Allow operation only when switch is ON
    enabled: showJapaneseHolidays,
  },
)

// --- Specify custom holidays
const holidays = useState<{ date: DateValue; name?: string }[]>('i18n.calender.holidays', () => [])
onMounted(() => {
  if (holidays.value.length > 0) return

  var today = dateConverter.toCalendarDate(new Date())
  holidays.value = [
    { date: today.add({ days: 1 }), name: 'The next day' },
    { date: today.add({ weeks: 1 }), name: 'The following week' },
  ]
})

const holidaysMap = computed(() => {
  const map: Record<string, string> = {}
  holidays.value.forEach((h) => {
    map[h.date.toString()] = h.name ?? ''
  })
  if (status.value === 'success' && data.value) {
    data.value.forEach((h: { date: DateValue; name?: string }) => {
      map[h.date.toString()] = h.name ?? ''
    })
  }
  return map
})
const getHolidayName = (date: DateValue) => {
  const holiday = holidaysMap.value?.[date.toString()]
  return holiday ?? undefined
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <h1 class="m-4 text-2xl font-extrabold tracking-tight sm:text-3xl">Internationalization Page</h1>

    <UContainer class="flex flex-col gap-4">
      <UCard title="Locale settings">
        <ULocaleSelect
          :model-value="localeState.current.code"
          :locales="supportedLocales"
          class="min-w-60"
          @update:model-value="setLocale"
        />
      </UCard>

      <UCard title="Calendar">
        <div class="grid gap-2 md:grid-cols-2">
          <div class="flex items-start justify-center rounded-md bg-slate-200 p-4 dark:bg-slate-800">
            <UCalendar
              v-model="value"
              v-model:placeholder="placeholder"
              type="date"
              class="rounded-md bg-white p-4 dark:bg-slate-900"
              :data-show-colors="showColors ? 'true' : null"
              weekday-format="short"
            >
              <template #week-day="{ day }">
                <!-- Loop hack for temporary variables -->
                <template v-for="dayOfWeek in [getDayOfWeekByName(day)]" :key="dayOfWeek?.day">
                  <UTooltip v-if="showEmojiDays" arrow :text="dayOfWeek!.long">
                    <span :data-weekday="dayOfWeek!.day" class="text-lg">{{ localeEmojiDays[dayOfWeek!.day] }}</span>
                  </UTooltip>
                  <span v-else :data-weekday="dayOfWeek!.day">{{ day }}</span>
                </template>
              </template>

              <template #day="{ day }">
                <span :data-weekday="getWeekday(day)" :data-holiday-name="getHolidayName(day)">
                  {{ day.day }}
                </span>
              </template>
            </UCalendar>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex flex-col items-start justify-start gap-4 rounded-md p-4">
              <UFormField label="Jump to:" class="w-full">
                <UButton label="Today" @click="jumpToToday" />
              </UFormField>

              <UFormField label="Add color to weekends and holidays:" class="w-full">
                <USwitch v-model="showColors" />
              </UFormField>

              <UFormField label="Customize the day of the week header:" class="w-full">
                <USwitch v-model="showEmojiDays" />
              </UFormField>

              <UFormField label="Display Japanese public holidays:" class="w-full">
                <USwitch v-model="showJapaneseHolidays" />
              </UFormField>

              <UFormField label="Add custom holidays:" class="w-full">
                <DateList v-model="holidays" :input-default="value" use-naming />
              </UFormField>
            </div>
          </div>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>

<style lang="css" scoped>
@reference "~/assets/css/main.css";

[data-show-colors] {
  :deep([data-value]:not([data-outside-view], [data-today])) {
    [data-weekday='6'] {
      @apply text-blue-500 font-semibold;
    }

    [data-weekday='0'],
    [data-holiday-name] {
      @apply text-red-500 font-semibold;
    }

    &[data-selected] {
      [data-weekday='6'] {
        @apply text-blue-100 font-semibold dark:text-blue-500;
      }

      [data-weekday='0'],
      [data-holiday-name] {
        @apply text-red-200 font-semibold dark:text-red-500;
      }
    }
  }

  span[data-holiday-name]:hover::after {
    content: attr(data-holiday-name);

    @apply absolute bottom-full mb-1 p-1 text-xs bg-gray-700 text-white rounded shadow-md whitespace-nowrap z-10;
  }

  :deep([data-outside-view]) {
    @apply text-neutral-300 dark:text-neutral-600;
  }
}
</style>
