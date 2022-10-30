import { useState } from 'react'

export type SearchFormData = {
  loginId: string | undefined
  name: string | undefined
  email: string | undefined
}

export const useSearchFormStore = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const state = {

  }

  const search = async (data: SearchFormData) => {
    console.info(data)
  }

  return {
    state,
    currentPage,
    setCurrentPage,
    search
  }
}
