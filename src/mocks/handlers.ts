import { mockFetchUserDetail } from "@/features/users/api/fetch-user-detail"
import { mockFetchUserList } from "@/features/users/api/fetch-user-list"
import { RequestHandler, rest } from "msw"

export const handlers: RequestHandler[] = [
  mockFetchUserList,
  mockFetchUserDetail,
]
