type useAuthType = {
  idInstance: string | null
  apiTokenInstance: string | null
  isAuthenticated: boolean
}

export const useAuth = (): useAuthType => {
  const idInstance = localStorage.getItem('@IdInstance')
  const apiTokenInstance = localStorage.getItem('@APIToken')
  const isAuthenticated = !!idInstance && !!apiTokenInstance

  return { idInstance, apiTokenInstance, isAuthenticated }
}
