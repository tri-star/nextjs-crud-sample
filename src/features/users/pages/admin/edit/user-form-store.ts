import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { AddUserFormData } from "@/features/users/domain/user"
import { addUser } from "@/features/users/api/add-user"
import { useAlert } from "@/common/alert"
import { useLoading } from "@/common/loading"
import create from "zustand/react"

type UserAddFormState = {
  userData: AddUserFormData,
}

const schema = yup.object({
  name: yup.string().required(),
  loginId: yup.string().required(),
  email: yup.string().required(),
}).required()

export const useUserFormStore = () => {

  const { showAlert } = useAlert()
  const { loading, withLoading } = useLoading()

  const form = useForm<AddUserFormData>({
    mode: "onChange",
    resolver: yupResolver(schema)
  })

  const canSubmit = () => {
    if (loading) {
      return false
    }
    if (!form.formState.isValid) {
      return false
    }
    return true
  }

  const onSubmit = async (data: AddUserFormData) => {

    try {
      await withLoading(async () => {
        await addUser(data)
        showAlert('登録完了しました', 'success')
      })
    } catch (e) {
      showAlert('エラーが発生しました')
    }
  }

  return {
    loading,
    schema,
    form,

    onSubmit,
    canSubmit,
  }
}
