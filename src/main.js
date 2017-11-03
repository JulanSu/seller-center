// import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
// import VueSummernote from '@/components/editer/'

import ElementUI from 'element-ui'
import LoadingMask from '@/components/loading/'
import VueResource from 'vue-resource'
// import VueRouter from 'vue-router'
import store from '@/vuex/store'
import Vuex from 'vuex'
import router from '@/router/'
//import VueSummernote from 'vue-summernote'
/*import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'summernote/dist/summernote.css'
*/

import '../theme/index.css'
import './assets/iconfont/iconfont.css'
import './styles/main.css'

//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'

Vue.use(VueResource);
Vue.use(ElementUI)
// Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(LoadingMask)

// Vue.use(VueSummernote, {
//   dialogsFade: true,
//   height: 350
// })


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


Vue.filter('numbers', function(value) {
    return value.replace(/[^\d]/g,'');
});

const app2 = new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  

  //components: { App }
  render: h => h(App)
}).$mount('#app')



