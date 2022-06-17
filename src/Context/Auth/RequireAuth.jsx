import React, { useEffect, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import authContext from '././AuthContext.jsx'
const RequireAuth = ({ children }) => {
  const { auth, loading, getUser } = useContext(authContext)
  const location = useLocation()
  useEffect(() => {
    getUser()
    // eslint-disable-next-line
    }, [])
  if (!auth) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  return children
}

export default RequireAuth
