import { BeforeSigninLayout } from '@/layouts/app/BeforeSigninLayout'
import { NextPageWithLayout } from '@/pages/_app'
import { Box, CircularProgress, Container } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode, Suspense } from 'react'
import { useVerifySignupToken } from '../../api/signup-token'

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
  const loading = (<CircularProgress/>)

  return (
  <Container maxWidth="md" sx={{ mt: 4 }}>
    <Suspense fallback={loading}>
      <VerificationResultContent/>
    </Suspense>
  </Container>
  )
}

VerifyTokenPage.getLayout = (page: ReactNode) => BeforeSigninLayout({ children: page })
