import { useErrorAlert } from "@/common/error-alert";
import { Alert, Collapse, Icon, IconButton } from "@mui/material";
import { createContext, PropsWithChildren, ReactElement, useContext, useState } from "react";


export const ErrorAlertContext = createContext({
  open: false,
  errorMessage: '',
  setOpen: (value: boolean) => {},
  setErrorMessage: (value: string) => {},
})

export const ErrorAlertProvider = ({children}: PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <ErrorAlertContext.Provider value={{
      open,
      errorMessage,
      setOpen,
      setErrorMessage
    }}
    >
      {children}
    </ErrorAlertContext.Provider>
  )
}

export const ErrorAlert = (): ReactElement => {

  const errorAlert = useContext(ErrorAlertContext)

  const {
    closeErrorAlert,
  } = useErrorAlert()

  return (
    <Collapse in={errorAlert.open}>
    <Alert
      severity="error"
      onClose={() => {
        closeErrorAlert()
      }}
    >
      {errorAlert.errorMessage}
    </Alert>
    </Collapse>
  )
}
