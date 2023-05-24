import { lazy } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

import { AppRoutes } from '../shared/constants/routes'

const LoginPage = lazy(() => import('./LoginPage'))
const ChatsPage = lazy(() => import('./ChatsPage'))

export const AppRouting = () => {
  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route path={AppRoutes.Chats} element={<ChatsPage />} />

        {/* Redirects */}
        <Route path='*' element={<Navigate to={AppRoutes.Chats} replace />} />
      </Routes>
    </Router>
  )
}
export default function aaa () { return <div/> }
