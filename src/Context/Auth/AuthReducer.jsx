import { GET_USER_START, LOGIN_SUCCESS, REGISTER_SUCCESS, LOGIN_ERROR, REGISTER_ERROR, LOGOUT, GET_USER_SUCCESS, GET_USER_ERROR, LOGIN_START } from '../../Types'
export const AuthReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user-type', action.payload.userType)
      return {
        ...state,
        auth: true,
        alertAuth: null,
        token: action.payload.token,
        userType: action.payload.userType
      }
    case GET_USER_SUCCESS:
      return {
        ...state, user: action.payload, auth: true, loading: false
      }
    case LOGIN_START:
    case GET_USER_START:
      return { ...state, loading: true }
    case LOGOUT:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.clear()
      return {...state,
        alertAuth: action.payload || null,
        auth: null,
        token: null,
        user: { _id: '', name: '', email: '' },
        loading: false
      }
    default:
      return state
  }
}
