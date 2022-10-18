import { appConfig } from "@/app-config";
import { axios } from "@/lib/axios";
import { mockDb } from "@/mocks/db";
import { rest } from "msw";
import useSWR from "swr";
import { User } from "../domain/user";

type FetchUserListData = {
  users: User[] | undefined
  count: number
  pages: number
  page: number
}

type FetchUserListResponse = {
  data: FetchUserListData,
  error: string | undefined
}

export const useFetchUserList = (shouldFetch: boolean, page: number): FetchUserListResponse => {

  const fetcher = async () => {
    const res = await axios.get(`admin/users`, {
      params: {
        page: page.toString()
      }
    })
    return res.data
  }

  const { data, error, mutate } = useSWR<FetchUserListData, string>([`admin/users`, page], fetcher)
  const response = {
    data: {
      users: undefined,
      count: 0,
      pages: 0,
      page: 1,
    },
    error: undefined,
  }

  if (error) {
    return {
      data: {
        users: undefined,
        count: 0,
        pages: 0,
        page: 1,
      },
      error,
    }
  }

  if (!data) {
    return response
  }

  return {
    data: {
      users: data.users,
      count: data.count,
      pages: data.pages,
      page: data.page,
    },
    error: undefined,
  }
}


export const mockFetchUserList = rest.get(`${appConfig.apiBase}/admin/users`, (req, res, ctx) => {

  const page = +(req.url.searchParams.get('page') ?? '1')
  const pageSize = 50
  const totalCount = mockDb.user.count()
  const pages = Math.trunc(totalCount / pageSize) + ((totalCount % pageSize == 0) ? 1 : 0)

  const users = mockDb.user.findMany({
    take: 50,
    skip: (page - 1) * pageSize
  })
  return res(ctx.status(200), ctx.json({
    users,
    count: mockDb.user.count(),
    pages,
    page: page,
  }))
})
