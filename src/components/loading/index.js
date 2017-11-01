import LoadingMask from './LoadingMask'

const loading = {
    install:function(Vue){
        Vue.component('LoadingMask', LoadingMask)
    }  //'Loading'这就是后面可以使用的组件的名字，install是默认的一个方法
};

export default loading;