import { UrlBuilder, UrlParts } from '@/common/url-builder'

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

export const adminUserDetailUrl = (userId: number) => {
  return `/admin/users/${userId}`
}

export const adminUserAddUrl = () => {
  return `/admin/users/add`
}
