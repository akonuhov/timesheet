/* ============
 * Getters for the authorization module
 * ============
 *
 * The getters that are available on the
 * authorization module.
 */

import Transformer from '../../../utilities/transformers/api/workers/list'
import moment from 'moment'
function getDays (date) {
  const count = date ? moment(date, 'YYYY-MM').daysInMonth() : moment(new Date().toISOString().substr(0, 7), 'YYYY-MM').daysInMonth()
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
export default {
  getSelectSubdivisionWorkerGroup: state => (name, date) => {
    if (name) {
      let stateListFilter = Transformer.get(state.list.filter(item => item.subdivision_number === name))
      for (let i in stateListFilter) {
        let schemaTimesheet = {
          plan: [
            {
              date: date,
              days: getDays(date)
            }
          ],
          actual: [
            {
              date: date,
              days: getDays(date)
            }
          ]
        }
        if (stateListFilter[i].timesheet.plan.length > 0 && stateListFilter[i].timesheet.plan.find(month => month.date === date)) {
          for (let j in stateListFilter[i].timesheet.plan) {
            if (stateListFilter[i].timesheet.plan[j].days.length > 0) {
              for (let k = 0; k < stateListFilter[i].timesheet.plan[j].days.length; k++) {
                let index = schemaTimesheet.plan[0].days.findIndex(day => day.number === stateListFilter[i].timesheet.plan[j].days[k].number)
                schemaTimesheet.plan[0].days[index] = Object.assign(schemaTimesheet.plan[0].days[index], stateListFilter[i].timesheet.plan[j].days[k])
              }
            }
            if (stateListFilter[i].timesheet.actual[j].days.length > 0) {
              for (let k = 0; k < stateListFilter[i].timesheet.actual[j].days.length; k++) {
                let index = schemaTimesheet.actual[0].days.findIndex(day => day.number === stateListFilter[i].timesheet.actual[j].days[k].number)
                schemaTimesheet.actual[0].days[index] = Object.assign(schemaTimesheet.actual[0].days[index], stateListFilter[i].timesheet.actual[j].days[k])
              }
            }
            stateListFilter[i].timesheet.plan[j].days = schemaTimesheet.plan[0].days
            stateListFilter[i].timesheet.actual[j].days = schemaTimesheet.actual[0].days
          }
        } else {
          stateListFilter[i].timesheet = schemaTimesheet
        }
      }
      let stateListCopy = Transformer.get(stateListFilter)
      return stateListCopy
    } else {
      return []
    }
  }
}
