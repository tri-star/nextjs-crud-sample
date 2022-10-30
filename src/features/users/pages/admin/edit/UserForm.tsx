import { TitleLabel } from '@/components/form/TitleLabel'
import { Divider, Paper, Stack, TextField, Typography } from '@mui/material'
import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

export const UserForm = (): ReactElement => {
  const {
    register,
    formState: {
      errors
    }
  } = useFormContext()
  const labelWidth = '180px'

  return (
    <Paper sx={{ p: 2, my: 1 }}>
      <Typography>基本情報</Typography>
      <Stack direction="row" spacing={2} my={1}>
        <TitleLabel width={labelWidth}>ログインID</TitleLabel>
        <Divider orientation="vertical" variant="middle" flexItem />
        <TextField
          size="small"
          {...register('loginId')}
          error={(errors.loginId != null)}
          helperText={`${errors.loginId?.message?.toString() ?? ' '}`}
          autoComplete="new-password"
        />
      </Stack>
      <Stack direction="row" spacing={2} my={1}>
        <TitleLabel width={labelWidth}>名前</TitleLabel>
        <Divider orientation="vertical" variant="middle" flexItem />
        <TextField
          size="small"
          {...register('name')}
          error={(errors.name != null)}
          helperText={`${errors.name?.message?.toString() ?? ' '}`}
        />
      </Stack>
      <Stack direction="row" spacing={2} my={1}>
        <TitleLabel width={labelWidth}>メールアドレス</TitleLabel>
        <Divider orientation="vertical" variant="middle" flexItem />
        <TextField
          size="small"
          {...register('email')}
          error={(errors.email != null)}
          helperText={`${errors.email?.message?.toString() ?? ' '}`}
          autoComplete="new-password"
        />
      </Stack>
    </Paper>
  )
}
