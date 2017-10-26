
/*营销中心*/
const Tool =  resolve => require(['@/views/tool/Tool.vue'],resolve)
const Rule =  resolve => require(['@/views/tool/Rule.vue'],resolve)
const Create = resolve => require(['@/views/tool/Create.vue'],resolve)
const Management =  resolve => require(['@/views/active/Management.vue'],resolve)
const Attend =  resolve => require(['@/views/active/Attend.vue'],resolve)

const routers = [
    { path: '/marketing-center/tool', component: Tool, name: '营销工具' ,
        children: [
            { path: '/marketing-center/tool/detail', component: Rule, name: '现金券'},
            { path: '/marketing-center/tool/create', component: Create, name: '创建活动'}
        ]
    },
    { path: '/marketing-center/management', component: Management, name: '活动管理' ,
        children: [
            { path: '/marketing-center/management/attend', component: Attend, name:'活动详情'},
        ]
    }
]


export default routers;
