import { BeforeSigninLayout } from '@/layouts/app/BeforeSigninLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { Box, CircularProgress, Container, Paper } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, Suspense } from 'react'
import { FormProvider } from 'react-hook-form'
import { useVerifySignupToken } from '../../api/verify-signup-token'
import { NewPasswordForm } from './NewPasswordForm'
import { useSetNewPasswordForm } from './set-new-password-store'

const VerificationResultContent = () => {
  const router = useRouter()
  const token = router.query.token ?? ''
  const { found } = useVerifySignupToken(`${token}`)

  let content = (
    <>
      <p>メールアドレスの確認が完了しました。</p>
      <p>引き続き、ログインに使用するパスワードを入力してください。</p>
    </>
  )

  if (found) {
    content = (
      <>
        <p>メールアドレスの確認が完了しました。</p>
        <p>引き続き、ログインに使用するパスワードを入力してください。</p>
        <Box sx={{ mt: 4 }}>
          <NewPasswordForm/>
        </Box>
      </>
    )
  } else {
    content = (
      <>
        <p>無効なURLが指定されました。</p>
      </>
    )
  }

  return (
    <>{ content }</>
  )
}

export const VerifyTokenPage: NextPageWithLayout = () => {
  const form = useSetNewPasswordForm()
  const loading = (<CircularProgress/>)

  return (
  <Container maxWidth="lg" sx={{ mt: 4 }}>
    <FormProvider {...form} >
      <Suspense fallback={loading}>
        <Paper sx={{ p: 2 }}>
          <VerificationResultContent/>
        </Paper>
      </Suspense>
    </FormProvider>
  </Container>
  )
}

VerifyTokenPage.getLayout = (page: ReactNode) => BeforeSigninLayout({ children: page })
