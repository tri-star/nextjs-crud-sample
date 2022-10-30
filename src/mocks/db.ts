import { isServer } from '@/common/ssr'
import { factory, primaryKey } from '@mswjs/data'
import { ulid } from 'ulid'

export const mockDb = factory({
  user: {
    id: primaryKey(String),
    loginId: String,
    name: String,
    email: String,
    departmentId: Number
  }
})

type Model = keyof typeof mockDb

export const loadDb = () => {
  if (isServer()) {
    return
  }
  const content = window.localStorage.getItem('msw-db') ?? '{}'
  return Object.assign(JSON.parse(content) as object)
}

export const persistDb = (model: Model) => {
  if (process.env.NODE_ENV === 'test' || isServer()) {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = loadDb()
  data[model] = mockDb[model]
  window.localStorage.setItem('msw-db', JSON.stringify(data))
}

export const initDb = () => {
  if (isServer()) {
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const db = loadDb()
  Object.entries(mockDb).forEach(([key, model]) => {
    // eslint-expect-error
    const rows = db[key]
    if (Array.isArray(rows)) {
      rows.forEach((row: Record<string, any>) => {
        model.create(row)
      })
    }
  })

  if (mockDb.user.count() === 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    [...Array(500)].forEach((_, i) => {
      const id = i + 1
      mockDb.user.create({
        id: ulid(),
        loginId: `user_${id}`,
        name: `ユーザー${id}`,
        email: `test${id}@example.com`,
        departmentId: 1
      })
    })
  }
}

initDb()
