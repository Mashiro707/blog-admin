import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import * as custom from '@/utils/filters'
import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs
import hljs from 'highlight.js'

VMdEditor.use(githubTheme, {
  Hljs: hljs
})

Vue.use(VMdEditor)

import '@/icons' // icon

Vue.use(ElementUI)

Vue.prototype.msgInfo = function(message) {
  this.$notify.info({
    title: '消息',
    message: message,
    showClose: false,
    duration: 3000
  })
}

Vue.prototype.msgSuccess = function(message) {
  this.$notify.success({
    title: '成功',
    message: message,
    showClose: false,
    duration: 3000
  })
}

Vue.prototype.msgWarning = function(message) {
  this.$notify.warning({
    title: '警告',
    message: message,
    showClose: false,
    duration: 3000
  })
}

Vue.prototype.msgError = function(message) {
  this.$notify.error({
    title: '错误',
    message: message,
    showClose: false,
    duration: 3000
  })
}

Vue.config.productionTip = false

Object.keys(custom).forEach(key => { Vue.filter(key, custom[key]) })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
