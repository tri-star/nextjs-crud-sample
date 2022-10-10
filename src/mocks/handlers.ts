import { appConfig } from "@/app-config"
import { mockFetchUserList } from "@/features/users/api/fetch-user-list"
import { RequestHandler, rest } from "msw"

const apiBase = appConfig.apiBase

export const handlers: RequestHandler[] = [
  rest.get(`${apiBase}/users/list`, (_, res, ctx) => {
    const result = mockFetchUserList()
    return res(ctx.status(200), ctx.json(result))
  })
]
