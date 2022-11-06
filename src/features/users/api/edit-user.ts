import { appConfig } from '@/app-config'
import { delay } from '@/common/delay'
import { axios } from '@/lib/axios'
import { mockDb, persistDb } from '@/mocks/db'
import { rest } from 'msw'
import { EditUserFormData } from '../domain/user'

type EditUserRequest = {
  name: string
  loginId: string
  email: string
}

export const editUser = async (userId: string, data: EditUserFormData) => {
  const request: EditUserRequest = {
    name: data.name,
    loginId: data.loginId,
    email: data.email
  }

  await delay(500)

  await axios.put(`admin/users/${userId}`, request)
}

export const mockEditUser = rest.put(`${appConfig.apiBase}/admin/users/:userId`, async (req, res, ctx) => {
  const { userId } = req.params
  const { name, loginId, email } = await req.json<{
    name: string
    loginId: string
    email: string
  }>()

  try {
    mockDb.user.update({
      where: {
        id: {
          equals: `${userId}`
        }
      },
      data: {
        name,
        loginId,
        email
      }
    })
    persistDb('user')
    return await res(ctx.status(200), ctx.json({}))
  } catch (e) {
    if (e instanceof Error) {
      return await res(ctx.status(400), ctx.json(e))
    }
  }
})
