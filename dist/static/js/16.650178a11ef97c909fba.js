webpackJsonp([16],{"3SZ7":function(n,e,t){n.exports={default:t("CnbX"),__esModule:!0}},CnbX:function(n,e,t){var a=t("ZBPP"),r=a.JSON||(a.JSON={stringify:JSON.stringify});n.exports=function(n){return r.stringify.apply(r,arguments)}},LIFQ:function(n,e,t){"use strict";var a=t("3SZ7"),r=t.n(a),s=t("Ecxi"),o=t("oNVN"),l=t("pgiz");e.a={components:{CategoryBar:s.a,CategoryMenu:o.a},data:function(){return{categoryBarTitle:"选择品牌",secondIndustryList:"secondIndustryList",brandList:"brandList",curCateName:{},stCateName:"",categoryData:[],industryCateId:[],industryCateIdList:[],secoundCategoryData:[],brands:{},logosBtn:["全部","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],logos:[],allBrand:[],thisIndex:0}},methods:{firstHandle:function(n,e){this.stCateName="",this.stCateName=n.industryCateName,this.secoundCategoryData=n.secondIndustryList,this.thirstCategoryData=[],this.logos=[]},secondHandle:function(n,e){this.thirstCategoryData=[],this.allBrand=this.logos=n.brandList,this.industryCateId.push(n.industryCateId)},thirdHandle:function(n){if(n.active)this.$set(n,"active",!1),this.$delete(this.curCateName,n.brandId);else{this.$set(n,"active",!0);var e={nameCn:n.nameCn};"中国大陆"==n.registerLocation?e.registerLocation=1:e.registerLocation=2,this.$set(this.curCateName,n.brandId,e)}},delBrand:function(n,e){console.log(n,e);var t=this;this.$delete(this.curCateName,e),this.logos.forEach(function(n){if(n.brandId==e)return t.$set(n,"active",!1),!1})},addBrandBtn:function(){"{}"==r()(this.curCateName)?this.$message({message:"请选择品牌",type:"warning"}):(sessionStorage.setItem("addBrand",r()(this.curCateName)),this.$router.push({path:"/store/brand-management/add-brand",query:{add:"y"}}))},searchBrand:function(n,e){if(this.thisIndex=e,0==e)this.logos=this.allBrand;else{this.logos=[];for(var t=0;t<this.allBrand.length;t++)this.allBrand[t].nameEn.substr(0,1).toUpperCase()==n&&this.logos.push(this.allBrand[t])}}},mounted:function(){var n=this,e={storeId:config.storeId};this.listLoading=!0,Object(l.q)(e).then(function(e){n.listLoading=!1,0==e.data.code&&(n.categoryData=e.data.data)}).catch(function(e){n.listLoading=!1})}}},WIqQ:function(n,e,t){"use strict";function a(n){t("oEhV")}Object.defineProperty(e,"__esModule",{value:!0});var r=t("LIFQ"),s=t("uhAP"),o=t("mPyB"),l=a,A=o(r.a,s.a,!1,l,null,null);e.default=A.exports},oEhV:function(n,e,t){var a=t("r7fY");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("6imX")("53e47a8c",a,!0)},r7fY:function(n,e,t){e=n.exports=t("bKW+")(!0),e.push([n.i,'.sel-brand{padding:20px 0 0 20px}.sel-brand a{text-decoration:none;color:#333}.sel-brand ol,.sel-brand ul{list-style:none;padding:0}.sel-brand h3,.sel-brand ol,.sel-brand p,.sel-brand ul{margin:0}.sel-brand .el-dialog__header{background:#f5f7fa;-webkit-box-shadow:inset 0 -1px 0 0 #ddd;box-shadow:inset 0 -1px 0 0 #ddd;padding:15px 20px}.sel-brand .show-sel{width:980px;background:#f5f7fa;border:1px solid #41cac0;height:27px;padding:5px 0;margin-top:20px;font-size:12px;position:relative}.sel-brand .show-sel .brand-sel{padding-left:20px;font-size:12px;min-width:150px;float:left}.sel-brand .show-sel .brand-sel b{color:#333}.sel-brand .show-sel .brand-sel i{font-style:normal}.sel-brand .show-sel .brand-sel span{cursor:pointer;position:relative;margin-right:20px}.sel-brand .show-sel .brand-sel span b{font-weight:100}.sel-brand .show-sel .brand-sel span i{position:absolute;display:block;top:-10px;right:-14px;color:red}.sel-brand .show-sel .brand-btn{float:right;width:220px;text-align:right;padding-right:20px;color:#333;font-size:12px}.sel-brand .show-sel:after,.sel-brand .show-sel:before{border:solid transparent;content:" ";height:0;left:44px;position:absolute;width:0}.sel-brand .show-sel:before{border-width:8px;border-bottom-color:#41cac0;top:-16px}.sel-brand .show-sel:after{border-width:7px;border-bottom-color:#f5f7fa;top:-14px;left:45px}.sel-brand .btns{width:980px;text-align:center;margin-top:30px}.sel-brand .btns a{margin-left:30px}.sel-brand .all-logo{width:500px;height:365px;border:1px solid #ddd;border-left:0}.sel-brand .all-logo ul{height:40px;line-height:40px;border-bottom:1px solid #ddd}.sel-brand .all-logo ul li{display:inline-block;width:17px;cursor:pointer;text-align:center;display:inline;padding:0 4px}.sel-brand .all-logo ul li.sel{color:#41cac0}.sel-brand .all-logo ol{padding:8px 0}.sel-brand .all-logo ol li{display:inline-block;width:112px;text-align:center;height:34px;line-height:34px;cursor:pointer;margin:0 0 10px 10px}.sel-brand .all-logo ol li.on{color:#41cac0;background:#eee}.sel-brand .no-bor .category-nav{border-left:0}.selbrand .hezi .searchbrand::-webkit-input-placeholder{color:#333}.selbrand .hezi .searchbrand:-moz-placeholder,.selbrand .hezi .searchbrand::-moz-placeholder{color:#333}.selbrand .hezi .searchbrand:-ms-input-placeholder{color:#333}',"",{version:3,sources:["E:/github/seller-center/src/views/shops/SelBrand.vue"],names:[],mappings:"AACA,WACE,qBAAuB,CACxB,AACD,aACI,qBAAsB,AACtB,UAAY,CACf,AACD,4BACI,gBAAiB,AACjB,SAAW,CACd,AACD,uDACI,QAAU,CACb,AACD,8BACI,mBAAoB,AACpB,yCAA6C,AACrC,iCAAqC,AAC7C,iBAAmB,CACtB,AACD,qBACI,YAAa,AACb,mBAAoB,AACpB,yBAA0B,AAC1B,YAAa,AACb,cAAe,AACf,gBAAiB,AACjB,eAAgB,AAChB,iBAAmB,CACtB,AACD,gCACM,kBAAmB,AACnB,eAAgB,AAChB,gBAAiB,AACjB,UAAY,CACjB,AACD,kCACQ,UAAY,CACnB,AACD,kCACQ,iBAAmB,CAC1B,AACD,qCACQ,eAAgB,AAChB,kBAAmB,AACnB,iBAAmB,CAC1B,AACD,uCACU,eAAiB,CAC1B,AACD,uCACU,kBAAmB,AACnB,cAAe,AACf,UAAW,AACX,YAAa,AACb,SAAW,CACpB,AACD,gCACM,YAAa,AACb,YAAa,AACb,iBAAkB,AAClB,mBAAoB,AACpB,WAAY,AACZ,cAAgB,CACrB,AACD,uDACI,yBAA0B,AAC1B,YAAa,AACb,SAAU,AACV,UAAW,AACX,kBAAmB,AACnB,OAAS,CACZ,AACD,4BACI,iBAAkB,AAClB,4BAA6B,AAC7B,SAAW,CACd,AACD,2BACI,iBAAkB,AAClB,4BAA6B,AAC7B,UAAW,AACX,SAAW,CACd,AACD,iBACI,YAAa,AAEb,kBAAmB,AACnB,eAAiB,CACpB,AACD,mBACM,gBAAkB,CACvB,AACD,qBACI,YAAa,AACb,aAAc,AACd,sBAAuB,AACvB,aAAe,CAClB,AACD,wBACM,YAAa,AACb,iBAAkB,AAClB,4BAA8B,CACnC,AACD,2BACQ,qBAAsB,AACtB,WAAY,AACZ,eAAgB,AAChB,kBAAmB,AACnB,eAAgB,AAChB,aAAe,CACtB,AACD,+BACQ,aAAe,CACtB,AACD,wBACM,aAAe,CACpB,AACD,2BACQ,qBAAsB,AACtB,YAAa,AACb,kBAAmB,AACnB,YAAa,AACb,iBAAkB,AAClB,eAAgB,AAChB,oBAAsB,CAC7B,AACD,8BACQ,cAAe,AACf,eAAiB,CACxB,AACD,iCACI,aAAe,CAClB,AACD,wDAEE,UAAY,CACb,AAKD,6FAEE,UAAY,CACb,AACD,mDAEE,UAAY,CACb",file:"SelBrand.vue",sourcesContent:["\n.sel-brand {\n  padding: 20px 0 0 20px;\n}\n.sel-brand a {\n    text-decoration: none;\n    color: #333;\n}\n.sel-brand ul, .sel-brand ol {\n    list-style: none;\n    padding: 0;\n}\n.sel-brand h3, .sel-brand p, .sel-brand ul, .sel-brand ol {\n    margin: 0;\n}\n.sel-brand .el-dialog__header {\n    background: #f5f7fa;\n    -webkit-box-shadow: inset 0 -1px 0 0 #dddddd;\n            box-shadow: inset 0 -1px 0 0 #dddddd;\n    padding: 15px 20px;\n}\n.sel-brand .show-sel {\n    width: 980px;\n    background: #f5f7fa;\n    border: 1px solid #41cac0;\n    height: 27px;\n    padding: 5px 0;\n    margin-top: 20px;\n    font-size: 12px;\n    position: relative;\n}\n.sel-brand .show-sel .brand-sel {\n      padding-left: 20px;\n      font-size: 12px;\n      min-width: 150px;\n      float: left;\n}\n.sel-brand .show-sel .brand-sel b {\n        color: #333;\n}\n.sel-brand .show-sel .brand-sel i {\n        font-style: normal;\n}\n.sel-brand .show-sel .brand-sel span {\n        cursor: pointer;\n        position: relative;\n        margin-right: 20px;\n}\n.sel-brand .show-sel .brand-sel span b {\n          font-weight: 100;\n}\n.sel-brand .show-sel .brand-sel span i {\n          position: absolute;\n          display: block;\n          top: -10px;\n          right: -14px;\n          color: red;\n}\n.sel-brand .show-sel .brand-btn {\n      float: right;\n      width: 220px;\n      text-align: right;\n      padding-right: 20px;\n      color: #333;\n      font-size: 12px;\n}\n.sel-brand .show-sel:before, .sel-brand .show-sel:after {\n    border: solid transparent;\n    content: ' ';\n    height: 0;\n    left: 44px;\n    position: absolute;\n    width: 0;\n}\n.sel-brand .show-sel:before {\n    border-width: 8px;\n    border-bottom-color: #41cac0;\n    top: -16px;\n}\n.sel-brand .show-sel:after {\n    border-width: 7px;\n    border-bottom-color: #f5f7fa;\n    top: -14px;\n    left: 45px;\n}\n.sel-brand .btns {\n    width: 980px;\n    text-align: center;\n    text-align: center;\n    margin-top: 30px;\n}\n.sel-brand .btns a {\n      margin-left: 30px;\n}\n.sel-brand .all-logo {\n    width: 500px;\n    height: 365px;\n    border: 1px solid #ddd;\n    border-left: 0;\n}\n.sel-brand .all-logo ul {\n      height: 40px;\n      line-height: 40px;\n      border-bottom: 1px solid #ddd;\n}\n.sel-brand .all-logo ul li {\n        display: inline-block;\n        width: 17px;\n        cursor: pointer;\n        text-align: center;\n        display: inline;\n        padding: 0 4px;\n}\n.sel-brand .all-logo ul li.sel {\n        color: #41cac0;\n}\n.sel-brand .all-logo ol {\n      padding: 8px 0;\n}\n.sel-brand .all-logo ol li {\n        display: inline-block;\n        width: 112px;\n        text-align: center;\n        height: 34px;\n        line-height: 34px;\n        cursor: pointer;\n        margin: 0 0 10px 10px;\n}\n.sel-brand .all-logo ol li.on {\n        color: #41cac0;\n        background: #eee;\n}\n.sel-brand .no-bor .category-nav {\n    border-left: 0;\n}\n.selbrand .hezi .searchbrand::-webkit-input-placeholder {\n  /* WebKit browsers */\n  color: #333;\n}\n.selbrand .hezi .searchbrand:-moz-placeholder {\n  /* Mozilla Firefox 4 to 18 */\n  color: #333;\n}\n.selbrand .hezi .searchbrand::-moz-placeholder {\n  /* Mozilla Firefox 19+ */\n  color: #333;\n}\n.selbrand .hezi .searchbrand:-ms-input-placeholder {\n  /* Internet Explorer 10+ */\n  color: #333;\n}\n"],sourceRoot:""}])},uhAP:function(n,e,t){"use strict";var a=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("section",{staticClass:"sel-brand"},[t("category-bar",{attrs:{title:n.categoryBarTitle}}),n._v(" "),t("div",{staticStyle:{"min-width":"980px"}},[t("el-row",[t("el-col",{staticStyle:{width:"240px"},attrs:{span:8}},[t("category-menu",{attrs:{title:"一级行业",categoryData:n.categoryData,arrKey:n.secondIndustryList},on:{categoryClick:n.firstHandle}})],1),n._v(" "),t("el-col",{staticClass:"no-bor",staticStyle:{width:"240px"},attrs:{span:8}},[n.secoundCategoryData.length?t("category-menu",{attrs:{title:"二级行业",categoryData:n.secoundCategoryData,arrKey:n.brandList},on:{categoryClick:n.secondHandle}}):n._e()],1),n._v(" "),n.logos.length||n.allBrand.length?t("el-col",{staticClass:"all-logo",staticStyle:{"min-width":"240px"},attrs:{span:8}},[t("ul",n._l(n.logosBtn,function(e,a){return t("li",{class:{sel:a==n.thisIndex},on:{click:function(t){n.searchBrand(e,a)}}},[n._v(n._s(e))])})),n._v(" "),t("ol",n._l(n.logos,function(e,a){return t("li",{class:{on:e.active},on:{click:function(t){n.thirdHandle(e,a)}}},[n._v(n._s(e.nameCn))])}))]):n._e()],1)],1),n._v(" "),t("div",{staticClass:"show-sel"},[t("div",{staticClass:"brand-sel"},[n.curCateName?t("b",[n._v("您当前选择的是：")]):n._e(),n._v(" "),"{}"==JSON.stringify(n.curCateName)?t("i",[n._v("无")]):n._e(),n._v(" "),n._l(n.curCateName,function(e,a){return n.curCateName?[t("span",[t("b",[n._v(n._s(e.nameCn))]),t("i",{staticClass:"iconfont icon-guanbi1",on:{click:function(t){n.delBrand(e,a)}}})])]:n._e()})],2),n._v(" "),t("div",{staticClass:"brand-btn"},[t("span",[n._v("没有找到品牌？——")]),n._v(" "),t("router-link",{staticClass:"addbrand",attrs:{to:"/store/brand-management/create-brand"}},[n._v("创建品牌")])],1)]),n._v(" "),t("div",{staticClass:"btns"},[t("el-button",{attrs:{type:"primary"},on:{click:n.addBrandBtn}},[n._v("确定")]),n._v(" "),t("router-link",{attrs:{to:"/store/brand-management"}},[t("el-button",[n._v("取消")])],1)],1)],1)},r=[],s={render:a,staticRenderFns:r};e.a=s}});
//# sourceMappingURL=16.650178a11ef97c909fba.js.map