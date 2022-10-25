import { appConfig } from "@/app-config";
import { axios } from "@/lib/axios";
import { mockDb } from "@/mocks/db";
import { rest } from "msw";
import useSWR from "swr";
import { User } from "../domain/user";

type FetchUserDetailData = User

type FetchUserDetailResponse = {
  data: FetchUserDetailData | undefined,
  error: string | undefined
}

export const useFetchUserDetail = (userId: string | null): FetchUserDetailResponse => {

  const fetcher = async () => {
    const res = await axios.get(`admin/users/${userId}`)
    return res.data
  }

  const { data, error, mutate } = useSWR<FetchUserDetailData, string>(`admin/users/${userId}`, fetcher)
  const response = {
    data: undefined,
    error: undefined,
  }

  if (error) {
    return {
      data: undefined,
      error,
    }
  }

  if (!data) {
    return response
  }

  return {
    data,
    error: undefined,
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
    if (!user) {
      throw new Error('Not found')
    }
    return res(ctx.status(200), ctx.json(user))
  } catch (e) {
    if (e instanceof Error) {
      return res(ctx.status(404), ctx.json(e))
    }
  }
})
