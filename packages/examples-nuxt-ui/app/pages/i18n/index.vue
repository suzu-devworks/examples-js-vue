<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const { state: localeState, setLocale, supportedLocales } = useAppLocale()

const value2 = shallowRef(new CalendarDate(2022, 2, 3))
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
          <div class="flex items-start justify-center rounded-md bg-slate-200 p-4">
            <UCalendar v-model="value2" class="rounded-md bg-white p-4" />
          </div>
          <div class="flex flex-col gap-2"></div>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
