import { delay } from "@/common/delay"
import axios from "axios"
import { AddUserFormData } from "../domain/user"

type AddUserRequest = {
  name: string,
  loginId: string,
  email: string
}

export const addUser = async (data: AddUserFormData) => {

  const request: AddUserRequest = {
    name: data.name,
    loginId: data.loginId,
    email: data.email,
  }

  await delay(500)

  await axios.post(`admin/users`, request)
}
