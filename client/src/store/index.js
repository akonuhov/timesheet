import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import Authorization from './modules/authorization/index.js'
import Subdivision from './modules/subdivision/index.js'
import Worker from './modules/worker/index.js'
import Timesheet from './modules/timesheet/index.js'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    Authorization,
    Subdivision,
    Worker,
    Timesheet
  },
  devtools: true,
  strict: true,
  plugins: debug ? [createLogger()] : []
})
