import { afterEach, describe, expect, it, vi } from 'vitest'

const { createError, readBody, setResponseStatus } = vi.hoisted(() => ({
  createError: vi.fn((error: { statusCode: number; statusMessage?: string; data?: unknown }) => {
    throw Object.assign(new Error(error.statusMessage), error)
  }),
  readBody: vi.fn(),
  setResponseStatus: vi.fn(),
}))

vi.mock('nuxt/server', () => ({
  createError,
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
  readBody,
  setResponseStatus,
}))

import { UserService } from '../../../../../services/user-service'
import handler from '.././index'

describe('PUT and DELETE /api/phase2/users/:id', () => {
  let createdId: string | undefined

  afterEach(() => {
    if (createdId) UserService.delete(createdId)
    createdId = undefined
    vi.clearAllMocks()
  })

  it('updates a user and returns 204', async () => {
    const user = UserService.create({ name: 'Before update', role: 'User' })
    createdId = user.id
    readBody.mockResolvedValue({ name: 'After update', role: 'Admin' })

    const result = await handler({
      req: { method: 'PUT' },
      context: { params: { id: user.id } },
      url: new URL(`http://localhost/api/phase2/users/${user.id}`),
    } as never)

    expect(result).toBeNull()
    expect(UserService.getById(user.id)).toMatchObject({ name: 'After update', role: 'Admin' })
    expect(setResponseStatus).toHaveBeenCalledWith(expect.anything(), 204)
  })

  it('rejects invalid input and missing users', async () => {
    readBody.mockResolvedValue({ name: '', role: 'Unknown' })
    await expect(
      handler({
        req: { method: 'PUT' },
        context: { params: { id: '1' } },
        url: new URL('http://localhost/api/phase2/users/1'),
      } as never),
    ).rejects.toMatchObject({ statusCode: 400 })

    readBody.mockResolvedValue({ name: 'Valid', role: 'User' })
    await expect(
      handler({
        req: { method: 'PUT' },
        context: { params: { id: 'missing' } },
        url: new URL('http://localhost/api/phase2/users/missing'),
      } as never),
    ).rejects.toMatchObject({ statusCode: 404 })
  })

  it('deletes a user, rejects missing records, and rejects unsupported methods', async () => {
    const user = UserService.create({ name: 'Delete me', role: 'User' })
    createdId = user.id

    const event = {
      req: { method: 'DELETE' },
      context: { params: { id: user.id } },
      url: new URL(`http://localhost/api/phase2/users/${user.id}`),
    }
    expect(await handler(event as never)).toBeNull()
    expect(UserService.getById(user.id)).toBeUndefined()
    createdId = undefined

    await expect(
      handler({
        req: { method: 'DELETE' },
        context: { params: { id: 'missing' } },
        url: new URL('http://localhost/api/phase2/users/missing'),
      } as never),
    ).rejects.toMatchObject({ statusCode: 404 })
    await expect(
      handler({ req: { method: 'PATCH' }, context: { params: {} }, url: new URL('http://localhost/') } as never),
    ).rejects.toMatchObject({ statusCode: 405 })
  })
})
