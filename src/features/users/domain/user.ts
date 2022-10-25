
export type User = {
  id: string,
  loginId: string,
  name: string,
  email: string,
  departmentId: string
}


// 登録・編集共通のユーザー情報
type BaseUserFormData = {
  name: string,
  loginId: string,
  email: string
}


// 登録用のユーザー情報
export type AddUserFormData = BaseUserFormData
