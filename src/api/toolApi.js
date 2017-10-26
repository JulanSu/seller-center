import axios from 'axios';

var addAjax = axios.create({
    headers: {'content-type': 'application/x-www-form-urlencoded'}
});
const base = 'http://192.168.89.68:8083';


export const toolList = params => { return addAjax.get(`${base}/marketing/tools/shop`,  {params:params}); }

export const productList = params => { return addAjax.get(`${base}/product/store/list`,  {params:params}) }

export const createAct = params => { return addAjax.post(`${base}/marketing/activity/save`,  {params:params}); }

