import router from '@/router'
import asyncRouterArr from './router/asyncRouter'


/**
 * 1店铺,2商品,3交易,4营销
 */
let childArray = localStorage.getItem('childArray');

if(childArray){       //是子账号
    childArray = childArray.split(',');
    childArray.forEach( (v,i) => {
      switch(Number(v)) {
        case 1: router.options.routes.push(asyncRouterArr[2]); break;
        case 2: router.options.routes.push(asyncRouterArr[0]); break;
        case 3: router.options.routes.push(asyncRouterArr[1]); break;
        case 4: router.options.routes.push(asyncRouterArr[3]); break;
      }
  })
}else{
  router.options.routes = [...router.options.routes,...asyncRouterArr]
}

router.addRoutes(router.options.routes)   //添加路由
