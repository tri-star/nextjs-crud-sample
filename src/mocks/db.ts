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
  return Object.assign(JSON.parse(window.localStorage.getItem('msw-db') || '{}'))
}

export const persistDb = (model: Model) => {
  if (process.env.NODE_ENV === 'test' || isServer()) {
    return
  }
  const data = loadDb()
  data[model] = mockDb[model]
  window.localStorage.setItem('msw-db', JSON.stringify(data))
}

export const initDb = () => {
  if (isServer()) {
    return
  }
  const db = loadDb()
  Object.entries(mockDb).forEach(([key, model]) => {
    const rows = db[key]
    if (rows) {
      rows.forEach((row: Record<string, any>) => {
        model.create(row)
      })
    }
  })

  if (mockDb.user.count() === 0) {
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
