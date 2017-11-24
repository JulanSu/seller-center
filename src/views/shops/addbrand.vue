<template>
	<section class="add-account" v-loading="listLoading">
		<div class="gotoPrev">
			<router-link to="/store/brand-management" class="selbrand" icon="plus" style="width:100px;cursor:pointer;">
		      	<b class="iconfont icon-fanhui"></b>
				<span>{{tit}}品牌</span>
		    </router-link>	
		</div>
		<div style="min-width:870px;">
			<ul>
				<template>
					<li  v-for="(brandTit,key,index) in brandTits" @click="switchover(index,key,brandTit)" :brand-id="key" :class="{on:index==nowIndex}">
						<h6>{{brandTit.nameCn}}</h6>
						<div>
							<p v-if="index==i"  v-for="(item,k,i) in tishi">
								<span v-if="item==false">(待填写)</span>
								<span v-else style="color:#41cac0">(已填写完整)</span>
							</p>
						</div>
					</li>
				</template>
			</ul>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
				<el-form-item label="品牌名称" label-width="120px" prop="nameCn">
					<div>{{ruleForm.nameCn}}</div>
				</el-form-item>
				<el-form-item v-if="ruleForm.registerLocation==1" label="品牌资质" label-width="120px"  class="requireHezi">
					<span class="require" style='left:-78px;'>*</span>
					<upload-pictures :note="uploadAptitude" :url="ruleForm.authorizationUrl" :listen="'listenToPic1'" :picSize='"10.MB"' @listenToPic1="sucpic1" ref="uploadPic"></upload-pictures>
				</el-form-item>
				<el-form-item v-else label="报关单" label-width="120px" class="requireHezi">
					<span class="require" style='left:-63px;'>*</span>
					<upload-pictures :note="uploadAptitude" :url="ruleForm.authorizationUrl" :listen="'listenToPic1'" :picSize='"10.MB"' @listenToPic1="sucpic1" ref="uploadPic"></upload-pictures>
				</el-form-item>
				<el-form-item label="" prop="authorizationUrl"  label-width="120px" class='updata'>
					<el-input v-model="ruleForm.authorizationUrl" class="wid280"></el-input>
				</el-form-item>
				<el-form-item prop="ways" label="授权渠道 " label-width="120px">
					<el-input :maxlength="50" v-model="ruleForm.ways" placeholder="请输入授权渠道" class="wid400"></el-input>
				</el-form-item>	
				<el-form-item prop="cityNames" label="授权城市"  label-width="120px">
					<el-input :maxlength="20" v-model="ruleForm.cityNames" placeholder="请输入授权城市" class="wid400"></el-input>
				</el-form-item>
				<el-form-item label="有效截止时间"  label-width="120px" prop="endValidTime"  class="timers">
				    <el-date-picker type="date" v-model="ruleForm.endValidTime" :editable="false" placeholder="请选择有效截止时间" style="width: 100%;"></el-date-picker>
				</el-form-item>
				<el-form-item prop="contactMobile" label="联系电话"  label-width="120px">
					<el-input :maxlength="11" v-model="ruleForm.contactMobile" placeholder="请输入联系电话" class="wid400"></el-input>
					<p class="tishi">审核同学有疑问时，会通过此联系方式联系您</p>
				</el-form-item>
				<el-form-item label="" label-width="120px">
					<el-button :class="{notclick:btnClick}" type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
				</el-form-item>
				
			</el-form>
		</div>
	</section>
	
</template>

<script>
import { brandGet,storeBrandUpdate,brandVerify } from '@/api/shopApi';
import UploadPictures from '@/components/UploadPictures.vue'/*上传图片组件*/

