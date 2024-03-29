/*商家管理 =S */
const CateSelection =  resolve => require(['@/views/seller_management/CateSelection.vue'],resolve) 
const Logistics = resolve => require(['@/views/seller_management/Logistics.vue'],resolve) 
const GoodsForm = resolve => require(['@/views/seller_management/GoodsForm.vue'],resolve) 
const UnderReview = resolve => require(['@/views/seller_management/UnderReview.vue'],resolve) 
const UpShelve = resolve => require(['@/views/seller_management/UpShelve.vue'],resolve) 
const DownShelve = resolve => require(['@/views/seller_management/DownShelve.vue'],resolve) 
const NotPass = resolve => require(['@/views/seller_management/NotPass.vue'],resolve) 
const ToBeShelved = resolve => require(['@/views/seller_management/ToBeShelved.vue'],resolve) 
const DraftBox = resolve => require(['@/views/seller_management/DraftBox.vue'],resolve) 
const RecycleBin = resolve => require(['@/views/seller_management/RecycleBin.vue'],resolve) 
 

/*商家管理 =E */
const routers = [{ 
        path: '/seller-management/goods', 
        component: CateSelection, 
        name: '创建商品',
        showChildrenName: true,
        children:[

            { path: '/seller-management/goods/create', component: CateSelection, name: '选择类目' },
            { path: '/seller-management/goods/form', component: GoodsForm, name: '新建商品' },
            { path: '/seller-management/goods/editor', component: GoodsForm, name: '编辑商品' }
        ]
    },
    { 
        path: '/seller-management/logistics', 
        component: Logistics, 
        name: '物流模板' ,
        children:[
            { path: '/seller-management/logistics/create', component: Logistics, name: '新建物流模板' },
            { path: '/seller-management/logistics/editor', component: Logistics, name: '编辑物流模板' }
        ]
    },
    { path: '/seller-management/underreview', component: UnderReview, name: '审核中列表' },
    { path: '/seller-management/upshelve', component: UpShelve, name: '已上架列表' },
    { path: '/seller-management/downshelve', component: DownShelve, name: '已下架列表' },
    { path: '/seller-management/notpass', component: NotPass, name: '审核未通过列表' },
    { path: '/seller-management/tobeshelved', component: ToBeShelved, name: '待上架列表' },
    { path: '/seller-management/draftbox', component: DraftBox, name: '草稿箱' },
    { path: '/seller-management/recyclebin', component: RecycleBin, name: '回收站' }
]


export default routers;
