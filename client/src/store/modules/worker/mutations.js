/* ============
 * Mutations for the authorization module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { LIST, CREATE, REMOVE, EDIT } from './mutation-types'

export default {
  [LIST] (state, payload) {
    state.list = payload.res.data
  },

  [CREATE] (state, payload) {
    state.list.push(payload.res.data)
  },

  [REMOVE] (state) {
    //
  },

  [EDIT] (state) {
    //
  }
}
