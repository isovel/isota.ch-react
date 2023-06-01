import type { EventContext } from '@cloudflare/workers-types'
import type {
  Env,
  Project,
  ProjectCategory,
  RawProject,
  RawProjectCategory,
} from '../../../src/types'

export async function onRequestGet(context: EventContext<Env, '', Request>) {
  const { env } = context
  const { DB } = env

  const category_stmt = DB.prepare(
    `SELECT * FROM project_categories WHERE hidden = 0`,
  )
  const project_stmt = DB.prepare(`SELECT * FROM projects WHERE hidden = 0`)

  const categories: ProjectCategory[] = []

  try {
    // Execute the database queries
    const raw_categories = (await category_stmt.all())
      .results as RawProjectCategory[]
    const raw_projects = (await project_stmt.all()).results as RawProject[]

    // Remap raw projects to a more usable format
    const projects: Project[] = raw_projects?.map((raw_project: RawProject) => {
      const project: Project = {
        name: raw_project.name,
        link: raw_project.url ?? undefined,
        source: raw_project.source_url ?? undefined,
        description: raw_project.description ?? undefined,
        tags: raw_project.tags?.split(',') ?? undefined,
        image: raw_project.image_url ?? undefined,
      }

      return project
    })

    // Remap raw categories to a more usable format
    raw_categories?.forEach((raw_category: RawProjectCategory) => {
      const category: ProjectCategory = {
        label: raw_category.name,
        items: [],
        itemPropertyDefaults: {},
        itemPropertyOverrides: {},
      }

      // Filter projects by category
      const category_projects = projects.filter(
        (_, i) => raw_projects[i].category_id === raw_category.id,
      )

      // Add projects to category
      category.items = category_projects

      // Add category to categories
      categories.push(category)
    })
  } catch (error) {
    return new Response(JSON.stringify({ categories: [], error }), {
      status: 500,
    })
  }

  return new Response(JSON.stringify({ categories }), { status: 200 })
}
