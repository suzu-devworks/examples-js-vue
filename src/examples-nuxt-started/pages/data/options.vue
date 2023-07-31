<script setup lang="ts">
// https://nuxt.com/docs/getting-started/data-fetching

// You must manually handle the loading state using the pending value.
// You can alternatively use `useLazyFetch`
const { pending, data: posts } = await useFetch("/api/posts", {
  lazy: true,
})

// This call will only be performed on the client
const { pending: pending2, data: message } = await useFetch("/api/comments", {
  method: "post",
  lazy: true,
  server: false,
})

// only pick the fields used in your template
const { data: mountain } = await useFetch("/api/mountains/everest", {
  pick: ["title", "description"],
})

// you can use the transform function to alter the result of the query.
const { data: mountains } = await useFetch("/api/mountains", {
  transform: (mountains) => {
    return mountains.map((mountain) => ({
      title: mountain.title,
      description: mountain.description,
    }))
  },
})

// If you want to fetch or refresh data manually, use the execute or refresh function.
// execute is an alias for refresh. (more semantic for cases)
const {
  pending: pending3,
  data: comments,
  execute,
  refresh,
} = await useLazyFetch("/api/comments", {
  method: "post",
  immediate: false,
})

// fetching function each time other reactive values
const id = ref(1)
const { data: users } = await useFetch("/api/users", {
  /* Changing the id will trigger a refetch */
  watch: [id],
})
function update() {
  id.value += 1
}
</script>

<template>
  <div>
    <h1>Data Fetching</h1>
    <h2>Options</h2>

    <section>
      <h3>Lazy</h3>
      <!-- you will need to handle a loading state -->
      <div v-if="pending">Loading ...</div>
      <div v-else>
        <ul>
          <li v-for="post in posts" :key="post.id">
            <span>{{ post.postedTime }}</span>
            <span> - </span>
            <span>{{ post.message }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section>
      <h3>Client-only fetching</h3>
      <div v-if="pending2">Loading ...</div>
      <div v-else>
        <ul>
          <li>{{ message }}</li>
        </ul>
      </div>
    </section>

    <section>
      <h3>Minimize payload size</h3>
      <div>
        <dl>
          <dt>{{ mountain?.title }}</dt>
          <dd>{{ mountain?.description }}</dd>
        </dl>
      </div>
      <div>
        <table>
          <tr>
            <th>title</th>
            <th>description</th>
          </tr>
          <tr v-for="(item, index) in mountains" :key="index">
            <td>{{ item?.title }}</td>
            <td>{{ item?.description }}</td>
          </tr>
        </table>
      </div>
    </section>

    <section>
      <h3>Caching and refetching</h3>
      <div>
        <h3>Refresh and execute</h3>
        <p v-if="pending3">Waiting ...</p>
        <p v-else>{{ comments }}</p>
        <button @click="() => execute()">Execute data</button>
        <button @click="() => refresh()">Refresh data</button>
      </div>
      <div>
        <h3>Watch</h3>
        <div>
          <table>
            <tr>
              <th>name</th>
              <th>last updated at</th>
            </tr>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.lastUpdatedAt }}</td>
            </tr>
          </table>
        </div>
        <button @click="() => update()">Refresh data</button>
        <label class="right-label">{{ id }}</label>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
li > * {
  margin: 0;
}

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

.right-label {
  margin-left: 1em;
}
</style>
