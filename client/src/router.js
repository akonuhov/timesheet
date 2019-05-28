import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/authorization',
      name: 'PageAuthorization',
      component: () => import('./pages/Authorization.vue')
    },
    {
      path: '/',
      name: 'PageHome',
      redirect: '/timesheet',
      meta: {
        authenticated: true
      }
    },
    {
      path: '/timesheet',
      name: 'PageTimesheet',
      component: () => import('./pages/Timesheet.vue'),
      meta: {
        authenticated: true
      }
    },
    {
      path: '/timesheet/add',
      name: 'PageTimesheetAdd',
      component: () => import('./pages/TimesheetAdd.vue'),
      meta: {
        authenticated: true
      }
    },
    {
      path: 'workers',
      name: 'PageWorkers',
      component: () => import('./pages/Workers.vue'),
      meta: {
        authenticated: true
      }
    }
  ]
})
