import { appConfig } from '@/app-config'
import { delay } from '@/common/delay'
import { axios } from '@/lib/axios'
import { mockDb } from '@/mocks/db'
import { rest } from 'msw'
import useSWR, { KeyedMutator } from 'swr'
import { User } from '../domain/user'

type FetchUserDetailData = User

type FetchUserDetailResponse = {
  data: FetchUserDetailData
  mutate: KeyedMutator<FetchUserDetailData>
}

export const useFetchUserDetail = (userId: string | null): FetchUserDetailResponse => {
  const fetcher = async () => {
    await delay(800)
    const res = await axios.get(`admin/users/${userId}`)
    return res.data
  }

  const { data, mutate } = useSWR<FetchUserDetailData, string>(`admin/users/${userId}`, fetcher, {
    suspense: true
  })

  return {
    data: data as FetchUserDetailData,
    mutate
  }
}

export const mockFetchUserDetail = rest.get(`${appConfig.apiBase}/admin/users/:id`, (req, res, ctx) => {
  const { id: userId } = req.params

  try {
    const user = mockDb.user.findFirst({
      where: {
        id: {
          equals: userId.toString()
        }
      }
    })
    if (user == null) {
      throw new Error('Not found')
    }
    return res(ctx.status(200), ctx.json(user))
  } catch (e) {
    if (e instanceof Error) {
      return res(ctx.status(404), ctx.json(e))
    }
  }
})
