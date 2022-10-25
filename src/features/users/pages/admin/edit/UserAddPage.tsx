import { ErrorAlert } from "@/components/ErrorAlert";
import { TitleLabel } from "@/components/form/TitleLabel";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { Button, Divider, Icon, Paper, Stack, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useUserFormStore } from "./user-form-store";


export const UserAddPage: NextPage = () => {

  const router = useRouter()
  const { register, errors, isValid, handleSubmit, onSubmit } = useUserFormStore()
  
  const handleBack = () => {
    router.back()
  }

  const labelWidth = '180px'

  return (
    <PageContainer>
      <PageTitle title="ユーザー登録" />
      <ErrorAlert/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper sx={{ p: 2, my: 1 }}>
          <Typography>基本情報</Typography>
          <Stack direction="row" spacing={2} my={1}>
            <TitleLabel width={labelWidth}>ログインID</TitleLabel>
            <Divider orientation="vertical" variant="middle" flexItem />
            <TextField 
              size="small" 
              {...register('loginId')} 
              error={errors.loginId ? true : false} 
              helperText={`${errors.loginId?.message ?? ' '}`} 
              autoComplete="new-password"
            />
          </Stack>
          <Stack direction="row" spacing={2} my={1}>
            <TitleLabel width={labelWidth}>名前</TitleLabel>
            <Divider orientation="vertical" variant="middle" flexItem />
            <TextField
              size="small"
              {...register('name')} 
              error={errors.name ? true : false}
              helperText={`${errors.name?.message ?? ' '}`}
             />
          </Stack>
          <Stack direction="row" spacing={2} my={1}>
            <TitleLabel width={labelWidth}>メールアドレス</TitleLabel>
            <Divider orientation="vertical" variant="middle" flexItem />
            <TextField
              size="small"
              {...register('email')} 
              error={errors.email ? true : false}
              helperText={`${errors.email?.message ?? ' '}`}
              autoComplete="new-password"
            />
          </Stack>
        </Paper>

        <Stack direction="row" spacing={2} justifyContent="center" my={2}>
          <Button variant="contained" startIcon={<Icon>save</Icon>} type="submit" disabled={!isValid}>保存</Button>
          <Button variant="contained" startIcon={<Icon>chevron_left</Icon>} onClick={handleBack}>戻る</Button>
        </Stack>
      </form>

    </PageContainer>
  )
}
