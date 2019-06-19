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
      let stateListCopy = Transformer.get(state.list.filter(item => item.subdivision_number === name))
      const schemaTimesheet = {
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
      for (let i in stateListCopy) {
        if (stateListCopy[i].timesheet.plan.length > 0) {
          for (let j in stateListCopy[i].timesheet.plan) {
            if (stateListCopy[i].timesheet.plan[j].days.length > 0) {
              for (let k = 0; k < stateListCopy[i].timesheet.plan[j].days.length; k++) {
                let index = schemaTimesheet.plan[0].days.findIndex(day => day.number === stateListCopy[i].timesheet.plan[j].days[k].number)
                schemaTimesheet.plan[0].days[index] = stateListCopy[i].timesheet.plan[j].days[k]
              }
            }
            if (stateListCopy[i].timesheet.actual[j].days.length > 0) {
              for (let k = 0; k < stateListCopy[i].timesheet.actual[j].days.length; k++) {
                let index = schemaTimesheet.actual[0].days.findIndex(day => day.number === stateListCopy[i].timesheet.actual[j].days[k].number)
                schemaTimesheet.actual[0].days[index] = stateListCopy[i].timesheet.actual[j].days[k]
              }
            }
            stateListCopy[i].timesheet.plan[j].days = schemaTimesheet.plan[0].days
            stateListCopy[i].timesheet.actual[j].days = schemaTimesheet.actual[0].days
          }
        } else {
          stateListCopy[i].timesheet = schemaTimesheet
        }
      }
      return stateListCopy
    } else {
      return []
    }
  }
}
