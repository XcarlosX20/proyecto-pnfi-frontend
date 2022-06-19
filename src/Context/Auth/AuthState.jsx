import { useReducer } from 'react'
import { clientAxios, tokenAuth } from '../../Axios'
import { GET_USER_SUCCESS, GET_USER_START, GET_USER_ERROR, LOGIN_SUCCESS, REGISTER_SUCCESS, LOGIN_ERROR, REGISTER_ERROR, LOGOUT } from '../../Types'
import authContext from './AuthContext'
import { AuthReducer } from './AuthReducer'
import Swal from 'sweetalert2/dist/sweetalert2.all.js'
const AuthState = ({ children }) => {
  const initialState = {
    auth: null,
    token: localStorage.getItem('token'),
    user: { _id: '', name: '', email: '' },
    userType: localStorage.getItem('user-type'),
    alertAuth: null,
    loading: false
  }
  const [state, dispatch] = useReducer(AuthReducer, initialState)
  // fx
  const registerUser = async (user) => {
    const { name, email, password, userType } = user
    try {
      const response = await clientAxios.post(`/api/${userType}/`, { name, email, password })
      const token = response.data.token
      dispatch({ type: REGISTER_SUCCESS, payload: { token, userType } })
      getUser(token, userType)
    } catch (error) {
      const alert = {
        msg: error.response.data.msg || 'Something went wrong',
        category: 'alert-error'
      }
      dispatch({ type: REGISTER_ERROR, payload: alert })
      Swal.fire({ icon: 'error', title: alert.msg })
    }
  }
  const getUser = async (token, userType) => {
    if (token) {
      tokenAuth(token)
    }
    const userTypeLS = localStorage.getItem('user-type')
    try {
      const response = await clientAxios.get(`/api/${userType || userTypeLS}`)
      if (response.status === 200) {
        dispatch({
          type: GET_USER_SUCCESS, payload: response.data
        })
      }
    } catch (error) {
      console.log(error)
      const alert = {
        msg: error.response.msg || 'there was an error',
        category: 'alert-error'
      }
      dispatch({ type: LOGIN_ERROR, payload: alert })
      Swal.fire({ icon: 'error', title: alert.msg })
    }
  }
  const login = async (email, password, userType) => {
    try {
      const response = await clientAxios.post(`/api/${userType}/auth`, { email, password })
      const token = response.data.token
      const data = {
        token,
        userType
      }
      dispatch({ type: LOGIN_SUCCESS, payload: data })
      if (token) {
        getUser(token, userType)
      }
    } catch (error) {
      const alert = {
        msg: error.response.data.msg || 'there was an error',
        category: 'alert-error'
      }
      dispatch({ type: LOGIN_ERROR, payload: alert })
      Swal.fire({ icon: 'error', title: alert.msg })
    }
  }
  const logout = () => {
    dispatch({
      type: LOGOUT
    })
  }
  return (
    <authContext.Provider
      value={{
        auth: state.auth,
        token: state.token,
        user: state.user,
        alertAuth: state.alertAuth,
        loading: state.loading,
        userType: state.userType,
        registerUser,
        login,
        getUser,
        logout
      }}
    >
      {children}
    </authContext.Provider>
  )
}
export default AuthState
