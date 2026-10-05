export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!Number.isInteger(id) || id <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid user ID',
    })
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: { _count: { select: { posts: true } } },
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found',
    })
  }

  if (user._count.posts > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Cannot delete a user with posts',
    })
  }

  await prisma.user.delete({ where: { id } })

  return { success: true }
})
