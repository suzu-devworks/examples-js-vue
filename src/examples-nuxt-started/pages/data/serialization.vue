<script setup lang="ts">
// Type of `data` is inferred as string even though we returned a Date object
import { parse } from "superjson"

const { data: data1 } = await useFetch("/api/serialization/foo")

// Type of `data` is inferred as
// {
//   createdAt: {
//     year: number
//     month: number
//     day: number
//   }
// }
const { data: data2 } = await useFetch("/api/serialization/bar")

// `date` is inferred as { createdAt: Date } and you can safely use the Date object methods
const { data: data3 } = await useFetch<{ createdAt: Date }>("/api/serialization/superjson", {
  transform: (value) => {
    return parse(value as unknown as string)
  },
})
</script>

<template>
  <div>
    <h1>Data Fetching</h1>
    <h2>Serialization</h2>

    <section>
      <h3>Example</h3>
      <p>
        {{ data1 }} <span>is {{ Object.prototype.toString.call(data1) }}</span>
      </p>
    </section>

    <section>
      <h3>Custom serializer function</h3>
      <p>{{ data2 }}</p>
    </section>

    <section>
      <h3>Using an alternative serializer</h3>
      <p>
        {{ data3 }} <span>is {{ Object.prototype.toString.call(data3?.createdAt) }}</span>
      </p>
    </section>
  </div>
</template>
