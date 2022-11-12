import { AppBar, Box, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { PropsWithChildren } from 'react'

export const BeforeSigninLayout = (props: PropsWithChildren) => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex'
      }}>
        <CssBaseline/>
        <Box component="main" sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}>
          <AppBar>
            <Toolbar>
              <Typography sx={{
                flexGrow: 1
              }}>CRUD Sample</Typography>
            </Toolbar>
          </AppBar>
          <Toolbar></Toolbar>
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>

  )
}
