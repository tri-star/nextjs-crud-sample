
import { jest } from '@jest/globals'
import { SpyInstance } from 'jest-mock'

let mockedDate = new Date()
let dateSpy: SpyInstance<(value: string | number | Date) => Date> | undefined

export const setTestNow = (fakeDate: Date) => {
  mockedDate = fakeDate
  if (dateSpy == null) {
    dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate)
  }
}
