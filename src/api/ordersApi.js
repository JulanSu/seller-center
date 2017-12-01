import axios from './newAxios';

const base = config.apiHost;


/*订单分类和状态*/
export const orderStatus = params => { return axios.get(`${base}/order/listorderstatusandtype`,  {params:params}); }
/*订单列表*/
export const orderStore = params => { return axios.get(`${base}/order/pageorderstore`,  {params:params}); }
/*订单详细*/
export const orderDetail = params => { return axios.get(`${base}/order/getorderstoredetail`,  {params:params}); }
/*订单发货*/
export const sendProduct = params => { return axios.post(`${base}/order/ship`,params)}

/*售后订单列表*/
export const orderStoreAfter = params => { return axios.get(`${base}/order/pageorderstoreafter`,  {params:params}); }
/*售后订单详细*/
export const afterDetail = params => { return axios.get(`${base}/order/getafterorderdetail`,  {params:params}); }
/*提交售后信息*/
export const postAfter = params => { return axios.post(`${base}/orderafter/shophandleorder`,  params)}

/*结算列表*/
export const accountList = params => { return axios.get(`${base}/order/listaccountstore`,  {params:params}); }
/*结算明细*/
export const accountDetail = params => { return axios.get(`${base}/order/getaccountproductdetail`,  {params:params}); }
/*发出的点券*/
export const cashList = params => { return axios.get(`${base}/marketing/voucher/list`,  {params:params}); }

/*绑定支付宝*/
export const getPayMessage = params => { return axios.get(`${base}/store/alipay/get`,  {params:params}); }
/*获得支付宝*/
export const savePayMessage = params => { return axios.post(`${base}/store/alipay/save`, params); }


