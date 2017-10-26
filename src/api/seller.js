import axios from 'axios';

let base = '';
let host = 'http://localhost:8080/Urban/rest';

export const getGoodsCategoryList = params => {return axios.get(`${base}/goods/category`);};