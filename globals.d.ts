
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_API_USE_MOCK: boolean,
    readonly NEXT_API_SERVER_BASE_URL: string,
    readonly NEXT_API_CLIENT_BASE_URL: string
  }
}
