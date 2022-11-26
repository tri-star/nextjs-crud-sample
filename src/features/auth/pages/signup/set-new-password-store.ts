import { appHomeUrl } from '@/routes/app'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useForm, UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'
import { acceptRegistration } from '../../api/accept-registration'
import { AuthService, AuthServiceInterface } from '../../services/auth-service'

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

export const useSetNewPasswordStore = (form: UseFormReturn<SetNewPasswordFormData>,
  authService: AuthServiceInterface = new AuthService()
) => {
  const router = useRouter()
  const signupToken = `${router.query.token ?? ''}`

  const canSubmit = () => {
    if (!form.formState.isValid) {
      return false
    }
    return true
  }

  const onSubmit = async (data: SetNewPasswordFormData) => {
    // acceptのAPIを呼ぶ
    // 処理中はロード中状態
    // 成功したらトップ画面にリダイレクト
    // 完了のアラートを上部に表示する
    const result = await acceptRegistration(signupToken, data.newPassword)
    authService.save(result.signinToken)
    router.push(appHomeUrl())
  }

  return {
    canSubmit,
    onSubmit
  }
}
