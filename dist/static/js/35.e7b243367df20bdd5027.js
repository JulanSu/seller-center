webpackJsonp([35],{"+neu":function(e,t,r){"use strict";var a=r("Ecxi"),i=r("IObT"),l=r("pgiz");t.a={components:{CategoryBar:a.a,UploadPictures:i.a},data:function(){var e=function(e,t,r){if(""===t)r(new Error("请输入手机号"));else{var a=t.slice(0,1);11!=t.length||1!=a?r(new Error("请输入正确的手机号")):r()}};return{shopStyle:shopType,categoryBarTitle1:"企业店铺资质",categoryBarTitle2:"个人店铺资质",uploadTishi:"不超过5mb",ruleForm:{enterpriseName:"",legalPerson:"",orgCode:"",identityNumber:"",storeBrands:"",phone:"",enterpriseLicence:"",identityPic:"",contactName:"",contactMobile:""},rules:{legalPerson:[{required:!0,message:"请输入法人姓名",trigger:"blur"},{min:2,max:30,message:"请输入正确的法人姓名",trigger:"blur"}],contactName:[{required:!0,message:"请输入法人姓名",trigger:"blur"},{min:2,max:30,message:"请输入正确的法人姓名",trigger:"blur"}],orgCode:[{required:!0,message:"请输入组织机构代码（注册码）",trigger:"blur"},{min:18,max:18,message:"请输入正确组织机构代码（注册码）",trigger:"blur"}],identityNumber:[{required:!0,message:"请输入法人身份证",trigger:"blur"},{min:18,max:18,message:"请输入正确身份证号",trigger:"blur"}],contactMobile:[{validator:e,trigger:"blur"}]}}},mounted:function(){var e=this,t={storeId:storeId};this.listLoading=!0,Object(l.M)(t).then(function(t){e.ruleForm=t.data.data,e.listLoading=!1})},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var r=new URLSearchParams;r.append("storeId",storeId),r.append("enterpriseLicence",t.ruleForm.enterpriseLicence),r.append("orgCode",t.ruleForm.orgCode),r.append("legalPerson",t.ruleForm.legalPerson),r.append("identityPic",t.ruleForm.identityPic),r.append("identityNumber",t.ruleForm.identityNumber),1!=t.shopStyle&&(r.append("contactName",t.ruleForm.contactName),r.append("contactMobile",t.ruleForm.contactMobile)),Object(l.r)(r).then(function(e){t.dialogVisible1=!0,0==e.data.code?t.$message({message:"提交成功",type:"success"}):t.$message.error(e.data.message)}).catch(function(e){t.listLoading=!1})})}}}},LfGo:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("section",{staticClass:"qualification"},[1==e.shopStyle?r("div",[r("category-bar",{attrs:{title:e.categoryBarTitle1}}),e._v(" "),r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("el-form-item",{attrs:{label:"企业名称","label-width":"200px",prop:"enterpriseName"}},[r("div",{staticClass:"only-ready"},[e._v(e._s(e.ruleForm.enterpriseName))])]),e._v(" "),r("el-form-item",{attrs:{label:"组织机构代码证/营业执照","label-width":"200px"}},[r("upload-pictures",{attrs:{note:e.uploadTishi}})],1),e._v(" "),r("el-form-item",{attrs:{label:"组织机构代码（注册号）","label-width":"200px",prop:"orgCode"}},[r("el-input",{staticClass:"wid280",attrs:{maxlength:18,placeholder:"请输入组织机构代码（注册号）"},model:{value:e.ruleForm.orgCode,callback:function(t){e.$set(e.ruleForm,"orgCode",t)},expression:"ruleForm.orgCode"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"法人姓名","label-width":"200px",prop:"legalPerson"}},[r("el-input",{staticClass:"wid280",attrs:{maxlength:30,placeholder:"请输入法人姓名"},model:{value:e.ruleForm.legalPerson,callback:function(t){e.$set(e.ruleForm,"legalPerson",t)},expression:"ruleForm.legalPerson"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"法人身份证","label-width":"200px",prop:"identityNumber"}},[r("el-input",{staticClass:"wid280",attrs:{maxlength:18,placeholder:"请输入法人身份证"},model:{value:e.ruleForm.identityNumber,callback:function(t){e.$set(e.ruleForm,"identityNumber",t)},expression:"ruleForm.identityNumber"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"法人身份证正面","label-width":"200px"}},[r("upload-pictures",{attrs:{note:e.uploadTishi}})],1),e._v(" "),r("el-form-item",{attrs:{label:"法人身份证反面","label-width":"200px"}},[r("upload-pictures",{attrs:{note:e.uploadTishi}})],1),e._v(" "),e._l(e.ruleForm.storeBrands,function(t,a){return r("div",[r("el-form-item",{attrs:{label:"经营品牌","label-width":"200px",prop:"brand"}},[r("div",{staticClass:"only-ready"},[e._v(e._s(t.nameCn))])]),e._v(" "),r("el-form-item",{attrs:{label:"品牌证书","label-width":"200px"}},[r("div",{staticClass:"unchangeable"},[r("img",{attrs:{src:t.authorizationUrl}})])])],1)}),e._v(" "),r("el-form-item",{attrs:{label:"","label-width":"200px"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],2)],1):r("div",[r("category-bar",{attrs:{title:e.categoryBarTitle2}}),e._v(" "),r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[r("el-form-item",{attrs:{label:"店主姓名","label-width":"160px",prop:"contactName"}},[r("el-input",{staticClass:"wid280",attrs:{maxlength:30,placeholder:"请输入店主姓名"},model:{value:e.ruleForm.contactName,callback:function(t){e.$set(e.ruleForm,"contactName",t)},expression:"ruleForm.contactName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"店主手机号","label-width":"160px",prop:"contactMobile"}},[r("el-input",{staticClass:"wid280",attrs:{placeholder:"请输入店主手机号"},model:{value:e.ruleForm.contactMobile,callback:function(t){e.$set(e.ruleForm,"contactMobile",t)},expression:"ruleForm.contactMobile"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"法人身份证正面","label-width":"160px"}},[r("upload-pictures",{attrs:{note:e.uploadTishi}})],1),e._v(" "),r("el-form-item",{attrs:{label:"法人身份证反面","label-width":"160px"}},[r("upload-pictures",{attrs:{note:e.uploadTishi}})],1),e._v(" "),r("el-form-item",{attrs:{label:"","label-width":"160px"}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1)])},i=[],l={render:a,staticRenderFns:i};t.a=l},Vwdq:function(e,t,r){var a=r("y/6L");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("6imX")("043d4e06",a,!0)},hIuu:function(e,t,r){"use strict";function a(e){r("Vwdq")}Object.defineProperty(t,"__esModule",{value:!0});var i=r("+neu"),l=r("LfGo"),o=r("mPyB"),n=a,s=o(i.a,l.a,!1,n,null,null);t.default=s.exports},"y/6L":function(e,t,r){t=e.exports=r("bKW+")(!0),t.push([e.i,".qualification{padding:20px 0 0}.qualification .wid280{width:280px}.qualification p{margin:0}.qualification .category-bar{padding-left:40px}.qualification .unchangeable{width:100px;height:100px;text-align:center;line-height:100px;overflow:hidden;border:1px dashed #c0ccda;border-radius:6px}.qualification .unchangeable img{max-width:100%;vertical-align:middle}","",{version:3,sources:["E:/github/seller-center/src/views/shops/ShopQualification.vue"],names:[],mappings:"AACA,eACE,gBAAoB,CACrB,AACD,uBACI,WAAa,CAChB,AACD,iBACI,QAAU,CACb,AACD,6BACI,iBAAmB,CACtB,AACD,6BACI,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,kBAAmB,AACnB,gBAAiB,AACjB,0BAA2B,AAC3B,iBAAmB,CACtB,AACD,iCACM,eAAgB,AAChB,qBAAuB,CAC5B",file:"ShopQualification.vue",sourcesContent:["\n.qualification {\n  padding: 20px 0 0 0;\n}\n.qualification .wid280 {\n    width: 280px;\n}\n.qualification p {\n    margin: 0;\n}\n.qualification .category-bar {\n    padding-left: 40px;\n}\n.qualification .unchangeable {\n    width: 100px;\n    height: 100px;\n    text-align: center;\n    line-height: 100px;\n    overflow: hidden;\n    border: 1px dashed #c0ccda;\n    border-radius: 6px;\n}\n.qualification .unchangeable img {\n      max-width: 100%;\n      vertical-align: middle;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=35.e7b243367df20bdd5027.js.map