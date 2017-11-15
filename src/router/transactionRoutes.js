
/*交易管理*/
const Orders =  resolve => require(['@/views/transaction/Orders.vue'],resolve)
const OrderDetail =  resolve => require(['@/views/transaction/OrderDetail.vue'],resolve)
const ServiceOrder =  resolve => require(['@/views/transaction/ServiceOrders.vue'],resolve)
const ServiceDetail =  resolve => require(['@/views/transaction/ServiceDetail.vue'],resolve)
const Coupon =  resolve => require(['@/views/transaction/Coupon.vue'],resolve)
const Reservation =  resolve => require(['@/views/transaction/Reservation.vue'],resolve)
const ReservationDetail =  resolve => require(['@/views/transaction/ReservationDetail.vue'],resolve)

const routers = [
        { path: '/transaction/orders', component: Orders, name: '订单查询' ,
            children: [
                { path: '/transaction/orders/order-detail', component: OrderDetail, name: '订单详情' },
            ]
        },
        { path: '/transaction/service-orders', component: ServiceOrder, name: '售后订单查询',
            children: [
                { path: '/transaction/service-orders/service-detail', component: ServiceDetail, name: '售后订单详情' },
            ]
        },
        { path: '/transaction/coupon', component: Coupon, name: '发出的点券' },
        { path: '/transaction/reservation', component: Reservation, name: '结算管理' ,
            children: [
                { path: '/transaction/reservation/reservation-detail', component: ReservationDetail, name: '结算明细' },
            ]
        }
]


export default routers;
