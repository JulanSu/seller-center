import axios from 'axios';

let base = '';
let host = 'http://192.168.88.42:8083';
var rootIP = process.env.API_ROOT;

//店铺信息
export const getShopMessage = params => { return axios.get('/store/get', { params: params }); };