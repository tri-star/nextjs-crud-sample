
export type SearchFormData = {
  loginId: string | undefined,
  name: string | undefined,
  email: string | undefined
}

export const useSearchFormStore = () => {
  const state = {

  }


  const search = async (data: SearchFormData) => {
    console.info(data)
  }

  return {
    state,
    search
  }
}
