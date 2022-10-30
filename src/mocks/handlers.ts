import { mockAddUser } from '@/features/users/api/add-user'
import { mockFetchUserDetail } from '@/features/users/api/fetch-user-detail'
import { mockFetchUserList } from '@/features/users/api/fetch-user-list'
import { RequestHandler } from 'msw'

export const handlers: RequestHandler[] = [
  mockFetchUserList,
  mockFetchUserDetail,
  mockAddUser
]
