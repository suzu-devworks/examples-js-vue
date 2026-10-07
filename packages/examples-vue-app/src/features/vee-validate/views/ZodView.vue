<script setup lang="ts">
import { ref } from 'vue'
import * as z from 'zod'

import ValidationDemo from '../components/ValidationDemo.vue'
import { toZodSchema } from '../lib/typed-schema'
import { type FormValues, initialValues } from '../types'

const schema = toZodSchema(
  z
    .object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      age: z
        .number('Age is required')
        .int('Age must be an integer')
        .min(0, 'Age must be 0 or more')
        .max(150, 'Age must be 150 or less'),
      agree: z.literal(true, 'You must agree to the terms'),
      startDate: z.coerce.date('Start date is required'),
      endDate: z.coerce.date('End date is required'),
      email: z.email('Invalid email address'),
      address: z.object({
        postalCode: z.string().regex(/^\d{3}-\d{4}$/, 'Use the format 000-0000'),
        city: z.string().min(1, 'City is required'),
      }),
      members: z
        .array(
          z.object({
            name: z.string().min(1, 'Member name is required'),
            quantity: z.number('Quantity is required').int().min(1, 'Quantity must be 1 or more'),
          }),
        )
        .min(1, 'Add at least one member')
        .max(3, 'At most 3 members')
        .superRefine((members, ctx) => {
          const seen = new Set<string>()
          members.forEach((member, index) => {
            if (member.name && seen.has(member.name)) {
              ctx.addIssue({ code: 'custom', message: 'Duplicate name', path: [index, 'name'] })
            }
            seen.add(member.name)
          })
        }),
    })
    .refine((v) => v.endDate >= v.startDate, {
      message: 'End date must not be before the start date',
      path: ['endDate'],
      // By default zod skips object-level refinements when any field has an issue.
      when: ({ issues }) => !issues?.some((i) => i.path?.[0] === 'startDate' || i.path?.[0] === 'endDate'),
    }),
)

const model = ref<FormValues>(structuredClone(initialValues))
</script>

<template>
  <ValidationDemo v-model="model" title="vee-validate + zod" :schema="schema" />
</template>
