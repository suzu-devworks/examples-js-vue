import { afterEach, describe, expect, it, vi } from 'vitest'

const { createError, readBody } = vi.hoisted(() => ({
  createError: vi.fn((error: { statusCode: number; statusMessage?: string; data?: unknown }) => {
    throw Object.assign(new Error(error.statusMessage), error)
  }),
  readBody: vi.fn(),
}))

vi.mock('nuxt/server', () => ({
  createError,
  defineEventHandler: (handler: (event: unknown) => unknown) => handler,
  readBody,
}))

import { UserService } from '../../../../services/user-service'
import handler from '.././index.post'

describe('POST /api/phase2/users', () => {
  let createdId: string | undefined

  afterEach(() => {
    if (createdId) UserService.delete(createdId)
    createdId = undefined
    vi.clearAllMocks()
  })

  it('validates and creates a user', async () => {
    readBody.mockResolvedValue({ name: 'Created by API test', role: 'User' })

    const result = await handler({ url: new URL('http://localhost/api/phase2/users') } as never)
    createdId = result.id

    expect(UserService.getById(result.id)).toMatchObject({ name: 'Created by API test', role: 'User' })
  })

  it('rejects invalid user data with field errors', async () => {
    readBody.mockResolvedValue({ name: '', role: 'Unknown' })

    await expect(handler({ url: new URL('http://localhost/api/phase2/users') } as never)).rejects.toMatchObject({
      statusCode: 400,
      statusMessage: 'Validation Failed',
      data: expect.objectContaining({ name: expect.any(Array), role: expect.any(Array) }),
    })
  })
})
