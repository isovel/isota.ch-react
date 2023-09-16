import sqlite from 'better-sqlite3'
import { project_categories, project_tags, projects } from './raw.json'
import schema from './schema.js'

const db = sqlite(
  '.wrangler/state/v3/d1/776c57c4-08c9-4db8-b994-d2a6c0eda35e/db.sqlite'
)

const populate = () => {
  for (const table of schema) {
    db.prepare(`DROP TABLE IF EXISTS ${table.name}`).run()
    db.prepare(
      `
      CREATE TABLE IF NOT EXISTS ${table.name} (
        ${table.columns
          .map(
            (column) =>
              `${column.name} ${column.type} ${
                column.primary_key ? 'PRIMARY KEY' : ''
              } ${column.nullable ? '' : 'NOT NULL'} ${
                column.default ? `DEFAULT ${column.default}` : ''
              }`
          )
          .join(', ')}
      )
    `
    ).run()
  }

  for (const category of project_categories) {
    db.prepare(
      `
      INSERT INTO project_categories (id, name, hidden)
      VALUES (:id, :name, :hidden)
    `
    ).run(category)
  }

  for (const tag of project_tags) {
    db.prepare(
      `
      INSERT INTO project_tags (key, display_name, color)
      VALUES (:key, :display_name, :color)
    `
    ).run(tag)
  }

  for (const project of projects) {
    db.prepare(
      `
      INSERT INTO projects (id, category_id, name, url, source_url, description, tags, image_url, hidden)
      VALUES (:id, :category_id, :name, :url, :source_url, :description, :tags, :image_url, :hidden)
    `
    ).run(project)
  }
}

populate()
