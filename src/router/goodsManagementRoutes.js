/*商家管理 =S */
const CreateGoods =  resolve => require(['@/views/seller_management/CreateGoods.vue'],resolve) 
const WuLiu = resolve => require(['@/views/seller_management/WuLiu.vue'],resolve) 
const GoodsForm = resolve => require(['@/views/seller_management/GoodsForm.vue'],resolve) 
const UnderReview = resolve => require(['@/views/seller_management/UnderReview.vue'],resolve) 
const YiShangJia = resolve => require(['@/views/seller_management/YiShangJia.vue'],resolve) 
const YiXiaJia = resolve => require(['@/views/seller_management/YiXiaJia.vue'],resolve) 
const WeiTongGuo = resolve => require(['@/views/seller_management/WeiTongGuo.vue'],resolve) 
const DaiShangJia = resolve => require(['@/views/seller_management/DaiShangJia.vue'],resolve) 
const CaoGaoXiang = resolve => require(['@/views/seller_management/CaoGaoXiang.vue'],resolve) 
const HuiShouZhan = resolve => require(['@/views/seller_management/HuiShouZhan.vue'],resolve) 


/*商家管理 =E */
const routers = [{ 
        path: '/seller-management/goods', 
        component: CreateGoods, 
        name: '创建商品',
        children:[
            { path: 'create', component: CreateGoods, name: '类目选择' },
            { path: 'form', component: GoodsForm, name: '新建' }
        ]
    },
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
    { path: '/seller-management/daishangjia', component: DaiShangJia, name: '待上架列表' },
    { path: '/seller-management/caogaoxiang', component: CaoGaoXiang, name: '草稿箱' },
    { path: '/seller-management/huishouzhan', component: HuiShouZhan, name: '回收站' }
]


export default routers;
