
import { appConfig } from '@/app-config'
import Axios from 'axios'

export const axios = Axios.create({
  baseURL: appConfig.apiBase
})

axios.defaults.baseURL = appConfig.apiBase
