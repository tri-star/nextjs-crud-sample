import { appConfig } from "@/app-config";
import { getApiBaseUrl } from "@/common/api";
import { rest } from "msw";
import useSWR from "swr";
import { User } from "../domain/user";


const apiBase = getApiBaseUrl()

type FetchUserListResponse = {
  users: User[] | undefined
  count: number
  error: string | undefined
}

export const useFetchUserList = (shouldFetch: boolean): FetchUserListResponse => {

  const fetcher = (url: string) => fetch(url).then(r => r.json())
  const apiBase = appConfig.apiBase
  const { data, error } = useSWR<FetchUserListResponse, string>(`${apiBase}/users/list`, fetcher)
  const response = {
    users: undefined,
    count: 0,
    error: undefined
  }

  if (error) {
    return {
      users: undefined,
      count: 0,
      error
    }
  }

  if (!data) {
    return response
  }

  return {
    users: data.users,
    count: data.count,
    error: undefined
  }
}


export const mockFetchUserList = (): FetchUserListResponse => {

  const count = 50
  const users = [...Array(count)].map((_, i) => {
    return {
      id: `${i}`,
      loginId: `user_${i}`,
      name: `ユーザー${i}`,
      email: `test_${i}@example.com`,
      departmentId: `${i}`,
    }
  })

  return {
    users,
    count,
    error: undefined,
  }
}
