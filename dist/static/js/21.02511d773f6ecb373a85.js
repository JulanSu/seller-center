webpackJsonp([21],{"3SZ7":function(r,t,e){r.exports={default:e("CnbX"),__esModule:!0}},"6FSb":function(r,t,e){"use strict";var n=Object.prototype.hasOwnProperty,o=function(){for(var r=[],t=0;t<256;++t)r.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return r}(),a=function(r){for(var t;r.length;){var e=r.pop();if(t=e.obj[e.prop],Array.isArray(t)){for(var n=[],o=0;o<t.length;++o)void 0!==t[o]&&n.push(t[o]);e.obj[e.prop]=n}}return t};t.arrayToObject=function(r,t){for(var e=t&&t.plainObjects?Object.create(null):{},n=0;n<r.length;++n)void 0!==r[n]&&(e[n]=r[n]);return e},t.merge=function(r,e,o){if(!e)return r;if("object"!=typeof e){if(Array.isArray(r))r.push(e);else{if("object"!=typeof r)return[r,e];(o.plainObjects||o.allowPrototypes||!n.call(Object.prototype,e))&&(r[e]=!0)}return r}if("object"!=typeof r)return[r].concat(e);var a=r;return Array.isArray(r)&&!Array.isArray(e)&&(a=t.arrayToObject(r,o)),Array.isArray(r)&&Array.isArray(e)?(e.forEach(function(e,a){n.call(r,a)?r[a]&&"object"==typeof r[a]?r[a]=t.merge(r[a],e,o):r.push(e):r[a]=e}),r):Object.keys(e).reduce(function(r,a){var i=e[a];return n.call(r,a)?r[a]=t.merge(r[a],i,o):r[a]=i,r},a)},t.assign=function(r,t){return Object.keys(t).reduce(function(r,e){return r[e]=t[e],r},r)},t.decode=function(r){try{return decodeURIComponent(r.replace(/\+/g," "))}catch(t){return r}},t.encode=function(r){if(0===r.length)return r;for(var t="string"==typeof r?r:String(r),e="",n=0;n<t.length;++n){var a=t.charCodeAt(n);45===a||46===a||95===a||126===a||a>=48&&a<=57||a>=65&&a<=90||a>=97&&a<=122?e+=t.charAt(n):a<128?e+=o[a]:a<2048?e+=o[192|a>>6]+o[128|63&a]:a<55296||a>=57344?e+=o[224|a>>12]+o[128|a>>6&63]+o[128|63&a]:(n+=1,a=65536+((1023&a)<<10|1023&t.charCodeAt(n)),e+=o[240|a>>18]+o[128|a>>12&63]+o[128|a>>6&63]+o[128|63&a])}return e},t.compact=function(r){for(var t=[{obj:{o:r},prop:"o"}],e=[],n=0;n<t.length;++n)for(var o=t[n],i=o.obj[o.prop],u=Object.keys(i),s=0;s<u.length;++s){var c=u[s],l=i[c];"object"==typeof l&&null!==l&&-1===e.indexOf(l)&&(t.push({obj:i,prop:c}),e.push(l))}return a(t)},t.isRegExp=function(r){return"[object RegExp]"===Object.prototype.toString.call(r)},t.isBuffer=function(r){return null!==r&&void 0!==r&&!!(r.constructor&&r.constructor.isBuffer&&r.constructor.isBuffer(r))}},"6I8f":function(r,t,e){"use strict";var n=function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("section",{directives:[{name:"loading",rawName:"v-loading",value:r.listLoading,expression:"listLoading"}],staticClass:"new-role"},[e("el-form",{ref:"ruleForm",staticStyle:{width:"60%","min-width":"600px"},attrs:{model:r.ruleForm,"label-width":"80px",rules:r.rules}},[e("el-form-item",{attrs:{label:"岗位名称","label-width":"100px",prop:"roleName"}},[e("el-input",{staticClass:"wid270",attrs:{maxlength:20,placeholder:"请输入岗位名称"},on:{blur:r.findName},model:{value:r.ruleForm.roleName,callback:function(t){r.$set(r.ruleForm,"roleName",t)},expression:"ruleForm.roleName"}})],1),r._v(" "),e("el-form-item",{attrs:{label:"权限","label-width":"100px",prop:"roleAuthority"}},[e("el-checkbox-group",{model:{value:r.ruleForm.roleAuthority,callback:function(t){r.$set(r.ruleForm,"roleAuthority",t)},expression:"ruleForm.roleAuthority"}},r._l(r.jurisdiction,function(t){return e("el-checkbox",{key:t.value,attrs:{label:t.value}},[r._v("\n                "+r._s(t.name)+"\n            ")])}))],1),r._v(" "),e("el-form-item",{attrs:{label:"","label-width":"100px"}},[e("el-button",{staticClass:"wid100",attrs:{type:"primary"},on:{click:function(t){r.changePermission("ruleForm")}}},[r._v(r._s(r.btnHtml))])],1)],1)],1)},o=[],a={render:n,staticRenderFns:o};t.a=a},"9Y/5":function(r,t,e){"use strict";var n=e("6FSb"),o=Object.prototype.hasOwnProperty,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:n.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},i=function(r,t){for(var e={},n=t.ignoreQueryPrefix?r.replace(/^\?/,""):r,i=t.parameterLimit===1/0?void 0:t.parameterLimit,u=n.split(t.delimiter,i),s=0;s<u.length;++s){var c,l,f=u[s],d=f.indexOf("]="),p=-1===d?f.indexOf("="):d+1;-1===p?(c=t.decoder(f,a.decoder),l=t.strictNullHandling?null:""):(c=t.decoder(f.slice(0,p),a.decoder),l=t.decoder(f.slice(p+1),a.decoder)),o.call(e,c)?e[c]=[].concat(e[c]).concat(l):e[c]=l}return e},u=function(r,t,e){for(var n=t,o=r.length-1;o>=0;--o){var a,i=r[o];if("[]"===i)a=[],a=a.concat(n);else{a=e.plainObjects?Object.create(null):{};var u="["===i.charAt(0)&&"]"===i.charAt(i.length-1)?i.slice(1,-1):i,s=parseInt(u,10);!isNaN(s)&&i!==u&&String(s)===u&&s>=0&&e.parseArrays&&s<=e.arrayLimit?(a=[],a[s]=n):a[u]=n}n=a}return n},s=function(r,t,e){if(r){var n=e.allowDots?r.replace(/\.([^.[]+)/g,"[$1]"):r,a=/(\[[^[\]]*])/,i=/(\[[^[\]]*])/g,s=a.exec(n),c=s?n.slice(0,s.index):n,l=[];if(c){if(!e.plainObjects&&o.call(Object.prototype,c)&&!e.allowPrototypes)return;l.push(c)}for(var f=0;null!==(s=i.exec(n))&&f<e.depth;){if(f+=1,!e.plainObjects&&o.call(Object.prototype,s[1].slice(1,-1))&&!e.allowPrototypes)return;l.push(s[1])}return s&&l.push("["+n.slice(s.index)+"]"),u(l,t,e)}};r.exports=function(r,t){var e=t?n.assign({},t):{};if(null!==e.decoder&&void 0!==e.decoder&&"function"!=typeof e.decoder)throw new TypeError("Decoder has to be a function.");if(e.ignoreQueryPrefix=!0===e.ignoreQueryPrefix,e.delimiter="string"==typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:a.delimiter,e.depth="number"==typeof e.depth?e.depth:a.depth,e.arrayLimit="number"==typeof e.arrayLimit?e.arrayLimit:a.arrayLimit,e.parseArrays=!1!==e.parseArrays,e.decoder="function"==typeof e.decoder?e.decoder:a.decoder,e.allowDots="boolean"==typeof e.allowDots?e.allowDots:a.allowDots,e.plainObjects="boolean"==typeof e.plainObjects?e.plainObjects:a.plainObjects,e.allowPrototypes="boolean"==typeof e.allowPrototypes?e.allowPrototypes:a.allowPrototypes,e.parameterLimit="number"==typeof e.parameterLimit?e.parameterLimit:a.parameterLimit,e.strictNullHandling="boolean"==typeof e.strictNullHandling?e.strictNullHandling:a.strictNullHandling,""===r||null===r||void 0===r)return e.plainObjects?Object.create(null):{};for(var o="string"==typeof r?i(r,e):r,u=e.plainObjects?Object.create(null):{},c=Object.keys(o),l=0;l<c.length;++l){var f=c[l],d=s(f,o[f],e);u=n.merge(u,d,e)}return n.compact(u)}},BWJn:function(r,t,e){"use strict";var n=e("6FSb"),o=e("zN2i"),a={brackets:function(r){return r+"[]"},indices:function(r,t){return r+"["+t+"]"},repeat:function(r){return r}},i=Date.prototype.toISOString,u={delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,serializeDate:function(r){return i.call(r)},skipNulls:!1,strictNullHandling:!1},s=function r(t,e,o,a,i,s,c,l,f,d,p,m){var g=t;if("function"==typeof c)g=c(e,g);else if(g instanceof Date)g=d(g);else if(null===g){if(a)return s&&!m?s(e,u.encoder):e;g=""}if("string"==typeof g||"number"==typeof g||"boolean"==typeof g||n.isBuffer(g)){if(s){return[p(m?e:s(e,u.encoder))+"="+p(s(g,u.encoder))]}return[p(e)+"="+p(String(g))]}var y=[];if(void 0===g)return y;var h;if(Array.isArray(c))h=c;else{var b=Object.keys(g);h=l?b.sort(l):b}for(var v=0;v<h.length;++v){var O=h[v];i&&null===g[O]||(y=Array.isArray(g)?y.concat(r(g[O],o(e,O),o,a,i,s,c,l,f,d,p,m)):y.concat(r(g[O],e+(f?"."+O:"["+O+"]"),o,a,i,s,c,l,f,d,p,m)))}return y};r.exports=function(r,t){var e=r,i=t?n.assign({},t):{};if(null!==i.encoder&&void 0!==i.encoder&&"function"!=typeof i.encoder)throw new TypeError("Encoder has to be a function.");var c=void 0===i.delimiter?u.delimiter:i.delimiter,l="boolean"==typeof i.strictNullHandling?i.strictNullHandling:u.strictNullHandling,f="boolean"==typeof i.skipNulls?i.skipNulls:u.skipNulls,d="boolean"==typeof i.encode?i.encode:u.encode,p="function"==typeof i.encoder?i.encoder:u.encoder,m="function"==typeof i.sort?i.sort:null,g=void 0!==i.allowDots&&i.allowDots,y="function"==typeof i.serializeDate?i.serializeDate:u.serializeDate,h="boolean"==typeof i.encodeValuesOnly?i.encodeValuesOnly:u.encodeValuesOnly;if(void 0===i.format)i.format=o.default;else if(!Object.prototype.hasOwnProperty.call(o.formatters,i.format))throw new TypeError("Unknown format option provided.");var b,v,O=o.formatters[i.format];"function"==typeof i.filter?(v=i.filter,e=v("",e)):Array.isArray(i.filter)&&(v=i.filter,b=v);var j=[];if("object"!=typeof e||null===e)return"";var A;A=i.arrayFormat in a?i.arrayFormat:"indices"in i?i.indices?"indices":"repeat":"indices";var N=a[A];b||(b=Object.keys(e)),m&&b.sort(m);for(var F=0;F<b.length;++F){var w=b[F];f&&null===e[w]||(j=j.concat(s(e[w],w,N,l,f,d?p:null,v,m,g,y,O,h)))}var x=j.join(c),L=!0===i.addQueryPrefix?"?":"";return x.length>0?L+x:""}},CnbX:function(r,t,e){var n=e("ZBPP"),o=n.JSON||(n.JSON={stringify:JSON.stringify});r.exports=function(r){return o.stringify.apply(o,arguments)}},HKWm:function(r,t,e){"use strict";var n=e("3SZ7"),o=e.n(n),a=e("pgiz");t.a={data:function(){return{csname:"",btnHtml:"保存权限",isAdd:1,listLoading:!1,jurisdiction:[],ruleForm:{storeOperatorRoleId:"",roleName:"",roleAuthority:[]},rules:{roleName:[{required:!0,message:"请输入角色名称",trigger:"blur"},{min:1,max:20,message:"请输入角色名称",trigger:"blur"}],roleAuthority:[{type:"array",required:!0,message:"请选择权限",trigger:"change"}]}}},created:function(){var r=this;this.listLoading=!0,Object(a.I)({storeId:config.storeId}).then(function(t){r.listLoading=!1,0==t.data.code?r.jurisdiction=t.data.data:r.$message.error(t.data.message)}).catch(function(t){r.listLoading=!1,r.$message.error("接口建立连接失败")})},mounted:function(){var r=this.$route.params.id;r&&(this.dataFetch(r),this.isAdd=2)},methods:{findName:function(){var r=this;if(!this.ruleForm.roleName||this.ruleForm.roleName==this.csname)return!1;var t={storeId:config.storeId,roleName:this.ruleForm.roleName};Object(a.G)(t).then(function(t){1==t.data.code&&r.$message.error("角色重名，请重新输入角色名称")})},dataFetch:function(r){var t=this;this.btnHtml="修改权限";var e={storeId:config.storeId,storeOperatorRoleId:r};this.listLoading=!0,Object(a.H)(e).then(function(r){0==r.data.code&&(t.ruleForm=r.data.data,t.csname=t.ruleForm.roleName,t.ruleForm.roleAuthority?t.ruleForm.roleAuthority=JSON.parse(t.ruleForm.roleAuthority):t.ruleForm.roleAuthority=[]),t.listLoading=!1}).catch(function(r){t.listLoading=!1,t.$message.error("接口建立连接失败")})},sucFun:function(r){var t=this;this.listLoading=!1,0==r.data.code?this.$message({message:"提交成功",type:"success",onClose:function(){t.$router.push({path:"/store/bypass-management/role-list"})}}):this.$message.error(r.data.message)},changePermission:function(r){var t=this;this.$refs[r].validate(function(r){if(!r)return!1;t.listLoading=!0;var e=new URLSearchParams;e.append("storeId",config.storeId),e.append("roleName",t.ruleForm.roleName),e.append("roleAuthority",o()(t.ruleForm.roleAuthority)),2==t.isAdd?(e.append("storeOperatorRoleId",t.ruleForm.storeOperatorRoleId),Object(a.L)(e).then(function(r){t.sucFun(r)}).catch(function(r){t.listLoading=!1,t.$message.error("接口建立连接失败")})):Object(a.K)(e).then(function(r){t.sucFun(r)}).catch(function(r){t.listLoading=!1,t.$message.error("接口建立连接失败")})})}}}},TOsV:function(r,t,e){"use strict";var n=e("BWJn"),o=e("9Y/5"),a=e("zN2i");r.exports={formats:a,parse:o,stringify:n}},pgiz:function(r,t,e){"use strict";e.d(t,"o",function(){return i}),e.d(t,"S",function(){return u}),e.d(t,"P",function(){return s}),e.d(t,"Q",function(){return c}),e.d(t,"s",function(){return l}),e.d(t,"p",function(){return f}),e.d(t,"r",function(){return d}),e.d(t,"n",function(){return p}),e.d(t,"m",function(){return m}),e.d(t,"N",function(){return g}),e.d(t,"R",function(){return y}),e.d(t,"t",function(){return h}),e.d(t,"v",function(){return b}),e.d(t,"w",function(){return v}),e.d(t,"x",function(){return O}),e.d(t,"y",function(){return j}),e.d(t,"z",function(){return A}),e.d(t,"u",function(){return N}),e.d(t,"F",function(){return F}),e.d(t,"H",function(){return w}),e.d(t,"J",function(){return x}),e.d(t,"I",function(){return L}),e.d(t,"K",function(){return k}),e.d(t,"L",function(){return P}),e.d(t,"M",function(){return S}),e.d(t,"G",function(){return I}),e.d(t,"h",function(){return R}),e.d(t,"i",function(){return C}),e.d(t,"j",function(){return D}),e.d(t,"k",function(){return H}),e.d(t,"l",function(){return $}),e.d(t,"A",function(){return _}),e.d(t,"D",function(){return E}),e.d(t,"B",function(){return z}),e.d(t,"E",function(){return B}),e.d(t,"C",function(){return J}),e.d(t,"d",function(){return T}),e.d(t,"e",function(){return V}),e.d(t,"O",function(){return K}),e.d(t,"g",function(){return Q}),e.d(t,"q",function(){return U}),e.d(t,"b",function(){return W}),e.d(t,"f",function(){return q}),e.d(t,"c",function(){return M}),e.d(t,"a",function(){return Y});var n=e("Kriy"),o=e("TOsV"),a=(e.n(o),"http://shop.dmp.hzjiehun.bid"),i=(Object({NODE_ENV:"production"}).API_ROOT,function(r){return n.a.get(a+"/store/get",{params:r})}),u=function(r){return n.a.post(a+"/store/update",r)},s=function(r){return n.a.get(a+"/store/checkname",{params:r})},c=function(r){return n.a.get(a+"/store/getmerchant",{params:r})},l=function(r){return n.a.post(a+"/merchant/update",r)},f=function(r){return n.a.get(a+"/industry/listall",{params:r})},d=function(r){return n.a.post(a+"/merchant/save",r)},p=function(r){return n.a.get(a+"/store/branch/list",{params:r})},m=function(r){return n.a.get(a+"/store/branch/get",{params:r})},g=function(r){return n.a.post(a+"/store/branch/save",r)},y=function(r){return n.a.post(a+"/store/branch/update",r,{})},h=function(r){return n.a.post(a+"/store/operator/changestatus",r)},b=function(r){return n.a.get(a+"/store/operator/get",{params:r})},v=function(r){return n.a.get(a+"/store/operator/getnum",{params:r})},O=function(r){return n.a.get(a+"/store/operator/list",{params:r})},j=function(r){return n.a.post(a+"/store/operator/save",r)},A=function(r){return n.a.post(a+"/store/operator/update",r)},N=function(r){return n.a.get(a+"/store/operator/checkaccount",{params:r})},F=function(r){return n.a.post(a+"/store/operator/role/changestatus",r)},w=function(r){return n.a.get(a+"/store/operator/role/get",{params:r})},x=function(r){return n.a.get(a+"/store/operator/role/list",{params:r})},L=function(r){return n.a.get(a+"/store/operator/role/getauthority",{params:r})},k=function(r){return n.a.post(a+"/store/operator/role/save",r)},P=function(r){return n.a.post(a+"/store/operator/role/update",r)},S=function(r){return n.a.get(a+"/store/operator/role/usedlist",{params:r})},I=function(r){return n.a.get(a+"/store/operator/role/checkname",{params:r})},R=function(r){return n.a.get(a+"/store/cate/get",{params:r})},C=function(r){return n.a.get(a+"/store/cate/list",{params:r})},D=function(r){return n.a.post(a+"/store/cate/remove",r)},H=function(r){return n.a.post(a+"/store/cate/save",r)},$=function(r){return n.a.post(a+"/store/cate/update",r)},_=function(r){return n.a.get(a+"/store/cate/product/list",{params:r})},E=function(r){return n.a.post(a+"/store/cate/product/remove",r)},z=function(r){return n.a.get(a+"/store/cate/product/listcate",{params:r})},B=function(r){return n.a.post(a+"/store/cate/product/save",r)},J=function(r){return n.a.get(a+"/product/pagetheshelves",{params:r})},T=function(r){return n.a.get(a+"/store/brand/get",{params:r})},V=function(r){return n.a.get(a+"/store/brand/list",{params:r})},K=function(r){return n.a.post(a+"/store/brand/update",r)},Q=function(r){return n.a.post(a+"/store/brand/verify",r)},U=function(r){return n.a.get(a+"/store/brand/listindustrybrand",{params:r})},W=function(r){return n.a.post(a+"/store/brand/cancelverify",r)},q=function(r){return n.a.post(a+"/store/brand/savebrand",r)},M=function(r){return n.a.get(a+"/store/brand/checkbrandname",{params:r})},Y=function(r){return n.a.get(a+"/brand/get",{params:r})}},xgSY:function(r,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("HKWm"),o=e("6I8f"),a=e("mPyB"),i=a(n.a,o.a,!1,null,null,null);t.default=i.exports},zN2i:function(r,t,e){"use strict";var n=String.prototype.replace,o=/%20/g;r.exports={default:"RFC3986",formatters:{RFC1738:function(r){return n.call(r,o,"+")},RFC3986:function(r){return r}},RFC1738:"RFC1738",RFC3986:"RFC3986"}}});
//# sourceMappingURL=21.02511d773f6ecb373a85.js.map