import { GET_USER_START, LOGIN_SUCCESS, REGISTER_SUCCESS, LOGIN_ERROR, REGISTER_ERROR, LOGOUT, GET_USER_SUCCESS, GET_USER_ERROR } from '../../Types'
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
        ...state, user: action.payload.name, auth: true, loading: false
      }
    case GET_USER_START:
      return { ...state, loading: action.payload }
    case LOGOUT:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      localStorage.clear()
      return {
        alertAuth: action.payload || null, user: null, auth: null, token: null
      }

    default:
      return state
  }
}
