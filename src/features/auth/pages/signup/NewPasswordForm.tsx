import { TitleLabel } from '@/components/form/TitleLabel'
import { Box, Button, Divider, Icon, Stack, TextField } from '@mui/material'
import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'

export const NewPasswordForm = (): ReactElement => {
  const { register, formState: { errors, isValid } } = useFormContext()
  const labelWidth = '180px'
  const inputWIdth = '350px'

  return (
    <>
      <form autoComplete="off" >
        <Stack direction="row" spacing={2} my={1} justifyContent="start">
          <TitleLabel width={labelWidth}>新しいパスワード</TitleLabel>
          <Divider orientation="vertical" variant="middle" flexItem />
          <TextField
            size="small"
            type="password"
            autoComplete="new-password"
            error={ errors.newPassword != null }
            helperText={`${errors.newPassword?.message?.toString() ?? ' '}`}
            {...register('newPassword')}
            sx={{ width: inputWIdth }}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box>
            <p>パスワードは以下の規則で入力してください</p>
            <ul>
              <li>8文字以上</li>
              <li>英字/数字/記号のいずれかを2種類以上</li>
            </ul>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} my={1}>
          <TitleLabel width={labelWidth}>確認用</TitleLabel>
          <Divider orientation="vertical" variant="middle" flexItem />
          <TextField
            size="small"
            type="password"
            autoComplete="new-password"
            error={ errors.confirmation != null }
            helperText={`${errors.confirmation?.message?.toString() ?? ' '}`}
            {...register('confirmation')}
            sx={{ width: inputWIdth }}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
        </Stack>
        <Stack direction="row" spacing={2} my={4} justifyContent="center">
          <Button
            variant="contained"
            startIcon={<Icon>done-outline</Icon>}
            disabled={!isValid}
          >
            決定
          </Button>
        </Stack>
      </form>
    </>
  )
}
