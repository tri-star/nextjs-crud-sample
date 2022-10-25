import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { AddUserFormData } from "@/features/users/domain/user"
import { addUser } from "@/features/users/api/add-user"
import { useErrorAlert } from "@/common/error-alert"


type UserAddFormState = {
  userData: AddUserFormData,
}

const schema = yup.object({
  name: yup.string().required(),
  loginId: yup.string().required(),
  email: yup.string().required(),
}).required()

export const useUserFormStore = () => {

  const { showErrorAlert } = useErrorAlert()
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
  } = useForm<AddUserFormData>({
    mode: "onChange",
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: AddUserFormData) => {
    //await addUser(data)
    showErrorAlert('エラーが発生しました')
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
