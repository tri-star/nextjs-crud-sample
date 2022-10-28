import { AppAlertContext } from "@/components/AppAlert"
import { useContext } from "react"

export const useAlert = () => {

  const {
    setOpen,
    setAlertMessage,
  } = useContext(AppAlertContext)

  const showAlert = (message: string) => {
    setAlertMessage(message)
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
