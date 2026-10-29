import { afterEach, describe, expect, it } from 'vitest'

import { UserCreateSchema, UserService } from '.././user-service'

const createdUserIds: string[] = []

afterEach(() => {
  for (const id of createdUserIds.splice(0)) {
    UserService.delete(id)
  }
})

describe('UserService', () => {
  it('validates names and roles', () => {
    expect(UserCreateSchema.safeParse({ name: 'Charlie', role: 'User' }).success).toBe(true)
    expect(UserCreateSchema.safeParse({ name: '', role: 'User' }).success).toBe(false)
    expect(UserCreateSchema.safeParse({ name: 'Charlie', role: 'Guest' }).success).toBe(false)
  })

  it('creates, finds, updates, and deletes a user', () => {
    const user = UserService.create({ name: 'Vitest User', role: 'Developer' })
    createdUserIds.push(user.id)
    expect(UserService.getById(user.id)).toEqual(user)

    expect(UserService.update(user.id, { name: 'Updated User', role: 'Admin' })).toEqual({
      id: user.id,
      name: 'Updated User',
      role: 'Admin',
    })
    expect(UserService.delete(user.id)).toEqual([{ id: user.id, name: 'Updated User', role: 'Admin' }])
    expect(UserService.getById(user.id)).toBeUndefined()
    createdUserIds.pop()
  })

  it('returns undefined or null when a user does not exist', () => {
    expect(UserService.getById('missing')).toBeUndefined()
    expect(UserService.update('missing', { name: 'Nobody', role: 'User' })).toBeUndefined()
    expect(UserService.delete('missing')).toBeNull()
  })
})
