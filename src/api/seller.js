import axios from 'axios';

let base = '';
let api="http://192.168.89.26:8083/product/create"
let host = 'http://localhost:8080/Urban/rest';

//获取商品表单初始化数据
export const getGoodsFormData = params => {return axios.get(`${base}/product/create`, { params: params })};

//提交商品表单
export const saveGoodsFormData = params => {return axios.post(`${base}/product/save`, params )};


export const getNewestTemplate = params => {return axios.get(`${base}/order/getNewestTemplate`, { params: params })};

export const saveStoreShippingTemplate = params => {return axios.get(`${base}/order/saveStoreShippingTemplate`, { params: params })};


export const getGoodsCategoryList = params => {return axios.get(`${base}/product/category/all`, { params: params })};