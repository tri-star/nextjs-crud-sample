import { handlers } from './handlers'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mswNode = require('msw/node')

// @ts-expect-error mswNodeがnamespace not foundでエラーになるため
let server: mswNode.SetupServerApi | undefined

export const startMockServer = () => {
  if (server == null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    server = mswNode.setupServer(...handlers)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    server.listen()
  }
  return server
}
