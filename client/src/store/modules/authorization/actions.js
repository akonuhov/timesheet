/* ============
 * Actions for the authorization module
 * ============
 *
 * The actions that are available on the
 * authorization module.
 */

import Vue from 'vue'
import store from '@/store'
import { CHECK, REGISTER, LOGIN, LOGOUT } from './mutation-types'

export const check = ({ commit }) => {
  new Proxy()
    .login(commit)
    .then((response) => {
      commit(CHECK, response)
      store.dispatch('account/find')
      Vue.router.push({
        name: 'home.index'
      })
    })
    .catch(() => {
      console.log('Request failed...')
    })
}

export const register = ({ commit }) => {
  new Proxy()
    .register(commit)
    .then((response) => {
      commit(REGISTER, response)
    })
    .catch(() => {
      console.log('Request failed...')
    })
}

export const login = ({ commit }) => {
  new Proxy()
    .login(commit)
    .then((response) => {
      commit(LOGIN, response)
      store.dispatch('account/find')
      Vue.router.push({
        name: 'home.index'
      })
    })
    .catch(() => {
      console.log('Request failed...')
    })
}

export const logout = ({ commit }) => {
  new Proxy()
    .logout(commit)
    .then((response) => {
      commit(LOGOUT, response)
      store.dispatch('account/find')
      Vue.router.push({
        name: 'login.index'
      })
    })
    .catch(() => {
      console.log('Request failed...')
    })
}

export default {
  check,
  register,
  login,
  logout
}
