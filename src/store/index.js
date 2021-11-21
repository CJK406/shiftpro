
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import authentication from './modules/authentication/index.js'
import candidate from './modules/candidate/index.js'
import employer from './modules/employer/index.js'

export default createStore({
  modules: {
    employer,
    candidate,
    authentication
  },
  // plugins: process.env.NODE_ENV !== 'production'
  //   ? [createLogger()]
  //   : []
  plugins: [createPersistedState()],
})
