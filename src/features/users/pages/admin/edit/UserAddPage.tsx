import { AppAlert } from '@/components/AppAlert'
import { PageContainer } from '@/components/PageContainer'
import PageTitle from '@/components/PageTitle'
import { Button, Icon, Stack } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormProvider } from 'react-hook-form'
import { useUserAddFormStore } from './user-form-store'
import { UserForm } from './UserForm'

export const UserAddPage: NextPage = () => {
  const router = useRouter()
  const { form, loading, onSubmit, canSubmit } = useUserAddFormStore()

  const handleBack = () => {
    router.back()
  }

  return (
    <PageContainer>
      <PageTitle title="ユーザー登録" />
      <AppAlert/>

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

    </PageContainer>
  )
}
