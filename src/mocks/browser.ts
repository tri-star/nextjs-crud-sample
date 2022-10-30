import { getApiBaseUrl } from '@/common/api'
import { isServer } from '@/common/ssr'
import { setupWorker, SetupWorkerApi } from 'msw'
import { handlers } from './handlers'

let worker: SetupWorkerApi | undefined

export const startClientWorker = (): SetupWorkerApi | undefined => {
  if (isServer()) {
    return
  }
  if (worker == null) {
    worker = setupWorker(...handlers)
    worker.start()
  }
  return worker
}
