/* ============
 * Mutations for the subdivision module
 * ============
 *
 * The mutations that are available on the
 * subdivision module.
 */

import { LIST, CREATE, REMOVE, EDIT } from './mutation-types'

export default {
  [LIST] (state, payload) {
    state.list = payload.res.data
  },

  [CREATE] (state, payload) {
    state.list.push(payload.res.data)
  },

  [REMOVE] (state, payload) {
    state.list = state.list.filter(item => item.id !== payload)
  },

  [EDIT] (state, payload) {
    let index = state.list.findIndex(item => item.id === payload.id)
    state.list[index] = Object.assign(state.list[index], payload.data)
  }
}
