import { appConfig } from "@/app-config"
import { mockFetchUserDetail } from "@/features/users/api/fetch-user-detail"
import { mockFetchUserList } from "@/features/users/api/fetch-user-list"
import { RequestHandler, rest } from "msw"

const apiBase = appConfig.apiBase

export const handlers: RequestHandler[] = [
  rest.get(`${apiBase}/admin/users`, (req, res, ctx) => {

    const page = req.url.searchParams.get('page') ?? '1'

    const result = mockFetchUserList(+page)
    return res(ctx.status(200), ctx.json(result))
  }),
  rest.get(`${apiBase}/admin/users/:id`, (req, res, ctx) => {

    const { id: userId } = req.params

    try {
      const result = mockFetchUserDetail(+userId)
      return res(ctx.status(200), ctx.json(result))
    } catch (e) {
      if (e instanceof Error) {
        return res(ctx.status(404), ctx.json(e))
      }
    }
  })
]
