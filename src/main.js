import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引进element-Ui
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 挂载axios文件
import axios from './api/index.js'
Vue.prototype.$http = axios

Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
