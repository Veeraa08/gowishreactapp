import {useEffect} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {useAuth} from './core/Auth'

export function Logout() {
  const {logout} = useAuth()
  useEffect(() => {
    logout()
    document.location.reload()
  }, [logout])

  return (
    // <Routes>
    //   <Navigate to='/auth/login' />
    // </Routes>
    <Navigate to='/home' />
  )
}
