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
    Vue.$http.get('/api/Workers')
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
    Vue.$http.post('/api/Workers', {
      in: worker.in,
      subdivision: worker.subdivision,
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
    Vue.$http.delete('/api/Workers/' + workerId)
      .then(res => {
        commit(REMOVE, { res })
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const edit = ({ commit }, workerId, worker) => {
  return new Promise((resolve, reject) => {
    Vue.$http.put('/api/Workers/' + workerId, { worker })
      .then(res => {
        commit(EDIT, { res })
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
