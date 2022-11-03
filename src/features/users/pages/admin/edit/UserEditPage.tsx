import { AppAlert } from '@/components/AppAlert'
import { CenterBox } from '@/components/CenterBox'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { PageContainer } from '@/components/PageContainer'
import PageTitle from '@/components/PageTitle'
import { Button, CircularProgress, Icon, Stack } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Suspense, useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { useUserEditFormStore } from './user-form-store'
import { UserForm } from './UserForm'

const UserEditForm = (): JSX.Element => {
  const router = useRouter()
  const id = `${router.query.id ?? ''}`
  const { data, form, loading, onSubmit, canSubmit } = useUserEditFormStore(id)

  useEffect(() => {
    if (data != null) {
      form.reset(data)
    }
  }, [data, form])

  const handleBack = () => {
    router.back()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <UserForm/>

        <Stack direction="row" spacing={2} justifyContent="center" my={2}>
          <Button variant="contained" startIcon={<Icon>save</Icon>} type="submit" disabled={!canSubmit()}>
            { loading ? '保存中...' : '保存' }
          </Button>
          <Button variant="contained" startIcon={<Icon>chevron_left</Icon>} onClick={handleBack}>戻る</Button>
        </Stack>
      </form>
    </FormProvider>
  )
}

export const UserEditPage: NextPage = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

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
      <>
        <PageTitle title="ユーザー情報編集" />
        <AppAlert/>

        <ErrorBoundary fallback={errorFallback}>
          <Suspense fallback={loadingIndicator} >
            <UserEditForm/>
          </Suspense>
        </ErrorBoundary>
      </>
    </PageContainer>
  )
}
