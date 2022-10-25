import { CenterBox } from "@/components/CenterBox";
import { TitleLabel } from "@/components/form/TitleLabel";
import { ValueLabel } from "@/components/form/ValueLabel";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { useFetchUserDetail } from "@/features/users/api/fetch-user-detail";
import { Button, CircularProgress, Icon, Paper, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const UserDetailPage: NextPage = () => {

  const router = useRouter()
  const { data, error } = useFetchUserDetail(`${router.query?.id ?? ''}`)

  const handleBack = () => {
    router.back()
  }

  const labelWidth = '180px'

  if(error) {
    return (
      <PageContainer>
        <Stack spacing={2} my={2}>
          <CenterBox>
            <p>データのロードに失敗しました。</p>
            <p>お手数ですが、時間を開けて再度お試しください</p>
          </CenterBox>
          <CenterBox>
            <Button variant="contained" startIcon={<Icon>chevron_left</Icon>} onClick={handleBack}>戻る</Button>
          </CenterBox>
        </Stack>
      </PageContainer>
    )
  }

  if(!data) {
    return (
      <PageContainer><CenterBox><CircularProgress/></CenterBox></PageContainer>
    )
  }

  return (
    <PageContainer>
      <PageTitle title="ユーザー詳細"></PageTitle>
      <Paper sx={{ p: 2, my: 2 }}>
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
      </Paper>
      <Stack direction="row" spacing={2} justifyContent="center" my={2}>
        <Button variant="contained" startIcon={<Icon>edit</Icon>}>編集</Button>
        <Button variant="contained" startIcon={<Icon>chevron_left</Icon>} onClick={handleBack}>戻る</Button>
      </Stack>
    </PageContainer>
  )
}
