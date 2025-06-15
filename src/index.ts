import { Hono } from 'hono'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { events } from './routes/events'
import { circles } from './routes/circles'
import { artists } from './routes/artists'
import { appearances } from './routes/appearances'
import { eventGroups } from './routes/event-groups'

const app = new Hono()

app.use('*', trimTrailingSlash())

app.get('/', (c) => {
  return c.text('Ayafeed API 服务已启动，详见 /api/docs')
})

app.get('/api/docs', (c) => {
  return c.text(`
# Ayafeed API 文档

## Event Groups
- GET    /api/event-groups            获取所有展会组
- GET    /api/event-groups/:id        获取展会组详情
- GET    /api/event-groups/:id/events 获取该组下所有场次
- POST   /api/event-groups            新建展会组
- PATCH  /api/event-groups/:id        更新展会组
- DELETE /api/event-groups/:id        删除展会组及其 events

## Events
- GET    /api/events                  获取所有场次（可 group_id 过滤）
- GET    /api/events/:id              获取单日场次详情
- GET    /api/events/:id/appearances  获取该日所有出展社团
- POST   /api/events                  新建场次
- PATCH  /api/events/:id              更新场次
- DELETE /api/events/:id              删除场次

## Appearances
- GET    /api/appearances?circle_id=... 查询某个社团的所有出展记录
- GET    /api/appearances             查询所有展会所有社团的所有出展记录
- GET    /api/appearances?event_id=... 查询某个展会的所有出展记录
- GET    /api/appearances?circle_id=...&event_id=... 查询某社团在某展会的出展记录
- POST   /api/appearances             新建出展记录
- DELETE /api/appearances/:id         删除出展记录

> 所有接口均为 RESTful 风格，字段与 Cloudflare D1 数据库 schema.sql 保持一致。
`)
})

app.route('/api/events', events)
app.route('/api/circles', circles)
app.route('/api/artists', artists)
app.route('/api/appearances', appearances)
app.route('/api/event-groups', eventGroups)

export default app
