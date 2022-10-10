import { isServer } from "./ssr";

export function getApiBaseUrl(): string {
  let baseUrl = ''
  if (isServer()) {
    baseUrl = process.env.NEXT_API_SERVER_BASE_URL;
  } else {
    baseUrl = process.env.NEXT_API_CLIENT_BASE_URL;
  }

  if (process.env.NEXT_API_USE_MOCK) {
    return baseUrl + '/mock'
  }
  return baseUrl
}
