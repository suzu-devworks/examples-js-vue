<script setup lang="ts">
import { ref } from 'vue'
import * as yup from 'yup'

import ValidationDemo from '../components/ValidationDemo.vue'
import { toYupSchema } from '../lib/typed-schema'
import { type FormValues, initialValues } from '../types'

const schema = toYupSchema(
  yup.object({
    name: yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    age: yup
      .number()
      .typeError('Age is required')
      .integer('Age must be an integer')
      .min(0, 'Age must be 0 or more')
      .max(150, 'Age must be 150 or less')
      .required('Age is required'),
    agree: yup.boolean().oneOf([true], 'You must agree to the terms').required(),
    startDate: yup.date().typeError('Start date is required').required('Start date is required'),
    endDate: yup
      .date()
      .typeError('End date is required')
      .required('End date is required')
      .min(yup.ref('startDate'), 'End date must not be before the start date'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    address: yup.object({
      postalCode: yup
        .string()
        .matches(/^\d{3}-\d{4}$/, 'Use the format 000-0000')
        .required('Postal code is required'),
      city: yup.string().required('City is required'),
    }),
    members: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required('Member name is required'),
          quantity: yup
            .number()
            .typeError('Quantity is required')
            .integer()
            .min(1, 'Quantity must be 1 or more')
            .required('Quantity is required'),
        }),
      )
      .min(1, 'Add at least one member')
      .max(3, 'At most 3 members')
      .test('unique-names', 'Duplicate name', function (members) {
        const seen = new Set<string>()
        const errors = (members ?? []).flatMap((member, index) => {
          const duplicated = !!member.name && seen.has(member.name)
          seen.add(member.name ?? '')
          return duplicated
            ? [this.createError({ path: `${this.path}[${index}].name`, message: 'Duplicate name' })]
            : []
        })
        return errors.length ? new yup.ValidationError(errors) : true
      })
      .required(),
  }),
)

const model = ref<FormValues>(structuredClone(initialValues))
</script>

<template>
  <ValidationDemo v-model="model" title="vee-validate + yup" :schema="schema" />
</template>
