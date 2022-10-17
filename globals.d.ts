
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_USE_MOCK: boolean,
    readonly NEXT_PUBLIC_API_SERVER_BASE_URL: string,
    readonly NEXT_PUBLIC_API_CLIENT_BASE_URL: string
  }
}
