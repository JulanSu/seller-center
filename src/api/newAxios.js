import axios from 'axios';

const newAxios = axios.create({
   headers: { 'X-Requested-With': 'ajax' }
});

newAxios.interceptors.response.use(function (res) {
    if(res.headers.redirect){
        window.location.href = res.headers.contentpath;
    }
    return res;
}, function (error) {
    console.log(error)
});

export default newAxios;