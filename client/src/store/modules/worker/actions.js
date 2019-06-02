/* ============
 * Actions for the authorization module
 * ============
 *
 * The actions that are available on the
 * authorization module.
 */

import Vue from 'vue'
import { LIST, CREATE, REMOVE, EDIT } from './mutation-types'

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

export default {
  list,
  create,
  remove,
  edit
}
