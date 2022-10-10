import { AppBar, Box, Container, createTheme, CssBaseline, Divider, Drawer, Icon, IconButton, List, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { AppDrawer, drawerWidth } from "./AppDrawer";

export const DefaultLayout = (props: PropsWithChildren) => {

  const [open, setOpen] = useState(true)
  const theme = createTheme()
  const handleToggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex'
      }}>
        <CssBaseline/>
        <AppBar sx={{
          zIndex: theme.zIndex.drawer+1,
          transition: theme.transitions.create(['width', 'margin-left'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
              ...(open && {
            marginLeft:`200px`,
            width: `calc(100% - ${drawerWidth})`
          }) 
        }}>
          <Toolbar sx={{ pr: '24px' }}>

            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={handleToggleDrawer}
              sx={{
                marginRight: '36px',
                color: "inherit",
                ...(open && {display: 'none'})
              }}
            >
              <Icon>menu</Icon>
            </IconButton>
            <Typography sx={{
              flexGrow: 1
            }}>CRUD Sample</Typography>

          </Toolbar>
        </AppBar>
        <AppDrawer open={open} handleToggleDrawer={handleToggleDrawer}/>
        <Box component="main" sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}>
          <Toolbar/>
          <Container  maxWidth="lg" sx={{ mt: 4 }}>
          {props.children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}