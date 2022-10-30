import { appConfig } from '@/app-config'
import { delay } from '@/common/delay'
import { axios } from '@/lib/axios'
import { mockDb } from '@/mocks/db'
import { ulid } from 'ulid'
import { rest } from 'msw'
import { AddUserFormData } from '../domain/user'

type AddUserRequest = {
  name: string
  loginId: string
  email: string
}

export const addUser = async (data: AddUserFormData) => {
  const request: AddUserRequest = {
    name: data.name,
    loginId: data.loginId,
    email: data.email
  }

  await delay(500)

  await axios.post('admin/users', request)
}

export const mockAddUser = rest.post(`${appConfig.apiBase}/admin/users`, async (req, res, ctx) => {
  const { name, loginId, email } = await req.json<{
    name: string
    loginId: string
    email: string
  }>()

  try {
    const user = mockDb.user.create({
      id: ulid(),
      name,
      loginId,
      email
    })
    return await res(ctx.status(200), ctx.json(user))
  } catch (e) {
    if (e instanceof Error) {
      return await res(ctx.status(400), ctx.json(e))
    }
  }
})
