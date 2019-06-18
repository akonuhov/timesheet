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
    for (let i in payload.res.data) {
      if (payload.res.data[i].timesheet.plan.length > 0) {
        for (let j in payload.res.data[i].timesheet.plan) {
          if (payload.res.data[i].timesheet.plan[j].days.length > 0) {
            for (let k = 0; k < payload.res.data[i].timesheet.plan[j].days.length; k++) {
              schemaTimesheet.plan[0].days = schemaTimesheet.plan[0].days.filter(item => item.number !== payload.res.data[i].timesheet.plan[j].days[k].number)
            }
          }
          if (payload.res.data[i].timesheet.actual[j].days.length > 0) {
            for (let k = 0; k < payload.res.data[i].timesheet.actual[j].days.length; k++) {
              schemaTimesheet.actual[0].days = schemaTimesheet.actual[0].days.filter(item => item.number !== payload.res.data[i].timesheet.actual[j].days[k].number)
            }
          }
          payload.res.data[i].timesheet.plan[j].days = payload.res.data[i].timesheet.plan[j].days.concat(schemaTimesheet.plan[0].days)
          payload.res.data[i].timesheet.actual[j].days = payload.res.data[i].timesheet.actual[j].days.concat(schemaTimesheet.actual[0].days)
        }
      } else {
        payload.res.data[i].timesheet = schemaTimesheet
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
    state.list[index] = payload.data
  },

  [UPDATE] (state, payload) {
    state.list = { ...state.list, ...payload.data }
  }
}
