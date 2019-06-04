/* ============
 * Mutations for the authorization module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { LIST, LIST_TIMESHEET, LIST_TIMESHEET_UPDATE, CREATE, REMOVE, EDIT, UPDATE } from './mutation-types'

export default {
  [LIST] (state, payload) {
    state.list = payload.res.data
  },

  [LIST_TIMESHEET] (state, payload) {
    function getDays (count) {
      let arrDays = []
      for (let i = 1; i <= count; i++) {
        arrDays.push({
          name: null,
          number: i,
          status: null,
          time: null
        })
      }
      return arrDays
    }
    const schemaTimesheet = {
      plan: {
        date: payload.date,
        days: getDays(30)
      },
      actual: {
        date: payload.date,
        days: getDays(30)
      }
    }
    for (let index in payload.res.data) {
      if (payload.res.data[index].timesheet !== 'object') {
        payload.res.data[index].timesheet = schemaTimesheet
      }
    }
    state.list_timesheet = payload.res.data
  },

  [LIST_TIMESHEET_UPDATE] (state, payload) {
    state.list_timesheet = Object.assign(state.list, payload)
  },

  [CREATE] (state, payload) {
    state.list.push(payload.res.data)
  },

  [REMOVE] (state, id) {
    state.list = state.list.filter(item => item.id !== id)
  },

  [EDIT] (state, payload) {
    let index = state.list.findIndex(item => item.id === payload.id)
    state.list[index] = Object.assign(state.list[index], payload.data)
  },

  [UPDATE] (state, payload) {
    console.log(payload)
  }
}
