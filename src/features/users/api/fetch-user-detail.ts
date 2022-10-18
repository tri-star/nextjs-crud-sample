import { axios } from "@/lib/axios";
import useSWR from "swr";
import { User } from "../domain/user";

type FetchUserDetailData = User

type FetchUserDetailResponse = {
  data: FetchUserDetailData | undefined,
  error: string | undefined
}

export const useFetchUserDetail = (userId: number | null): FetchUserDetailResponse => {

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


export const mockFetchUserDetail = (id: number): FetchUserDetailData => {

  if (!id || id >= 500) {
    throw new Error('無効なユーザーIDです')
  }

  return {
    id: `${id}`,
    loginId: `user_${id}`,
    name: `ユーザー${id}`,
    email: `test_${id}@example.com`,
    departmentId: `${id}`,
  }
}
