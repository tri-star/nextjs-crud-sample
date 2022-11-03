import { UrlBuilder } from '@/common/url-builder'

export const adminUserListUrl = (page: number): UrlBuilder => {
  const path = '/admin/users'
  const searchParams = new URLSearchParams()

  if (page > 1) {
    searchParams.append('page', page.toString())
  }
  return new UrlBuilder({
    path,
    searchParams
  })
}

export const adminUserDetailUrl = (userId: string) => {
  return `/admin/users/${userId}`
}

export const adminUserAddUrl = () => {
  return '/admin/users/add'
}

export const adminUserEditUrl = (id: string) => {
  return `/admin/users/${id}/edit`
}
