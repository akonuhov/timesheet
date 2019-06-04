/* ============
 * Actions for the authorization module
 * ============
 *
 * The actions that are available on the
 * authorization module.
 */

import Vue from 'vue'
import { LIST, LIST_TIMESHEET, LIST_TIMESHEET_UPDATE, CREATE, REMOVE, EDIT, UPDATE } from './mutation-types'

export const list = ({ commit }) => {
  return new Promise((resolve, reject) => {
    Vue.$http.get('/api/workers')
      .then(res => {
        commit(LIST, { res })
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const listTimesheet = ({ commit }, date) => {
  return new Promise((resolve, reject) => {
    Vue.$http.get('/api/workers')
      .then(res => {
        commit(LIST_TIMESHEET, { res, date })
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const create = ({ commit }, worker) => {
  return new Promise((resolve, reject) => {
    Vue.$http.post('/api/workers', {
      in: worker.in,
      subdivision_number: worker.subdivision_number,
      full_name: worker.full_name,
      position: worker.position,
      timesheet: worker.timesheet
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

export const remove = ({ commit }, workerId) => {
  return new Promise((resolve, reject) => {
    Vue.$http.delete('/api/workers/' + workerId)
      .then(res => {
        commit(REMOVE, workerId)
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const edit = ({ commit }, worker) => {
  return new Promise((resolve, reject) => {
    Vue.$http.put('/api/workers/' + worker.id, {
      in: worker.data.in,
      subdivision_number: worker.data.subdivision_number,
      full_name: worker.data.full_name,
      position: worker.data.position,
      timesheet: worker.data.timesheet
    })
      .then(res => {
        commit(EDIT, worker)
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const listTimesheetUpdate = ({ commit }, timesheetList) => {
  commit(LIST_TIMESHEET_UPDATE, timesheetList)
}

export const update = ({ commit }, workerList) => {
  console.log(JSON.stringify(workerList))
  return new Promise((resolve, reject) => {
    Vue.$http.post('/api/workers/update', workerList)
      .then(res => {
        commit(UPDATE, res)
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  list,
  listTimesheet,
  listTimesheetUpdate,
  create,
  remove,
  edit,
  update
}
