// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css'
import './components/receiverList/style/index.scss'
import VueDND from 'awe-dnd'

Vue.config.productionTip = false
// Vue.use(preview)
Vue.use(Vant)
Vue.use(VueDND)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
