
export const delay = async (msec: number) => {
  return await new Promise((resolve) => {
    setTimeout(resolve, msec)
  })
}
