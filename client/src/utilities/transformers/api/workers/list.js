export default class getWorkerList {
  static get (workers) {
    return workers.map(worker => ({
      full_name: worker.full_name,
      id: worker.id,
      in: worker.in,
      position: worker.position,
      subdivision_number: worker.subdivision_number,
      timesheet: typeof worker.timesheet !== 'object' ? {
        actual: worker.timesheet.actual.map(timesheet => ({
          date: timesheet.date,
          days: timesheet.days.map(day => ({
            name: day.name,
            number: day.number,
            status: day.status,
            time: day.time
          }))
        })),
        plan: worker.timesheet.plan.map(timesheet => ({
          date: timesheet.date,
          days: timesheet.days.map(day => ({
            name: day.name,
            number: day.number,
            status: day.status,
            time: day.time
          }))
        }))
      } : worker.timesheet
    }))
  }
  static post (workers) {
    return workers.map(worker => ({
      full_name: worker.full_name,
      id: worker.id,
      in: worker.in,
      position: worker.position,
      subdivision_number: worker.subdivision_number,
      timesheet: {
        actual: worker.timesheet.actual.map(timesheet => ({
          date: timesheet.date,
          days: timesheet.days.map(day => ({
            name: day.name,
            number: day.number,
            status: day.status,
            time: day.time
          }))
        })),
        plan: worker.timesheet.plan.map(timesheet => ({
          date: timesheet.date,
          days: timesheet.days.map(day => ({
            name: day.name,
            number: day.number,
            status: day.status,
            time: day.time
          }))
        }))
      }
    }))
  }
}
