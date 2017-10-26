// import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueSummernote from '@/components/editer/'

// import VueRouter from 'vue-router'
import store from '@/vuex/store'
import Vuex from 'vuex'
import router from '@/router/'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'summernote/dist/summernote.css'
import 'font-awesome/css/font-awesome.min.css'
import '../theme/index.css'
import './styles/main.css'

//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'

Vue.use(ElementUI)
// Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueSummernote, {
  dialogsFade: true,
  height: 350
})

//NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  //NProgress.start();
  // if (to.path == '/login') {
  //   sessionStorage.removeItem('user');
  // }
  // let user = JSON.parse(sessionStorage.getItem('user'));
  // if (!user && to.path != '/login') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
  next()
})

//router.afterEach(transition => {
//NProgress.done();
//});

const app2 = new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

