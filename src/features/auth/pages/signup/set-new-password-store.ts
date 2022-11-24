import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'

export type SetNewPasswordFormData = {
  newPassword: string
  confirmation: string
}

export const useSetNewPasswordForm = () => {
  const schema = yup.object({
    newPassword: yup.string().required().min(8),
    confirmation: yup.string().required().oneOf([yup.ref('newPassword')], 'パスワードが一致していません')
  }).required()

  return useForm<SetNewPasswordFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
}

export const useSetNewPasswordStore = (form: UseFormReturn<SetNewPasswordFormData>) => {
  const canSubmit = () => {
    if (!form.formState.isValid) {
      return false
    }
    return true
  }

  const onSubmit = async (data: SetNewPasswordFormData) => {
    console.info(data)
  }

  return {
    canSubmit,
    onSubmit
  }
}
