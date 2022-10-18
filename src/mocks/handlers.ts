import { appConfig } from "@/app-config"
import { RequestHandler, rest } from "msw"
import { mockDb } from "./db"

const apiBase = appConfig.apiBase

export const handlers: RequestHandler[] = [
  rest.get(`${apiBase}/admin/users`, (req, res, ctx) => {

    const page = +(req.url.searchParams.get('page') ?? '1')
    const pageSize = 50
    const totalCount = mockDb.user.count()
    const pages = Math.trunc(totalCount / pageSize) + ((totalCount % pageSize == 0) ? 1 : 0)

    const users = mockDb.user.findMany({
      take: 50,
      skip: (page - 1) * pageSize
    })
    return res(ctx.status(200), ctx.json({
      users,
      count: mockDb.user.count(),
      pages,
      page: page,
    }))
  }),
  rest.get(`${apiBase}/admin/users/:id`, (req, res, ctx) => {

    const { id: userId } = req.params

    try {
      const user = mockDb.user.findFirst({
        where: {
          id: {
            equals: +userId
          }
        }
      })
      if (!user) {
        throw new Error('Not found')
      }
      return res(ctx.status(200), ctx.json(user))
    } catch (e) {
      if (e instanceof Error) {
        return res(ctx.status(404), ctx.json(e))
      }
    }
  })
]
