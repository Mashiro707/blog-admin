import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon

Vue.use(ElementUI)

Vue.prototype.msgSuccess = function(message) {
  this.$message.success(message)
}

Vue.prototype.msgError = function(message) {
  this.$message.error(message)
}

Vue.prototype.msgInfo = function(message) {
  this.$message.info(message)
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
