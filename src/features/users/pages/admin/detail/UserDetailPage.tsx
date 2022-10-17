import { TitleLabel } from "@/components/form/TitleLabel";
import { ValueLabel } from "@/components/form/ValueLabel";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { Button, Icon, Paper, Stack } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";

export const UserDetailPage: NextPage = () => {

  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const labelWidth = '180px'

  return (
    <PageContainer>
      <PageTitle title="ユーザー詳細"></PageTitle>
      <Paper sx={{ p: 2, my: 2 }}>
        <Stack spacing={2} direction="row">
          <TitleLabel width={labelWidth}>ID</TitleLabel>
          <ValueLabel>1</ValueLabel>
        </Stack>
        <Stack spacing={2} direction="row">
          <TitleLabel width={labelWidth}>ログインID</TitleLabel>
          <ValueLabel>TEST</ValueLabel>
        </Stack>
        <Stack spacing={2} direction="row">
          <TitleLabel width={labelWidth}>名前</TitleLabel>
          <ValueLabel>TEST</ValueLabel>
        </Stack>
        <Stack spacing={2} direction="row">
          <TitleLabel width={labelWidth}>メールアドレス</TitleLabel>
          <ValueLabel>test@example.com</ValueLabel>
        </Stack>
      </Paper>
      <Stack direction="row" spacing={2} justifyContent="center" my={2}>
        <Button variant="contained" startIcon={<Icon>edit</Icon>}>編集</Button>
        <Button variant="contained" startIcon={<Icon>chevron_left</Icon>} onClick={handleBack}>戻る</Button>
      </Stack>
    </PageContainer>
  )
}
