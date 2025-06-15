// 社团表
export interface Circle {
  id: string
  name: string
  avatar_url?: string
  sns_urls?: string // JSON 字符串，建议前端解析为对象
  created_at: string
  updated_at: string
}

// 艺术家表
export interface Artist {
  id: string
  name: string
  avatar_url?: string
  sns_urls?: string // JSON 字符串
  created_at: string
  updated_at: string
}

// 社团成员关系表
export interface CircleMember {
  id: string
  circle_id: string
  artist_id: string
  roles: string // JSON 字符串，如 { "main": true, "composer": true }
  created_at: string
  updated_at: string
}

// 展会组表
export interface EventGroup {
  id: string
  name: string
  location?: string
  start_date: string
  end_date: string
  official_url?: string
  created_at: string
  updated_at: string
}

// 单日展会表
export interface Event {
  id: string
  group_id: string
  name: string
  date: string
  created_at: string
  updated_at: string
}

// 社团参展记录
export interface Appearance {
  id: string
  circle_id: string
  event_id: string
  path: string
  created_at: string
  updated_at: string
}

// appearance 下的品書图像
export interface AppearanceMenu {
  id: string
  appearance_id: string
  image_url: string
  image_order: number
  created_at: string
  updated_at: string
}

// 多语言翻译表
export interface CircleTranslation {
  circle_id: string
  locale: 'ja' | 'en' | 'zh'
  description: string
}

export interface ArtistTranslation {
  artist_id: string
  locale: 'ja' | 'en' | 'zh'
  description: string
}

export interface EventTranslation {
  event_id: string
  locale: 'ja' | 'en' | 'zh'
  description: string
}
