import { Hono } from 'hono'
import { getDB } from '../db'

const events = new Hono()

// 获取所有 events（可通过 group_id 过滤）
events.get('/', async (c) => {
  const db = getDB(c)
  const group_id = c.req.query('group_id')
  let sql = 'SELECT * FROM events'
  let params: any[] = []
  if (group_id) {
    sql += ' WHERE group_id = ?'
    params.push(group_id)
  }
  sql += ' ORDER BY date ASC'
  const { results } = await db.prepare(sql).bind(...params).all()
  return c.json(results)
})

// 获取单日场次详情
events.get('/:id', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  const event = await db.prepare('SELECT * FROM events WHERE id = ?').bind(id).first()
  if (!event) return c.notFound()
  return c.json(event)
})

// 获取该日所有出展社团
events.get('/:id/appearances', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  const { results } = await db.prepare(`
    SELECT appearances.*, circles.name AS circle_name, circles.avatar_url
    FROM appearances
    JOIN circles ON circles.id = appearances.circle_id
    WHERE appearances.event_id = ?
    ORDER BY appearances.path ASC
  `).bind(id).all()
  return c.json(results)
})

// 新建 event
events.post('/', async (c) => {
  const db = getDB(c)
  const body = await c.req.json()
  const { id, group_id, name, date } = body
  await db.prepare('INSERT INTO events (id, group_id, name, date) VALUES (?, ?, ?, ?)')
    .bind(id, group_id, name, date).run()
  return c.json({ success: true })
})

// 更新 event
events.patch('/:id', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  const body = await c.req.json()
  const fields = ['group_id', 'name', 'date']
  const sets = fields.filter(f => body[f] !== undefined).map(f => `${f} = ?`).join(', ')
  const values = fields.filter(f => body[f] !== undefined).map(f => body[f])
  if (!sets) return c.json({ error: 'No fields to update' }, 400)
  await db.prepare(`UPDATE events SET ${sets} WHERE id = ?`).bind(...values, id).run()
  return c.json({ success: true })
})

// 删除 event
events.delete('/:id', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  await db.prepare('DELETE FROM events WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

export { events } 