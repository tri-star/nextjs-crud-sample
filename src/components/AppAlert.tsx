import { useAlert } from "@/common/alert";
import { Alert, Collapse, Icon, IconButton } from "@mui/material";
import { createContext, PropsWithChildren, ReactElement, useContext, useState } from "react";


export const AppAlertContext = createContext({
  open: false,
  alertMessage: '',
  setOpen: (value: boolean) => {},
  setAlertMessage: (value: string) => {},
})

export const AppAlertProvider = ({children}: PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  return (
    <AppAlertContext.Provider value={{
      open,
      alertMessage,
      setOpen,
      setAlertMessage
    }}
    >
      {children}
    </AppAlertContext.Provider>
  )
}

export const AppAlert = (): ReactElement => {

  const appAlert = useContext(AppAlertContext)

  const {
    closeAlert,
  } = useAlert()

  return (
    <Collapse in={appAlert.open}>
    <Alert
      severity="error"
      onClose={() => {
        closeAlert()
      }}
    >
      {appAlert.alertMessage}
    </Alert>
    </Collapse>
  )
}
