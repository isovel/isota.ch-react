type DBColumn = {
  name: string
  type: string
  nullable: boolean
  default: boolean | number | string | null
  primary_key: boolean
}

type DBTable = {
  name: string
  columns: DBColumn[]
}

type DBSchema = DBTable[]

const schema: DBSchema = [
  {
    name: 'project_categories',
    columns: [
      {
        name: 'id',
        type: 'TEXT',
        nullable: true,
        default: null,
        primary_key: true,
      },
      {
        name: 'name',
        type: 'TEXT',
        nullable: true,
        default: null,
        primary_key: false,
      },
      {
        name: 'hidden',
        type: 'INTEGER',
        nullable: true,
        default: 0,
        primary_key: false,
      },
    ],
  },
  {
    name: 'projects',
    columns: [
      {
        name: 'id',
        type: 'TEXT',
        nullable: true,
        default: null,
        primary_key: true,
      },
      {
        name: 'category_id',
        type: 'TEXT',
        nullable: true,
        default: null,
        primary_key: false,
      },
      {
        name: 'name',
        type: 'TEXT',
        nullable: true,
        default: null,
        primary_key: false,
      },
      {
        name: 'url',
        type: 'TEXT',
        nullable: true,
        default: null,
        primary_key: false,
      },
      {
        name: 'source_url',
        type: 'TEXT',
        nullable: true,
        default: null,
        primary_key: false,
      },
      {
        name: 'description',
        type: 'TEXT',
        nullable: true,
        default: null,
        primary_key: false,
      },
      {
        name: 'tags',
        type: 'TEXT',
        nullable: true,
        default: null,
        primary_key: false,
      },
      {
        name: 'image_url',
        type: 'TEXT',
        nullable: true,
        default: null,
        primary_key: false,
      },
      {
        name: 'hidden',
        type: 'INTEGER',
        nullable: true,
        default: 0,
        primary_key: false,
      },
    ],
  },
]

export default schema
export type { DBColumn, DBSchema, DBTable }
