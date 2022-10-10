import { handlers } from './handlers'

const mswNode = require('msw/node')

// @ts-expect-error
let server

export const startMockServer = () => {
  // @ts-expect-error
  if (!server) {
    server = mswNode.setupServer(...handlers)
    server.listen()
  }
  return server
}