export default {
  	components: {
  		UploadPictures
  	},

    data() {
    	var validatePhone = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入联系电话'));
	        } else {
	        	var first=value.slice(0,1);
		        if ((value.length!=11)||(first!=1)) {
		          	callback(new Error('请输入正确的联系电话'));
		        }else{
		        	callback();
		        }
	        }
	    };
	    var validateNumber1= (rule, value, callback) => {
	    	if(!value){
	    		callback();
	    	}else{
	    		var reg =/^\d+$/g;
		        if (!value.match(reg)) {
		            callback(new Error('请输入正确的联系电话'));
		        } else {
		            callback();
		        }
	    	}   
        };
        return {
        	tit:"添加",
        	btnClick:false,
	      	isCompile:false,//标记是编辑页面还是创建品牌页面
	      	listLoading:false,//loading效果
	      	database:{},//用于添加品牌页面记录每个品牌编辑的数据
	      	brandTits:{},//标记右上角的品牌名称信息
	      	nowIndex:0,//编辑页面，用于切换品牌
	      	prevKey:0,//记录上一个的index品牌
	      	tishi:{},//用于记录品牌添加页面，品牌是否是待填写状态
	      	subBrandId:'',
	      	uploadAptitude:"图片尺寸200px*200px以上，大小800k以内，格式png/jpg/jpeg，格式要求jpg、jpeg、png，不超过10MB",
	        ruleForm: {
	        	storeBrandId:"",
	        	brandId:'',
	            nameCn: '',
	            ways: '',
	            cityNames: '',
	            endValidTime: '',
	            contactMobile: '',
	            authorizationUrl:'',
	            registerLocation:'',
	            submit:false
	        },
	        fullModel: {
	        	storeBrandId:"",
	        	brandId:'',
	            nameCn: '',
	            ways: '',
	            cityNames: '',
	            endValidTime: '',
	            contactMobile: '',
	            authorizationUrl:'',
	            registerLocation:'',
	            submit:false
	        },
	        rules: {
	        	authorizationUrl:[
	        		{ required: true, message: '请上传图片', trigger: 'blur' }
	        	],
	        	authorizationUrl2:[
	        		{ required: true, message: '请上传报关单', trigger: 'blur' }
	        	],
		        ways: [
		          	{ required: true, message: '请输入授权渠道', trigger: 'blur' },
		          	{ max: 50, message: '长度最多 50 位', trigger: 'blur' }
		        ],
		        cityNames: [
		          	{ required: true, message: '请输入授权城市', trigger: 'blur' },
		          	{ max: 20, message: '长度最多 20 位', trigger: 'blur' }
		        ],
		        endValidTime: [
		         	{ required: true,type: 'date', message: '请选择有效截止时间', trigger: 'blur' }
		        ],
		        contactMobile: [
	                { required: true,validator: validatePhone,trigger: 'blur' },
		          	{ validator:validateNumber1,trigger:'blur'},
		          	{ validator:validateNumber1,trigger:'change'}
		        ]
		    }
    	};
    },
    
    mounted() {
    	/*如果是编辑品牌页面，需要取该品牌的数据，compile=1为编辑页面*/
    	var compile=this.$route.query.compile;
    	var storeBrandId=this.$route.query.storeBrandId;
    	var noClick=this.$route.query.noClick;

	    if(compile==1){	
	    	this.tit="编辑"
	    	if((noClick==true)||(noClick=='true')){//判断是否是已禁用的品牌
	    		this.btnClick=true;
	    	}

	    	this.isCompile=false;
	    	//获取品牌信息
	    	let para = {
		          storeBrandId:storeBrandId
		        };

	        this.listLoading = true;
	        brandGet(para).then((res) => {
	        	if(res.data.code==0){
	        		this.ruleForm = res.data.data;
	            	this.ruleForm.endValidTime=new Date(this.ruleForm.endValidTime);
	        		this.brandTits={
			    		storeBrandId:{
			    			"nameCn":this.ruleForm.nameCn
			    		}
			    	};
			    	if(res.data.data.registerLocationType==0){
			    		this.ruleForm.registerLocation=1;
			    	}
	        	}else{
	        		this.$message.error(res.data.message);
	        	}
	          	this.listLoading = false;
	        }).catch((res)=> {
	          	this.listLoading = false;
	          	this.$message.error('接口建立连接失败');
	        });

	    	this.$set(this.database,"key"+storeBrandId,this.ruleForm);


    		
	    }else{//添加品牌
	    	if(this.$route.query.add=='y'){


		    	this.brandTits=JSON.parse(sessionStorage.getItem("addBrand"));
				var brandTitsKey= (function(data){
		            	var keys = [];
			            for(var pro in data){
			                keys.push(pro);
			            }
			            return keys;
			        })(this.brandTits);	

		    	var keyArr=[];
		    	for(var i in this.brandTits){
		    		keyArr.push(i);
		    		this.$set(this.database,"key"+i, JSON.parse(JSON.stringify(this.fullModel)));
		    		this.$set(this.database["key"+i],'nameCn',this.brandTits[i].nameCn);//设置品牌名称
		    		this.$set(this.database["key"+i],'registerLocation',this.brandTits[i].registerLocation);//设置品牌是大陆地区还是港澳台

		    		this.$set(this.tishi,"key"+i,false);//tishi
		    		
		    	}
		    	this.prevKey=keyArr[0];

		    	this.ruleForm=this.database["key"+brandTitsKey[0]];
	    }
	    }
	},

    watch: {
    	'ruleForm.ways':function(){
    		this.fillOut();
    	},
    	'ruleForm.cityNames':function(){
    		this.fillOut();
    	},
    	'ruleForm.endValidTime':function(){
    		this.fillOut();
    	},
    	'ruleForm.contactMobile':function(){
    		this.fillOut();
    	},
    	'ruleForm.authorizationUrl':function(){
    		this.fillOut();
    	}
    }, 

    methods: {
    	//组织机构代码证／营业执照上传成功之后
		sucpic1(url){
			this.ruleForm.authorizationUrl=url;
		},
    	/*监听添加品牌页面，每一个品牌是否填写完整*/
    	fillOut(){
    		var v1=this.ruleForm.ways,
	    		v2=this.ruleForm.cityNames,
	    		v3=this.ruleForm.endValidTime,
	    		v4=this.ruleForm.contactMobile,
	    		v5=this.ruleForm.authorizationUrl;

	    	var keyId;
	    	if(this.$route.query.compile==1){
	    		keyId="key"+this.$route.query.storeBrandId;
	    	}else{
	    		keyId="key"+this.prevKey;
	    	}
    		if(v1&&v2&&v3&&v4&&(/^1\d{10}$/.test(v4))&&v5){
        		this.$set(this.database[keyId],"submit",true);
        		this.$set(this.tishi,"key"+this.prevKey,true);

        	}else{
        		this.$set(this.database[keyId],"submit",false);
        		this.$set(this.tishi,"key"+this.prevKey,false);
        	}
    	},

    	/*切换品牌*/
    	switchover(index,key,brandTit){
    		this.$set(this.database,"key"+this.prevKey,this.ruleForm);//切换品牌前保存当前品牌填写的信息

    		this.nowIndex=index; 
			this.prevKey=key;
			
			this.ruleForm=this.database["key"+key];

			this.$refs.uploadPic.revise(this.ruleForm.authorizationUrl);//修改图片的值

    	},

    	/*时间转换为毫秒数*/
    	transitionTime(t){
    		if(t instanceof Date){
    			t=t.getTime();
    		}
    		return t;
    	},

    	/*提示消息*/
    	hint(tit,type,duration,fun){
    		this.$message({
	            message: tit,
	            type: type,
	            duration:duration,
	            onClose:function(){
	            	fun();
	            }
	        });
    	},

    	/*编辑成功后回到品牌列表*/
    	suc(){
    		this.$router.push({ path: '/store/brand-management' });
    		return false;
    	},

    	/*新增页面成功后回到品牌列表*/
    	sucAdd(){
    		this.$delete(this.tishi,"key"+this.subBrandId);
    		this.$delete(this.database,"key"+this.subBrandId);
 
			this.$delete(this.brandTits,this.subBrandId);//删除右上角的刚刚提交成功的品牌
    		this.nowIndex=0; 
    		
    		var arr1=Object.keys(this.brandTits);
	        this.ruleForm=this.database["key"+arr1[0]];

	        this.prevKey=arr1[0];
			
	        if(arr1.length){
	        	this.$refs.uploadPic.revise(this.ruleForm.authorizationUrl);//修改图片的值
	        }else{
	        	this.suc();
	        }
	       
    	},

    	/*编辑失败后回到品牌列表*/
    	fail(){
    		return false;
    	},

    	/*编辑页面的提交按钮*/
    	compileSubmit(para){
            this.listLoading = true;
	        storeBrandUpdate(para).then((res) => {
	        	if(res.data.code==0){
	        		this.hint('提交成功','success',2000,this.suc);
	        	}else{
	        		this.hint('提交失败','warning',2000,this.fail);
	        	}
	          	this.listLoading = false;
	        }).catch((res)=> {
	          	this.listLoading = false;
	          	this.hint('提交失败','warning',2000,this.fail)
	        });
    	},

    	/*新增页面的提交按钮*/
    	addSubmit(para){
    		this.listLoading = true;
	        brandVerify(para).then((res) => {
	        	if(res.data.code==0){
	        		this.hint('提交成功','success',2000,this.sucAdd);

	        	}else if((res.data.code==1)&&(res.data.message=="已有此品牌")){
	        		this.hint('已有此品牌','success',2000,this.sucAdd);
	        	}else{
	        		this.hint('提交失败','warning',2000,this.fail);
	        	}
	          	this.listLoading = false;
	        }).catch((res)=> {
	          	this.listLoading = false;
	          	this.hint('提交失败','warning',2000,this.fail)
	        });
    	},

    	/*提交品牌信息*/
	    submitForm(formName) {
	    	if(this.btnClick){
	    		return false;
	    	}
	        this.$refs[formName].validate((valid) => {
	            if (valid) {
		            /*将时间转换为毫秒数*/
		          	this.ruleForm.endValidTime=this.transitionTime(this.ruleForm.endValidTime);

		            var para = new URLSearchParams();
			       
			        para.append('authorizationUrl',this.ruleForm.authorizationUrl);
			        para.append('trademarkCertificate',this.ruleForm.authorizationUrl);
			        para.append('ways',this.ruleForm.ways);
			        para.append('cityNames',this.ruleForm.cityNames);
			        para.append('startValidTime','');
			        para.append('endValidTime',this.ruleForm.endValidTime);
			        para.append('contactMobile',this.ruleForm.contactMobile);

			       

		          	if(this.$route.query.compile==1){//编辑页面的提交
		          		para.append('storeBrandId',this.ruleForm.storeBrandId);
						this.compileSubmit(para); 
		          	}else{//新增品牌的提交
		          		para.append('storeId',config.storeId);
		          		para.append('brandId',this.prevKey);
		          		this.subBrandId=this.prevKey; 
		          		this.addSubmit(para); 
		          	}     	     	
	          	}else {
	            	return false;
	          	}
	        });
	      }
	    }
  	}
