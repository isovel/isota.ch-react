import { D1Database } from '@cloudflare/workers-types'

export interface Env {
  DB: D1Database
}

export type RawProject = {
  id: string
  category_id: string
  name: string
  url: string | null
  source_url: string | null
  description: string | null
  tags: string | null
  image_url: string | null
  hidden: number
}

export type RawProjectCategory = {
  id: string
  name: string
  hidden: number
}

export type RawProjectTag = {
  key: string
  display_name: string
  color: string
}

export type ProjectTag = {
  displayName: string
  color: string
}

export type Project = {
  name: string
  link?: string
  source?: string
  description?: string
  tags?: ProjectTag[]
  image?: string
}

export type ProjectCategory = {
  label: string
  items: Project[]
  itemPropertyDefaults: Partial<Project>
  itemPropertyOverrides: Partial<Project>
}
