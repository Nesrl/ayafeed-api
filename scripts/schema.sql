-- 社团表：circle 是参展的基本单位
DROP TABLE IF EXISTS circles;
CREATE TABLE circles (
  id TEXT PRIMARY KEY,    -- uuid
  name TEXT NOT NULL,     -- 社团名称
  avatar_url TEXT,        -- 社团头像
  sns_urls TEXT,          -- 各类社交链接，JSON 存储
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 艺术家表：记录具体作者，可属于多个社团 别名？
DROP TABLE IF EXISTS artists;
CREATE TABLE artists (
  id TEXT PRIMARY KEY,     -- uuid
  name TEXT NOT NULL,      -- 艺术家名称
  avatar_url TEXT,         -- 艺术家头像
  sns_urls TEXT,           -- 各类社交链接，JSON 存储
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 社团成员关系表：连接社团与艺术家
DROP TABLE IF EXISTS circle_members;
CREATE TABLE circle_members (
  id TEXT PRIMARY KEY,        -- uuid
  circle_id TEXT NOT NULL,    -- 社团 ID
  artist_id TEXT NOT NULL,    -- 艺术家 ID
  roles TEXT NOT NULL,        -- 职能
  --roles 需要维护合法列表 格式 { "main": true, "composer": true } 不应用于查询
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (circle_id) REFERENCES circles(id) ON DELETE CASCADE,
  FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);

-- 展会组表：记录展会组信息
DROP TABLE IF EXISTS event_groups;
CREATE TABLE event_groups (
  id TEXT PRIMARY KEY,      --uuid
  name TEXT NOT NULL,       -- 展会组名称 如 Comic Market 104
  location TEXT,            -- 展会地点
  start_date TEXT NOT NULL, -- 开始日期
  end_date TEXT NOT NULL,   -- 结束日期
  official_url TEXT,        -- 官方网站
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

-- 展会子表：记录单日展会信息
DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id TEXT PRIMARY KEY,             -- uuid
  group_id TEXT NOT NULL,          -- 展会组 ID
  name TEXT NOT NULL,              -- 展会名称 如 Comic Market 104 Day 1
  date TEXT NOT NULL,              -- 展会日期 如 2025-07-12
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);


-- 社团参展记录：在某个展会中的一次摊位信息
DROP TABLE IF EXISTS appearances;
CREATE TABLE appearances (
  id TEXT PRIMARY KEY,
  circle_id TEXT NOT NULL,
  event_id TEXT NOT NULL,     -- 展会 ID
  path TEXT NOT NULL,         -- 摊位位置，如"あ-12b"，合摊可能性有
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (circle_id) REFERENCES circles(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- appearance 下的品書图像
DROP TABLE IF EXISTS appearance_menus;
CREATE TABLE appearance_menus (
  id TEXT PRIMARY KEY,
  appearance_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (appearance_id) REFERENCES appearances(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS circle_translations;
CREATE TABLE circle_translations (
  circle_id TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('ja', 'en', 'zh')),
  description TEXT NOT NULL,
  FOREIGN KEY (circle_id) REFERENCES circles(id) ON DELETE CASCADE,
  PRIMARY KEY (circle_id, locale)
);

DROP TABLE IF EXISTS artist_translations;
CREATE TABLE artist_translations (
  artist_id TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('ja', 'en', 'zh')),
  description TEXT NOT NULL,
  FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE,
  PRIMARY KEY (artist_id, locale)
);

DROP TABLE IF EXISTS event_translations;
CREATE TABLE event_translations (
  event_id TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('ja', 'en', 'zh')),
  description TEXT NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, locale)
);




-- 约束：手动更新updated_at: UPDATE artists SET name = ?, updated_at = datetime('now') WHERE id = ?;