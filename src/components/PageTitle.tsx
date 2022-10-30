import { Typography } from '@mui/material'

type Props = {
  title: string
}

const PageTitle = ({ title }: Props) => {
  return (
    <Typography variant="h3" component="h1">{title}</Typography>
  )
}

export default PageTitle
