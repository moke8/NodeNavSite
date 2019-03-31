import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import vue_resource from 'vue-resource'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(vue_resource)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
