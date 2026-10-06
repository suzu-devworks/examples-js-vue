import type { GenericObject, TypedSchema, TypedSchemaError } from 'vee-validate'
import type * as yup from 'yup'
import type * as z from 'zod'

// vee-validate 4 expects `@vee-validate/zod` (zod v3 only), so these small adapters bridge zod v4 and yup.

const groupErrors = (entries: [string, string][]): TypedSchemaError[] => {
  const grouped = new Map<string, string[]>()
  for (const [path, message] of entries) {
    grouped.set(path, [...(grouped.get(path) ?? []), message])
  }
  return [...grouped].map(([path, errors]) => ({ path, errors }))
}

// ['members', 0, 'name'] -> 'members[0].name'
const toPath = (segments: PropertyKey[]): string =>
  segments.reduce<string>(
    (path, segment) =>
      typeof segment === 'number' ? `${path}[${segment}]` : path ? `${path}.${String(segment)}` : String(segment),
    '',
  )

export function toZodSchema<S extends z.ZodType>(schema: S): TypedSchema<GenericObject, z.output<S>> {
  return {
    __type: 'VVTypedSchema',
    async parse(values) {
      const result = await schema.safeParseAsync(values)
      if (result.success) {
        return { value: result.data, errors: [] }
      }
      return {
        errors: groupErrors(result.error.issues.map((issue) => [toPath(issue.path), issue.message])),
      }
    },
  }
}

export function toYupSchema<S extends yup.Schema>(schema: S): TypedSchema<GenericObject, yup.InferType<S>> {
  return {
    __type: 'VVTypedSchema',
    async parse(values) {
      try {
        const value = await schema.validate(values, { abortEarly: false })
        return { value, errors: [] }
      } catch (error) {
        const validationError = error as yup.ValidationError
        if (!Array.isArray(validationError.inner)) {
          throw error
        }
        return {
          errors: groupErrors(validationError.inner.map((e) => [e.path ?? '', e.message])),
        }
      }
    },
  }
}
