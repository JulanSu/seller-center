import Vue from 'vue'
import VueRouter from 'vue-router'
import Full from '@/components/Full.vue'
import FullNoLeft from '@/components/FullNoLeft.vue'

/*import MerchantEnter from '@/views/shops//MerchantEnter.vue'
import MerchantEnter1 from '@/views/shops//MerchantEnter1.vue'*/

//import mendian from '@/views/charts/mendian.vue'
import PersonMessage from '@/views/message/PersonMessage.vue'

//商品管理路由
import goodsManagementRoutes from './goodsManagementRoutes.js'

//首页路由
import home from './home.js'

/*404*/
import NotFound from './404.js'

//商家入驻
import MerchantEnter from './merchantEnter.js'

//店铺管理路由
import shopsManagementRoutes from './shopsManagementRoutes.js'

/*交易管理路由*/
import transaction from './transactionRoutes.js'

/*营销路由管理*/
import marketingCenter from './marketingCenterRoutes.js'



Vue.use(VueRouter)

const routers = new VueRouter({
    routes:[
    {
        path: '/',
        component: Full,
        name: '',
        hidden: true,
        redirect: '/home/index',
    },   
    {
        path: '/home',
        component: Full,
        name: '',
        hidden:true,
        redirect: '/home/index',
        children: home
    },

    /*消息中心*/
    {
        path: '/person',
        component: Full,
        name: '',
        hidden: true,
        children: [{
            path: '/person/message', 
            component: PersonMessage,
            name: '消息中心' 
        }]
    },
    {
        path: '/merchant',
        component: FullNoLeft,
        name: '',
        hidden: true,
        redirect: '/404',
        children:MerchantEnter
    },
    {
        path: '/404',
        component: FullNoLeft,
        name: '',
        children:NotFound,
        hidden: true
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
  ]
})

export default routers;

