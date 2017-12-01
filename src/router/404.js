/*阶段一*/
const NotFound = resolve => require(['@/views/home/404.vue'],resolve);
/*手机端下载页面*/
const Phone = resolve => require(['@/views/home/Phone.vue'],resolve);

const routers = [
    { 
        path: '/404',  
        component: NotFound, 
        name: '' 
    },
    { 
        path: '/home/phone',  
        component: Phone, 
        name: '' 
    }
];

export default routers;
