import { appConfig } from '@/app-config'
import { delay } from '@/common/delay'
import { axios } from '@/lib/axios'
import { mockDb, persistDb } from '@/mocks/db'
import { ulid } from 'ulid'
import { rest } from 'msw'
import { AddUserFormData } from '../domain/user'
import { generateSignupToken } from '@/features/auth/services/signup-token-generator'
import dayjs from 'dayjs'
import { verifySignupTokenUrl } from '@/routes/auth'

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
      password: '',
      email,
      verified: false
    })

    const signupToken = generateSignupToken()
    mockDb.signup_tokens.create({
      id: ulid(),
      userId: user.id,
      token: signupToken.token,
      expiresAt: dayjs(signupToken.expiresAt).format('YYYY-MM-DD HH:mm:ss')
    })

    // 実際はサーバーサイドの実装によるメール送信が発生
    const verifySignupUrl = verifySignupTokenUrl(signupToken.token)
    const message = `以下のURLにアクセスし、本登録を完了させてください。\n${verifySignupUrl}`
    console.info(message)

    persistDb('user')
    persistDb('signup_tokens')
    return await res(ctx.status(200), ctx.json(user))
  } catch (e) {
    if (e instanceof Error) {
      return await res(ctx.status(400), ctx.json(e))
    }
  }
})
