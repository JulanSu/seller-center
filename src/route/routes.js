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

import tool from '../modules/index/views/tool/tool.vue'
import rule from '../modules/index/views/tool/rule.vue'
import create from '../modules/index/views/tool/create'
import management from '../modules/index/views/active/management'
import attend from '../modules/index/views/active/attend'
import Orders from '../modules/index/views/transaction/Orders'
import OrderDetail from '../modules/index/views/transaction/OrderDetail'
import ServiceOrder from '../modules/index/views/transaction/ServiceOrders'
import ServiceDetail from '../modules/index/views/transaction/ServiceDetail'
import Coupon from '../modules/index/views/transaction/Coupon'


import Full from '../components/Full.vue'

/*商家管理 =S */
import CreateGoods from 'indexPath/views/seller_management/CreateGoods.vue'
import WuLiu from 'indexPath/views/seller_management/WuLiu.vue'
import GoodsForm  from 'indexPath/views/seller_management/GoodsForm.vue'
import UnderReview from 'indexPath/views/seller_management/UnderReview.vue'
import YiShangJia from 'indexPath/views/seller_management/YiShangJia.vue'
import YiXiaJia from 'indexPath/views/seller_management/YiXiaJia.vue'
import WeiTongGuo from 'indexPath/views/seller_management/WeiTongGuo.vue'
import DaiShangJia from 'indexPath/views/seller_management/DaiShangJia.vue'
import CaoGaoXiang from 'indexPath/views/seller_management/CaoGaoXiang.vue'
import HuiShouZhan from 'indexPath/views/seller_management/HuiShouZhan.vue'
/*商家管理 =E */

import NotFound from '../views/404.vue'
import Login from '../views/Login.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'


import createproduct from '../modules/index/views/goods/createproduct.vue'
import audits from '../modules/index/views/goods/audits.vue'
import putaway from '../modules/index/views/goods/putaway.vue'
import soldout from '../modules/index/views/goods/soldout.vue'
import notpass from '../modules/index/views/goods/notpass.vue'
import awaitaway from '../modules/index/views/goods/awaitaway.vue'
import drafts from '../modules/index/views/goods/drafts.vue'
import recyclebin from '../modules/index/views/goods/recyclebin.vue'


import message from '../modules/index/views/shops/message.vue'

/*品牌管理*/
import brandManagement from '../modules/index/views/shops/BrandManagement.vue'
import selBrand from '../modules/index/views/shops/SelBrand.vue'
import addBrand from '../modules/index/views/shops/AddBrand.vue'
import createBrand from '../modules/index/views/shops/CreateBrand.vue'

/*门店管理*/
import shopManagement from '../modules/index/views/shops/ShopManagement.vue'
import addShop from '../modules/index/views/shops/AddShop.vue'

import bypass_management from '../modules/index/views/shops/bypass_management.vue'
import classify_management from '../modules/index/views/shops/classify_management.vue'
import newaccount from '../modules/index/views/shops/newaccount.vue'
import rolelist from '../modules/index/views/shops/rolelist.vue'
import newrole from '../modules/index/views/shops/newrole.vue'
import accountlist from '../modules/index/views/shops/accountlist.vue'

import shop_qualification from '../modules/index/views/shops/shop_qualification.vue'

