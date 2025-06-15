-- 插入展会组（event_groups）
INSERT INTO event_groups (id, name, location, start_date, end_date, official_url)
VALUES 
  ('group-001', 'Comiket 103', 'Tokyo Big Sight', '2024-12-28', '2024-12-30', 'https://www.comiket.co.jp/'),
  ('group-002', 'M3-2024春', 'Tokyo Big Sight', '2024-05-05', '2024-05-05', 'https://www.m3net.jp/'),
  ('group-003', 'Reitaisai 20', 'Tokyo Big Sight', '2024-05-05', '2024-05-05', 'https://reitaisai.com/');

-- 插入更多艺术家
INSERT INTO artists (id, name, avatar_url, sns_urls)
VALUES 
  ('artist-002', 't+pazolite', 'https://example.com/tpazolite.png', '{"twitter": "https://twitter.com/tpazolite", "website": "https://tpazolite.com", "booth": "https://booth.pm/tpazolite"}'),
  ('artist-003', 'REDALiCE', 'https://example.com/redalice.png', '{"twitter": "https://twitter.com/REDALiCE", "website": "https://redalice.net", "booth": "https://booth.pm/redalice"}'),
  ('artist-004', 'USAO', 'https://example.com/usao.png', '{"twitter": "https://twitter.com/usao", "website": "https://usao.net", "booth": "https://booth.pm/usao"}');

-- 插入更多社团
INSERT INTO circles (id, name, avatar_url, sns_urls)
VALUES 
  ('circle-002', 'HARDCORE TANO*C', 'https://example.com/tanoc.png', '{"twitter": "https://twitter.com/HARDCORETANOC", "website": "https://tanoc.net", "booth": "https://booth.pm/tanoc"}'),
  ('circle-003', 'C.H.S', 'https://example.com/chs.png', '{"twitter": "https://twitter.com/chs", "website": "https://chs.net", "booth": "https://booth.pm/chs"}'),
  ('circle-004', 'Cranky', 'https://example.com/cranky.png', '{"twitter": "https://twitter.com/cranky", "website": "https://cranky.net", "booth": "https://booth.pm/cranky"}');

-- 插入更多社团成员
INSERT INTO circle_members (id, circle_id, artist_id, roles)
VALUES 
  ('member-002', 'circle-002', 'artist-002', '{"composer": true}'),
  ('member-003', 'circle-002', 'artist-003', '{"composer": true}'),
  ('member-004', 'circle-002', 'artist-004', '{"composer": true}'),
  ('member-005', 'circle-003', 'artist-002', '{"composer": true}'),
  ('member-006', 'circle-004', 'artist-003', '{"composer": true}');

-- 插入更多展会（events，需指定 group_id）
INSERT INTO events (id, group_id, name, date)
VALUES 
  ('event-002', 'group-001', 'Comiket 103 Day 1', '2024-12-28'),
  ('event-003', 'group-002', 'M3-2024春', '2024-05-05'),
  ('event-004', 'group-003', 'Reitaisai 20', '2024-05-05');

-- 插入更多参展记录
INSERT INTO appearances (id, circle_id, event_id, path)
VALUES 
  ('appearance-002', 'circle-002', 'event-002', 'あ-12b'),
  ('appearance-003', 'circle-003', 'event-002', 'い-34a'),
  ('appearance-004', 'circle-004', 'event-003', 'う-56c'),
  ('appearance-005', 'circle-002', 'event-004', 'え-78d');

-- 插入更多品書图像
INSERT INTO appearance_menus (id, appearance_id, image_url, image_order)
VALUES 
  ('menu-003', 'appearance-002', 'https://example.com/tanoc-menu1.jpg', 0),
  ('menu-004', 'appearance-002', 'https://example.com/tanoc-menu2.jpg', 1),
  ('menu-005', 'appearance-003', 'https://example.com/chs-menu1.jpg', 0),
  ('menu-006', 'appearance-004', 'https://example.com/cranky-menu1.jpg', 0);

-- 插入更多翻译
INSERT INTO circle_translations (circle_id, locale, description)
VALUES 
  ('circle-002', 'ja', 'ハードコアテクノを中心とした音楽サークル'),
  ('circle-002', 'en', 'A music circle focused on hardcore techno'),
  ('circle-002', 'zh', '以硬核电子音乐为主的音乐社团'),
  ('circle-003', 'ja', 'テクノ・ハードコア系の音楽サークル'),
  ('circle-003', 'en', 'A techno and hardcore music circle'),
  ('circle-003', 'zh', '电子音乐和硬核音乐社团'),
  ('circle-004', 'ja', 'ハードコアテクノの老舗サークル'),
  ('circle-004', 'en', 'A veteran hardcore techno circle'),
  ('circle-004', 'zh', '老牌硬核电子音乐社团');

INSERT INTO artist_translations (artist_id, locale, description)
VALUES 
  ('artist-002', 'ja', 'ハードコアテクノの作曲家'),
  ('artist-002', 'en', 'Hardcore techno composer'),
  ('artist-002', 'zh', '硬核电子音乐作曲家'),
  ('artist-003', 'ja', 'テクノ・ハードコアの作曲家'),
  ('artist-003', 'en', 'Techno and hardcore composer'),
  ('artist-003', 'zh', '电子音乐和硬核音乐作曲家'),
  ('artist-004', 'ja', 'ハードコアテクノの作曲家'),
  ('artist-004', 'en', 'Hardcore techno composer'),
  ('artist-004', 'zh', '硬核电子音乐作曲家');

INSERT INTO event_translations (event_id, locale, description)
VALUES 
  ('event-002', 'ja', 'コミックマーケット103'),
  ('event-002', 'en', 'Comic Market 103'),
  ('event-002', 'zh', '第103届Comic Market'),
  ('event-003', 'ja', 'M3-2024春'),
  ('event-003', 'en', 'M3-2024 Spring'),
  ('event-003', 'zh', 'M3-2024春季展'),
  ('event-004', 'ja', '博麗神社例大祭20'),
  ('event-004', 'en', 'Hakurei Shrine Reitaisai 20'),
  ('event-004', 'zh', '博丽神社例大祭20');