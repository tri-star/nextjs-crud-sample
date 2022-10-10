import { getApiBaseUrl } from "@/common/api";
import { rest } from "msw";
import { User } from "../domain/user";


const apiBase = getApiBaseUrl()

type FetchUserListResponse = {
  users: User[] | null
  count: number
  isError: boolean
}

export const useFetchUserList = (shouldFetch: boolean): FetchUserListResponse => {

  // SWRを使用してユーザー情報のロードを行う

  return {
    users: null,
    count: 0,
    isError: false
  }
}


export const mockFetchUserList = (): FetchUserListResponse => {
  return {
    users: null,
    count: 0,
    isError: false
  }
}
