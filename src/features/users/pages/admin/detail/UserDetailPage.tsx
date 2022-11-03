import { CenterBox } from '@/components/CenterBox'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { TitleLabel } from '@/components/form/TitleLabel'
import { ValueLabel } from '@/components/form/ValueLabel'
import { PageContainer } from '@/components/PageContainer'
import PageTitle from '@/components/PageTitle'
import { useFetchUserDetail } from '@/features/users/api/fetch-user-detail'
import { adminUserEditUrl } from '@/routes/admin'
import { Button, CircularProgress, Icon, Paper, Stack } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactElement, Suspense } from 'react'

/**
 * ユーザー情報表示・編集ボタン等を返す
 */
const DetailInfo = ({ userId }: { userId: string }): ReactElement => {
  const router = useRouter()
  const { data } = useFetchUserDetail(`${userId}`)

  const handleEdit = () => {
    router.push(adminUserEditUrl(userId))
  }

  const handleBack = () => {
    router.back()
  }

  const labelWidth = '180px'

  return (
    <>
      <Stack direction="row" spacing={2} my={1}>
        <TitleLabel width={labelWidth}>ID</TitleLabel>
        <ValueLabel>{ data.id }</ValueLabel>
      </Stack>
      <Stack direction="row" spacing={2} my={1}>
        <TitleLabel width={labelWidth}>ログインID</TitleLabel>
        <ValueLabel>{ data.loginId }</ValueLabel>
      </Stack>
      <Stack direction="row" spacing={2} my={1}>
        <TitleLabel width={labelWidth}>名前</TitleLabel>
        <ValueLabel>{ data.name }</ValueLabel>
      </Stack>
      <Stack direction="row" spacing={2} my={1}>
        <TitleLabel width={labelWidth}>メールアドレス</TitleLabel>
        <ValueLabel>{ data.email }</ValueLabel>
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="center" my={2}>
        <Button variant="contained" startIcon={<Icon>edit</Icon>} onClick={handleEdit}>編集</Button>
        <Button variant="contained" startIcon={<Icon>chevron_left</Icon>} onClick={handleBack}>戻る</Button>
      </Stack>
    </>
  )
}

/**
 * ユーザー詳細画面本体
 */
export const UserDetailPage: NextPage = () => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  const userId = router.query?.id ?? ''

  const loadingIndicator = (<CenterBox><CircularProgress/></CenterBox>)

  const errorFallback = () => {
    return (
      <Stack spacing={2} my={2}>
        <CenterBox>
          <p>データのロードに失敗しました。</p>
          <p>お手数ですが、時間を開けて再度お試しください</p>
        </CenterBox>
        <CenterBox>
          <Button variant="contained" startIcon={<Icon>chevron_left</Icon>} onClick={handleBack}>戻る</Button>
        </CenterBox>
      </Stack>
    )
  }

  return (
    <PageContainer>
      <PageTitle title="ユーザー詳細"></PageTitle>

      <Paper sx={{ p: 2, my: 2 }}>
        <ErrorBoundary fallback={errorFallback}>
          <Suspense fallback={loadingIndicator}>
            <DetailInfo userId={`${userId}`}/>
          </Suspense>
        </ErrorBoundary>
      </Paper>

    </PageContainer>
  )
}
