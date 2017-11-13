import router from '@/router'
import asyncRouterArr from './router/asyncRouter'
import cookie from './util/cookie.js'


/**
 * 1店铺,2商品,3交易,4营销
 */
let childArray = cookie.getCookie('childArray');

config.storeType == '2' ? asyncRouterArr[2].children.splice(1,1) : ''; //1企业店铺,2个人店铺
if(childArray){       //是子账号
      asyncRouterArr[2].children.splice(5,1); 
      childArray = childArray.split('[')[1].split(']')[0].split(',');
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

router.addRoutes(router.options.routes)

