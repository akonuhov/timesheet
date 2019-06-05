/* ============
 * Actions for the timesheet module
 * ============
 *
 * The actions that are available on the
 * timesheet module.
 */

import Vue from 'vue'
import { LIST, CREATE, REMOVE, EDIT } from './mutation-types'

export const list = ({ commit }) => {
  return new Promise((resolve, reject) => {
    Vue.$http.get('/api/timesheets')
      .then(res => {
        commit(LIST, { res })
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const create = ({ commit }, timesheet) => {
  return new Promise((resolve, reject) => {
    if (timesheet.subdivision && timesheet.date) {
      Vue.$http.post('/api/timesheets', {
        subdivision: timesheet.subdivision,
        date: timesheet.date
      })
        .then(res => {
          commit(CREATE, { res })
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    }
  })
}

export const remove = ({ commit }, timesheetId) => {
  return new Promise((resolve, reject) => {
    Vue.$http.delete('/api/timesheets/' + timesheetId)
      .then(res => {
        commit(REMOVE, timesheetId)
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const edit = ({ commit }, timesheet) => {
  return new Promise((resolve, reject) => {
    Vue.$http.put('/api/timesheets/' + timesheet.id, {
      subdivision: timesheet.subdivision,
      date: timesheet.date
    })
      .then(res => {
        commit(EDIT, timesheet)
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  list,
  create,
  remove,
  edit
}
