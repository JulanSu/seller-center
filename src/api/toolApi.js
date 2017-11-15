import axios from 'axios';

const base = config.apiHost;

/*获取营销工具*/
export const toolList = params => { return axios.get(`${base}/marketing/tools/shop`,  {params:params}); }

/*获取店铺商品列表*/
export const productList = params => { return axios.get(`${base}/product/listontheshelves`,  {params:params}) }

/*店铺创建活动*/
export const createAct = params => { return axios.post(`${base}/marketing/activity/save`,  params)}

/*获取活动详情*/
export const actLastData = params => { return axios.get(`${base}/marketing/activity/detail`,  {params:params}) }

/*修改店铺活动*/
export const changeAct = params => { return axios.post(`${base}/marketing/activity/update`,  params)}

/*获取店铺活动*/
export const storeActList = params => { return axios.get(`${base}/marketing/activity/list`,  {params:params}); }

/*获取平台活动*/
export const platformActList = params => { return axios.get(`${base}/marketing/activity/platform/list`,  {params:params}); }

/*平台活动详情*/
export const platformActDetail = params => { return axios.get(`${base}/marketing/activity/platform/detail`,  {params:params}); }

/*参与平台活动*/
export const attendAct = params => { return axios.post(`${base}/marketing/activity/sign`, params) }

/*修改报名平台活动*/
export const changeAttendAct = params => { return axios.post(`${base}/marketing/activity/sign/update`, params) }


/*获取消息*/
export const msgList = params => { return axios.get(`${base}/msg/page`, {params:params}); }

/*消息条数*/
export const msgNumber = params => { return axios.get(`${base}/user/msg/count`, {params:params}); }



//退出接口
export const userLogout = params => { return axios.get(`${base}/user/logout`, { params: params }); };
