import { appConfig } from "@/app-config"
import { mockFetchUserList } from "@/features/users/api/fetch-user-list"
import { RequestHandler, rest } from "msw"

const apiBase = appConfig.apiBase

export const handlers: RequestHandler[] = [
  rest.get(`${apiBase}/users/list`, (req, res, ctx) => {

    const page = req.url.searchParams.get('page') ?? '1'

    const result = mockFetchUserList(+page)
    return res(ctx.status(200), ctx.json(result))
  })
]
