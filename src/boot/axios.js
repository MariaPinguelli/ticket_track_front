import axios from 'axios'
import { LocalStorage, SessionStorage } from 'quasar'

const user = JSON.parse(localStorage.getItem("user"));
const {token} = user
const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
})

export default ({ app }) => {
  app.config.globalProperties.$axios = api
}

export { api }
