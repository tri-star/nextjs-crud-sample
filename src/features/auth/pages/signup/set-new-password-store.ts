import { yupResolver } from '@hookform/resolvers/yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type SetNewPasswordFormData = {
  newPassword: string
  confirmation: string
}

export const useSetNewPasswordStore = () => {
  const schema = yup.object({
    newPassword: yup.string().required().min(8),
    confirmation: yup.string().required()
  }).required()

  const form = useForm<SetNewPasswordFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const canSubmit = useMemo(() => {
    if (!form.formState.isValid) {
      console.info(form.formState)
      return false
    }
    console.info('form valid')
    return true
  }, [form.formState])

  const onSubmit = async (data: SetNewPasswordFormData) => {
    console.info(data)
  }

  return {
    form,

    canSubmit,
    onSubmit
  }
}
