import { describe, it, expect } from 'vitest'
import app from '../index'

const mockDB = {
  prepare: () => ({
    all: async () => ({ results: [] }),
    bind: () => ({
      first: async () => null
    })
  })
}

// @ts-ignore
const Request = globalThis.Request

function withEnv(url: string, env: any) {
  const base = url.startsWith('http') ? url : `http://localhost${url}`
  return app.fetch(new Request(base), env)
}

describe('Artists API', () => {
  it('should return all artists', async () => {
    const res = await withEnv('/api/artists', { DB: mockDB })
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(Array.isArray(data)).toBe(true)
  })

  it('should return 404 for not found artist', async () => {
    const res = await withEnv('/api/artists/not-exist-id', { DB: mockDB })
    expect(res.status).toBe(404)
  })
}) 