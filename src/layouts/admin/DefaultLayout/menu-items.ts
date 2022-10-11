
export type MenuItem = {
  icon: string,
  label: string,
  link: string,
}

export const menuItems = [
  {
    icon: 'home',
    label: 'ホーム',
    link: '/admin/dashboard',
  },
  {
    icon: 'person',
    label: 'ユーザー',
    link: '/admin/users',
  }
]
