import { Button, Grid, InputLabel, Paper, SxProps, TextField, Theme, Typography } from "@mui/material"
import { css, Stack } from "@mui/system"
import { SubmitHandler, useForm } from "react-hook-form"
import { SearchFormData, useSearchFormStore } from "./search-form-store"

type Props = {
  sx?: SxProps<Theme>
}

export const SearchForm = (props: Props) => {
  
  const { search } = useSearchFormStore()
  const { handleSubmit, register } = useForm<SearchFormData>()

  const formLabelStyle = css({
    display: 'inline-block',
    width: '180px',
    textAlign: 'right',
    paddingRight: '10px',
  })

  return (
    <Paper sx={{...props.sx, p: 2}}>
      <Typography>簡易検索</Typography>

      <form onSubmit={handleSubmit(search)}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <InputLabel css={formLabelStyle}>ログインID</InputLabel>
              <TextField size="small" fullWidth={true} {...register('loginId')} />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <InputLabel css={formLabelStyle}>名前</InputLabel>
              <TextField size="small" fullWidth={true} {...register('name')} />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" alignItems="center">
              <InputLabel css={formLabelStyle}>メールアドレス</InputLabel>
              <TextField size="small" fullWidth={true} {...register('email')} />
            </Stack>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" mt={2}>
          <Button variant="contained" type="submit">検索</Button>
        </Grid>
      </form>

    </Paper>
  )
}
