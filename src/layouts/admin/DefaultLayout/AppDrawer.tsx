import { Drawer, Toolbar, IconButton, Icon, Divider, List, ListItemButton, ListItemIcon, ListItemText, css, useTheme } from "@mui/material"
import { menuItems } from "./menu-items"

export const drawerWidth = '300px'

type AppDrawerProps = {
  open: boolean,
  handleToggleDrawer: () => void
}

export const AppDrawer = (props: AppDrawerProps) => {

  const theme = useTheme()

  const drawerStyle = css({
    '& .MuiDrawer-paper': {
      display: 'relative',
      width: drawerWidth,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      ...(!props.open && {
        overflowX: 'hidden',
        width: theme.spacing(7)
      })
    }
  })

  return (
    <Drawer variant="permanent" 
    open={props.open} 
    onClose={props.handleToggleDrawer}
    css={drawerStyle}
    >
      <Toolbar sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1]
      }}>
        <IconButton onClick={props.handleToggleDrawer}>
          <Icon>chevron_left</Icon>
        </IconButton>
      </Toolbar>
      <Divider/>
      <List component="nav">
        {menuItems.map((item) => {
          return (
          <ListItemButton key={item.icon}>
            <ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </ListItemButton>)
        })}
      </List>
    </Drawer>
  )
}
