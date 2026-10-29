import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import { createError, readBody, setResponseStatus } from 'h3'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { clearNuxtData, useState } from '#imports'

import Page from '.././users.vue'

interface User {
  id: string
  name: string
  role: 'Admin' | 'Developer' | 'User'
}

let users: User[] = []

// In-memory stand-in for the Nitro user API
registerEndpoint('/api/phase2/users', async (event) => {
  if (event.method === 'POST') {
    const body = await readBody<Omit<User, 'id'>>(event)
    if (!body.name) {
      throw createError({ statusCode: 400, statusMessage: 'Validation Failed', data: { name: ['Required'] } })
    }
    const user = { id: '3', ...body }
    users.push(user)
    return { id: user.id }
  }
  return users
})

registerEndpoint('/api/phase2/users/1', async (event) => {
  const user = users.find((u) => u.id === '1')
  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' })

  if (event.method === 'PUT') {
    Object.assign(user, await readBody(event))
    setResponseStatus(event, 204)
    return null
  }
  if (event.method === 'DELETE') {
    users = users.filter((u) => u.id !== '1')
    setResponseStatus(event, 204)
    return null
  }
  return user
})

const rowTexts = (wrapper: VueWrapper) => wrapper.findAll('tbody tr').map((row) => row.text())
const findButton = (wrapper: VueWrapper, label: string) =>
  wrapper.findAll<HTMLButtonElement>('button').find((button) => button.text().includes(label))!

describe('user management page', () => {
  beforeEach(() => {
    users = [
      { id: '1', name: 'Alice', role: 'Admin' },
      { id: '2', name: 'Bob', role: 'User' },
    ]
    clearNuxtData('/api/phase2/users')
    useState<string[]>('phase2/apiLogs').value = []
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the user table and create form', async () => {
    const wrapper = await mountSuspended(Page)

    expect(wrapper.text()).toContain('Practicing Nitro REST API(CRUD)')
    expect(wrapper.get('label[for="username"]').text()).toContain('User Name')
    expect(wrapper.get('label[for="user_role"]').text()).toContain('Role')
    expect(wrapper.text()).toContain('Raw API Response Console')
  })

  it('fetches and lists the users (GET)', async () => {
    const wrapper = await mountSuspended(Page)

    const rows = rowTexts(wrapper)
    expect(rows).toHaveLength(2)
    expect(rows[0]).toContain('Alice')
    expect(rows[1]).toContain('Bob')
    expect(wrapper.text()).toContain('GET (List) -> Status: 200')
  })

  it('creates a user and refreshes the list (POST)', async () => {
    const wrapper = await mountSuspended(Page)

    await wrapper.get('#username').setValue('Charlie')
    await wrapper.get('#user_role').setValue('Developer')
    await findButton(wrapper, 'Create').trigger('click')
    await vi.waitFor(() => expect(rowTexts(wrapper)).toHaveLength(3))

    expect(rowTexts(wrapper)[2]).toContain('Charlie')
    expect(rowTexts(wrapper)[2]).toContain('Developer')
    expect(wrapper.text()).toContain('POST (Create) -> Status: 200')
    expect(wrapper.get<HTMLInputElement>('#username').element.value).toBe('')
  })

  it('shows the validation error when creating without a name', async () => {
    const wrapper = await mountSuspended(Page)

    await findButton(wrapper, 'Create').trigger('click')
    await vi.waitFor(() => expect(wrapper.text()).toContain('Validation Error -> Status: 400'))

    expect(wrapper.get('.error-message').text()).toContain('Required')
    expect(rowTexts(wrapper)).toHaveLength(2)
  })

  it('loads a user into the form and updates it (GET single, PUT)', async () => {
    const wrapper = await mountSuspended(Page)

    await wrapper.get('[data-tooltip="Update"]').trigger('click')
    await vi.waitFor(() => expect(wrapper.text()).toContain('Update User (PUT)'))
    expect(wrapper.get<HTMLInputElement>('#username').element.value).toBe('Alice')
    expect(wrapper.text()).toContain('GET (Single: ID 1) -> Status: 200')

    await wrapper.get('#username').setValue('Alice Updated')
    await findButton(wrapper, 'Update').trigger('click')
    await vi.waitFor(() => expect(rowTexts(wrapper)[0]).toContain('Alice Updated'))

    expect(wrapper.text()).toContain('PUT (Update: ID 1) -> Status: 204')
    expect(wrapper.text()).toContain('Create User (POST)')
  })

  it('deletes a user after confirmation and refreshes the list (DELETE)', async () => {
    const wrapper = await mountSuspended(Page)

    await wrapper.get('[data-tooltip="Delete"]').trigger('click')
    await vi.waitFor(() => expect(rowTexts(wrapper)).toHaveLength(1))

    expect(confirm).toHaveBeenCalledTimes(1)
    expect(rowTexts(wrapper)[0]).toContain('Bob')
    expect(wrapper.text()).toContain('DELETE (ID 1) -> Status: 204')
  })

  it('does not delete a user when the confirmation is cancelled', async () => {
    vi.stubGlobal(
      'confirm',
      vi.fn(() => false),
    )
    const wrapper = await mountSuspended(Page)

    await wrapper.get('[data-tooltip="Delete"]').trigger('click')

    expect(rowTexts(wrapper)).toHaveLength(2)
    expect(wrapper.text()).not.toContain('DELETE (ID 1)')
  })
})
