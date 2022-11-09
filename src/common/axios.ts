import { AxiosError } from 'axios'

export const isAxiosError = (e: any): e is AxiosError => {
  return Boolean(e.isAxiosError)
}
