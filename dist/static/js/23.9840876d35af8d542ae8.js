webpackJsonp([23],{"LA/N":function(t,a,n){var e=n("aFaS");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("6imX")("29f8977a",e,!0)},aFaS:function(t,a,n){a=t.exports=n("bKW+")(!0),a.push([t.i,".find-good{padding:40px 0 0 40px}.find-good a{text-decoration:none}.find-good .tool-bar{margin-bottom:20px;background:none;padding:0}.find-good .cell a{color:#45cdb6}.find-good .cell span{color:#45cdb6;padding-left:20px;cursor:pointer}","",{version:3,sources:["E:/github/seller-center/src/views/shops/FindGood.vue"],names:[],mappings:"AACA,WACE,qBAAuB,CACxB,AACD,aACI,oBAAsB,CACzB,AACD,qBACI,mBAAoB,AACpB,gBAAiB,AACjB,SAAW,CACd,AACD,mBACI,aAAe,CAClB,AACD,sBACI,cAAe,AACf,kBAAmB,AACnB,cAAgB,CACnB",file:"FindGood.vue",sourcesContent:["\n.find-good {\n  padding: 40px 0 0 40px;\n}\n.find-good a {\n    text-decoration: none;\n}\n.find-good .tool-bar {\n    margin-bottom: 20px;\n    background: none;\n    padding: 0;\n}\n.find-good .cell a {\n    color: #45cdb6;\n}\n.find-good .cell span {\n    color: #45cdb6;\n    padding-left: 20px;\n    cursor: pointer;\n}\n"],sourceRoot:""}])},ihnd:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("section",{staticClass:"find-good"},[n("el-col",{staticClass:"tool-bar",staticStyle:{"padding-bottom":"0px"},attrs:{span:24}},[n("router-link",{attrs:{to:"/store/classify-management/all-good"}},[n("el-button",{attrs:{type:"primary"}},[t._v("关联其他商品")])],1)],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.datas}},[n("el-table-column",{attrs:{prop:"productId",label:"ID","min-width":"200",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"productTitle",label:"商品名称","min-width":"200",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{prop:"productStatus",formatter:t.formatUsed,label:"状态","min-width":"200",align:"center"}}),t._v(" "),n("el-table-column",{attrs:{label:"操作","min-width":"200",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[n("span",{staticStyle:{padding:"0"},on:{click:function(n){t.handleDel(a.row)}}},[t._v("移除")])]}}])})],1),t._v(" "),n("el-col",{staticClass:"tool-bar",staticStyle:{"margin-top":"20px"},attrs:{span:24}},[n("el-pagination",{staticStyle:{float:"right"},attrs:{"current-page":t.pageNum,"page-size":20,layout:"prev, pager, next, jumper,total",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1)},o=[],i={render:e,staticRenderFns:o};a.a=i},m5ju:function(t,a,n){"use strict";var e=n("pgiz");a.a={data:function(){return{pageSize:10,pageNum:1,datas:[],listLoading:!1,total:0}},methods:{formatUsed:function(t){var a="";switch(t.productStatus){case-1:a="未通过";break;case 0:a="草稿箱";break;case 1:a="审核中";break;case 2:a="待上架";break;case 3:a="已上架";break;case 4:a="已下架";break;case 5:a="回收站"}return a},getProductList:function(){var t=this,a={storeCateId:1,pageNum:this.pageNum,pageSize:this.pageSize};this.listLoading=!0,Object(e.A)(a).then(function(a){t.total=Number(a.data.data.total),t.datas=a.data.data.list,t.listLoading=!1}).catch(function(a){t.listLoading=!1})},handleDel:function(t){var a=this;this.$confirm("确定把该商品在该分类下移除吗?","提示",{type:"warning"}).then(function(){a.listLoading=!0;var n=new URLSearchParams;n.append("storeCateProductId",t.storeCateProductId),Object(e.C)(n).then(function(t){a.listLoading=!1,a.getProductList()}).catch(function(t){a.listLoading=!1})})},handleCurrentChange:function(t){this.page=t,this.getProductList()}},mounted:function(){this.getProductList()}}},zrdF:function(t,a,n){"use strict";function e(t){n("LA/N")}Object.defineProperty(a,"__esModule",{value:!0});var o=n("m5ju"),i=n("ihnd"),r=n("mPyB"),s=e,d=r(o.a,i.a,!1,s,null,null);a.default=d.exports}});
//# sourceMappingURL=23.9840876d35af8d542ae8.js.map