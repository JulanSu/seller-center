webpackJsonp([36],{"3mB+":function(n,s,i){s=n.exports=i("bKW+")(!0),s.push([n.i,".bypass-index{width:962px;padding:20px 0 0 20px}.bypass-index a{text-decoration:none}.bypass-index h2{margin:0;font-size:14px;color:#333;height:44px;line-height:44px;padding-left:20px;font-weight:100;background:#f5f7fa;-webkit-box-shadow:0 1px 0 0 #ddd;box-shadow:0 1px 0 0 #ddd}.bypass-index ul{padding:0;margin-top:0;height:95px;line-height:95px;border:1px solid #ddd;margin-bottom:30px;list-style:none}.bypass-index ul li{float:left;width:306px;height:93px;text-align:center}.bypass-index ul li span{font-size:14px;color:#666;padding-right:15px}.bypass-index ul li b{font-size:30px;color:#ff6c60}.bypass-index ul li a{display:block}.bypass-index ul li:first-of-type b{color:#6bcac9}.bypass-index ul li:nth-of-type(3) b{color:#56c8f2}.bypass-index .bapass-btn{cursor:pointer;background:#f5f7fa}.bypass-index .bapass-btn li:hover{background:#fff}.bypass-index .bapass-btn li:hover span{color:#41cac0!important}.bypass-index .bapass-btn li i{font-size:24px;color:#41cac0;padding-right:10px;vertical-align:middle}","",{version:3,sources:["E:/github/seller-center/src/views/shops/BypassManagement.vue"],names:[],mappings:"AACA,cACE,YAAa,AACb,qBAAuB,CACxB,AACD,gBACI,oBAAsB,CACzB,AACD,iBACI,SAAU,AACV,eAAgB,AAChB,WAAe,AACf,YAAa,AACb,iBAAkB,AAClB,kBAAmB,AACnB,gBAAiB,AACjB,mBAAoB,AACpB,kCAAsC,AAC9B,yBAA8B,CACzC,AACD,iBACI,UAAW,AACX,aAAc,AACd,YAAa,AACb,iBAAkB,AAClB,sBAAuB,AACvB,mBAAoB,AACpB,eAAiB,CACpB,AACD,oBACM,WAAY,AACZ,YAAa,AACb,YAAa,AACb,iBAAmB,CACxB,AACD,yBACQ,eAAgB,AAChB,WAAe,AACf,kBAAoB,CAC3B,AACD,sBACQ,eAAgB,AAChB,aAAe,CACtB,AACD,sBACQ,aAAe,CACtB,AACD,oCACM,aAAe,CACpB,AACD,qCACM,aAAe,CACpB,AACD,0BACI,eAAgB,AAChB,kBAAoB,CACvB,AACD,mCACM,eAAiB,CACtB,AACD,wCACQ,uBAA0B,CACjC,AACD,+BACM,eAAgB,AAChB,cAAe,AACf,mBAAoB,AACpB,qBAAuB,CAC5B",file:"BypassManagement.vue",sourcesContent:["\n.bypass-index {\n  width: 962px;\n  padding: 20px 0 0 20px;\n}\n.bypass-index a {\n    text-decoration: none;\n}\n.bypass-index h2 {\n    margin: 0;\n    font-size: 14px;\n    color: #333333;\n    height: 44px;\n    line-height: 44px;\n    padding-left: 20px;\n    font-weight: 100;\n    background: #f5f7fa;\n    -webkit-box-shadow: 0 1px 0 0 #dddddd;\n            box-shadow: 0 1px 0 0 #dddddd;\n}\n.bypass-index ul {\n    padding: 0;\n    margin-top: 0;\n    height: 95px;\n    line-height: 95px;\n    border: 1px solid #ddd;\n    margin-bottom: 30px;\n    list-style: none;\n}\n.bypass-index ul li {\n      float: left;\n      width: 306px;\n      height: 93px;\n      text-align: center;\n}\n.bypass-index ul li span {\n        font-size: 14px;\n        color: #666666;\n        padding-right: 15px;\n}\n.bypass-index ul li b {\n        font-size: 30px;\n        color: #ff6c60;\n}\n.bypass-index ul li a {\n        display: block;\n}\n.bypass-index ul li:nth-of-type(1) b {\n      color: #6bcac9;\n}\n.bypass-index ul li:nth-of-type(3) b {\n      color: #56c8f2;\n}\n.bypass-index .bapass-btn {\n    cursor: pointer;\n    background: #f5f7fa;\n}\n.bypass-index .bapass-btn li:hover {\n      background: #fff;\n}\n.bypass-index .bapass-btn li:hover span {\n        color: #41cac0 !important;\n}\n.bypass-index .bapass-btn li i {\n      font-size: 24px;\n      color: #41cac0;\n      padding-right: 10px;\n      vertical-align: middle;\n}\n"],sourceRoot:""}])},JVOl:function(n,s,i){var t=i("3mB+");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);i("6imX")("25301781",t,!0)},LoUh:function(n,s,i){"use strict";var t=i("pgiz");s.a={data:function(){return{listLoading:!1,formList:{total:0,unUsedNum:0,usedNum:0}}},watch:{$route:function(n,s){"/store/bypass-management"==this.$route.path&&this.getNum()}},methods:{jump:function(){if(this.getNum(),this.formList.usedNum>=5)return this.$message({message:"子账号使用数量已满，先去冻结子账号",type:"warning"}),!1;this.$router.push({path:"/store/bypass-management/new-account"})},getNum:function(){var n=this,s={storeId:config.storeId};this.listLoading=!0,Object(t.w)(s).then(function(s){n.listLoading=!1,0==s.data.code?n.formList=s.data.data:n.$message.error(s.data.message)}).catch(function(s){n.listLoading=!1,n.$message.error("接口建立连接失败")})}},mounted:function(){this.getNum()}}},WOON:function(n,s,i){"use strict";function t(n){i("JVOl")}Object.defineProperty(s,"__esModule",{value:!0});var e=i("LoUh"),a=i("wntV"),o=i("mPyB"),A=t,p=o(e.a,a.a,!1,A,null,null);s.default=p.exports},wntV:function(n,s,i){"use strict";var t=function(){var n=this,s=n.$createElement,i=n._self._c||s;return"子账号管理"==n.$route.name?i("section",{directives:[{name:"loading",rawName:"v-loading",value:n.listLoading,expression:"listLoading"}],staticClass:"bypass-index"},[i("h2",[n._v("账号概况")]),n._v(" "),i("ul",{staticClass:"use-style"},[i("li",[i("span",[n._v("使用中")]),n._v(" "),i("b",[n._v(n._s(n.formList.usedNum))])]),n._v(" "),i("li",[i("span",[n._v("可激活")]),n._v(" "),i("b",[n._v(n._s(n.formList.unUsedNum))])]),n._v(" "),i("li",[i("span",[n._v("总数")]),n._v(" "),i("b",[n._v(n._s(n.formList.total))])])]),n._v(" "),i("ul",{staticClass:"use-style bapass-btn"},[i("li",{on:{click:n.jump}},[i("i",{staticClass:"iconfont icon-zizhanghao"}),n._v(" "),i("span",[n._v("新建子账号")])]),n._v(" "),i("li",{staticStyle:{"border-left":"1px solid #ddd","border-right":"1px solid #ddd"}},[i("router-link",{attrs:{to:"/store/bypass-management/role-list"}},[i("i",{staticClass:"iconfont icon-gangweijiaose"}),n._v(" "),i("span",[n._v("岗位角色")])])],1),n._v(" "),i("li",{staticStyle:{width:"326px"}},[i("router-link",{attrs:{to:"/store/bypass-management/account-list"}},[i("i",{staticClass:"iconfont icon-zizhanghaoliebiao"}),n._v(" "),i("span",[n._v("子账号列表")])])],1)])]):i("router-view")},e=[],a={render:t,staticRenderFns:e};s.a=a}});
//# sourceMappingURL=36.e318b3754f58a3d4542c.js.map