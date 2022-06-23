import axios from 'axios'
export const clientAxios = axios.create({
  baseURL: 'https://proyectopnfibackend.onrender.com'
})
export const tokenAuth = (token) => {
  if (token) {
    clientAxios.defaults.headers.common['x-auth-token'] = token
  } else {
    delete clientAxios.defaults.headers.common['x-auth-token']
  }
}
