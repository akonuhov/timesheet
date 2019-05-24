import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'PageHome',
      redirect: '/timesheet'
    },
    {
      path: '/timesheet',
      name: 'PageTimesheet',
      component: () => import('./pages/Timesheet.vue')
    },
    {
      path: '/timesheet/add',
      name: 'PageTimesheetAdd',
      component: () => import('./pages/TimesheetAdd.vue')
    },
    {
      path: '/authorization',
      name: 'PageAuthorization',
      component: () => import('./pages/Authorization.vue')
    }
  ]
})
