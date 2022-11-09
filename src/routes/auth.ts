export const verifySignupTokenUrl = (token: string) => {
  return `/auth/signup/verify/${token}`
}
