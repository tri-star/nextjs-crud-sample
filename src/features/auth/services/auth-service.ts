
const SIGNIN_TOKEN_KEY = 'signin_token'

export interface AuthServiceInterface {
  save: (signinToken: string) => void
  load: () => string | null
}

export class AuthService implements AuthServiceInterface {
  save (signinToken: string) {
    localStorage.setItem(SIGNIN_TOKEN_KEY, signinToken)
  }

  load (): string | null {
    const signinToken = localStorage.getItem(SIGNIN_TOKEN_KEY)
    return signinToken
  }
}
