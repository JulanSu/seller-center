/*阶段一*/
const merchantEnter = resolve => require(['@/views/shops/MerchantEnter.vue'],resolve);

/*/*店铺信息*/
const message = resolve => require(['@/views/shops/Message.vue'],resolve);

/*品牌管理*/
const brandManagement = resolve => require(['@/views/shops/BrandManagement.vue'],resolve);
const selBrand = resolve => require(['@/views/shops/SelBrand.vue'],resolve);
const addBrand = resolve => require(['@/views/shops/AddBrand.vue'],resolve);
const createBrand = resolve => require(['@/views/shops/CreateBrand.vue'],resolve);

/*店铺资质*/
const shopQualification = resolve => require(['@/views/shops/ShopQualification.vue'],resolve);

/*分类管理*/
const classifyManagement = resolve => require(['@/views/shops/ClassifyManagement.vue'],resolve);
const addFenLei = resolve => require(['@/views/shops/AddFenLei.vue'],resolve);
const findGood = resolve => require(['@/views/shops/FindGood.vue'],resolve);
const allGood = resolve => require(['@/views/shops/AllGood.vue'],resolve);

/*子帐号管理*/
const bypassManagement = resolve => require(['@/views/shops/BypassManagement.vue'],resolve);
const newAccount = resolve => require(['@/views/shops/NewAccount.vue'],resolve);
const roleList = resolve => require(['@/views/shops/RoleList.vue'],resolve);
const newRole = resolve => require(['@/views/shops/NewRole.vue'],resolve);
const accountList = resolve => require(['@/views/shops/AccountList.vue'],resolve);

/*门店管理*/
const shopManagement = resolve => require(['@/views/shops/ShopManagement.vue'],resolve);
const addShop = resolve => require(['@/views/shops/AddShop.vue'],resolve);

/*商品测试*/
const ProductSku1 = resolve => require(['@/views/seller_management/ProductSku1.vue'],resolve) 
/*店铺管理 =E */
const routers = [
            /*{ 
                path: '/store/ProductSku1',  
                component: ProductSku1, 
                name: '商品' 
            },*/
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
                    { path: '/store/brand-management/create-brand', component: createBrand, name: '创建品牌'},
                    { path: '/store/brand-management/compile-brand', component: addBrand, name: '编辑品牌' }
                ]
            },
            { 
                path: '/store/shop-qualification',
                component: shopQualification,  
                name: '店铺资质' 
            },
            { 
                path: '/store/classify-management', 
                component: classifyManagement, 
                name: '分类管理' ,
                children: [
                    { path: '/store/classify-management/add-fen-lei', component: addFenLei, name: '新增分类' },    
                    { 
                        path: '/store/classify-management/find-good',
                        component: findGood,
                        name: '查看商品',
                        children:[
                            { path: '/store/classify-management/find-good/all-good', component: allGood, name: '全部分类商品列表' }
                        ]
                    },
                    { path: '/store/classify-management/:id', component: addFenLei, name: '编辑分类' }
                ]
            },
            { 
                path: '/store/bypass-management', 
                component: bypassManagement, 
                name: '子账号管理',
                children: [
                    { path: '/store/bypass-management/role-list', component: roleList, name: '管理角色' }, 
                    { path: '/store/bypass-management/account-list', component: accountList, name: '子帐号列表' },
                    { path: '/store/bypass-management/new-account', component: newAccount, name: '新建子帐号' },
                    { path: '/store/bypass-management/compile-account', component: newAccount, name: '编辑子帐号' },
                    { path: '/store/bypass-management/new-role', component: newRole, name: '新建角色' },
                    { path: '/store/bypass-management/:id', component: newRole, name: '编辑角色' }
                
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
            }
        ];

export default routers;
