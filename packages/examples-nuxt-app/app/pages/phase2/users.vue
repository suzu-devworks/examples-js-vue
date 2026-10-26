<script setup lang="ts">
import { ref, useAsyncData, computed, useState } from '#imports'
import type { UserRecord as User } from '#shared/types/users'

// --- state management ---
const apiLogs = useState<string[]>('phase2/apiLogs', () => [])

// --- form condition ---
const formMode = ref<'CREATE' | 'UPDATE'>('CREATE')
const targetId = ref('')
const formName = ref('')
const formRole = ref<'Admin' | 'Developer' | 'User'>('User')
const validationErrors = ref<Record<string, string[]>>({})

const addLog = (action: string, status: number, detail?: unknown) => {
  const instant = Temporal.Now.instant().toZonedDateTimeISO('UTC')
  const timestamp = instant.toPlainTime().toString({ smallestUnit: 'millisecond' })
  apiLogs.value.unshift(`[${timestamp}Z] ${action} -> Status: ${status} | ${JSON.stringify(detail)}`)
}

type FetchError = { statusCode?: number; statusMessage?: string; data?: { data?: Record<string, string[]> } }

// 📝 1. Get list
const {
  data: users,
  status,
  refresh: refreshList,
} = await useAsyncData<User[]>('/api/phase2/users', async () => {
  try {
    const data = await $fetch<User[]>('/api/phase2/users')
    addLog('GET (List)', 200, `Fetched ${data.length} users`)
    return data
  } catch (err: unknown) {
    const e = err as FetchError
    addLog('GET (List) ERROR', e?.statusCode || 500, e?.statusMessage || err)
    return []
  }
})
const isLoading = computed(() => status.value === 'pending')

// 📝 2. One item obtained
const fetchSingle = async (searchId: string) => {
  if (!searchId) return

  try {
    const data = await $fetch<User>(`/api/phase2/users/${searchId}`)
    addLog(`GET (Single: ID ${searchId})`, 200, data)
    return data
  } catch (err: unknown) {
    const e = err as FetchError
    addLog(`GET (Single: ID ${searchId}) ERROR`, e.statusCode || 404, e.statusMessage)
  }
}

// 📝 3. Send (POST or PUT)
const submitForm = async () => {
  validationErrors.value = {}
  const payload = { name: formName.value, role: formRole.value }

  try {
    if (formMode.value === 'CREATE') {
      const res = await $fetch<{ id: string }>('/api/phase2/users', { method: 'POST', body: payload })
      addLog('POST (Create)', 200, res)
    } else {
      await $fetch(`/api/phase2/users/${targetId.value}`, { method: 'PUT', body: payload })
      addLog(`PUT (Update: ID ${targetId.value})`, 204, 'No Content')
    }
    resetForm()
    await refreshList()
  } catch (err: unknown) {
    const e = err as FetchError
    if (e?.statusCode === 400) {
      validationErrors.value = e?.data?.data ?? {}
      addLog('Validation Error', 400, validationErrors.value)
    } else {
      addLog('Submit ERROR', e.statusCode || 500, e.statusMessage || err)
    }
  }
}

// 📝 4. DELETE
const deleteUser = async (id: string) => {
  if (!id) return
  if (!confirm(`Do you want to delete it?`)) return

  try {
    await $fetch(`/api/phase2/users/${id}`, { method: 'DELETE' })
    addLog(`DELETE (ID ${id})`, 204, 'No Content')
    await refreshList()
  } catch (err: unknown) {
    const e = err as FetchError
    addLog(`DELETE (ID ${id}) ERROR`, e.statusCode || 500, e.statusMessage || err)
  }
}

const setUpdateMode = async (id: string) => {
  // A common approach is to retrieve the detailed fields for the specific item to be modified.
  const single = await fetchSingle(id)

  formMode.value = 'UPDATE'
  targetId.value = single!.id
  formName.value = single!.name
  formRole.value = single!.role
  validationErrors.value = {}
}