import addfenlei from '../modules/index/views/shops/addfenlei.vue'
import findgood from '../modules/index/views/shops/findgood.vue'
import allgood from '../modules/index/views/shops/allgood.vue'

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
    /*{
        path: '/',
        redirect: '/table',
        hidden: true
    },*/
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
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
        children: [
            { 
                path: '/seller-management/goods', 
                component: CreateGoods, 
                name: '创建商品',
                children:[
                    { path: 'create', component: CreateGoods, name: '创建商品' },
                    { path: 'form', component: GoodsForm, name: '新建' }
                ]},
            { 
                path: '/seller-management/wuliu', 
                component: WuLiu, 
                name: '物流模板' ,
                children:[
                    { path: 'create', component: WuLiu, name: '新建物流模板' },
                    { path: 'editor', component: WuLiu, name: '编辑物流模板' }
                ]
            },
            { path: '/seller-management/under-review', component: UnderReview, name: '审核中列表' },
            { path: '/seller-management/yishangjia', component: YiShangJia, name: '已上架列表' },
            { path: '/seller-management/yixiajia', component: YiXiaJia, name: '已下架列表' },
            { path: '/seller-management/weitongguo', component: WeiTongGuo, name: '审核未通过列表' },
            { path: '/seller-management/daishangjia', component: DaiShangJia, name: '审核未通过待上架列表' },
            { path: '/seller-management/caogaoxiang', component: CaoGaoXiang, name: '草稿箱' },
            { path: '/seller-management/huishouzhan', component: HuiShouZhan, name: '回收站' }
        ]
    },
    {
        path: '/transaction',
        component: Full,
        name: '交易管理',
        iconCls: 'fa fa-id-card-o',
        children: [
        { path: '/transaction/orders', component: Orders, name: '订单查询' ,
            children: [
                { path: '/transaction/orders/order-detail', component: OrderDetail, name: '订单详情' },
            ]
        },
        { path: '/transaction/service-orders', component: ServiceOrder, name: '售后订单查询',
            children: [
                { path: '/transaction/orders/service-detail', component: ServiceDetail, name: '订单详情' },
            ]
        },
        { path: '/transaction/coupon', component: Coupon, name: '发出的点券' },
        { path: '/transaction/reservation', component: Page5, name: '结算管理' },
        ]
    },

    {
        path: '/store',
        component: Full,
        name: '店铺管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { 
                path: '/store/message', 
                component: message, 
                name: '店铺信息' 
            },
            {
                path: '/store/brand-management',
                component: brandManagement,
                name: '品牌管理',
                children: [
                    { path: '/store/brand-management/sel-brand', component: selBrand, name: '选择品牌' },
                    { path: '/store/brand-management/add-brand', component: addBrand, name: '添加品牌' },
                    { path: '/store/brand-management/create-brand', component: createBrand, name: '创建品牌'}
                ]
            },
            { 
                path: '/store/shop_qualification',
                component: shop_qualification,  
                name: '店铺资质' 
            },
            { 
                path: '/store/classify_management', 
                component: classify_management, 
                name: '分类管理' ,
                children: [
                    { path: '/store/classify_management/addfenlei', component: addfenlei, name: '新增分类' },
                    { path: '/store/classify_management/findgood', component: findgood, name: '查看商品' },
                    { path: '/store/classify_management/allgood', component: allgood, name: '全部分类商品列表' }
                ]
            },
            { 
                path: '/store/bypass_management', 
                component: bypass_management, 
                name: '子账号管理',
                children: [
                    { path: '/store/bypass_management/rolelist', component: rolelist, name: '岗位角色' },
                    { path: '/store/bypass_management/newrole', component: newrole, name: '新建角色' },
                    { path: '/store/bypass_management/accountlist', component: accountlist, name: '子帐号列表' },
                    { path: '/store/bypass_management/newaccount', component: newaccount, name: '新建子帐号' },
                
                ]
            },
            {
                path: '/store/shop-management',
                component: shopManagement,
                name: '门店管理' ,
                children: [
                    { path: '/store/shop-management/add', component: addShop, name: '添加门店' },
                    { path: '/store/shop-management/:id', component: addShop, name: '编辑门店' }

                ]
            }, 
        ]
    },
    {
        path: '/marketing-center',
        component: Full,
        name: '营销中心',
        iconCls: 'fa fa-bar-chart',
        children: [
        { path: '/marketing-center/tool', component: tool, name: '营销工具' ,
            children: [
                { path: '/marketing-center/tool/detail', component: rule, name: '现金券'},
                { path: '/marketing-center/tool/create', component: create, name: '创建活动'}
            ]
        },
        { path: '/marketing-center/management', component: management, name: '活动管理' ,
         children: [
                { path: '/marketing-center/management/attend', component: attend, name: '促销活动'},
            ]}
        ]
    }]
})

export default routers;