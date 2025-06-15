import { Hono } from 'hono'
import { getDB } from '../db'

const circles = new Hono()

// 列出所有 circles
circles.get('/', async (c) => {
  const db = getDB(c)
  const { results } = await db.prepare('SELECT * FROM circles').all()
  return c.json(results)
})

// 获取单个 circle，支持多语言 description
circles.get('/:id', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  const lang = c.req.query('lang') || 'ja'
  const circle = await db.prepare('SELECT * FROM circles WHERE id = ?').bind(id).first()
  if (!circle) return c.notFound()
  const translation = await db.prepare('SELECT description FROM circle_translations WHERE circle_id = ? AND locale = ?').bind(id, lang).first()
  return c.json({ ...circle, description: translation?.description || null })
})

// 获取某个社团的所有艺术家成员及其角色
circles.get('/:id/artists', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  const { results } = await db.prepare(`
    SELECT
      artists.id,
      artists.name,
      artists.avatar_url,
      artists.sns_urls,
      circle_members.roles
    FROM
      circle_members
    JOIN artists ON artists.id = circle_members.artist_id
    WHERE
      circle_members.circle_id = ?
  `).bind(id).all()
  return c.json(results)
})

// 获取某个社团的所有参展记录，支持 type=all|past|future
circles.get('/:id/appearances', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  const type = c.req.query('type') || 'all'
  let where = 'appearances.circle_id = ?'
  let params = [id]
  if (type === 'past') {
    where += ' AND events.date < date(\'now\')'
  } else if (type === 'future') {
    where += ' AND events.date >= date(\'now\')'
  }
  const { results } = await db.prepare(`
    SELECT
      appearances.id AS appearance_id,
      appearances.path AS booth_path,
      appearances.created_at AS appearance_created_at,
      events.id AS event_id,
      events.name AS event_name,
      events.date
    FROM
      appearances
    JOIN events ON events.id = appearances.event_id
    WHERE
      ${where}
    ORDER BY
      events.date DESC
  `).bind(...params).all()
  return c.json(results)
})

export { circles } 