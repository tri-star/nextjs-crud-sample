import { ErrorAlertContext } from "@/components/ErrorAlert"
import { useContext } from "react"

export const useErrorAlert = () => {

  const {
    setOpen,
    setErrorMessage,
  } = useContext(ErrorAlertContext)

  const showErrorAlert = (message: string) => {
    setErrorMessage(message)
    setOpen(true)
  }

  const closeErrorAlert = () => {
    setOpen(false)
  }

  return {
    showErrorAlert,
    closeErrorAlert,
  }
}
