/*阶段一*/
const homeIndex = resolve => require(['@/views/home/Index.vue'],resolve);

const routers = [
    { 
        path: '/home/index',  
        component: homeIndex, 
        name: '店铺首页' 
    },
];

export default routers;
