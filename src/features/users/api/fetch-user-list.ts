import { axios } from "@/lib/axios";
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
    const res = await axios.get(`users/list`, {
      params: {
        page: page.toString()
      }
    })
    return res.data
  }

  const { data, error, mutate } = useSWR<FetchUserListData, string>([`users/list`, page], fetcher)
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


export const mockFetchUserList = (page: number): FetchUserListData => {

  const pageSize = 50
  const count = 500
  const users = [...Array(pageSize)].map((_, i) => {
    const no = (page - 1) * pageSize + i + 1
    return {
      id: `${no}`,
      loginId: `user_${no}`,
      name: `ユーザー${no}`,
      email: `test_${no}@example.com`,
      departmentId: `${no}`,
    }
  })

  return {
    users,
    count,
    pages: Math.trunc(count / pageSize) + ((count % pageSize == 0) ? 1 : 0),
    page,
  }
}
