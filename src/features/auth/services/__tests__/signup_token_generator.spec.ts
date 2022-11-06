import { setTestNow } from '@/lib/jest'
import { describe, expect, test } from '@jest/globals'
import { SIGNUP_TOKEN_EXPIRATION_HOURS, SIGNUP_TOKEN_EXPIRATION_LENGTH } from '../../constants'
import { generateSignupToken } from '../signup-token-generator'
import dayjs from 'dayjs'

describe('generateSignupToken', () => {
  test('想定される文字数のトークンが生成されること', () => {
    const token = generateSignupToken()
    expect(token.token.length).toBe(SIGNUP_TOKEN_EXPIRATION_LENGTH)
  })

  test('想定される有効期限のトークンが生成されること', () => {
    const fakeNow = new Date('2022-01-01 00:00:00')
    setTestNow(fakeNow)

    const token = generateSignupToken()

    const expectedExpiration = dayjs(fakeNow).add(SIGNUP_TOKEN_EXPIRATION_HOURS, 'hours')
    expect(expectedExpiration.diff(token.expiresAt, 'seconds')).toBe(0)
  })
})
