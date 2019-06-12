/* ============
 * Actions for the authorization module
 * ============
 *
 * The actions that are available on the
 * authorization module.
 */

import Vue from 'vue'
import { LIST, CREATE, REMOVE, EDIT } from './mutation-types'

export const list = ({ commit }, date) => {
  return new Promise((resolve, reject) => {
    Vue.$http.get('/api/workers')
      .then(res => {
        commit(LIST, { res: res, date: date || null })
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

export const update = ({ commit }, workerList) => {
  function filterWorkerList (payload) {
    for (let i in payload) {
      if (payload[i].timesheet.plan.length > 0) {
        for (let j in payload[i].timesheet.plan) {
          payload[i].timesheet.plan[j].days = payload[i].timesheet.plan[j].days.filter(item => item.status !== null)
          payload[i].timesheet.actual[j].days = payload[i].timesheet.actual[j].days.filter(item => item.status !== null)
        }
      }
    }
    return payload
  }
  let filterWorkersList = filterWorkerList(workerList)
  for (let i = 0; i <= filterWorkersList.length; i++) {
    Vue.$http.put('/api/workers/' + filterWorkersList[i].id, {
      in: filterWorkersList[i].in,
      subdivision_number: filterWorkersList[i].subdivision_number,
      full_name: filterWorkersList[i].full_name,
      position: filterWorkersList[i].position,
      timesheet: filterWorkersList[i].timesheet
    })
      .then(res => {
        commit(EDIT, { id: res.data.id, data: res.data })
      })
      .catch(error => {
        return error
      })
  }
}

export default {
  list,
  create,
  remove,
  edit,
  update
}
