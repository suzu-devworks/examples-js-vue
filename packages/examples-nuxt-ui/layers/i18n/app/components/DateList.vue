<script setup lang="ts">
import type { DateValue } from '@internationalized/date'

export interface IDateListItem {
  date: DateValue
  name?: string
}

const { format = 'short', inputDefault } = defineProps<{
  inputDefault: DateValue | undefined
  useNaming?: boolean
  format?: 'long' | 'short'
}>()

const model = defineModel<IDateListItem[]>({ required: true })

const { state: localeState } = useAppLocale()
const { onCompositionStart, onCompositionEnd, isComposing } = useImeComposition()

const inputEnabled = ref(false)
const inputValue = shallowRef<DateValue | undefined>(inputDefault)
const inputName = ref('')

watch(
  () => inputDefault,
  (value) => {
    inputValue.value = value
  },
)

const inputError = computed(() => {
  const date = inputValue.value
  if (!date) return 'Please enter a date.'
  if (model.value.some((item) => item.date.compare(date) === 0)) return 'This date has already been added.'
  return undefined
})

function openInputArea() {
  inputEnabled.value = true
}

function closeAndClear() {
  inputName.value = ''
  inputEnabled.value = false
}

function addItem() {
  const date = inputValue.value
  if (!date || inputError.value) return
  const name = inputName.value.trim()
  model.value = [...model.value, { date, name: name || undefined }]
  inputName.value = ''
}

function onEnter(event: KeyboardEvent) {
  if (isComposing(event)) return
  // Let buttons (e.g. close) handle their own Enter.
  if (event.target instanceof HTMLElement && event.target.closest('button')) return
  event.preventDefault()
  addItem()
}

const editingItem = shallowRef<IDateListItem>()
const editingName = ref('')

function startEdit(item: IDateListItem) {
  editingItem.value = item
  editingName.value = item.name ?? ''
}

function cancelEdit() {
  editingItem.value = undefined
}

function commitEdit(event: KeyboardEvent) {
  if (isComposing(event)) return
  const target = editingItem.value
  if (!target) return
  const name = editingName.value.trim()
  model.value = model.value.map((x) => (x === target ? { ...x, name: name || undefined } : x))
  editingItem.value = undefined
}

function removeItem(item: IDateListItem) {
  model.value = model.value.filter((x) => x !== item)
}
</script>

<template>
  <div>
    <div class="mt-2 flex justify-end">
      <span class="text-xs font-medium">Total: {{ model.length }}</span>
    </div>

    <ul>
      <li
        v-for="item in model"
        :key="item.date.toString()"
        class="group border-b border-neutral-200 dark:border-neutral-700"
      >
        <div class="grid min-h-10 w-full grid-cols-[155px_1fr_26px] items-center gap-1">
          <div class="flex items-center justify-start">
            <NuxtTime
              :datetime="item.date.toString()"
              year="numeric"
              :month="format"
              day="numeric"
              :weekday="format"
              :locale="localeState.current.code"
            />
          </div>
          <div class="flex items-center justify-start">
            <template v-if="useNaming">
              <UInput
                v-if="editingItem === item"
                v-model="editingName"
                autofocus
                class="w-full"
                @compositionstart="onCompositionStart"
                @compositionend="onCompositionEnd"
                @keydown.enter.prevent="commitEdit"
                @keydown.esc.prevent.stop="cancelEdit"
                @blur="cancelEdit"
              />
              <div v-else class="size-full min-h-4 cursor-text px-2.5" @click="startEdit(item)">
                <span>{{ item.name }}</span>
              </div>
            </template>
          </div>
          <div class="flex items-center justify-center">
            <UButton
              icon="i-lucide-trash"
              color="neutral"
              variant="ghost"
              size="xs"
              class="invisible group-hover:visible"
              @click="removeItem(item)"
            />
          </div>
        </div>
      </li>

      <li
        v-if="inputEnabled"
        class="group"
        @compositionstart="onCompositionStart"
        @compositionend="onCompositionEnd"
        @keydown.enter="onEnter"
        @keydown.esc.prevent="inputEnabled = false"
      >
        <div class="grid min-h-10 w-full grid-cols-[155px_1fr_26px] items-center gap-1 py-1">
          <div class="flex items-center justify-start">
            <UInputDate v-model="inputValue" :color="inputError ? 'error' : undefined" />
          </div>
          <div class="flex items-center justify-start">
            <UInput v-if="useNaming" v-model="inputName" placeholder="Description" class="w-full" />
          </div>
          <div class="flex items-center justify-center">
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              size="xs"
              class="group-hover:visible"
              @click="closeAndClear"
            />
          </div>
        </div>
        <p v-if="inputError" class="text-xs text-error">{{ inputError }}</p>
        <p v-else class="text-xs text-neutral-400 dark:text-neutral-500">Press Enter to add, Esc to close.</p>
      </li>

      <li v-else class="flex items-center p-2">
        <UButton
          icon="i-lucide-plus"
          color="neutral"
          variant="ghost"
          size="sm"
          label="Add date"
          @click="openInputArea"
        />
      </li>
    </ul>
  </div>
</template>
