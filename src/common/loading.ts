import { useState } from 'react'

export const useLoading = () => {
  const [loading, setLoading] = useState(false)

  const withLoading = async <T>(callback: () => Promise<T>) => {
    setLoading(true)
    try {
      await callback()
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    withLoading
  }
}
