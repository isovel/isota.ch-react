export async function onRequest(context) {
  const { env } = context
  const { DB } = env

  const category_stmt = DB.prepare(`SELECT * FROM project_categories`)
  const project_stmt = DB.prepare(
    `SELECT * FROM projects WHERE category_id = ?`,
  )

  let categories: unknown[] = []

  try {
    const raw_categories = await category_stmt.all()
    categories = await Promise.all(
      raw_categories.map(async (category) => {
        const projects = await project_stmt.bind(category.id).all()
        return { ...category, projects }
      }),
    )
  } catch (error) {
    console.error(error)
  }

  return new Response(JSON.stringify(categories))
}
