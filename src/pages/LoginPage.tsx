import { useEffect, useState } from 'react'

import { RegistrationForm } from '../features/ui'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../shared/hooks'
import { AppRoutes } from '../shared/constants/routes'

const LoginPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [ idInstanceInputValue, setIdInstanceInputValue ] = useState<string>('')
  const [ apiTokenInputValue, setApiTokenInputValue ] = useState<string>('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${AppRoutes.Chats}`, { replace: true })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <RegistrationForm
      idInstanceInputValue={idInstanceInputValue}
      setIdInstanceInputValue={setIdInstanceInputValue}
      apiTokenInputValue={apiTokenInputValue}
      setApiTokenInputValue={setApiTokenInputValue}
    />
  )
}

export default LoginPage
