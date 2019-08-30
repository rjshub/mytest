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
import VueResource from 'vue-resource'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video

Vue.config.productionTip = false
// Vue.use(preview)
Vue.use(Vant)
Vue.use(VueDND)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
