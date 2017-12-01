/*首页*/
const homeIndex = resolve => require(['@/views/home/Index.vue'],resolve);



const routers = [
    { 
        path: '/home/index',  
        component: homeIndex, 
        name: '' 
    }
];

export default routers;
