import axios from 'axios';

// let base = 'http://192.168.88.212:8083';

let base = ''
//获取商品表单初始化数据
export const getGoodsFormData = params => {return axios.get(`${base}/product/create`, { params: params })};

//提交商品表单
export const saveGoodsFormData = params => {return axios.post(`${base}/product/save`, params )};

//获取物流模板
export const getNewestTemplate = params => {return axios.get(`${base}/order/getNewestTemplate`, { params: params })};

//保存物流模板
export const saveStoreShippingTemplate = params => {return axios.post(`${base}/order/saveStoreShippingTemplate`,  params )};

//获取商品类目列表
export const getGoodsCategoryList = params => {return axios.get(`${base}/product/category/all`, { params: params })};

//商品审核中列表
export const getInreviewList = params => {
	return axios.get(`${base}/product/inreviewlist`, { params: params })
}

//获取店铺列表
export const getStoreCate = params => {
	return axios.get(`${base}/store/cate/list`, { params: params })
}