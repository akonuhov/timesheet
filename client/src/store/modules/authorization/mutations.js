/* ============
 * Mutations for the authorization module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { CHECK, REGISTER, AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, LOGOUT } from './mutation-types'

export default {
  [CHECK] (state) {
    //
  },

  [REGISTER] () {
    //
  },

  [AUTH_REQUEST] (state) {
    state.status = 'loading'
  },

  [AUTH_SUCCESS] (state, data) {
    state.status = 'success'
    state.token = data.token
    state.userId = data.userId
  },

  [AUTH_ERROR] (state) {
    state.status = 'error'
  },

  [LOGOUT] (state) {
    state.status = null
    state.token = null
  }
}
