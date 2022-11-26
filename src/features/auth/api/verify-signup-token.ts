import { appConfig } from '@/app-config'
import { isAxiosError } from '@/common/axios'
import { delay } from '@/common/delay'
import { User } from '@/features/users/domain/user'
import { axios } from '@/lib/axios'
import { mockDb } from '@/mocks/db'
import { rest } from 'msw'
import useSWR from 'swr'

type VerifySignupTokenResponse = {
  found: boolean
  user: User | undefined
}

export const useVerifySignupToken = (token: string) => {
  const fetcher = async () => {
    await delay(500)
    try {
      const res = await axios.get<VerifySignupTokenResponse>(`auth/signup/token/${token}`)
      return {
        found: res.data.found,
        user: res.data.user ?? undefined
      }
    } catch (e) {
      if (isAxiosError(e)) {
        if (e.response?.status === 404) {
          return {
            found: false,
            user: undefined
          }
        }
      }
      throw e
    }
  }

  const { data } = useSWR(`auth/signup/token/${token}`, fetcher, {
    suspense: true
  })

  const result = data as VerifySignupTokenResponse
  return {
    found: result.found,
    user: result.user
  }
}

export const mockVerifySignupToken = rest.get(`${appConfig.apiBase}/auth/signup/token/:token`, (req, res, ctx) => {
  const { token } = req.params

  try {
    const signupToken = mockDb.signup_tokens.findFirst({
      where: {
        token: {
          equals: token.toString()
        }
      }
    })
    if (signupToken == null) {
      return res(ctx.status(404), ctx.json({}))
    }
    const user = mockDb.user.findFirst({
      where: {
        id: {
          equals: signupToken.userId
        }
      }
    })
    return res(ctx.status(200), ctx.json({
      found: true,
      user
    }))
  } catch (e) {
    if (e instanceof Error) {
      return res(ctx.status(404), ctx.json(e))
    }
  }
})