const resetForm = () => {
  formMode.value = 'CREATE'
  targetId.value = ''
  formName.value = ''
  formRole.value = 'User'
  validationErrors.value = {}
}
</script>

<template>
  <article>
    <header>
      <h2>Step 4: Practicing Nitro REST API(CRUD)</h2>
    </header>

    <div class="grid">
      <div>
        <fieldset>
          <legend><strong>👥 Active Users (GET)</strong></legend>

          <button class="secondary outline table-control-button" :aria-busy="isLoading" @click="() => refreshList()">
            🔄 Refresh List
          </button>

          <table class="striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>
                  <code>{{ user.id }}</code>
                </td>
                <td>{{ user.name }}</td>
                <td>
                  <mark>{{ user.role }}</mark>
                </td>
                <td class="item-control">
                  <div role="group">
                    <button
                      class="outline secondary table-control-button"
                      data-tooltip="Update"
                      data-placement="bottom"
                      @click="setUpdateMode(user.id)"
                    >
                      ✏️
                    </button>
                    <button
                      class="outline secondary table-control-button"
                      data-tooltip="Delete"
                      data-placement="bottom"
                      @click="deleteUser(user.id)"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="users?.length === 0">
                <td colspan="4"><em>No records found. Database is empty.</em></td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>

      <div>
        <!-- Active Users Registration/update form-->
        <fieldset>
          <legend>
            <strong>{{ formMode === 'CREATE' ? 'Create User (POST)' : 'Update User (PUT)' }}</strong>
          </legend>

          <label for="username">User Name:</label>
          <input
            id="username"
            v-model="formName"
            type="text"
            placeholder="e.g. Charlie"
            :aria-invalid="validationErrors.name ? 'true' : undefined"
          />
          <p v-if="validationErrors.name" class="error-message">
            <small>⚠️ {{ validationErrors.name[0] }}</small>
          </p>

          <label for="user_role">Role:</label>
          <select id="user_role" v-model="formRole">
            <option value="Admin">Admin</option>
            <option value="Developer">Developer</option>
            <option value="User">User</option>
          </select>

          <div class="grid">
            <button @click="submitForm">
              {{ formMode === 'CREATE' ? '🚀 Create' : '💾 Update' }}
            </button>
            <button v-if="formMode === 'UPDATE'" class="secondary outline" @click="resetForm">Cancel</button>
          </div>
        </fieldset>
      </div>
    </div>

    <footer>
      <!-- Real-time API logs -->
      <fieldset>
        <legend><strong>🛰️ Raw API Response Console (UTC)</strong></legend>
        <div class="console-box">
          <div v-for="(log, idx) in apiLogs" :key="idx" class="log-line">
            <code>{{ log }}</code>
          </div>
          <div v-if="apiLogs.length === 0"><em>Waiting for API operations...</em></div>
        </div>
      </fieldset>
    </footer>
  </article>
</template>

<style scoped>
.grid > * {
  padding: 0.25rem;
  overflow: hidden;
}

.item-control {
  [role='group'] {
    margin-bottom: 0;
  }
}

.table-control-button {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.error-message {
  margin-top: -1rem;
  color: var(--pico-form-element-invalid-border-color);
}

.console-box {
  max-height: 250px;
  padding: 0.75rem;
  overflow-y: auto;
  font-family: var(--pico-font-family-monospace);
  font-size: 0.8rem;
  color: var(--pico-color-lime-100);
  background-color: var(--pico-color-grey-900);
  border: 1px solid var(--pico-color-grey-700);
  border-radius: var(--pico-border-radius);
}

.log-line {
  padding-bottom: 0.25rem;
  margin-bottom: 0.25rem;
  word-break: break-all;
  border-bottom: 1px solid var(--pico-color-grey-800);
}

.log-line code {
  padding: 0;
  color: var(--pico-color-grey-100);
  background: none;
}
</style>
