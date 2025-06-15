import { Hono } from 'hono'
import { getDB } from '../db'

const eventGroups = new Hono()

// 获取所有展会组
// GET /event-groups
eventGroups.get('/', async (c) => {
  const db = getDB(c)
  const { results } = await db.prepare('SELECT * FROM event_groups ORDER BY start_date DESC').all()
  return c.json(results)
})

// 获取单个展会组详情
// GET /event-groups/:id
eventGroups.get('/:id', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  const group = await db.prepare('SELECT * FROM event_groups WHERE id = ?').bind(id).first()
  if (!group) return c.notFound()
  return c.json(group)
})

// 获取该组下所有 events（按日期排序）
// GET /event-groups/:id/events
eventGroups.get('/:id/events', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  const { results } = await db.prepare('SELECT * FROM events WHERE group_id = ? ORDER BY date ASC').bind(id).all()
  return c.json(results)
})

// 新建展会组
// POST /event-groups
eventGroups.post('/', async (c) => {
  const db = getDB(c)
  const body = await c.req.json()
  // id 由前端传入，需保证唯一
  const { id, name, location, start_date, end_date, official_url } = body
  await db.prepare('INSERT INTO event_groups (id, name, location, start_date, end_date, official_url) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(id, name, location, start_date, end_date, official_url).run()
  return c.json({ success: true })
})

// 更新展会组
// PATCH /event-groups/:id
eventGroups.patch('/:id', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  const body = await c.req.json()
  const fields = ['name', 'location', 'start_date', 'end_date', 'official_url']
  const sets = fields.filter(f => body[f] !== undefined).map(f => `${f} = ?`).join(', ')
  const values = fields.filter(f => body[f] !== undefined).map(f => body[f])
  if (!sets) return c.json({ error: 'No fields to update' }, 400)
  await db.prepare(`UPDATE event_groups SET ${sets} WHERE id = ?`).bind(...values, id).run()
  return c.json({ success: true })
})

// 删除展会组及其 events
// DELETE /event-groups/:id
eventGroups.delete('/:id', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  // 先删除 events，再删除 group
  await db.prepare('DELETE FROM events WHERE group_id = ?').bind(id).run()
  await db.prepare('DELETE FROM event_groups WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

export { eventGroups } 