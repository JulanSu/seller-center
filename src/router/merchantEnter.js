/*商家入驻*/
const merchantEnterBefore = resolve => require(['@/views/merchant_enter/MerchantEnterBefore.vue'],resolve);

const merchantEnter = resolve => require(['@/views/merchant_enter/MerchantEnter.vue'],resolve);

const routers = [
    { 
        path: '/merchant/merchant-enter-before',  
        component: merchantEnterBefore, 
        hidden: true
    },
    {
        path: '/merchant/merchant-enter', 
        component: merchantEnter,
        hidden: true
    }
];

export default routers;
