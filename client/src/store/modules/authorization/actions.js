/* ============
 * Actions for the authorization module
 * ============
 *
 * The actions that are available on the
 * authorization module.
 */

import Vue from 'vue'
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, REGISTER, LOGOUT } from './mutation-types'

export const login = ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    commit(AUTH_REQUEST)
    Vue.$http.post('/api/Users/login', { username: user.username, password: user.password })
      .then(res => {
        const token = res.data.id
        const userId = res.data.userId
        localStorage.setItem('token', token)
        Vue.$http.defaults.headers.common['Authorization'] = token
        commit(AUTH_SUCCESS, { token, userId })
        resolve(res)
      })
      .catch(error => {
        commit(AUTH_ERROR)
        localStorage.removeItem('token')
        reject(error)
      })
  })
}

export const register = ({ commit }, user) => {
  return new Promise((resolve, reject) => {
    commit(REGISTER)
    Vue.$http.post('/api/Users', { realm: user.realm, username: user.username, email: user.email, password: user.password, emailVerified: true })
      .then(resp => {
        const token = resp.data.token
        const user = resp.data.user
        localStorage.setItem('token', token)
        Vue.$http.defaults.headers.common['Authorization'] = token
        commit('auth_success', token, user)
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error', err)
        localStorage.removeItem('token')
        reject(err)
      })
  })
}

export const logout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    commit(LOGOUT)
    localStorage.removeItem('token')
    delete Vue.$http.defaults.headers.common['Authorization']
    resolve()
  })
}

export default {
  login,
  register,
  logout
}
