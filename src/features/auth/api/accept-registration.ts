import { appConfig } from '@/app-config'
import { delay } from '@/common/delay'
import { axios } from '@/lib/axios'
import { mockDb, persistDb } from '@/mocks/db'
import dayjs from 'dayjs'
import { rest } from 'msw'
import { ulid } from 'ulid'
import { generateSigninToken } from '../services/signin-token-generator'

type AcceptRegistrationResponse = {
  signinToken: string
}

export const acceptRegistration = async (token: string, newPassword: string) => {
  await delay(500)
  const res = await axios.post<AcceptRegistrationResponse>(`auth/signup/accept/${token}`, {
    newPassword
  })
  return {
    signinToken: res.data.signinToken
  }
}

export const mockAcceptSignupToken = rest.post(`${appConfig.apiBase}/auth/signup/accept/:token`, async (req, res, ctx) => {
  const { token } = req.params
  const json = await req.json()
  const newPassword = json.newPassword ?? ''

  try {
    const signupToken = mockDb.signup_tokens.findFirst({
      where: {
        token: {
          equals: token.toString()
        }
      }
    })
    if (signupToken === null) {
      return await res(ctx.status(404), ctx.json({}))
    }
    const user = mockDb.user.findFirst({
      where: {
        id: {
          equals: signupToken.userId
        }
      }
    })
    if (user === null) {
      return await res(ctx.status(404), ctx.json({}))
    }

    mockDb.user.update({
      where: {
        id: {
          equals: `${user.id}`
        }
      },
      data: {
        password: newPassword as string
      }
    })

    const signinToken = generateSigninToken()
    mockDb.signin_tokens.create({
      id: ulid(),
      userId: `${user.id}`,
      token: signinToken.token,
      expiresAt: dayjs(signinToken.expiresAt).format('YYYY-MM-DD HH:mm:ss')
    })

    mockDb.signup_tokens.delete({
      where: {
        token: {
          equals: token.toString()
        }
      }
    })

    persistDb('user')
    persistDb('signin_tokens')
    persistDb('signup_tokens')

    return await res(ctx.status(200), ctx.json({
      signinToken: signinToken.token
    }))
  } catch (e) {
    if (e instanceof Error) {
      return await res(ctx.status(404), ctx.json(e))
    }
  }
})
