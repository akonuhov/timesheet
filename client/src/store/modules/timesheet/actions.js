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
    Vue.$http.post('/api/timesheets', {
      name: timesheet.name,
      worker: timesheet.worker,
      planned: timesheet.planned,
      actual: timesheet.actual
    })
      .then(res => {
        commit(CREATE, { res })
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
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
  console.log(timesheet)
  return new Promise((resolve, reject) => {
    Vue.$http.put('/api/timesheets/' + timesheet.id, {
      name: timesheet.data.name,
      worker: timesheet.data.worker,
      planned: timesheet.data.planned,
      actual: timesheet.data.actual
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
