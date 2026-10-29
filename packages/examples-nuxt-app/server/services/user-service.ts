import { z } from 'zod'

import type { UserRecord } from '#shared/types/users'

// 💡 Validation schema definition by Zod (no changes)
export const UserCreateSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character.').max(50),
  role: z.enum(['Admin', 'Developer', 'User'], {
    message: 'Please select Admin, Developer, or User for the role. ',
  }),
})

// 💡 Centralized in-memory database maintained during server startup
const mockUsers: UserRecord[] = [
  { id: '1', name: 'Alice', role: 'Admin' },
  { id: '2', name: 'Bob', role: 'Developer' },
]

// 💡 Eliminate “use” and redefine naming as a pure server-side data service
export const UserService = {
  getAll: () => mockUsers,

  getById: (id: string) => mockUsers.find((u) => u.id === id),

  create: (data: z.infer<typeof UserCreateSchema>) => {
    const newId = String(mockUsers.length > 0 ? Math.max(...mockUsers.map((u) => Number(u.id))) + 1 : 1)
    const newUser: UserRecord = { id: newId, ...data }
    mockUsers.push(newUser)
    return newUser
  },

  update: (id: string, data: z.infer<typeof UserCreateSchema>) => {
    const user = mockUsers.find((u) => u.id === id)
    if (user) {
      user.name = data.name
      user.role = data.role
    }
    return user
  },

  delete: (id: string) => {
    const index = mockUsers.findIndex((u) => u.id === id)
    if (index !== -1) {
      return mockUsers.splice(index, 1)
    }
    return null
  },
}
