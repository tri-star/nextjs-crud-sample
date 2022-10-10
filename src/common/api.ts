import { isServer } from "./ssr";

export function getApiBaseUrl(): string {
  if (isServer()) {
    return process.env.NEXT_API_SERVER_BASE_URL;
  }
  return process.env.NEXT_API_CLIENT_BASE_URL;
}
