import { Box } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

export const ValueLabel = ({children}: PropsWithChildren): ReactElement => {
  return (
    <Box>{children}</Box>
  )
}
