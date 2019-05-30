import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/axios'
Vue.config.productionTip = false
store.dispatch('Subdivision/list')
store.dispatch('Worker/list')
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authenticated)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/authorization',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
