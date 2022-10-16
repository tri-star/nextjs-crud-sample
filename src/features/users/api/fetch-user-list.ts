import { appConfig } from "@/app-config";
import { getApiBaseUrl } from "@/common/api";
import useSWR from "swr";
import { User } from "../domain/user";


const apiBase = getApiBaseUrl()

type FetchUserListResponse = {
  users: User[] | undefined
  count: number
  pages: number
  page: number
  error: string | undefined
}

export const useFetchUserList = (shouldFetch: boolean, page: number): FetchUserListResponse => {

  const fetcher = (url: string) => fetch(url).then(r => r.json())
  const apiBase = appConfig.apiBase
  const { data, error } = useSWR<FetchUserListResponse, string>(`${apiBase}/users/list?page=${page}`, fetcher)
  const response = {
    users: undefined,
    count: 0,
    pages: 0,
    page: 1,
    error: undefined
  }

  if (error) {
    return {
      users: undefined,
      count: 0,
      pages: 0,
      page: 1,
      error
    }
  }

  if (!data) {
    return response
  }

  return {
    users: data.users,
    count: data.count,
    pages: data.pages,
    page: data.page,
    error: undefined
  }
}


export const mockFetchUserList = (page: number): FetchUserListResponse => {

  const pageSize = 50
  const count = 500
  const users = [...Array(pageSize)].map((_, i) => {
    const no = (page - 1) * pageSize + i
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
    error: undefined,
  }
}
