import { getRandomInt } from '@/common/random'
import dayjs from 'dayjs'
import { SIGNUP_TOKEN_EXPIRATION_HOURS } from '../constants'

type SignupToken = {
  token: string
  expiresAt: Date
}

export const generateSignupToken = (): SignupToken => {
  const length = 60
  const chars = '123467890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const charListLength = chars.length

  const token = [...Array(length)].map((_, key) => {
    const index = getRandomInt(0, charListLength - 1)
    return chars[index]
  }).join('')

  return {
    token,
    expiresAt: dayjs().add(SIGNUP_TOKEN_EXPIRATION_HOURS, 'hours').toDate()
  }
}
