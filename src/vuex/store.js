import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import * as getters from './getters'
const storeId = window.config && window.config.storeId ? window.config.storeId : ''
Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    storeId: storeId,
    userName: '',
    userId: '',
    storeType: '',
    apiHost: '',
    userSelectedTheSku: [],
    templateValueList: []
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    UPDATE_TEMPLATE_VALUE_LIST(state){
        state.templateValueList = state
    },
    UPDATE_USER_SELECTED_THE_SKU(state, data){
        //state.userSelectedTheSku = data
        Vue.set(state, 'userSelectedTheSku',  data)
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})