import { css } from "@emotion/react";
import { InputLabel } from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";

type FormLabelProps = {
  width: string
} & PropsWithChildren

export const TitleLabel = ({ width, children }: FormLabelProps): ReactElement => {
  const formLabelStyle = css({
    display: 'inline-block',
    width: width,
    textAlign: 'right',
  })

  return (
    <InputLabel css={formLabelStyle}>{children}</InputLabel>
  )
}
