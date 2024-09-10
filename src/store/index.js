import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// Store Vuex
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state: {
      currentUser: null,
    },
    mutations: {
      SET_CURRENT_USER(state, payload) {
        state.currentUser = payload;
      },
      LOGOFF(state) {
        localStorage.removeItem('token');
        state.currentUser = null;
      },
    },
    getters: {
      currentUser(state) {
        return state.currentUser;
      },
    },
    plugins: [createPersistedState()],
    strict: process.env.DEBUGGING,
  });

  return Store;
});
