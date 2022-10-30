import { Drawer, Toolbar, IconButton, Icon, Divider, List, ListItemButton, ListItemIcon, ListItemText, css, useTheme } from '@mui/material'
import Link from 'next/link'
import { menuItems } from './menu-items'
import type { MenuItem } from './menu-items'
import { useRouter } from 'next/router'

export const drawerWidth = '300px'

type AppDrawerProps = {
  open: boolean
  handleToggleDrawer: () => void
}

export const AppDrawer = (props: AppDrawerProps) => {
  const router = useRouter()

  const theme = useTheme()

  const isSelected = (item: MenuItem) => {
    console.log(router.asPath)
    return (router.asPath.match(new RegExp(`^${item.link}`)) != null)
  }

  const drawerStyle = css({
    '& .MuiDrawer-paper': {
      display: 'relative',
      width: drawerWidth,
      whiteSpace: 'nowrap',
      transition: theme.transitions.create(['width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
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
            <Link href={item.link} key={item.icon}>
              <ListItemButton selected={isSelected(item)}>
                <ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </ListItemButton>
            </Link>
          )
        })}
      </List>
    </Drawer>
  )
}
