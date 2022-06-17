import axios from 'axios'
export const clientAxios = axios.create({
  baseURL: 'http://localhost:4000/'
})
export const tokenAuth = (token) => {
  if (token) {
    clientAxios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete clientAxios.defaults.headers.common['x-auth-token']
  }
}
