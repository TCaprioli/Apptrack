// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isError = (e: any): e is Error => {
  return (
    e &&
    e.stack &&
    e.message &&
    typeof e.stack === "string" &&
    typeof e.message === "string"
  )
}

export const getToken = (): string => {
  const token = localStorage.getItem("authToken")
  if (token === null) {
    throw new Error("Could not find token")
  }
  return token
}
