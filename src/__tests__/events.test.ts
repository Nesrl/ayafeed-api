import { describe, it, expect } from 'vitest'
import app from '../index'

const mockDB = {
  prepare: () => ({
    all: async () => ({
      results: []
    }),
    bind: () => ({
      first: async () => null
    })
  })
}

// @ts-ignore
const Request = globalThis.Request

function withEnv(url: string, env: any) {
  return app.fetch(new Request(url), env)
}

describe('Events API', () => {
  it('should return all events', async () => {
    const res = await withEnv('http://localhost/api/events', { DB: mockDB })
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
  })

  it('should return 404 for not found event', async () => {
    const res = await withEnv('http://localhost/api/events/not-exist-id', { DB: mockDB })
    expect(res.status).toBe(404)
  })
})