<script setup lang="ts">
import { type GenericObject, type TypedSchema, useForm } from 'vee-validate'
import { ref, watch } from 'vue'

import { type FormValues, initialValues } from '../types'
import BasicSection from './BasicSection.vue'
import ContactSection from './ContactSection.vue'
import MembersSection from './MembersSection.vue'
import PeriodSection from './PeriodSection.vue'

const props = defineProps<{ title: string; schema: TypedSchema<GenericObject, unknown> }>()

const model = defineModel<FormValues>({ required: true })
const submitted = ref<unknown>()

const { handleSubmit, resetForm, setValues, values, meta, errors } = useForm({
  validationSchema: props.schema,
  initialValues: model.value,
})

// Keep the parent's v-model and the form values in sync in both directions.
// structuredClone throws on reactive proxies, so clone through JSON (form values are plain data).
const clone = (value: unknown) => JSON.parse(JSON.stringify(value)) as FormValues
const isSame = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)

watch(
  values,
  (value) => {
    if (!isSame(value, model.value)) {
      model.value = clone(value)
    }
  },
  { deep: true },
)

watch(
  model,
  (value) => {
    if (!isSame(value, values)) {
      setValues(clone(value))
    }
  },
  { deep: true },
)

// `values` is the schema output (e.g. dates are cast to Date objects).
const onSubmit = handleSubmit((values) => {
  submitted.value = values
})

const onReset = () => {
  submitted.value = undefined
  resetForm({ values: structuredClone(initialValues) })
}
</script>

<template>
  <main class="article-page">
    <header>
      <h1>{{ title }}</h1>
      <p>Schema validation with vee-validate, split across sub components and sub-sub components.</p>
    </header>

    <form class="article-section" novalidate @submit.prevent="onSubmit" @reset.prevent="onReset">
      <h2>Form</h2>
      <BasicSection />
      <PeriodSection />
      <ContactSection />
      <MembersSection />
      <div class="actions">
        <button type="submit">Submit</button>
        <button type="reset" class="button-secondary">Reset</button>
        <span>valid: {{ meta.valid }} / dirty: {{ meta.dirty }}</span>
      </div>
    </form>

    <section class="article-section">
      <h2>Errors</h2>
      <pre><code>{{ errors }}</code></pre>
    </section>

    <section v-if="submitted" class="article-section">
      <h2>Submitted</h2>
      <pre><code>{{ JSON.stringify(submitted, null, 2) }}</code></pre>
    </section>
  </main>
</template>

<style scoped>
.actions {
  display: flex;
  gap: var(--app-spacing-sm);
  align-items: center;
}
</style>
