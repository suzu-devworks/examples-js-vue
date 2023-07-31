<script setup lang="ts">
// https://nuxt.com/docs/getting-started/state-management

// Basic.
const counter = useState("counter", () => Math.round(Math.random() * 1000))

// Advanced.
const locales = useLocales()
const locale = useLocale()
const date = useLocaleDate(new Date("2016-10-26"))

// Shared.
const color = useColor() // Same as useState('color')
const counter2 = useCounter() // Sync with useState('counter')
</script>

<template>
  <div>
    <h1>State Management</h1>
    <p class="warning">
      Because the data inside useState will be serialized to JSON, it is important that it does not
      contain anything that cannot be serialized, such as classes, functions or symbols.
    </p>

    <section>
      <h2>Basic Usage</h2>
      <p>Use a component-local counter state.</p>
      <div>
        <span>Counter: {{ counter }}</span>
        <button @click="counter--">-</button>
        <button @click="counter++">+</button>
      </div>
    </section>

    <section>
      <h2>Advanced Usage - Nuxt birthday</h2>
      <p>
        Use a composable that detects the user's default locale from the HTTP request headers and
        keeps it in a locale state.
      </p>
      <div>
        <p>{{ date }}</p>
        <label for="locale-chooser">Preview a different locale</label>
        <select id="locale-chooser" v-model="locale">
          <option v-for="loc of locales" :key="loc" :value="loc">
            {{ loc }}
          </option>
        </select>
      </div>
    </section>

    <section>
      <h2>Shared State</h2>
      <p>Define global type-safe states and import them across the app.</p>
      <div>
        <p>Current color: {{ color }}</p>
      </div>
      <div>
        <span>Counter: {{ counter2 }}</span>
        <button @click="counter2--">-</button>
        <button @click="counter2++">+</button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
span + button {
  margin-left: 1em;
}
label + select {
  margin-left: 1em;
}
</style>
