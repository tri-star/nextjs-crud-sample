import { Box, Button, css } from '@mui/material'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const style = css`
  background-color: #000;
  `

  return (
    <Box>
      <Button variant="contained" css={style}>Hello World</Button>
    </Box>
  )
}

export default Home
