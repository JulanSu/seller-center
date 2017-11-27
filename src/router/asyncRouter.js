import Full from '@/components/Full.vue'
import goodsManagementRoutes from './goodsManagementRoutes.js'
//店铺管理路由
import shopsManagementRoutes from './shopsManagementRoutes.js'

/*交易管理路由*/
import transaction from './transactionRoutes.js'

/*营销路由管理*/
import marketingCenter from './marketingCenterRoutes.js'

//首页路由
import home from './home.js'
const asyncRouterArr =  [
   
	{

        path: '/seller-management',
        component: Full,
        redirect: '/seller-management/goods',
        name: '商品管理',
        iconCls: 'iconfont icon-shangpu',//图标样式class
        children: goodsManagementRoutes
    },
    {
        path: '/transaction',
        component: Full,
        name: '交易管理',
        iconCls: 'iconfont icon-jiaoyiguanli',//图标样式class
        children: transaction
    },
	{
        path: '/store',
        component: Full,
        name: '店铺管理',
        iconCls: 'iconfont icon-shangpinguanli',
        children:shopsManagementRoutes 
    },
    
    {   path: '/marketing-center',
        component: Full,
        name: '营销中心',
        iconCls: 'iconfont icon-yingxiaozhongxin',
        children:marketingCenter 
    }
]

export default asyncRouterArr;




