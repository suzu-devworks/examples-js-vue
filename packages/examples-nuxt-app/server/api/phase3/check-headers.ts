import { defineEventHandler, getHeaders, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event)
  const body = await readBody(event)

  return {
    success: true,
    usedVersion: headers['x-request-id']?.startsWith('req_') ? 'processed' : 'unknown',
    receivedBody: body,
    receivedHeaders: {
      'x-api-key': headers['x-api-key'] || null,
      'x-request-id': headers['x-request-id'] || null,
    },
  }
})
