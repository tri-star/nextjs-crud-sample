import { AlertSeverity, useAlert } from "@/common/alert";
import { Alert, AlertColor, Collapse, Icon, IconButton } from "@mui/material";
import { createContext, PropsWithChildren, ReactElement, useContext, useState } from "react";


export const AppAlertContext = createContext<{
  open: boolean,
  alertMessage: string,
  severity: AlertSeverity,
  setOpen: (value: boolean) => void,
  setAlertMessage: (value: string) => void,
  setSeverity: (value: AlertSeverity) => void,
}>({
  open: false,
  alertMessage: '',
  severity: "error",
  setOpen: (value: boolean) => {},
  setAlertMessage: (value: string) => {},
  setSeverity: (value: AlertSeverity) => {},
})

export const AppAlertProvider = ({children}: PropsWithChildren) => {
  const [open, setOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [severity, setSeverity] = useState<AlertSeverity>('error')

  return (
    <AppAlertContext.Provider value={{
      open,
      alertMessage,
      severity,
      setOpen,
      setAlertMessage,
      setSeverity,
    }}
    >
      {children}
    </AppAlertContext.Provider>
  )
}

export const AppAlert = (): ReactElement => {

  const appAlert = useContext(AppAlertContext)

  const alertColor = (severity: AlertSeverity): AlertColor => {
    switch(severity) {
      case "success": return "success"
      case "error": return "error"
      default:
        throw new Error(`無効なseverityです: ${severity}`)
    }
  }

  const {
    closeAlert,
  } = useAlert()

  return (
    <Collapse in={appAlert.open}>
    <Alert
      severity={alertColor(appAlert.severity)}
      onClose={() => {
        closeAlert()
      }}
    >
      {appAlert.alertMessage}
    </Alert>
    </Collapse>
  )
}
