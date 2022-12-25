import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { AddUserFormData, EditUserFormData } from '@/features/users/domain/user'
import { addUser } from '@/features/users/api/add-user'
import { useAlert } from '@/common/alert'
import { useLoading } from '@/common/loading'
import { useFetchUserDetail } from '@/features/users/api/fetch-user-detail'
import { editUser } from '@/features/users/api/edit-user'

const schema = yup.object({
  name: yup.string().required(),
  loginId: yup.string().required(),
  email: yup.string().required()
}).required()

export const useUserAddFormStore = () => {
  const { showAlert } = useAlert()
  const { loading, withLoading } = useLoading()

  const form = useForm<AddUserFormData>({
    mode: 'onChange',
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
    canSubmit
  }
}

export const useUserEditFormStore = (userId: string) => {
  const { showAlert } = useAlert()
  const { loading, withLoading } = useLoading()
  const { data, mutate } = useFetchUserDetail(userId)

  const form = useForm<EditUserFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: data
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

  const onSubmit = async (data: EditUserFormData) => {
    try {
      await withLoading(async () => {
        await editUser(userId, data)
        mutate()
        showAlert('更新完了しました', 'success')
      })
    } catch (e) {
      showAlert('エラーが発生しました')
    }
  }

  return {
    data,
    loading,
    schema,
    form,

    onSubmit,
    canSubmit
  }
}
