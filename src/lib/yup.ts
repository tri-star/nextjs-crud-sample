import { setLocale } from 'yup'

/* eslint-disable no-template-curly-in-string */

export const initializeYup = () => {
  setLocale({
    mixed: {
      required: '必ず入力してください。'
    },
    string: {
      min: '${min}文字以上で入力してください'
    }
  })
}
