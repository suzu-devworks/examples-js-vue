<script setup lang="ts">
const { data: users, refresh } = await useFetch('/api/users')

const name = ref('')
const email = ref('')

async function addUser() {
  await $fetch('/api/users', {
    method: 'POST',
    body: { name: name.value, email: email.value },
  })
  name.value = ''
  email.value = ''
  await refresh()
}

async function removeUser(userId: number) {
  if (!confirm('Delete this user?')) return

  await $fetch(`/api/users/${userId}`, { method: 'DELETE' })
  await refresh()
}
</script>

<template>
  <div>
    <h1>Users</h1>
    <form @submit.prevent="addUser">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <button type="submit">Add</button>
    </form>
    <ul v-if="users?.length">
      <li v-for="user in users" :key="user.id">
        {{ user.name }} ({{ user.email }})
        <button
          type="button"
          :disabled="user.posts.length > 0"
          :title="user.posts.length > 0 ? 'Users with posts cannot be deleted' : undefined"
          @click="removeUser(user.id)"
        >
          Delete
        </button>
      </li>
    </ul>
    <p v-else>No users yet.</p>
  </div>
</template>
