/*阶段一*/
const NotFound = resolve => require(['@/views/home/404.vue'],resolve);

const routers = [
    { 
        path: '/404',  
        component: NotFound, 
        name: '' 
    },
];

export default routers;
