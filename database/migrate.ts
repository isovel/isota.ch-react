import sqlite from 'better-sqlite3'
import schema from './schema.js'

const db = sqlite('.wrangler/state/v3/d1/DB/db.sqlite')

const project_categories = [
  {
    id: 'cat_0b661c36-8717-4a67-9d0a-f836a7dd42b4',
    name: 'Standalone Projects',
    hidden: 0,
  },
  {
    id: 'cat_af00f784-7427-4295-a674-33446f01fc7d',
    name: 'Spigot Plugins',
    hidden: 0,
  },
  {
    id: 'cat_f63d4210-ffa4-409e-8d70-74a2a7060de7',
    name: 'Discord Bots',
    hidden: 0,
  },
  {
    id: 'cat_3e014eca-700e-4ebb-b2a7-bb5ddc39eb58',
    name: 'Discord Plugins',
    hidden: 0,
  },
]

const projects = [
  {
    id: 'proj_2887c787-249c-415f-bb0a-6345f568fa4a',
    category_id: 'cat_0b661c36-8717-4a67-9d0a-f836a7dd42b4',
    name: 'IPv4 Party',
    url: 'https://ipv4.party/',
    source_url: 'https://github.com/ipv4party/',
    description:
      'A war of attrition, fought by exerting control over as many IP addresses as possible!',
    tags: null,
    image_url: null,
    hidden: 0,
  },
  {
    id: 'proj_f19faedd-4107-41d7-b01a-7e88e01a423c',
    category_id: 'cat_0b661c36-8717-4a67-9d0a-f836a7dd42b4',
    name: 'SatTracker',
    url: 'https://dwnl.ink',
    source_url: 'https://github.com/sattracker',
    description: null,
    tags: 'WIP',
    image_url: null,
    hidden: 1,
  },
  {
    id: 'proj_58d7c35e-b3a5-4f69-92d4-607450271459',
    category_id: 'cat_0b661c36-8717-4a67-9d0a-f836a7dd42b4',
    name: 'Kiro',
    url: 'https://kiro.kio.dev',
    source_url: 'https://github.com/kiosion/kiro',
    description: null,
    tags: 'WIP',
    image_url: null,
    hidden: 1,
  },
  {
    id: 'proj_afc02984-4b09-4462-b1b8-b3d9a626c0e1',
    category_id: 'cat_0b661c36-8717-4a67-9d0a-f836a7dd42b4',
    name: 'Zen',
    url: 'https://zen.kio.dev',
    source_url: 'https://github.com/kiosion/zen',
    description: 'A simple irc-style chat app.',
    tags: null,
    image_url: 'zen.png',
    hidden: 0,
  },
  {
    id: 'proj_b523523f-e6d9-4ee7-af7a-22f0ec2a5161',
    category_id: 'cat_0b661c36-8717-4a67-9d0a-f836a7dd42b4',
    name: 'DxM',
    url: 'https://dev.dm.isota.ch',
    source_url: 'https://github.com/toastythetoaster/directishmessage-v1',
    description: 'A not very good precursor to Zen',
    tags: null,
    image_url: null,
    hidden: 1,
  },
  {
    id: 'proj_9cfee5e2-d4b3-4b6b-8991-ba7eee405a16',
    category_id: 'cat_af00f784-7427-4295-a674-33446f01fc7d',
    name: 'SimpleChat',
    url: null,
    source_url: 'https://github.com/toastythetoaster/simple-chat',
    description: 'A simple, easy to configure chat plugin.',
    tags: null,
    image_url: 'java_512px.png',
    hidden: 0,
  },
  {
    id: 'proj_b6f23943-d046-4fc2-bdb6-a0d5d394ff0f',
    category_id: 'cat_f63d4210-ffa4-409e-8d70-74a2a7060de7',
    name: 'Channel Nuke',
    url: null,
    source_url: null,
    description: null,
    tags: null,
    image_url: 'channelnuke_128px.png',
    hidden: 1,
  },
  {
    id: 'proj_9af18d0a-708c-4ef4-ad2a-1e2c252dd5a1',
    category_id: 'cat_f63d4210-ffa4-409e-8d70-74a2a7060de7',
    name: 'Roles',
    url: null,
    source_url: 'https://github.com/toastythetoaster/rolemenubot',
    description: null,
    tags: null,
    image_url: 'roles_128px.png',
    hidden: 0,
  },
  {
    id: 'proj_92cb1a43-1ae2-4612-9e5f-8b2f9e861ec6',
    category_id: 'cat_f63d4210-ffa4-409e-8d70-74a2a7060de7',
    name: 'xkcdbot',
    url: null,
    source_url: 'https://github.com/toastythetoaster/xkcdbot',
    description: null,
    tags: null,
    image_url: 'xkcd_128px.png',
    hidden: 0,
  },
  {
    id: 'proj_9914c889-f7c5-49c1-9337-49245cbcdaea',
    category_id: 'cat_3e014eca-700e-4ebb-b2a7-bb5ddc39eb58',
    name: 'Discord Experiments',
    url: null,
    source_url: 'https://github.com/toastythetoaster/DiscordExperiments',
    description: 'Enables developer options in the Discord client.',
    tags: 'Archived,Astra Plugin',
    image_url: 'discordexperiments.svg',
    hidden: 0,
  },
  {
    id: 'proj_afe1a510-35e0-4911-b4eb-568ca372e949',
    category_id: 'cat_3e014eca-700e-4ebb-b2a7-bb5ddc39eb58',
    name: 'Lockdown',
    url: null,
    source_url: 'https://github.com/toastythetoaster/Lockdown',
    description:
      'Locks the discord client after a certain amount of time and requires a passcode to unlock it.',
    tags: 'Archived,Astra Plugin',
    image_url: 'lockdown.svg',
    hidden: 0,
  },
]

const migrate = () => {
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
              }`,
          )
          .join(', ')}
      )
    `,
    ).run()
  }

  for (const category of project_categories) {
    db.prepare(
      `
      INSERT INTO project_categories (id, name, hidden)
      VALUES (:id, :name, :hidden)
    `,
    ).run(category)
  }

  for (const project of projects) {
    db.prepare(
      `
      INSERT INTO projects (id, category_id, name, url, source_url, description, tags, image_url, hidden)
      VALUES (:id, :category_id, :name, :url, :source_url, :description, :tags, :image_url, :hidden)
    `,
    ).run(project)
  }
}

migrate()
