webpackJsonp([15],{"3SZ7":function(t,e,r){t.exports={default:r("CnbX"),__esModule:!0}},"6FSb":function(t,e,r){"use strict";var n=Object.prototype.hasOwnProperty,i=function(){for(var t=[],e=0;e<256;++e)t.push("%"+((e<16?"0":"")+e.toString(16)).toUpperCase());return t}(),a=function(t){for(var e;t.length;){var r=t.pop();if(e=r.obj[r.prop],Array.isArray(e)){for(var n=[],i=0;i<e.length;++i)void 0!==e[i]&&n.push(e[i]);r.obj[r.prop]=n}}return e};e.arrayToObject=function(t,e){for(var r=e&&e.plainObjects?Object.create(null):{},n=0;n<t.length;++n)void 0!==t[n]&&(r[n]=t[n]);return r},e.merge=function(t,r,i){if(!r)return t;if("object"!=typeof r){if(Array.isArray(t))t.push(r);else{if("object"!=typeof t)return[t,r];(i.plainObjects||i.allowPrototypes||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if("object"!=typeof t)return[t].concat(r);var a=t;return Array.isArray(t)&&!Array.isArray(r)&&(a=e.arrayToObject(t,i)),Array.isArray(t)&&Array.isArray(r)?(r.forEach(function(r,a){n.call(t,a)?t[a]&&"object"==typeof t[a]?t[a]=e.merge(t[a],r,i):t.push(r):t[a]=r}),t):Object.keys(r).reduce(function(t,a){var o=r[a];return n.call(t,a)?t[a]=e.merge(t[a],o,i):t[a]=o,t},a)},e.assign=function(t,e){return Object.keys(e).reduce(function(t,r){return t[r]=e[r],t},t)},e.decode=function(t){try{return decodeURIComponent(t.replace(/\+/g," "))}catch(e){return t}},e.encode=function(t){if(0===t.length)return t;for(var e="string"==typeof t?t:String(t),r="",n=0;n<e.length;++n){var a=e.charCodeAt(n);45===a||46===a||95===a||126===a||a>=48&&a<=57||a>=65&&a<=90||a>=97&&a<=122?r+=e.charAt(n):a<128?r+=i[a]:a<2048?r+=i[192|a>>6]+i[128|63&a]:a<55296||a>=57344?r+=i[224|a>>12]+i[128|a>>6&63]+i[128|63&a]:(n+=1,a=65536+((1023&a)<<10|1023&e.charCodeAt(n)),r+=i[240|a>>18]+i[128|a>>12&63]+i[128|a>>6&63]+i[128|63&a])}return r},e.compact=function(t){for(var e=[{obj:{o:t},prop:"o"}],r=[],n=0;n<e.length;++n)for(var i=e[n],o=i.obj[i.prop],s=Object.keys(o),l=0;l<s.length;++l){var u=s[l],c=o[u];"object"==typeof c&&null!==c&&-1===r.indexOf(c)&&(e.push({obj:o,prop:u}),r.push(c))}return a(e)},e.isRegExp=function(t){return"[object RegExp]"===Object.prototype.toString.call(t)},e.isBuffer=function(t){return null!==t&&void 0!==t&&!!(t.constructor&&t.constructor.isBuffer&&t.constructor.isBuffer(t))}},"9Y/5":function(t,e,r){"use strict";var n=r("6FSb"),i=Object.prototype.hasOwnProperty,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:n.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},o=function(t,e){for(var r={},n=e.ignoreQueryPrefix?t.replace(/^\?/,""):t,o=e.parameterLimit===1/0?void 0:e.parameterLimit,s=n.split(e.delimiter,o),l=0;l<s.length;++l){var u,c,d=s[l],p=d.indexOf("]="),f=-1===p?d.indexOf("="):p+1;-1===f?(u=e.decoder(d,a.decoder),c=e.strictNullHandling?null:""):(u=e.decoder(d.slice(0,f),a.decoder),c=e.decoder(d.slice(f+1),a.decoder)),i.call(r,u)?r[u]=[].concat(r[u]).concat(c):r[u]=c}return r},s=function(t,e,r){for(var n=e,i=t.length-1;i>=0;--i){var a,o=t[i];if("[]"===o)a=[],a=a.concat(n);else{a=r.plainObjects?Object.create(null):{};var s="["===o.charAt(0)&&"]"===o.charAt(o.length-1)?o.slice(1,-1):o,l=parseInt(s,10);!isNaN(l)&&o!==s&&String(l)===s&&l>=0&&r.parseArrays&&l<=r.arrayLimit?(a=[],a[l]=n):a[s]=n}n=a}return n},l=function(t,e,r){if(t){var n=r.allowDots?t.replace(/\.([^.[]+)/g,"[$1]"):t,a=/(\[[^[\]]*])/,o=/(\[[^[\]]*])/g,l=a.exec(n),u=l?n.slice(0,l.index):n,c=[];if(u){if(!r.plainObjects&&i.call(Object.prototype,u)&&!r.allowPrototypes)return;c.push(u)}for(var d=0;null!==(l=o.exec(n))&&d<r.depth;){if(d+=1,!r.plainObjects&&i.call(Object.prototype,l[1].slice(1,-1))&&!r.allowPrototypes)return;c.push(l[1])}return l&&c.push("["+n.slice(l.index)+"]"),s(c,e,r)}};t.exports=function(t,e){var r=e?n.assign({},e):{};if(null!==r.decoder&&void 0!==r.decoder&&"function"!=typeof r.decoder)throw new TypeError("Decoder has to be a function.");if(r.ignoreQueryPrefix=!0===r.ignoreQueryPrefix,r.delimiter="string"==typeof r.delimiter||n.isRegExp(r.delimiter)?r.delimiter:a.delimiter,r.depth="number"==typeof r.depth?r.depth:a.depth,r.arrayLimit="number"==typeof r.arrayLimit?r.arrayLimit:a.arrayLimit,r.parseArrays=!1!==r.parseArrays,r.decoder="function"==typeof r.decoder?r.decoder:a.decoder,r.allowDots="boolean"==typeof r.allowDots?r.allowDots:a.allowDots,r.plainObjects="boolean"==typeof r.plainObjects?r.plainObjects:a.plainObjects,r.allowPrototypes="boolean"==typeof r.allowPrototypes?r.allowPrototypes:a.allowPrototypes,r.parameterLimit="number"==typeof r.parameterLimit?r.parameterLimit:a.parameterLimit,r.strictNullHandling="boolean"==typeof r.strictNullHandling?r.strictNullHandling:a.strictNullHandling,""===t||null===t||void 0===t)return r.plainObjects?Object.create(null):{};for(var i="string"==typeof t?o(t,r):t,s=r.plainObjects?Object.create(null):{},u=Object.keys(i),c=0;c<u.length;++c){var d=u[c],p=l(d,i[d],r);s=n.merge(s,p,r)}return n.compact(s)}},BDqZ:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"uploadpic"},[r("div",{staticClass:"load_hezi"},[r("p",[t._v(t._s(t.note))]),t._v(" "),r("el-upload",{class:{"avatar-uploader":!0,picSuc:t.url},attrs:{action:"http://gss.dmp.hzjiehun.bid/gss/upload/","show-file-list":!1,"on-success":t.handleAvatarSuccess,"on-error":t.handleAvatarError,"before-upload":t.beforeAvatarUpload}},[t.imageUrl?r("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):t._e(),t._v(" "),t.url?r("img",{staticClass:"avatar1",attrs:{src:t.url}}):r("i",{staticClass:"iconfont icon-tianjia"},[r("p",[t._v("添加上传图片")])]),t._v(" "),r("div",{staticClass:"btn"},[t._v("重新上传")])]),t._v(" "),r("el-dialog",{attrs:{size:"tiny"},model:{value:t.dialogVisible,callback:function(e){t.dialogVisible=e},expression:"dialogVisible"}},[r("img",{attrs:{width:"100%",src:t.dialogImageUrl,alt:""}})])],1)])},i=[],a={render:n,staticRenderFns:i};e.a=a},BWJn:function(t,e,r){"use strict";var n=r("6FSb"),i=r("zN2i"),a={brackets:function(t){return t+"[]"},indices:function(t,e){return t+"["+e+"]"},repeat:function(t){return t}},o=Date.prototype.toISOString,s={delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,serializeDate:function(t){return o.call(t)},skipNulls:!1,strictNullHandling:!1},l=function t(e,r,i,a,o,l,u,c,d,p,f,h){var m=e;if("function"==typeof u)m=u(r,m);else if(m instanceof Date)m=p(m);else if(null===m){if(a)return l&&!h?l(r,s.encoder):r;m=""}if("string"==typeof m||"number"==typeof m||"boolean"==typeof m||n.isBuffer(m)){if(l){return[f(h?r:l(r,s.encoder))+"="+f(l(m,s.encoder))]}return[f(r)+"="+f(String(m))]}var g=[];if(void 0===m)return g;var A;if(Array.isArray(u))A=u;else{var b=Object.keys(m);A=c?b.sort(c):b}for(var y=0;y<A.length;++y){var v=A[y];o&&null===m[v]||(g=Array.isArray(m)?g.concat(t(m[v],i(r,v),i,a,o,l,u,c,d,p,f,h)):g.concat(t(m[v],r+(d?"."+v:"["+v+"]"),i,a,o,l,u,c,d,p,f,h)))}return g};t.exports=function(t,e){var r=t,o=e?n.assign({},e):{};if(null!==o.encoder&&void 0!==o.encoder&&"function"!=typeof o.encoder)throw new TypeError("Encoder has to be a function.");var u=void 0===o.delimiter?s.delimiter:o.delimiter,c="boolean"==typeof o.strictNullHandling?o.strictNullHandling:s.strictNullHandling,d="boolean"==typeof o.skipNulls?o.skipNulls:s.skipNulls,p="boolean"==typeof o.encode?o.encode:s.encode,f="function"==typeof o.encoder?o.encoder:s.encoder,h="function"==typeof o.sort?o.sort:null,m=void 0!==o.allowDots&&o.allowDots,g="function"==typeof o.serializeDate?o.serializeDate:s.serializeDate,A="boolean"==typeof o.encodeValuesOnly?o.encodeValuesOnly:s.encodeValuesOnly;if(void 0===o.format)o.format=i.default;else if(!Object.prototype.hasOwnProperty.call(i.formatters,o.format))throw new TypeError("Unknown format option provided.");var b,y,v=i.formatters[o.format];"function"==typeof o.filter?(y=o.filter,r=y("",r)):Array.isArray(o.filter)&&(y=o.filter,b=y);var C=[];if("object"!=typeof r||null===r)return"";var x;x=o.arrayFormat in a?o.arrayFormat:"indices"in o?o.indices?"indices":"repeat":"indices";var B=a[x];b||(b=Object.keys(r)),h&&b.sort(h);for(var w=0;w<b.length;++w){var k=b[w];d&&null===r[k]||(C=C.concat(l(r[k],k,B,c,d,p?f:null,y,h,m,g,v,A)))}var F=C.join(u),O=!0===o.addQueryPrefix?"?":"";return F.length>0?O+F:""}},CnbX:function(t,e,r){var n=r("ZBPP"),i=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},IObT:function(t,e,r){"use strict";function n(t){r("tGhi")}var i=r("Rp6x"),a=r("BDqZ"),o=r("mPyB"),s=n,l=o(i.a,a.a,!1,s,null,null);e.a=l.exports},Qxk2:function(t,e,r){e=t.exports=r("bKW+")(!0),e.push([t.i,".uploadpic p{margin:0;font-size:12px;color:#999}.uploadpic .avatar-uploader{height:100px}.uploadpic .icon-tianjia{padding-top:23px;width:100px;height:100px;line-height:30px;font-size:28px;color:#41cac0;text-align:center;display:block}.uploadpic .icon-tianjia p{font-size:14px;color:#666;padding-top:10px}.uploadpic .el-upload--text{width:100px;height:100px}.uploadpic .el-upload--text img{width:100%;height:100%}.uploadpic .picSuc{width:100px}.uploadpic .picSuc:hover .btn{display:block}.uploadpic .btn:hover{color:#fff;display:block}.uploadpic .btn{display:none;height:24px;line-height:24px;background:rgba(0,0,0,.4);color:#fff;position:absolute;bottom:0;left:0;width:100px;font-size:12px;padding:0;border-radius:0}.el-progress--circle,.el-progress-circle,.el-upload-list__item{width:100px!important;height:100px!important}.avatar-uploader .el-upload{border:1px dashed #d9d9d9;cursor:pointer;position:relative;overflow:hidden}.load_hezi .picSuc .el-upload{border-style:solid}.avatar-uploader .el-upload:hover{border-color:#41cac0}.avatar{width:178px;height:178px;display:block}","",{version:3,sources:["E:/github/seller-center/src/components/UploadPictures.vue"],names:[],mappings:"AACA,aACE,SAAU,AACV,eAAgB,AAChB,UAAe,CAChB,AACD,4BACE,YAAc,CACf,AACD,yBACE,iBAAkB,AAClB,YAAa,AACb,aAAc,AACd,iBAAkB,AAClB,eAAgB,AAChB,cAAe,AACf,kBAAmB,AACnB,aAAe,CAChB,AACD,2BACI,eAAgB,AAChB,WAAY,AACZ,gBAAkB,CACrB,AACD,4BACE,YAAa,AACb,YAAc,CACf,AACD,gCACI,WAAY,AACZ,WAAa,CAChB,AACD,mBACE,WAAa,CACd,AACD,8BACE,aAAe,CAChB,AACD,sBACE,WAAY,AACZ,aAAe,CAChB,AACD,gBACE,aAAc,AACd,YAAa,AACb,iBAAkB,AAClB,0BAA+B,AAC/B,WAAY,AACZ,kBAAmB,AACnB,SAAU,AACV,OAAQ,AACR,YAAa,AACb,eAAgB,AAChB,UAAW,AACX,eAAiB,CAClB,AAKD,+DACE,sBAAwB,AACxB,sBAAyB,CAC1B,AACD,4BACE,0BAA2B,AAC3B,eAAgB,AAChB,kBAAmB,AACnB,eAAiB,CAClB,AACD,8BACE,kBAAoB,CACrB,AACD,kCACE,oBAAsB,CACvB,AACD,QACE,YAAa,AACb,aAAc,AACd,aAAe,CAChB",file:"UploadPictures.vue",sourcesContent:["\n.uploadpic p {\n  margin: 0;\n  font-size: 12px;\n  color: #999999;\n}\n.uploadpic .avatar-uploader {\n  height: 100px;\n}\n.uploadpic .icon-tianjia {\n  padding-top: 23px;\n  width: 100px;\n  height: 100px;\n  line-height: 30px;\n  font-size: 28px;\n  color: #41CAC0;\n  text-align: center;\n  display: block;\n}\n.uploadpic .icon-tianjia p {\n    font-size: 14px;\n    color: #666;\n    padding-top: 10px;\n}\n.uploadpic .el-upload--text {\n  width: 100px;\n  height: 100px;\n}\n.uploadpic .el-upload--text img {\n    width: 100%;\n    height: 100%;\n}\n.uploadpic .picSuc {\n  width: 100px;\n}\n.uploadpic .picSuc:hover .btn {\n  display: block;\n}\n.uploadpic .btn:hover {\n  color: #fff;\n  display: block;\n}\n.uploadpic .btn {\n  display: none;\n  height: 24px;\n  line-height: 24px;\n  background: rgba(0, 0, 0, 0.4);\n  color: #fff;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100px;\n  font-size: 12px;\n  padding: 0;\n  border-radius: 0;\n}\n.el-upload-list__item {\n  width: 100px !important;\n  height: 100px !important;\n}\n.el-progress--circle, .el-progress-circle {\n  width: 100px !important;\n  height: 100px !important;\n}\n.avatar-uploader .el-upload {\n  border: 1px dashed #d9d9d9;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n}\n.load_hezi .picSuc .el-upload {\n  border-style: solid;\n}\n.avatar-uploader .el-upload:hover {\n  border-color: #41cac0;\n}\n.avatar {\n  width: 178px;\n  height: 178px;\n  display: block;\n}\n"],sourceRoot:""}])},Rp6x:function(t,e,r){"use strict";e.a={name:"UploadPictures",props:{uploadtit:{type:String,default:""},note:{type:String,default:""},listen:{type:String,default:""},url:{type:String,default:""},picSize:{type:String,default:""}},data:function(){return{imageUrl:"",dialogImageUrl:"",dialogVisible:!1}},mounted:function(){""==this.url&&(this.imageUrl="")},methods:{beforeAvatarUpload:function(t){var e=this.picSize,r=!1,n=e.split(".");r="MB"==n[1]?t.size/1024/1024<n[0]:t.size/1024<n[0];var i=/(jpg|jpeg|png)$/.test(t.type);return i||this.$message.error("上传头像图片只能是 JPG、JPEG、PNG 格式!"),r||this.$message.error("上传头像图片大小不能超过 "+n[0]+n[1]+"!"),i&&r},handleAvatarSuccess:function(t,e){0==t.code?(this.imageUrl=URL.createObjectURL(e.raw),this.$emit(this.listen,t.data)):this.$message.error("图片上传失败")},handleAvatarError:function(){this.$message.error("图片上传失败")},revise:function(t){this.imageUrl=t},ser:function(){this.url=""}}}},TOsV:function(t,e,r){"use strict";var n=r("BWJn"),i=r("9Y/5"),a=r("zN2i");t.exports={formats:a,parse:i,stringify:n}},Uo7j:function(t,e,r){"use strict";var n=r("cfvZ"),i=r.n(n),a=r("3SZ7"),o=r.n(a),s=r("pgiz"),l=r("IObT");e.a={components:{UploadPictures:l.a},data:function(){var t=function(t,e,r){if(""===e)r(new Error("请输入联系电话"));else{var n=e.slice(0,1);11!=e.length||1!=n?r(new Error("请输入正确的联系电话")):r()}},e=function(t,e,r){if(e){var n=/^\d+$/g;e.match(n)?r():r(new Error("请输入正确的联系电话"))}else r()};return{tit:"添加",btnClick:!1,isCompile:!1,listLoading:!1,database:{},brandTits:{},nowIndex:0,prevKey:0,tishi:{},subBrandId:"",uploadAptitude:"图片尺寸200px*200px以上，大小800k以内，格式png/jpg/jpeg，格式要求jpg、jpeg、png，不超过10MB",ruleForm:{storeBrandId:"",brandId:"",nameCn:"",ways:"",cityNames:"",endValidTime:"",contactMobile:"",authorizationUrl:"",registerLocation:"",submit:!1},fullModel:{storeBrandId:"",brandId:"",nameCn:"",ways:"",cityNames:"",endValidTime:"",contactMobile:"",authorizationUrl:"",registerLocation:"",submit:!1},rules:{authorizationUrl:[{required:!0,message:"请上传图片",trigger:"blur"}],authorizationUrl2:[{required:!0,message:"请上传报关单",trigger:"blur"}],ways:[{required:!0,message:"请输入授权渠道",trigger:"blur"},{max:50,message:"长度最多 50 位",trigger:"blur"}],cityNames:[{required:!0,message:"请输入授权城市",trigger:"blur"},{max:20,message:"长度最多 20 位",trigger:"blur"}],endValidTime:[{required:!0,type:"date",message:"请选择有效截止时间",trigger:"blur"}],contactMobile:[{required:!0,validator:t,trigger:"blur"},{validator:e,trigger:"blur"},{validator:e,trigger:"change"}]}}},mounted:function(){var t=this,e=this.$route.query.compile,r=this.$route.query.storeBrandId,n=this.$route.query.noClick;if(1==e){this.tit="编辑",1!=n&&"true"!=n||(this.btnClick=!0),this.isCompile=!1;var i={storeId:config.storeId,storeBrandId:r};this.listLoading=!0,Object(s.d)(i).then(function(e){0==e.data.code?(t.ruleForm=e.data.data,t.ruleForm.endValidTime=new Date(t.ruleForm.endValidTime),t.brandTits={storeBrandId:{nameCn:t.ruleForm.nameCn}},0==e.data.data.registerLocationType&&(t.ruleForm.registerLocation=1)):t.$message.error(e.data.message),t.listLoading=!1}).catch(function(e){t.listLoading=!1,t.$message.error("接口建立连接失败")}),this.$set(this.database,"key"+r,this.ruleForm)}else if("y"==this.$route.query.add){this.brandTits=JSON.parse(sessionStorage.getItem("addBrand"));var a=function(t){var e=[];for(var r in t)e.push(r);return e}(this.brandTits),l=[];for(var u in this.brandTits)l.push(u),this.$set(this.database,"key"+u,JSON.parse(o()(this.fullModel))),this.$set(this.database["key"+u],"nameCn",this.brandTits[u].nameCn),this.$set(this.database["key"+u],"registerLocation",this.brandTits[u].registerLocation),this.$set(this.tishi,"key"+u,!1);this.prevKey=l[0],this.ruleForm=this.database["key"+a[0]]}},watch:{"ruleForm.ways":function(){this.fillOut()},"ruleForm.cityNames":function(){this.fillOut()},"ruleForm.endValidTime":function(){this.fillOut()},"ruleForm.contactMobile":function(){this.fillOut()},"ruleForm.authorizationUrl":function(){this.fillOut()}},methods:{sucpic1:function(t){this.ruleForm.authorizationUrl=t},fillOut:function(){var t,e=this.ruleForm.ways,r=this.ruleForm.cityNames,n=this.ruleForm.endValidTime,i=this.ruleForm.contactMobile,a=this.ruleForm.authorizationUrl;t=1==this.$route.query.compile?"key"+this.$route.query.storeBrandId:"key"+this.prevKey,e&&r&&n&&i&&/^1\d{10}$/.test(i)&&a?(this.$set(this.database[t],"submit",!0),this.$set(this.tishi,"key"+this.prevKey,!0)):(this.$set(this.database[t],"submit",!1),this.$set(this.tishi,"key"+this.prevKey,!1))},switchover:function(t,e,r){this.$set(this.database,"key"+this.prevKey,this.ruleForm),this.nowIndex=t,this.prevKey=e,this.ruleForm=this.database["key"+e],this.$refs.uploadPic.revise(this.ruleForm.authorizationUrl)},transitionTime:function(t){return t instanceof Date&&(t=t.getTime()),t},hint:function(t,e,r,n){this.$message({message:t,type:e,duration:r,onClose:function(){n()}})},suc:function(){return this.$router.push({path:"/store/brand-management"}),!1},sucAdd:function(){this.$delete(this.tishi,"key"+this.subBrandId),this.$delete(this.database,"key"+this.subBrandId),this.$delete(this.brandTits,this.subBrandId),this.nowIndex=0;var t=i()(this.brandTits);this.ruleForm=this.database["key"+t[0]],this.prevKey=t[0],t.length?this.$refs.uploadPic.revise(this.ruleForm.authorizationUrl):this.suc()},fail:function(){return!1},compileSubmit:function(t){var e=this;this.listLoading=!0,Object(s.O)(t).then(function(t){0==t.data.code?e.hint("提交成功","success",2e3,e.suc):e.hint("提交失败","warning",2e3,e.fail),e.listLoading=!1}).catch(function(t){e.listLoading=!1,e.hint("提交失败","warning",2e3,e.fail)})},addSubmit:function(t){var e=this;this.listLoading=!0,Object(s.g)(t).then(function(t){0==t.data.code?e.hint("提交成功","success",2e3,e.sucAdd):1==t.data.code&&"已有此品牌"==t.data.message?e.hint("已有此品牌","success",2e3,e.sucAdd):e.hint("提交失败","warning",2e3,e.fail),e.listLoading=!1}).catch(function(t){e.listLoading=!1,e.hint("提交失败","warning",2e3,e.fail)})},submitForm:function(t){var e=this;if(this.btnClick)return!1;this.$refs[t].validate(function(t){if(!t)return!1;e.ruleForm.endValidTime=e.transitionTime(e.ruleForm.endValidTime);var r=new URLSearchParams;r.append("storeId",config.storeId),r.append("authorizationUrl",e.ruleForm.authorizationUrl),r.append("trademarkCertificate",e.ruleForm.authorizationUrl),r.append("ways",e.ruleForm.ways),r.append("cityNames",e.ruleForm.cityNames),r.append("startValidTime",""),r.append("endValidTime",e.ruleForm.endValidTime),r.append("contactMobile",e.ruleForm.contactMobile),1==e.$route.query.compile?(r.append("storeBrandId",e.ruleForm.storeBrandId),e.compileSubmit(r)):(r.append("storeId",config.storeId),r.append("brandId",e.prevKey),e.subBrandId=e.prevKey,e.addSubmit(r))})}}}},aruw:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("Uo7j"),i=r("n7Zr"),a=r("mPyB"),o=a(n.a,i.a,!1,null,null,null);e.default=o.exports},n7Zr:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"add-account"},[r("div",{staticClass:"gotoPrev"},[r("router-link",{staticClass:"selbrand",staticStyle:{width:"100px",cursor:"pointer"},attrs:{to:"/store/brand-management",icon:"plus"}},[r("b",{staticClass:"iconfont icon-fanhui"}),t._v(" "),r("span",[t._v(t._s(t.tit)+"品牌")])])],1),t._v(" "),r("div",{staticStyle:{"min-width":"870px"}},[r("ul",[t._l(t.brandTits,function(e,n,i){return r("li",{class:{on:i==t.nowIndex},attrs:{"brand-id":n},on:{click:function(r){t.switchover(i,n,e)}}},[r("h6",[t._v(t._s(e.nameCn))]),t._v(" "),r("div",t._l(t.tishi,function(e,n,a){return i==a?r("p",[0==e?r("span",[t._v("(待填写)")]):r("span",{staticStyle:{color:"#41cac0"}},[t._v("(已填写完整)")])]):t._e()}))])})],2),t._v(" "),r("el-form",{ref:"ruleForm",attrs:{model:t.ruleForm,rules:t.rules}},[r("el-form-item",{attrs:{label:"品牌名称","label-width":"120px",prop:"nameCn"}},[r("div",[t._v(t._s(t.ruleForm.nameCn))])]),t._v(" "),1==t.ruleForm.registerLocation?r("el-form-item",{staticClass:"requireHezi",attrs:{label:"品牌资质","label-width":"120px"}},[r("span",{staticClass:"require",staticStyle:{left:"-78px"}},[t._v("*")]),t._v(" "),r("upload-pictures",{ref:"uploadPic",attrs:{note:t.uploadAptitude,url:t.ruleForm.authorizationUrl,listen:"listenToPic1",picSize:"10.MB"},on:{listenToPic1:t.sucpic1}})],1):r("el-form-item",{staticClass:"requireHezi",attrs:{label:"报关单","label-width":"120px"}},[r("span",{staticClass:"require",staticStyle:{left:"-63px"}},[t._v("*")]),t._v(" "),r("upload-pictures",{ref:"uploadPic",attrs:{note:t.uploadAptitude,url:t.ruleForm.authorizationUrl,listen:"listenToPic1",picSize:"10.MB"},on:{listenToPic1:t.sucpic1}})],1),t._v(" "),r("el-form-item",{staticClass:"updata",attrs:{label:"",prop:"authorizationUrl","label-width":"120px"}},[r("el-input",{staticClass:"wid280",model:{value:t.ruleForm.authorizationUrl,callback:function(e){t.$set(t.ruleForm,"authorizationUrl",e)},expression:"ruleForm.authorizationUrl"}})],1),t._v(" "),r("el-form-item",{attrs:{prop:"ways",label:"授权渠道 ","label-width":"120px"}},[r("el-input",{staticClass:"wid400",attrs:{maxlength:50,placeholder:"请输入授权渠道"},model:{value:t.ruleForm.ways,callback:function(e){t.$set(t.ruleForm,"ways",e)},expression:"ruleForm.ways"}})],1),t._v(" "),r("el-form-item",{attrs:{prop:"cityNames",label:"授权城市","label-width":"120px"}},[r("el-input",{staticClass:"wid400",attrs:{maxlength:20,placeholder:"请输入授权城市"},model:{value:t.ruleForm.cityNames,callback:function(e){t.$set(t.ruleForm,"cityNames",e)},expression:"ruleForm.cityNames"}})],1),t._v(" "),r("el-form-item",{staticClass:"timers",attrs:{label:"有效截止时间","label-width":"120px",prop:"endValidTime"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",editable:!1,placeholder:"请选择有效截止时间"},model:{value:t.ruleForm.endValidTime,callback:function(e){t.$set(t.ruleForm,"endValidTime",e)},expression:"ruleForm.endValidTime"}})],1),t._v(" "),r("el-form-item",{attrs:{prop:"contactMobile",label:"联系电话","label-width":"120px"}},[r("el-input",{staticClass:"wid400",attrs:{maxlength:11,placeholder:"请输入联系电话"},model:{value:t.ruleForm.contactMobile,callback:function(e){t.$set(t.ruleForm,"contactMobile",e)},expression:"ruleForm.contactMobile"}}),t._v(" "),r("p",{staticClass:"tishi"},[t._v("审核同学有疑问时，会通过此联系方式联系您")])],1),t._v(" "),r("el-form-item",{attrs:{label:"","label-width":"120px"}},[r("el-button",{class:{notclick:t.btnClick,wid100:!0},attrs:{type:"primary"},on:{click:function(e){t.submitForm("ruleForm")}}},[t._v("提交审核")])],1)],1)],1)])},i=[],a={render:n,staticRenderFns:i};e.a=a},pgiz:function(t,e,r){"use strict";r.d(e,"o",function(){return o}),r.d(e,"S",function(){return s}),r.d(e,"P",function(){return l}),r.d(e,"Q",function(){return u}),r.d(e,"s",function(){return c}),r.d(e,"p",function(){return d}),r.d(e,"r",function(){return p}),r.d(e,"n",function(){return f}),r.d(e,"m",function(){return h}),r.d(e,"N",function(){return m}),r.d(e,"R",function(){return g}),r.d(e,"t",function(){return A}),r.d(e,"v",function(){return b}),r.d(e,"w",function(){return y}),r.d(e,"x",function(){return v}),r.d(e,"y",function(){return C}),r.d(e,"z",function(){return x}),r.d(e,"u",function(){return B}),r.d(e,"F",function(){return w}),r.d(e,"H",function(){return k}),r.d(e,"J",function(){return F}),r.d(e,"I",function(){return O}),r.d(e,"K",function(){return j}),r.d(e,"L",function(){return _}),r.d(e,"M",function(){return S}),r.d(e,"G",function(){return z}),r.d(e,"h",function(){return T}),r.d(e,"i",function(){return U}),r.d(e,"j",function(){return $}),r.d(e,"k",function(){return N}),r.d(e,"l",function(){return P}),r.d(e,"A",function(){return I}),r.d(e,"D",function(){return D}),r.d(e,"B",function(){return L}),r.d(e,"E",function(){return E}),r.d(e,"C",function(){return V}),r.d(e,"d",function(){return R}),r.d(e,"e",function(){return q}),r.d(e,"O",function(){return M}),r.d(e,"g",function(){return K}),r.d(e,"q",function(){return H}),r.d(e,"b",function(){return Y}),r.d(e,"f",function(){return Z}),r.d(e,"c",function(){return J}),r.d(e,"a",function(){return W});var n=r("Kriy"),i=r("TOsV"),a=(r.n(i),"http://shop.dmp.hzjiehun.bid"),o=(Object({NODE_ENV:"production"}).API_ROOT,function(t){return n.a.get(a+"/store/get",{params:t})}),s=function(t){return n.a.post(a+"/store/update",t)},l=function(t){return n.a.get(a+"/store/checkname",{params:t})},u=function(t){return n.a.get(a+"/store/getmerchant",{params:t})},c=function(t){return n.a.post(a+"/merchant/update",t)},d=function(t){return n.a.get(a+"/industry/listall",{params:t})},p=function(t){return n.a.post(a+"/merchant/save",t)},f=function(t){return n.a.get(a+"/store/branch/list",{params:t})},h=function(t){return n.a.get(a+"/store/branch/get",{params:t})},m=function(t){return n.a.post(a+"/store/branch/save",t)},g=function(t){return n.a.post(a+"/store/branch/update",t,{})},A=function(t){return n.a.post(a+"/store/operator/changestatus",t)},b=function(t){return n.a.get(a+"/store/operator/get",{params:t})},y=function(t){return n.a.get(a+"/store/operator/getnum",{params:t})},v=function(t){return n.a.get(a+"/store/operator/list",{params:t})},C=function(t){return n.a.post(a+"/store/operator/save",t)},x=function(t){return n.a.post(a+"/store/operator/update",t)},B=function(t){return n.a.get(a+"/store/operator/checkaccount",{params:t})},w=function(t){return n.a.post(a+"/store/operator/role/changestatus",t)},k=function(t){return n.a.get(a+"/store/operator/role/get",{params:t})},F=function(t){return n.a.get(a+"/store/operator/role/list",{params:t})},O=function(t){return n.a.get(a+"/store/operator/role/getauthority",{params:t})},j=function(t){return n.a.post(a+"/store/operator/role/save",t)},_=function(t){return n.a.post(a+"/store/operator/role/update",t)},S=function(t){return n.a.get(a+"/store/operator/role/usedlist",{params:t})},z=function(t){return n.a.get(a+"/store/operator/role/checkname",{params:t})},T=function(t){return n.a.get(a+"/store/cate/get",{params:t})},U=function(t){return n.a.get(a+"/store/cate/list",{params:t})},$=function(t){return n.a.post(a+"/store/cate/remove",t)},N=function(t){return n.a.post(a+"/store/cate/save",t)},P=function(t){return n.a.post(a+"/store/cate/update",t)},I=function(t){return n.a.get(a+"/store/cate/product/list",{params:t})},D=function(t){return n.a.post(a+"/store/cate/product/remove",t)},L=function(t){return n.a.get(a+"/store/cate/product/listcate",{params:t})},E=function(t){return n.a.post(a+"/store/cate/product/save",t)},V=function(t){return n.a.get(a+"/product/pagetheshelves",{params:t})},R=function(t){return n.a.get(a+"/store/brand/get",{params:t})},q=function(t){return n.a.get(a+"/store/brand/list",{params:t})},M=function(t){return n.a.post(a+"/store/brand/update",t)},K=function(t){return n.a.post(a+"/store/brand/verify",t)},H=function(t){return n.a.get(a+"/store/brand/listindustrybrand",{params:t})},Y=function(t){return n.a.post(a+"/store/brand/cancelverify",t)},Z=function(t){return n.a.post(a+"/store/brand/savebrand",t)},J=function(t){return n.a.get(a+"/store/brand/checkbrandname",{params:t})},W=function(t){return n.a.get(a+"/brand/get",{params:t})}},tGhi:function(t,e,r){var n=r("Qxk2");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);r("6imX")("530ef0f2",n,!0)},zN2i:function(t,e,r){"use strict";var n=String.prototype.replace,i=/%20/g;t.exports={default:"RFC3986",formatters:{RFC1738:function(t){return n.call(t,i,"+")},RFC3986:function(t){return t}},RFC1738:"RFC1738",RFC3986:"RFC3986"}}});
//# sourceMappingURL=15.cbec43419c10651f61d5.js.map