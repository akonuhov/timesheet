/* ============
 * Actions for the subdivision module
 * ============
 *
 * The actions that are available on the
 * subdivision module.
 */

import Vue from 'vue'
import { LIST, CREATE, REMOVE, EDIT } from './mutation-types'

export const list = ({ commit }) => {
  return new Promise((resolve, reject) => {
    Vue.$http.get('/api/Subdivisions')
      .then(res => {
        commit(LIST, { res })
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const create = ({ commit }, subdivision) => {
  return new Promise((resolve, reject) => {
    Vue.$http.post('/api/Subdivisions', {
      name: subdivision.name,
      code: subdivision.code,
      address: subdivision.address
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

export const remove = ({ commit }, subdivisionId) => {
  return new Promise((resolve, reject) => {
    Vue.$http.delete('/api/Subdivisions/' + subdivisionId)
      .then(res => {
        commit(REMOVE, subdivisionId)
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const edit = ({ commit }, subdivision) => {
  return new Promise((resolve, reject) => {
    Vue.$http.put('/api/Subdivisions/' + subdivision.id, {
      name: subdivision.data.name,
      code: subdivision.data.code,
      address: subdivision.data.address
    })
      .then(res => {
        commit(EDIT, subdivision)
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
