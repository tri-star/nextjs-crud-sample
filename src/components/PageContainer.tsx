import { Box } from '@mui/material'
import { PropsWithChildren, ReactElement } from 'react'

export const PageContainer = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100vh - 100px)'
    }}>
      {children}
    </Box>
  )
}
