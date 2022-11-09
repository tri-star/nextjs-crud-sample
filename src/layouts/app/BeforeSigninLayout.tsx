import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { PropsWithChildren } from 'react'

export const BeforeSigninLayout = (props: PropsWithChildren) => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex'
      }}>
        <CssBaseline/>
        <Box>
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>

  )
}
