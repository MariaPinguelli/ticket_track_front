import { LocalStorage, SessionStorage } from 'quasar'

LocalStorage.set(key, value)
let newValue = LocalStorage.getItem(key)

SessionStorage.set(key, value)
let value = SessionStorage.getItem(key)
