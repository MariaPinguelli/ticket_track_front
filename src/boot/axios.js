import axios from 'axios'
import { LocalStorage, SessionStorage } from 'quasar'

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${LocalStorage.getItem("token")}`,
  },
})

export default ({ app }) => {
  app.config.globalProperties.$axios = api
}

export { api }