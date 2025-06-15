import { Hono } from 'hono'
import { getDB } from '../db'

const appearances = new Hono()

// 查询某社团是否参加某场次
appearances.get('/', async (c) => {
  const db = getDB(c)
  const circle_id = c.req.query('circle_id')
  const event_id = c.req.query('event_id')
  let sql = 'SELECT * FROM appearances'
  let params: any[] = []
  if (circle_id && event_id) {
    sql += ' WHERE circle_id = ? AND event_id = ?'
    params = [circle_id, event_id]
  } else if (circle_id) {
    sql += ' WHERE circle_id = ?'
    params = [circle_id]
  } else if (event_id) {
    sql += ' WHERE event_id = ?'
    params = [event_id]
  }
  const { results } = await db.prepare(sql).bind(...params).all()
  return c.json(results)
})

// 新建出展记录
appearances.post('/', async (c) => {
  const db = getDB(c)
  const body = await c.req.json()
  const { id, circle_id, event_id, path } = body
  await db.prepare('INSERT INTO appearances (id, circle_id, event_id, path) VALUES (?, ?, ?, ?)')
    .bind(id, circle_id, event_id, path).run()
  return c.json({ success: true })
})

// 删除出展记录
appearances.delete('/:id', async (c) => {
  const db = getDB(c)
  const id = c.req.param('id')
  await db.prepare('DELETE FROM appearances WHERE id = ?').bind(id).run()
  return c.json({ success: true })
})

export { appearances } 