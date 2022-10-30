import { setLocale } from 'yup'

export const initializeYup = () => {
  setLocale({
    mixed: {
      required: '必ず入力してください。'
    }
  })
}
