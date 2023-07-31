<script setup lang="ts">
// https://nuxt.com/docs/getting-started/data-fetching

// `useFetch` is a wrapper around the `useAsyncData` composable and `$fetch` utility.
const { data: count } = await useFetch("/api/count", {
  onResponseError(context) {
    // eslint-disable-next-line no-console
    console.error(context.response.status)
  },
})

// Beware that using only $fetch will not provide
// the benefits described in the first section of this page.
const users = await $fetch("/api/users").catch((error) => error.data)

// The first argument of `useAsyncData` is the unique key used to cache the response.
const { data, status, error } = await useAsyncData("/api/users", () => $fetch("/api/users"))
if (status.value !== "success") {
  // eslint-disable-next-line no-console
  console.error(error.value)
}
</script>

<template>
  <div>
    <h1>Data Fetching</h1>
    <h2>Using specific composables</h2>

    <section>
      <h3><code>useFetch</code> composable</h3>
      <div>
        <p>Page visits: {{ count }}</p>
      </div>
    </section>

    <section>
      <h3><code>$fetch</code></h3>
      <div>
        <ul>
          <li v-for="user in users" :key="user.id">{{ user.name }}</li>
        </ul>
      </div>
    </section>

    <section>
      <h3><code>useAsyncData</code> composable</h3>
      <div>
        <table>
          <tr>
            <th>name</th>
            <th>birth</th>
          </tr>
          <tr v-for="user in data" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.dateOfBirth }}</td>
          </tr>
        </table>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
th,
td {
  padding: 0.2em 1em;
}
th {
  background-color: rgb(255, 200, 140);
}
td {
  background-color: rgb(255, 250, 230);
}
</style>
