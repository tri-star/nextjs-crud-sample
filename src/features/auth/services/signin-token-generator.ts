import { getRandomInt } from '@/common/random'
import dayjs from 'dayjs'
import { SIGNIN_TOKEN_EXPIRATION_HOURS, SIGNIN_TOKEN_LENGTH } from '../constants'

type SigninToken = {
  token: string
  expiresAt: Date
}

export const generateSigninToken = (): SigninToken => {
  const length = SIGNIN_TOKEN_LENGTH
  const chars = '123467890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const charListLength = chars.length

  const token = [...Array(length)].map((_, key) => {
    const index = getRandomInt(0, charListLength - 1)
    return chars[index]
  }).join('')

  return {
    token,
    expiresAt: dayjs().add(SIGNIN_TOKEN_EXPIRATION_HOURS, 'hours').toDate()
  }
}
