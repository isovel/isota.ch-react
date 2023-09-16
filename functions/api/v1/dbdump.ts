import type {
  Env,
  RawProject,
  RawProjectCategory,
  RawProjectTag,
} from '../../../src/types'

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { DB } = context.env

  const category_stmt = DB.prepare(
    `SELECT * FROM project_categories WHERE hidden = 0`
  )
  const tag_stmt = DB.prepare(`SELECT * FROM project_tags`)
  const project_stmt = DB.prepare(`SELECT * FROM projects WHERE hidden = 0`)

  const res: {
    project_categories: RawProjectCategory[]
    project_tags: RawProjectTag[]
    projects: RawProject[]
  } = {
    project_categories: [],
    project_tags: [],
    projects: [],
  }

  try {
    // Execute the database queries
    res.project_categories = (await category_stmt.all())
      .results as RawProjectCategory[]
    res.project_tags = (await tag_stmt.all()).results as RawProjectTag[]
    res.projects = (await project_stmt.all()).results as RawProject[]
  } catch (e: unknown) {
    console.error(e)
    return Response.json(
      {
        categories: [],
        error: 'An error occurred while fetching projects.',
      },
      { status: 500 }
    )
  }

  return Response.json(res, { status: 200 })
}
