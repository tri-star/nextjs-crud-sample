import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// 登録・編集共通のユーザー情報
type BaseUserData = {
  name: string,
  loginId: string,
  email: string
}

type UserAddFormState = {
  userData: BaseUserData,
}

const schema = yup.object({
  name: yup.string().required(),
  loginId: yup.string().required(),
  email: yup.string().required(),
}).required()

export const useUserFormStore = () => {

  const state = useState<UserAddFormState>({
    userData: {
      name: '',
      loginId: '',
      email: ''
    }
  })

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid
    }
  } = useForm<BaseUserData>({
    mode: "onChange",
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: object) => {
    console.info('called')
    console.info(data)
  }

  return {
    state,
    schema,
    errors,
    isValid,

    onSubmit,
    register,
    handleSubmit,
  }
}
