<script setup lang="ts">
import { getDayOfWeek, type DateValue } from '@internationalized/date'

const { state: localeState, setLocale, supportedLocales } = useAppLocale()

const value = shallowRef(dateConverter.toCalendarDate(new Date()))

const jumpToToday = () => {
  value.value = dateConverter.toCalendarDate(new Date())
}

const getWeekday = (date: DateValue) => getDayOfWeek(date, 'ja-JP')
const showColors = shallowRef(false)
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
        <div class="grid grid-cols-2 gap-2">
          <div class="flex items-start justify-center rounded-md bg-slate-200 p-4 dark:bg-slate-800">
            <UCalendar
              v-model="value"
              class="rounded-md bg-white p-4 dark:bg-slate-900"
              :data-show-colors="showColors ? 'true' : null"
              week-days-format="narrow"
            >
              <template #week-day="{ day }">
                <span class="text-lg">{{ day }}</span>
              </template>

              <template #day="{ day }">
                <span :data-weekday="getWeekday(day)">
                  {{ day.day }}
                </span>
              </template>
            </UCalendar>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex flex-col items-start justify-start gap-4 rounded-md p-4">
              <UButton label="Today" @click="jumpToToday" />

              <UFormField label="Add color to weekends and holidays:">
                <USwitch v-model="showColors" />
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

    [data-weekday='0'] {
      @apply text-red-500 font-semibold;
    }

    &[data-selected] {
      [data-weekday='6'] {
        @apply text-blue-100 font-semibold dark:text-blue-500;
      }

      [data-weekday='0'] {
        @apply text-red-100 font-semibold dark:text-red-500;
      }
    }
  }

  :deep([data-outside-view]) {
    @apply text-neutral-300 dark:text-neutral-600;
  }
}
</style>
