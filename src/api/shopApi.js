import axios from 'axios';
import Qs from 'qs';

let base = 'http://192.168.88.42:8083';
let host = '';
var rootIP = process.env.API_ROOT;

//店铺信息
export const getShopMessage = params => { return axios.get(`${base}/store/get`, { params: params }); };
export const updateShopMessage = params => { return axios.post(`${base}/store/update`,params); };
//查看店铺资质信息
export const storeGetMerchant = params => { return axios.get(`${base}/store/get_merchant`, { params: params }); };
export const merchantUpdate = params => { return axios.post(`${base}/merchant/update`,params); };

//获取行业分类
export const industryListall = params => { return axios.get(`${base}/industry/listall`, { params: params }); };


//提交入住审核
export const merchantSave = params => { return axios.post(`${base}/merchant/save`,params); };

//门店管理
export const getClassifyList = params => { return axios.get(`${base}/store/branch/list`, { params: params }); };
export const getClassifyGet = params => { return axios.get(`${base}/store/branch/get`, { params: params }); };
export const saveClassify = params => { return axios.get(`${base}/store/branch/save`, { params: params }); };
export const updateClassify = params => { return axios.post(`${base}/store/branch/update`, params,{}); };
export const pageStoreCateProduct = params => { return axios.get(`${base}/product/pagestorecateproduct`, { params: params }); };

//店铺子账号管理
export const operatorChangeStatus = params => { return axios.post(`${base}/store/operator/change_status`, params); };
export const operatorGet = params => { return axios.get(`${base}/store/operator/get`,  { params: params }); };
export const operatorGetNum = params => { return axios.get(`${base}/store/operator/get_num`,{ params: params }); };
export const operatorList = params => { return axios.get(`${base}/store/operator/list`, { params: params }); };
export const operatorSave = params => { return axios.post(`${base}/store/operator/save`, params); };
export const operatorUpdate = params => { return axios.post(`${base}/store/operator/update`, params); };
export const operatorRemove = params => { return axios.post(`${base}/store/operator/remove`, params); };

//店铺子账号角色管理
export const roleChangeStatus = params => { return axios.post(`${base}/store/operator/role/change_status`, params); };
export const roleGet = params => { return axios.get(`${base}/store/operator/role/get`, { params: params }); };
export const roleList = params => { return axios.get(`${base}/store/operator/role/list`,{ params: params }); };
export const roleGetAuthority = params => { return axios.get(`${base}/store/operator/role/get_authority`,  { params: params }); };
export const roleSave = params => { return axios.post(`${base}/store/operator/role/save`, params); };
export const roleUpdate = params => { return axios.post(`${base}/store/operator/role/update`, params); };

//分类管理
export const cateGet = params => { return axios.post(`${base}/store/cate/get`, params); };
export const cateList = params => { return axios.get(`${base}/store/cate/list`, { params: params }); };
export const cateRemove = params => { return axios.post(`${base}/store/cate/remove`,params); };
export const cateSave = params => { return axios.post(`${base}/store/cate/save`,params); };

export const cateUpdate = params => { return axios.post(`${base}/store/cate/update`, params); };
export const productList = params => { return axios.get(`${base}/store/cate/product/list`, { params: params }); };
export const productRemove = params => { return axios.post(`${base}/store/cate/product/remove`,params); };
export const categoryAll = params => { return axios.get(`${base}/product/category/all`, { params: params }); };
export const productListcate = params => { return axios.post(`${base}/store/cate/product/listcate`,params); };
export const productSave = params => { return axios.post(`${base}/store/cate/product/save`,params); };


//我的品牌
export const brandChangeStatus = params => { return axios.post(`${base}/store/brand/change_status`, params); };
export const brandGet = params => { return axios.get(`${base}/store/brand/get`, { params: params }); };
export const brandList = params => { return axios.get(`${base}/store/brand/list`,{ params: params }); };
export const storeBrandUpdate = params => { return axios.post(`${base}/store/brand/update`, params); };
export const brandVerify = params => { return axios.post(`${base}/store/brand/verify`,  params); };
