import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ZkTable from 'vue-table-with-tree-grid'
import './assets/style/css/reset.css'
import './assets/style/css/common.css'
Vue.config.productionTip = false
Vue.component('ZkTable-table', ZkTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