</script>

<style lang="scss">
.el-date-picker{
	width:250px !important;
}
.add-account{
	overflow: hidden;
	/* 公共样式 */
	.wid400{
    	width:400px;
    }
    a{
    	text-decoration: none;
    }
    p,h6,ul{
    	margin:0;
    	padding:0;
    }
    .tishi{
		font-size: 12px;
		color: #999999;
	}
	.notclick{
		background:#ddd !important;
		border-color:#ddd !important;
	}
	
	.timers{
		.el-date-editor{
			width:400px !important;
		}
		.el-form-item__content{
			width:224px;
		}
		.el-input__inner{
			width:400px;
		}
	}
	.gotoPrev{
		width:300px;
		background:#fff;
		height:60px;
		line-height:60px;
		position:fixed;
		top:0;
		b{
			display:inline-block;
			border:1px solid #cccccc;
			width:30px;
			line-height:18px;
			height:20px;
			text-align:center;
			color:#aaa;
			margin-right:10px;
		}
		span{
			font-size:14px;
			color:#666666;
		}
	}
	ul{
		float:left;
		list-style: none;
		width:195px;
		min-height:850px;
		background:#F5F7FA;
		border-top:1px solid #ddd;
		li{
			text-align:center;
			font-size: 14px;
			padding:22px 0;
			border-bottom:1px solid #ddd;
			border-left:2px solid transparent;
			cursor:pointer;
			position:relative;
			h6,p{
				height:20px;
			}
			h6{
				color: #666666;
				padding-bottom:6px;
			}
			p{
				color: #FF0201;
			}
		}
		li.on{
			background:#fff;
			border-left-color:#41CAC0;
			border-right:1px solid #ddd;
		}
		li.on:before,li.on:after{
			border: solid transparent;
		  	content: ' ';
		  	height: 0;
		  	left: 172px;
		  	position: absolute;
		  	width: 0;
		}
		li.on:before {
		    border-width: 10px;
		    border-right-color: #ddd;
		    top: 35px;
		}
		li.on:after{
			border-width: 12px;
			border-right-color: #fff;
			top: 33px;
			left:172px;
		}
		
	}
	form.el-form{
		float:left;
		height:620px;
		min-width:600px;
		padding-top:30px;
	}	
}
</style>