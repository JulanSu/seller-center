webpackJsonp([10],{"0eLF":function(t,e,n){e=t.exports=n("bKW+")(!0),e.push([t.i,".el-picker-panel{z-index:99999!important}","",{version:3,sources:["E:/github/seller-center/src/views/seller_management/components/SearchNav.vue"],names:[],mappings:"AACA,iBACE,uBAA0B,CAC3B",file:"SearchNav.vue",sourcesContent:["\n.el-picker-panel {\n  z-index: 99999 !important;\n}\n"],sourceRoot:""}])},"2og3":function(t,e,n){"use strict";var a=n("CcaF"),o=window,r=o.config&&o.config.storeId?o.config.storeId:"";e.a={data:function(){return{storeCate:[],createDate:[],formInline:{productId:"",productTitle:"",storeCateId:"",searchStartTime:"",searchEndTime:""}}},mounted:function(){},created:function(){this.getStoreCateHandel(r)},methods:{datePickerHandle:function(t){var e=this;if(t){var n=t.split(" - ");e.formInline.searchStartTime=n[0]||"",e.formInline.searchEndTime=n[1]||""}else e.formInline.searchStartTime="",e.formInline.searchEndTime=""},getStoreCateHandel:function(t){var e=this;Object(a.e)({storeId:t}).then(function(t){var n=t.data.data;0===t.data.code&&(e.storeCate=n.list)})},linkHandle:function(){this.$router.push({path:"/seller-management/goods"})},onSubmit:function(){var t=this,e=this.validFormInline(),n=e?t.formInline:"";this.$emit("onSearchClick",n)},searchProdcutHandle:function(t,e,n){this.formInline.storeId=t,this.formInline.pageNum=1,this.formInline.pageSize=10,this.$emit("onSearchClick",self.formInline)},validFormInline:function(){var t=this.formInline,e=!1;for(var n in t)t[n]&&(e=!0);return e||this.$message({message:"查询商品至少填写一条查询条件",type:"warning"}),e}}}},"2zQe":function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},"62Gd":function(t,e,n){"use strict";function a(t){n("9AfC")}var o=n("2og3"),r=n("8VtJ"),i=n("mPyB"),c=a,s=i(o.a,r.a,!1,c,null,null);e.a=s.exports},"8VtJ":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{},[n("el-row",[n("el-col",{attrs:{span:2}},[n("el-button",{staticClass:"create-goods",attrs:{type:"primary",icon:"plus"},on:{click:t.linkHandle}},[t._v("创建商品")])],1),t._v(" "),n("el-col",{attrs:{span:22}},[n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline,rolus:t.formInline,rel:"formInline"}},[n("el-form-item",{attrs:{label:""}},[n("el-input",{attrs:{placeholder:"请输入商品名称"},model:{value:t.formInline.productTitle,callback:function(e){t.$set(t.formInline,"productTitle",e)},expression:"formInline.productTitle"}})],1),t._v(" "),n("el-form-item",{attrs:{label:""}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.formInline.productId,expression:"formInline.productId"}],staticClass:"el-input__inner",attrs:{type:"number",placeholder:"商品ID"},domProps:{value:t.formInline.productId},on:{input:function(e){e.target.composing||t.$set(t.formInline,"productId",e.target.value)}}})]),t._v(" "),n("el-form-item",{attrs:{label:""}},[n("el-select",{staticStyle:{width:"160px"},attrs:{placeholder:"店铺分类"},model:{value:t.formInline.storeCateId,callback:function(e){t.$set(t.formInline,"storeCateId",e)},expression:"formInline.storeCateId"}},[t._l(t.storeCate,function(e){return t.storeCate.length?[n("el-option",{attrs:{label:e.cateName,value:e.storeCateId}})]:t._e()})],2)],1),t._v(" "),n("el-form-item",{attrs:{label:""}},[n("el-date-picker",{attrs:{editable:!1,type:"datetimerange",placeholder:"选择日期范围"},on:{change:t.datePickerHandle},model:{value:t.createDate,callback:function(e){t.createDate=e},expression:"createDate"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")])],1)],1)],1)],1)],1)},o=[],r={render:a,staticRenderFns:o};e.a=r},"9AfC":function(t,e,n){var a=n("0eLF");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("6imX")("5cf4f856",a,!0)},AgeB:function(t,e,n){var a=n("f2Lk");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("6imX")("be5cf498",a,!0)},B75J:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("search-nav",{on:{onSearchClick:t.searchSubmitHandle}}),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"seller-table",staticStyle:{width:"100%"},attrs:{data:t.tableData}},[n("el-table-column",{attrs:{prop:"productId",label:"ID",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{prop:"productTitle",label:"商品名称",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{prop:"productCoverUrl",label:"图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[n("div",{staticClass:"table-pic"},[n("img",{attrs:{src:t.row.productCoverUrl}})])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"storeCateNameList",label:"店铺分类"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.storeCateNameList?n("span",[t._v(t._s(e.row.storeCateNameList.join("/")))]):t._e()]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"productSkuAllQuantity",label:"库存"}}),t._v(" "),n("el-table-column",{attrs:{prop:"productSellPrice",label:"展示价"}}),t._v(" "),n("el-table-column",{attrs:{prop:"productStatus",label:"上架状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t.getProductStatusValue(e.row.productStatus)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"operational",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text"},on:{click:function(n){t.onSoldOutHandle(e.row)}}},[t._v("下架")]),t._v(" "),n("el-button",{attrs:{type:"text"},on:{click:function(n){t.onEditorHandle(e.row)}}},[t._v("编辑")]),t._v(" "),e.row.productRecommend?n("el-button",{attrs:{type:"text"},on:{click:function(n){t.onRecommendOffHandle(e.row)}}},[t._v("取消推荐")]):n("el-button",{attrs:{type:"text"},on:{click:function(n){t.onRecommendOnHandle(e.row)}}},[t._v("推荐")])]}}])})],1),t._v(" "),t.pagination.total?[n("pagination",{attrs:{paginationConfig:t.pagination},on:{handleSizeChange:t.handleSizeChange,handleCurrentChange:t.handleCurrentChange}})]:t._e(),t._v(" "),n("el-dialog",{staticClass:"dialog-wrap",attrs:{visible:t.dialogVisible,size:"tiny",width:"300",title:t.dialogConfig.title},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("div",{staticClass:"block"},[n("h3",{staticClass:"tips"},[t._v(t._s(t.dialogConfig.content))])]),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.entryDialogHandle(t.tableRow)}}},[t._v("确 定")])],1)])],2)},o=[],r={render:a,staticRenderFns:o};e.a=r},CcaF:function(t,e,n){"use strict";n.d(e,"f",function(){return r}),n.d(e,"d",function(){return i}),n.d(e,"g",function(){return c}),n.d(e,"r",function(){return s}),n.d(e,"j",function(){return l}),n.d(e,"p",function(){return u}),n.d(e,"h",function(){return d}),n.d(e,"m",function(){return p}),n.d(e,"l",function(){return f}),n.d(e,"k",function(){return g}),n.d(e,"i",function(){return m}),n.d(e,"q",function(){return h}),n.d(e,"a",function(){return v}),n.d(e,"e",function(){return b}),n.d(e,"b",function(){return C}),n.d(e,"n",function(){return S}),n.d(e,"c",function(){return I}),n.d(e,"o",function(){return _});var a=n("Kriy"),o=window.config?window.config.apiHost:"",r=function(t){return a.a.get(o+"/product/category/store",{params:t})},i=function(t){return a.a.get(o+"/product/list",{params:t})},c=function(t){return a.a.post(o+"/product/cancelreview",t)},s=function(t){return a.a.post(o+"/product/ontheshelvestosoldout",t)},l=function(t){return a.a.post(o+"/product/recyclebintodraftbox",t)},u=function(t){return a.a.post(o+"/product/soldouttorecyclebin",t)},d=function(t){return a.a.post(o+"/product/draftboxdelete",t)},p=function(t){return a.a.post(o+"/product/ontheshelvesrecommendon",t)},f=function(t){return a.a.post(o+"/product/ontheshelvesrecommendoff",t)},g=function(t){return a.a.post(o+"/product/shelvesreadytoon",t)},m=function(t){return a.a.post(o+"/product/readytoshelvestosoldout",t)},h=function(t){return a.a.post(o+"/product/soldouttotheshelves",t)},v=function(t){return a.a.post(o+"/product/notpasstorecyclebin",t)},b=function(t){return a.a.get(o+"/store/cate/list",{params:t})},C=function(t){return a.a.get(o+"/product/create",{params:t})},S=function(t){return a.a.post(o+"/product/save",t)},I=function(t){return a.a.get(o+"/order/getNewestTemplate",{params:t})},_=function(t){return a.a.post(o+"/order/saveStoreShippingTemplate",t)}},JKvC:function(t,e,n){"use strict";var a=n("62Gd"),o=n("ZrfA"),r=n("TXHZ"),i=n("CcaF"),c=n("OexB"),s=n.n(c),l=window,u=l.config&&l.config.storeId?l.config.storeId:"";e.a={components:{SearchNav:a.a,Pagination:o.a},data:function(){return{searchData:{storeId:u,productId:"",productName:"",storeCateId:"",searchStartTime:"",searchEndTime:"",pageNum:1,pageSize:20,productStatus:3},pagination:{total:"",pageSize:20,curPage:1},listLoading:!0,tableRow:null,dialogConfig:{title:"",content:"",message:""},messageConfig:{},dialogVisible:!1,tableData:[]}},mounted:function(){},created:function(){this.getProductList({pageNum:this.pagination.curPage,pageSize:this.pagination.pageSize})},methods:{onEditorHandle:function(t){this.$router.push({path:"/seller-management/goods/editor",query:{productId:t.productId,productStatus:t.productStatus}})},onSoldOutHandle:function(t){var e=this;e.confirmHandle({title:"商品下架",content:"确定要下架这个商品吗"},function(){Object(i.r)({productId:t.productId,storeId:u}).then(function(t){0==t.data.code?(e.listLoading=!1,e.messageHandle("商品下架成功！","success"),e.getProductList({pageNum:e.pagination.curPage,pageSize:e.pagination.pageSize})):e.messageHandle(t.data.message,"warning")})})},onRecommendOnHandle:function(t){var e=this;t.productRecommend||e.confirmHandle({title:"商品推荐",content:"确定要推荐这个商品吗？"},function(){Object(i.m)({productId:t.productId,storeId:u}).then(function(t){0==t.data.code?(e.listLoading=!1,e.messageHandle("商品推荐成功！","success"),e.getProductList({pageNum:e.pagination.curPage,pageSize:e.pagination.pageSize})):e.messageHandle(t.data.message,"warning")})})},onRecommendOffHandle:function(t){var e=this;t.productRecommend&&e.confirmHandle({title:"商品取消推荐",content:"确定要取消推荐这个商品吗？"},function(){Object(i.l)({productId:t.productId,storeId:u}).then(function(t){t.data.data;0==t.data.code?(e.listLoading=!1,e.messageHandle("商品取消推荐成功！","success"),e.getProductList({pageNum:e.pagination.curPage,pageSize:e.pagination.pageSize})):e.messageHandle(t.data.message,"warning")})})},getProductStatusValue:function(t){var e=Object(r.a)(t);if(e)return e},getProductList:function(t){var e=this,n=s()(e.searchData,t);Object(i.d)(n).then(function(t){var a=t.data.data;0===t.data.code&&(e.tableData=a.list,e.pagination.total=parseInt(a.total),e.pagination.pageSize=n.pageSize,e.listLoading=!1)})},handleSizeChange:function(t){this.getProductList({pageNum:1,pageSize:t})},handleCurrentChange:function(t){this.getProductList({pageNum:t,pageSize:this.pagination.pageSize})},entryDialogHandle:function(t){var e=this;e.dialogVisible=!1,e.tableData.slice(t,1),e.$message({message:e.dialogConfig.message,type:"success"})},searchSubmitHandle:function(t){t&&this.getProductList(t)},messageHandle:function(t,e){this.$message({message:t,type:e})},confirmHandle:function(t,e){var n=this;n.$confirm(t.content,t.title,{type:"warning"}).then(function(){n.listLoading=!0,e()}).catch(function(){})}}}},OexB:function(t,e,n){(function(t){!function(e){function n(t,e){if("object"!==o(t))return e;for(var a in e)"object"===o(t[a])&&"object"===o(e[a])?t[a]=n(t[a],e[a]):t[a]=e[a];return t}function a(t,e,a){var i=a[0],c=a.length;(t||"object"!==o(i))&&(i={});for(var s=0;s<c;++s){var l=a[s];if("object"===o(l))for(var u in l){var d=t?r.clone(l[u]):l[u];i[u]=e?n(i[u],d):d}}return i}function o(t){return{}.toString.call(t).slice(8,-1).toLowerCase()}var r=function(t){return a(!0===t,!1,arguments)};r.recursive=function(t){return a(!0===t,!0,arguments)},r.clone=function(t){var e,n,a=t,i=o(t);if("array"===i)for(a=[],n=t.length,e=0;e<n;++e)a[e]=r.clone(t[e]);else if("object"===i){a={};for(e in t)a[e]=r.clone(t[e])}return a},e?t.exports=r:window.merge=r}("object"==typeof t&&t&&"object"==typeof t.exports&&t.exports)}).call(e,n("2zQe")(t))},RMoW:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-wrap"},[n("el-pagination",{attrs:{"current-page":t.paginationConfig.curPage,"page-sizes":[20,50,100],"page-size":t.paginationConfig.pageSize,layout:"sizes, prev, pager, next, jumper,total",total:t.paginationConfig.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},o=[],r={render:a,staticRenderFns:o};e.a=r},SphF:function(t,e,n){e=t.exports=n("bKW+")(!0),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"UpShelve.vue",sourceRoot:""}])},TXHZ:function(t,e,n){"use strict";n.d(e,"a",function(){return a});var a=function(t){var e="";switch(t){case 1:e="审核中";break;case 2:e="待上架";break;case 3:e="已上架";break;case 4:e="已下架";break;case 5:e="回收站";break;case 0:e="草稿箱";break;case-1:e="未通过"}return e}},WvFr:function(t,e,n){var a=n("SphF");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("6imX")("2865105a",a,!0)},Y0IZ:function(t,e,n){"use strict";e.a={data:function(){return{}},props:{paginationConfig:{type:Object,default:function(){return{total:"",pageSize:20,curPage:1}}}},mounted:function(){},methods:{handleSizeChange:function(t){this.$emit("handleSizeChange",t)},handleCurrentChange:function(t){this.$emit("handleCurrentChange",t)}}}},ZrfA:function(t,e,n){"use strict";function a(t){n("AgeB")}var o=n("Y0IZ"),r=n("RMoW"),i=n("mPyB"),c=a,s=i(o.a,r.a,!1,c,"data-v-43d3f91e",null);e.a=s.exports},f2Lk:function(t,e,n){e=t.exports=n("bKW+")(!0),e.push([t.i,"","",{version:3,sources:[],names:[],mappings:"",file:"Pagination.vue",sourceRoot:""}])},u16V:function(t,e,n){"use strict";function a(t){n("WvFr")}Object.defineProperty(e,"__esModule",{value:!0});var o=n("JKvC"),r=n("B75J"),i=n("mPyB"),c=a,s=i(o.a,r.a,!1,c,null,null);e.default=s.exports}});
//# sourceMappingURL=10.52e845d369080d867f4f.js.map