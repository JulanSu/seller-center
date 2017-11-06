import axios from 'axios';

//let base = 'http://192.168.88.212:8083';

// let base = 'http://shop.dmp.hzjiehun.bid'
const base = window.config ? window.config.apiHost : '';

//获取商品列表POST 
export const getStoreCategory = params => {
	return axios.get(`${base}/product/category/store`, { params: params })
}

//获取商品列表POST 
export const getProductList = params => {
	return axios.get(`${base}/product/list`, { params: params })
}

//获取商品列表
export const onCancelReview = params => {
	return axios.post(`${base}/product/cancelreview`,  params )
}

//商品下架
export const theShelvestoSoldOut = params => {
	return axios.post(`${base}/product/ontheshelvestosoldout`, params )
}

//商品恢复
export const onRecycleBinToDraftBox = params => {
	return axios.post(`${base}/product/recyclebintodraftbox`, params )
}

//商品删除成功
export const soldOutToRecycleBin = params => {
	return axios.post(`${base}/product/soldouttorecyclebin`, params )
}

//草稿箱 删除成功
export const onDraftBoxDelete = params => {
	return axios.post(`${base}/product/draftboxdelete`, params )
}

//商品推荐
export const onTheShelvesRecommendOn = params => {
	return axios.post(`${base}/product/ontheshelvesrecommendon`, params )
}

//商品取消推荐
export const onTheShelvesRecommendOff = params => {
	return axios.post(`${base}/product/ontheshelvesrecommendoff`, params )
}

//商品立即上架
export const onShelvesReadyToOn = params => {
	return axios.post(`${base}/product/shelvesreadytoon`, params )
}

//商品立即下架
export const onReadyToShelvesToSoldOut = params => {
	return axios.post(`${base}/product/readytoshelvestosoldout`, params )
}


//商品上架
export const soldouttotheshelves = params => {
	return axios.post(`${base}/product/soldouttotheshelves`, params )
}

//审核未通过的商品 删除
export const delNotPassStoreCycleBin = params => {
	return axios.post(`${base}/product/notpasstorecyclebin`, params )
}

//获取店铺列表
export const getStoreCate = params => {
	return axios.get(`${base}/store/cate/list`, { params: params })
}
//获取商品表单初始化数据
export const getGoodsFormData = params => {
	return axios.get(`${base}/product/create`, { params: params })
}
//提交商品表单
export const saveGoodsFormData = params => {
	return axios.post(`${base}/product/save`, params )
}
//获取商品类目列表
export const getGoodsCategoryList = params => {
	return axios.get(`${base}/product/category/all`, { params: params })
}
//商品审核中列表
export const getInreviewList = params => {
	return axios.get(`${base}/product/inreviewlist`, { params: params })
}
//商品审核未通过列表
export const getNotPassList = params => {
	return axios.get(`${base}/product/notpasslist`, { params: params })
}
//商品已上架列表
export const getOnTheshelvesList = params => {
	return axios.get(`${base}/product/ontheshelveslist`, { params: params })
}
//商品已下架列表
export const getSoldOutList = params => {
	return axios.get(`${base}/product/soldoutlist`, { params: params })
}
//商品草稿箱列表
export const getDraftBoxList = params => {
	return axios.get(`${base}/product/draftboxlist`, { params: params })
}
//商品回收站列表
export const getRecycleBinList = params => {
	return axios.get(`${base}/product/recyclebinlist`, { params: params })
}
//店铺分类可关联商品列表
export const getStoreCateProductList = params => {
	return axios.get(`${base}/product/pagestorecateproduct`, { params: params })
}
//更新商品库存
export const updateProductSku = params => {
	return axios.post(`${base}/product/saveproductsku`, params )
}

//获取物流模板
export const getNewestTemplate = params => {
	return axios.get(`${base}/order/getNewestTemplate`, { params: params })
}
//保存物流模板
export const saveStoreShippingTemplate = params => {
	return axios.post(`${base}/order/saveStoreShippingTemplate`,  params )
}

//保存物流模板
export const cancelReview = params => {
	return axios.post(`${base}/product/cancelReview`,  params )
}