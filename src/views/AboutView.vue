<template>
  <div class="about">
    <h1>This is an about page</h1>

    <div>
      <p>Counter: {{ count }}</p>
      <a target="_blank" :href="`https://gihyo.jp/contentslist?start=2020/04/${('0' + count).slice(-2)}`">04/{{ ('0' +
          count).slice(-2)
      }}</a>
      <button @click="increment()">+1</button>
      <button @click="increment(5)">+5</button>
    </div>

    <div class="message">
      <ul>
        <li v-for="item in list" :key="item">{{ item }}</li>
      </ul>
      <button @click="addItem">addItem</button>
    </div>

    <p>user object: {{ user }}</p>
    <p> name: {{ user.name }}, mail: {{ user.email }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      list: [2, 4, 6],
      user: {
        name: 'Riin',
        email: 'riin@example.com'
      }
    }
  },
  methods: {
    increment(val = 1) {
      this.count += val
    },
    addItem() {
      this.list.push(this.count)
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  li {
    list-style: inside;
  }
}
</style>