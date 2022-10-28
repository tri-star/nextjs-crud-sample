import { AppAlertContext } from "@/components/AppAlert"
import { useContext } from "react"

export type AlertSeverity = "error" | "success"

export const useAlert = () => {

  const {
    setOpen,
    setAlertMessage,
    setSeverity,
  } = useContext(AppAlertContext)

  const showAlert = (message: string, severity: AlertSeverity = "error") => {
    setAlertMessage(message)
    setSeverity(severity)
    setOpen(true)
  }

  const closeAlert = () => {
    setOpen(false)
  }

  return {
    showAlert,
    closeAlert,
  }
}
