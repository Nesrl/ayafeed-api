import { Hono } from 'hono'
import { getDB } from '../db'

const artists = new Hono()

// 列出所有 artists
artists.get('/', async (c) => {
  const db = getDB(c)
  const { results } = await db.prepare('SELECT * FROM artists').all()
  return c.json(results)
})

// 获取单个 artist，支持多语言 description
artists.get('/:id', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  const lang = c.req.query('lang') || 'ja'
  const artist = await db.prepare('SELECT * FROM artists WHERE id = ?').bind(id).first()
  if (!artist) return c.notFound()
  const translation = await db.prepare('SELECT description FROM artist_translations WHERE artist_id = ? AND locale = ?').bind(id, lang).first()
  return c.json({ ...artist, description: translation?.description || null })
})

export { artists } 