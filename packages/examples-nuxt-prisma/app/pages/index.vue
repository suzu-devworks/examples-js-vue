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

function formatDate(date: Date) {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}
</script>

<template>
  <main class="min-h-screen bg-slate-50 px-5 py-12 text-slate-900 sm:px-8">
    <div class="mx-auto max-w-3xl">
      <header class="mb-8">
        <h1 class="text-3xl font-semibold tracking-tight">Users</h1>
        <p class="mt-2 text-sm text-slate-500">Manage your users.</p>
      </header>

      <form class="mb-10 grid gap-3 sm:grid-cols-[1fr_1fr_auto]" @submit.prevent="addUser">
        <label class="sr-only" for="user-name">Name</label>
        <input
          id="user-name"
          v-model="name"
          class="rounded-md border-slate-200 bg-white px-3 py-2 text-sm shadow-none placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600"
          type="text"
          placeholder="Name"
          autocomplete="name"
          required
        />
        <label class="sr-only" for="user-email">Email</label>
        <input
          id="user-email"
          v-model="email"
          class="rounded-md border-slate-200 bg-white px-3 py-2 text-sm shadow-none placeholder:text-slate-400 focus:border-emerald-600 focus:ring-emerald-600"
          type="email"
          placeholder="Email"
          autocomplete="email"
          required
        />
        <button
          class="rounded-md border-emerald-800 bg-emerald-800 px-4 py-2 text-sm font-medium text-white shadow-none transition hover:border-emerald-900 hover:bg-emerald-900"
          type="submit"
        >
          Add user
        </button>
      </form>

      <section>
        <h2 class="border-b border-slate-200 pb-3 text-sm font-medium text-slate-700">
          User list ({{ users?.length ?? 0 }})
        </h2>
        <ul v-if="users?.length" class="divide-y divide-slate-100">
          <li v-for="user in users" :key="user.id" class="flex items-center gap-4 py-2.5">
            <div class="grow min-w-0">
              <p class="truncate text-sm font-medium">{{ user.name }}</p>
              <p class="mt-1 truncate text-sm text-slate-500">{{ user.email }}</p>
            </div>
            <div class="min-w-0">
              <time class="text-xs text-slate-400" :datetime="user.createdAt">
                {{ formatDate(new Date(user.createdAt)) }}
              </time>
            </div>
            <button
              class="shrink-0 rounded-md border-transparent bg-transparent px-2.5 py-1.5 text-sm text-slate-500 shadow-none hover:border-red-100 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-transparent disabled:text-slate-300"
              type="button"
              :disabled="user.posts.length > 0"
              :title="user.posts.length > 0 ? 'Users with posts cannot be deleted' : undefined"
              :aria-label="`Delete ${user.name}`"
              @click="removeUser(user.id)"
            >
              Delete
            </button>
          </li>
        </ul>
        <p v-else class="py-6 text-sm text-slate-500">No users yet.</p>
      </section>
    </div>
  </main>
</template>
