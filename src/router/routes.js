import Table from '../modules/index/views/nav1/Table.vue'
import Info from '../modules/index/views/nav1/Info.vue'
import Form from '../modules/index/views/nav1/Form.vue'
import User from '../modules/index/views/nav1/user.vue'
import Page4 from '../modules/index/views/nav2/Page4.vue'
import TelManage from '../modules/index/views/nav2/TelManage.vue'
import Page5 from '../modules/index/views/nav2/Page5.vue'
import Page6 from '../modules/index/views/nav3/Page6.vue'
import echarts from '../modules/index/views/charts/echarts.vue'

import mendian from '../modules/index/views/charts/mendian.vue'
import Full from '../components/Full.vue'

import PersonMessage from '../modules/index/views/message/PersonMessage.vue'


//商品管理路由
import goodsManagementRoutes from './goodsManagementRoutes.js'

//店铺管理路由
import shopsManagementRoutes from './shopsManagementRoutes.js'

import NotFound from '../views/404.vue'
import Login from '../views/Login.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

/*交易管理路由*/
import transaction from './transactionRoutes.js'

/*营销路由管理*/
import marketingCenter from './marketingCenterRoutes.js'



Vue.use(VueRouter)

const routers = new VueRouter({
    // mode: 'history',
    routes:[
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
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
        path: '/',
        component: Full,
        name: '',
        redirect: '/seller-management',
        hidden: true
    },
    {

        path: '/seller-management',
        component: Full,
        name: '商品管理',
        iconCls: 'fa fa-id-card-o',//图标样式class
        children: goodsManagementRoutes
    },
    {

        path: '/transaction',
        component: Full,
        name: '交易管理',
        iconCls: 'fa fa-id-card-o',//图标样式class
        children: transaction
    },
    {
        path: '/store',
        component: Full,
        name: '店铺管理',
        iconCls: 'fa fa-bar-chart',
        children:shopsManagementRoutes 
    },
    {   path: '/marketing-center',
        component: Full,
        name: '营销中心',
        iconCls: 'fa fa-bar-chart',
        children:marketingCenter 
    }
    ]
})

export default routers;
