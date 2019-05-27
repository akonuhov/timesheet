import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import Authorization from './modules/authorization/index.js'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    Authorization
  },
  devtools: true,
  strict: true,
  plugins: debug ? [createLogger()] : []
})
