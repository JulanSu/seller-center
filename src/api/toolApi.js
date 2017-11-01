import axios from 'axios';

var addAjax = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'}
});

const base = "http://liuwei.shop.hzjiehun.bid";


/*获取营销工具*/
export const toolList = params => { return axios.get(`${base}/marketing/tools/shop`,  {params:params}); }
/*获取店铺商品列表*/
export const productList = params => { return axios.get(`${base}/product/store/list`,  {params:params}) }
/*店铺创建活动*/
export const createAct = params => { return axios.post(`${base}/marketing/activity/save`,  params)}
/*获取店铺活动*/
export const storeActList = params => { return axios.get(`${base}/marketing/activity/list`,  {params:params}); }
/*获取平台活动*/
export const platformActList = params => { return axios.get(`${base}/marketing/activity/platform/list`,  {params:params}); }
/*平台活动详情*/
export const platformActDetail = params => { return axios.get(`${base}/marketing/activity/platform/detail`,  {params:params}); }
/*参与平台活动*/
export const attendAct = params => { return axios.post(`${base}/marketing/activity/sign`, params) }


