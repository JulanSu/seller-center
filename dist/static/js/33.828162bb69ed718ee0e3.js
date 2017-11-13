webpackJsonp([33],{QXZZ:function(t,e,a){"use strict";var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return"活动管理"==t.$route.name?a("section",{staticClass:"table-container"},[a("el-tabs",{attrs:{type:"card"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{staticClass:"tab-select",attrs:{label:"店铺活动",name:"storeActive"}},[a("el-row",{staticClass:"search"},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"活动状态"},model:{value:t.storeStatus,callback:function(e){t.storeStatus=e},expression:"storeStatus"}},t._l(t.options1,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-select",{staticStyle:{width:"120px","margin-left":"20px"},attrs:{placeholder:"营销工具"},model:{value:t.toolCheck,callback:function(e){t.toolCheck=e},expression:"toolCheck"}},t._l(t.options2,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-input",{staticClass:"search-input",attrs:{placeholder:"输入活动名称/ID查询"},model:{value:t.storeKeyword,callback:function(e){t.storeKeyword=e},expression:"storeKeyword"}}),t._v(" "),a("el-button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:t.searchStore}},[t._v("查询")])],1),t._v(" "),a("el-table",{staticClass:"table-con",attrs:{data:t.storeTable,align:"center","row-style":{height:"100px"}}},[a("el-table-column",{attrs:{prop:"marketingActivityId",label:"活动ID",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"activityName",label:"活动名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"toolsName",label:"营销工具",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"活动时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(t.switchTime(e.row.activityBeginTime))+" 至 "+t._s(t.switchTime(e.row.activityEndTime)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"创建时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(t.switchTime(e.row.createAt)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"活动状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(t.switchStoreStatus(e.row.activityShowStatus)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{color:"#45cdb6"},attrs:{type:"text",size:"small"},on:{click:function(a){t.storeNextGo(e.row)}}},[t._v("编辑")])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPageStore,"page-sizes":[20,50,100],"page-size":t.pageSizeStore,layout:"sizes, prev, pager, next, jumper,total",total:t.totalStore},on:{"size-change":t.storeSizeChange,"current-change":t.storeCurrentChange}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"平台活动",name:"platformActive"}},[a("el-row",{staticClass:"search"},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"活动状态"},model:{value:t.platStatus,callback:function(e){t.platStatus=e},expression:"platStatus"}},t._l(t.options3,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-select",{staticStyle:{width:"120px","margin-left":"20px"},attrs:{placeholder:"报名状态"},model:{value:t.signStatus,callback:function(e){t.signStatus=e},expression:"signStatus"}},t._l(t.options4,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-select",{staticStyle:{width:"120px","margin-left":"20px"},attrs:{placeholder:"审核状态"},model:{value:t.auditStatus,callback:function(e){t.auditStatus=e},expression:"auditStatus"}},t._l(t.options5,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-input",{staticClass:"search-input",attrs:{placeholder:"输入活动名称/ID查询"},model:{value:t.platKeyword,callback:function(e){t.platKeyword=e},expression:"platKeyword"}}),t._v(" "),a("el-button",{staticClass:"search-btn",attrs:{type:"primary"},on:{click:t.searchPlat}},[t._v("查询")])],1),t._v(" "),a("el-table",{staticClass:"table-con",attrs:{data:t.platTable,align:"center","row-style":{height:"100px"}}},[a("el-table-column",{attrs:{prop:"marketingActivityId",label:"活动ID",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"activityName",label:"活动名称",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"活动时间",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(t.switchTime(e.row.activityBeginTime))+" 至 "+t._s(t.switchTime(e.row.activityEndTime)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"报名状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(t.switchStatus(e.row.signStatus).sign))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"审核状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(t.switchStatus(e.row.auditStatus).audit))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"活动状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[t._v(t._s(t.switchStatus(e.row.activityShowStatus).plat))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{color:"#45cdb6"},attrs:{type:"text",size:"small"},on:{click:function(a){t.platNextGo(e.row)}}},[t._v("编辑")])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPagePlat,"page-sizes":[20,50,100],"page-size":t.pageSizePlat,layout:"sizes, prev, pager, next, jumper,total",total:t.totalPlat},on:{"size-change":t.platSizeChange,"current-change":t.platCurrentChange}})],1)],1)],1)],1):a("section",[a("el-row",[a("router-view")],1)],1)},n=[],r={render:l,staticRenderFns:n};e.a=r},Rqaw:function(t,e,a){var l=a("a4dk");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("6imX")("77eda10f",l,!0)},a4dk:function(t,e,a){e=t.exports=a("bKW+")(!0),e.push([t.i,".table-container{width:100%;float:left;padding-top:20px}.table-container .el-col{padding:20px}.table-container .el-tabs__item{vertical-align:bottom}.table-container .is-active{border-top:3px solid #45cdb6!important}.table-container .search{margin:20px 0;padding:0}.table-container .search-input{width:200px;margin-left:20px}.table-container .search-btn{margin-left:20px;width:60px;text-align:center;color:#fff;font-size:12px;background:#45cdb6;border:none}.table-container .row-sty{color:red;height:100px}.table-container .table-con{text-align:center}.table-container .block{margin-top:30px;float:right}","",{version:3,sources:["E:/github/seller-center/src/views/active/Management.vue"],names:[],mappings:"AACA,iBACE,WAAY,AACZ,WAAY,AACZ,gBAAkB,CACnB,AACD,yBACI,YAAmB,CACtB,AACD,gCACI,qBAAuB,CAC1B,AACD,4BACI,sCAAyC,CAC5C,AACD,yBACI,cAAe,AACf,SAAW,CACd,AACD,+BACI,YAAa,AACb,gBAAkB,CACrB,AACD,6BACI,iBAAkB,AAClB,WAAY,AACZ,kBAAmB,AACnB,WAAY,AACZ,eAAgB,AAChB,mBAAoB,AACpB,WAAa,CAChB,AACD,0BACI,UAAY,AACZ,YAAc,CACjB,AACD,4BACI,iBAAmB,CACtB,AACD,wBACI,gBAAiB,AACjB,WAAa,CAChB",file:"Management.vue",sourcesContent:["\n.table-container {\n  width: 100%;\n  float: left;\n  padding-top: 20px;\n}\n.table-container .el-col {\n    padding: 20px 20px;\n}\n.table-container .el-tabs__item {\n    vertical-align: bottom;\n}\n.table-container .is-active {\n    border-top: 3px solid #45cdb6 !important;\n}\n.table-container .search {\n    margin: 20px 0;\n    padding: 0;\n}\n.table-container .search-input {\n    width: 200px;\n    margin-left: 20px;\n}\n.table-container .search-btn {\n    margin-left: 20px;\n    width: 60px;\n    text-align: center;\n    color: #fff;\n    font-size: 12px;\n    background: #45cdb6;\n    border: none;\n}\n.table-container .row-sty {\n    color: #f00;\n    height: 100px;\n}\n.table-container .table-con {\n    text-align: center;\n}\n.table-container .block {\n    margin-top: 30px;\n    float: right;\n}\n"],sourceRoot:""}])},aOEQ:function(t,e,a){"use strict";function l(t){a("Rqaw")}Object.defineProperty(e,"__esModule",{value:!0});var n=a("quSE"),r=a("QXZZ"),o=a("mPyB"),i=l,s=o(n.a,r.a,!1,i,null,null);e.default=s.exports},quSE:function(t,e,a){"use strict";var l=a("8bmq");e.a={data:function(){return{activeName:"storeActive",currentPageStore:1,pageSizeStore:20,totalStore:0,storeKeyword:null,storeStatus:null,toolCheck:null,options1:[{value:0,label:"全部"},{value:3,label:"未开始"},{value:1,label:"进行中"},{value:2,label:"已结束"}],options2:[{value:0,label:"全部"},{value:1,label:"现金券"}],storeTable:[],platTable:[],currentPagePlat:1,pageSizePlat:20,totalPlat:0,platStatus:null,signStatus:null,auditStatus:null,platKeyword:"",options3:[{value:0,label:"全部"},{value:3,label:"未开始"},{value:1,label:"进行中"},{value:2,label:"已结束"}],options4:[{value:0,label:"全部"},{value:2,label:"确认参与"},{value:1,label:"未回应"},{value:3,label:"逾期未回应"}],options5:[{value:0,label:"全部"},{value:1,label:"未审核"},{value:2,label:"审核通过"},{value:3,label:"审核不通过"}]}},created:function(){var t={storeId:config.toolsStoreId,toolsId:1,activityStatus:0,page:1,size:20};this.getStoreData(t);var e={storeId:config.toolsStoreId,activityStatus:0,signStatus:0,auditStatus:0,page:1,size:20};this.getPlatData(e)},methods:{searchStore:function(){var t=this;t.getStoreData(t.getStoreParams())},getStoreParams:function(){var t=this;return{storeId:config.toolsStoreId,toolsId:1,activityStatus:t.storeStatus,page:t.currentPageStore,size:t.pageSizeStore,keyword:t.storeKeyword}},getStoreData:function(t){var e=this;Object(l.j)(t).then(function(t){e.storeTable=t.data.data.list,e.totalStore=Number(t.data.data.total)})},storeSizeChange:function(t){var e=this;e.pageSizeStore=t,e.getStoreData(e.getStoreParams())},storeCurrentChange:function(t){var e=this;e.currentPageStore=t,e.getStoreData(e.getStoreParams())},storeNextGo:function(t){var e=this,a={type:"store",actStatus:t.activityShowStatus,actId:t.marketingActivityId};e.$router.push({path:"/marketing-center/tool/create",query:a})},switchStoreStatus:function(t){switch(t){case 0:return"未开始";case 1:return"进行中";default:return"已结束"}},searchPlat:function(){var t=this;t.getPlatData(t.getPlatParams())},getPlatParams:function(){var t=this;return{storeId:config.toolsStoreId,activityStatus:t.platStatus,signStatus:t.signStatus,auditStatus:t.auditStatus,page:t.currentPagePlat,size:t.pageSizePlat,keyword:t.platKeyword}},getPlatData:function(t){var e=this;Object(l.h)(t).then(function(t){e.platTable=t.data.data.list,e.totalPlat=Number(t.data.data.total)})},switchStatus:function(t){var e={};switch(t){case 0:e={plat:"未开始",sign:"未回应",audit:"未审核"};break;case 1:e={plat:"进行中",sign:"确定参加",audit:"审核通过"};break;case 2:e={plat:"已结束",sign:"逾期未回应",audit:"审核不通过"}}return e},switchTime:function(t){function e(t){return t<10?"0"+t:t}var a=new Date(t),l=a.getFullYear(),n=a.getMonth()+1,r=a.getDate(),o=a.getHours(),i=a.getMinutes(),s=a.getSeconds();return l+"-"+e(n)+"-"+e(r)+" "+e(o)+":"+e(i)+":"+e(s)},platSizeChange:function(t){var e=this;e.pageSizePlat=t,e.getPlatData(e.getPlatParams())},platCurrentChange:function(t){var e=this;e.currentPagePlat=t,e.getPlatData(e.getPlatParams())},platNextGo:function(t){var e=this,a=t.marketingActivityId,l=t.signStatus,n=t.auditStatus;e.$router.push({path:"/marketing-center/management/attend",query:{type:"platform",actId:a,signStatus:l,auditStatus:n}})}}}}});
//# sourceMappingURL=33.828162bb69ed718ee0e3.js.map