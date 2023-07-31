<script setup lang="ts">
// https://nuxt.com/docs/getting-started/data-fetching

const headers = useRequestHeaders(["cookie"])
const { data } = await useFetch("/api/me", { headers })
const cookie = useCookie("counter")

const docookie = ref("")
onMounted(() => {
  // eslint-disable-next-line no-console
  console.log(document.cookie)
  docookie.value = document.cookie
})

// // This composable will automatically pass cookies to the client
// const event = useRequestEvent()
// TODO Error: Cannot read properties of undefined (reading 'node')
// const result = await fetchWithCookie(event, "/api/with-cookie")
// // onMounted(() => console.log(document.cookie))
</script>

<template>
  <div>
    <h1>Data Fetching</h1>
    <h2>Passing Headers and cookies</h2>

    <section>
      <h3>Pass Client Headers to the API</h3>
      <div>
        <ul>
          <li>
            response value is: <span>{{ data }}</span>
          </li>
          <li>
            <code>useCookie("counter")</code> value is: <span>{{ cookie }}</span>
          </li>
          <li>
            <code>onMounted</code> <code>document.cookie</code> value is:
            <span>"{{ docookie }}"</span>
          </li>
        </ul>
      </div>
    </section>

    <section>
      <h3>Pass Cookies From Server-side API Calls on SSR Response</h3>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
