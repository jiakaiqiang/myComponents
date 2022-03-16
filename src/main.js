import Vue from 'vue'
import App from './App.vue'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import initRules from "@/commons/form/rules.js"
import router from "@/router/index.js"
Vue.use(elementui)
Vue.config.productionTip = false
Vue.prototype.$initRules=initRules
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
