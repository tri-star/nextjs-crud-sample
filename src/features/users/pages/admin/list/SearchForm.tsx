import { Paper, SxProps, Theme, Typography } from "@mui/material"

type Props = {
  sx?: SxProps<Theme>
}

export const SearchForm = (props: Props) => {
  
  return (
    <Paper sx={{...props.sx, p: 2}}>
      <Typography>簡易検索</Typography>
    </Paper>
  )
}
