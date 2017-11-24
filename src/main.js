// import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueSummernote from '@/components/editer'
import ElementUI from 'element-ui'
import LoadingMask from '@/components/loading/'
import VueResource from 'vue-resource'
import { MessageBox } from 'element-ui';
// import VueRouter from 'vue-router'
import store from '@/vuex/store'
import Vuex from 'vuex'
import router from '@/router/'
import '../theme/index.css'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js'
import './styles/main.css'
import './permission.js'  //权限
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
// 载入bootstrap.js
require('bootstrap')
require('bootstrap/dist/css/bootstrap.min.css')
require('summernote/dist/summernote.css')

Vue.use(VueResource);
Vue.use(ElementUI)
// Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(LoadingMask)

Vue.use(VueSummernote, {
  height: 300,
  toolbar: [
    ['style', ['style']],
    ['font', ['bold', 'underline', 'clear']],
    ['fontname', ['fontname']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['table', ['table']],
    ['insert', ['link', 'picture', 'video']],
    ['view', ['fullscreen']]
    // ['view', ['fullscreen', 'codeview', 'help']]
  ]
})


//NProgress.configure({ showSpinner: false });
/*
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
})*/
router.beforeEach((to, from, next) => {
  if(localStorage.getItem('merchant')==1){//控制入驻成功后刷新页面
    localStorage.setItem("merchant",0);
    next({ path: '/store/message'}); // 确保一定要调用 next()
  }
  
  
  next(); // 确保一定要调用 next()
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



