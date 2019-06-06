/* ============
 * Mutations for the authorization module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { LIST, CREATE, REMOVE, EDIT, UPDATE } from './mutation-types'
import moment from 'moment'

export default {
  [LIST] (state, payload) {
    function getDays () {
      const count = payload.date ? moment(payload.date, 'YYYY-MM').daysInMonth() : moment(new Date().toISOString().substr(0, 7), 'YYYY-MM').daysInMonth()
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
      plan: [
        {
          date: new Date().toISOString().substr(0, 7),
          days: getDays()
        }
      ],
      actual: [
        {
          date: new Date().toISOString().substr(0, 7),
          days: getDays()
        }
      ]
    }
    for (let index in payload.res.data) {
      if (typeof payload.res.data[index].timesheet !== 'object') {
        payload.res.data[index].timesheet = schemaTimesheet
      } else {
        payload.res.data[index].timesheet = Object.assign(schemaTimesheet, payload.res.data[index].timesheet)
      }
    }
    state.list = payload.res.data
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
    state.list = { ...state.list, ...payload.data }
  }
}
