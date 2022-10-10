import { Box } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

export const CenterBox = ({children}: PropsWithChildren): ReactElement => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    {children}
  </Box>
)
