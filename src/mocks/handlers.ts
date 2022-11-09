import { mockVerifySignupToken } from '@/features/auth/api/signup-token'
import { mockAddUser } from '@/features/users/api/add-user'
import { mockEditUser } from '@/features/users/api/edit-user'
import { mockFetchUserDetail } from '@/features/users/api/fetch-user-detail'
import { mockFetchUserList } from '@/features/users/api/fetch-user-list'
import { RequestHandler } from 'msw'

export const handlers: RequestHandler[] = [
  mockFetchUserList,
  mockFetchUserDetail,
  mockAddUser,
  mockEditUser,
  mockVerifySignupToken
]
