import { handlers } from './handlers'

const mswNode = require('msw/node')

let server: mswNode.SetupServerApi | undefined

export const startMockServer = () => {
  if (server == null) {
    server = mswNode.setupServer(...handlers)
    server.listen()
  }
  return server
}
