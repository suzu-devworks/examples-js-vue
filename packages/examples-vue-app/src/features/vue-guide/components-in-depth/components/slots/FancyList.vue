<script setup lang="ts">
import { ref } from 'vue'

const items = ref<
  {
    body: string
    username: string
    likes: number
  }[]
>([])

// mock remote data fetching
setTimeout(() => {
  items.value = [
    { body: 'Scoped Slots Guide', username: 'Evan You', likes: 20 },
    { body: 'Vue Tutorial', username: 'Natalia Tepluhina', likes: 10 },
  ]
}, 1000)
</script>

<template>
  <div class="fancy-list registered-component">
    <ul>
      <li v-if="!items.length">Loading...</li>
      <li v-for="item in items" :key="item.body">
        <slot name="item" v-bind="item" />
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
ul {
  padding: 5px;
  list-style-type: none;
  background: linear-gradient(315deg, #42d392 25%, #647eff);
}

li {
  padding: 5px 20px;
  margin: 10px;
  background: #fff;
}
</style>
