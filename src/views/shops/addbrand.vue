<template>
	<section class="add-account">
		
		<el-form v-loading="listLoading" :model="ruleForm" :rules="rules" ref="ruleForm">
			<el-form-item label="品牌名称" label-width="100px" prop="nameCn">
				<div>{{ruleForm.nameCn}}</div>
			</el-form-item>
			<el-form-item label="品牌资质" label-width="100px">
				<upload-pictures :note="uploadAptitude"></upload-pictures>
			</el-form-item>
			<el-form-item prop="ways" label="授权渠道 " label-width="100px">
				<el-input v-model="ruleForm.ways" placeholder="请输入授权渠道" class="wid400"></el-input>
			</el-form-item>	
			<el-form-item prop="cityNames" label="授权城市"  label-width="100px">
				<el-input v-model="ruleForm.cityNames" placeholder="请输入授权城市" class="wid400"></el-input>
			</el-form-item>
			<el-form-item label="有效时间"  label-width="100px">
			    <el-col style="width:190px;">
			      <el-form-item prop="dateStart">
			        <el-date-picker type="date" v-model="ruleForm.startValidTime"  placeholder="请输入有效起始时间" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			    <el-col class="line" style="text-align:center;width:20px;">-</el-col>
			    <el-col style="width:190px;">
			      <el-form-item prop="dateEnd">
			        <el-date-picker type="date" v-model="ruleForm.endValidTime" placeholder="请输入有效结束时间" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			</el-form-item>
			<el-form-item prop="contactMobile" label="联系电话"  label-width="100px">
				<el-input v-model="ruleForm.contactMobile" placeholder="请输入联系电话" class="wid400"></el-input>
				<p class="tishi">审核同学有疑问时，会通过此联系方式联系您</p>
			</el-form-item>
			<el-form-item label="" label-width="100px">
				<el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
			</el-form-item>
			
		</el-form>
		<ul>
			<template>
				<li  v-for="(brandTit,index) in brandTits" @click="switchover(index,brandTit)" :brand-id="brandTit.id" :class="{on:index==nowIndex}">
					<h6>{{brandTit.name}}</h6>
					<p>(待填写)</p>
				</li>
			</template>
		</ul>
	</section>
	
</template>

<script>
import { brandGet,storeBrandUpdate } from '@/api/shopApi';
import UploadPictures from '@/components/UploadPictures.vue'/*上传图片组件*/

export default {
  	components: {
  		UploadPictures
  	},

    data() {
        return {
	      	isCompile:false,//标记是编辑页面还是创建品牌页面
	      	listLoading:false,//loading效果
	      	database:{},//用于添加品牌页面记录每个品牌编辑的数据
	      	brandTits:[
	      		{
	      			name:"品牌1",
	      			id:"1"
	      		},
	      		{
	      			name:"品牌2",
	      			id:"2"
	      		},
	      		{
	      			name:"品牌3",
	      			id:"3"
	      		},
	      		{
	      			name:"品牌4",
	      			id:"4"
	      		}
	      	],//标记右上角的品牌名称信息
	      	nowIndex:0,//编辑页面，用于切换品牌
	      	prevIndex:0,//记录上一个的index品牌
	      	uploadAptitude:"图片尺寸200px*200px以上，大小800k以内，格式png/jpg/jpeg，格式要求jpg、jpeg、png，不超过10MB",
	        ruleForm: {
	        	storeBrandId:"",
	            nameCn: '品牌1',
	            ways: '',
	            cityNames: '',
	            startValidTime: '',
	            endValidTime: '',
	            contactMobile: ''
	        },
	        fullModel: {
	        	storeBrandId:"",
	            nameCn: '',
	            ways: '',
	            cityNames: '',
	            startValidTime: '',
	            endValidTime: '',
	            contactMobile: ''
	        },
	        rules: {
		        ways: [
		          	{ required: true, message: '请输入授权渠道', trigger: 'blur' },
		          	{ max: 50, message: '长度最多 50 位', trigger: 'blur' }
		        ],
		        cityNames: [
		          	{ required: true, message: '请输入授权城市', trigger: 'blur' },
		          	{ max: 20, message: '长度最多 20 位', trigger: 'blur' }
		        ],
		        startValidTime: [
		          	{ type: 'date', required: true, message: '请选择有效起始时间', trigger: 'blur' }
		        ],
		        endValidTime: [
		         	{ type: 'date', required: true, message: '请选择有效结束时间', trigger: 'blur' }
		        ],
		        contactMobile: [
		          	{ required: true, message: '请填写联系电话', trigger: 'blur' },
		          	{ min: 11, max: 11, message: '长度为 11 位', trigger: 'blur' }
		        ]
		    }
    	};
    },
    
    mounted() {
    	/*如果是编辑品牌页面，需要取该品牌的数据，compile=1为编辑页面*/
    	var compile=this.$route.query.compile;
    	var storeBrandId=this.$route.query.storeBrandId;
	    if(compile==1){	
	    	this.isCompile=false;
	    	//获取品牌信息
	    	let para = {
		          storeBrandId:storeBrandId
		        };

	        this.listLoading = true;
	        brandGet(para).then((res) => {
	        	if(res.data.code==0){
	        		this.ruleForm = res.data.data;
	        	}
	          	this.listLoading = false;
	        }).catch((res)=> {
	          	this.listLoading = false;
	        });

	    	this.brandTits=[{
	    		name:this.ruleForm.nameCn,
	    		id:storeBrandId
	    	}];
	    }
	},

    methods: {
    	/*切换品牌*/
    	switchover(index,brandTit){

    		this.database["key"+this.prevIndex]=this.ruleForm;//切换品牌前保存当前品牌填写的信息
    		this.prevIndex=this.nowIndex=index; 

    		//切换品牌成功后，判断之前是否有存储数据，将数据填写在表单里
    		if(this.database["key"+index]==undefined){
    			this.ruleForm.storeBrandId="";
	            this.ruleForm.nameCn= '';
	            this.ruleForm.ways= '';
	            this.ruleForm.cityNames= '';
	            this.ruleForm.startValidTime= '';
	            this.ruleForm.endValidTime= '';
	            this.ruleForm.contactMobile= '';
    			//this.ruleForm=this.fullModel;
    			console.log(this.ruleForm);
    		}else{
				this.ruleForm=this.database["key"+index];
				console.log(this.ruleForm)
    		}
    		
    		this.ruleForm.nameCn=brandTit.name;    
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
    	},

    	/*编辑失败后回到品牌列表*/
    	fail(){
    		return false;
    	},

    	/*提交品牌信息*/
	    submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	/*将时间转换为毫秒数*/
	          	this.ruleForm.startValidTime=this.transitionTime(this.ruleForm.startValidTime);
	          	this.ruleForm.endValidTime=this.transitionTime(this.ruleForm.endValidTime);

	            var para = new URLSearchParams();
		        para.append('storeBrandId',this.ruleForm.storeBrandId);
		        para.append('authorizationUrl',this.ruleForm.authorizationUrl);
		        para.append('ways',this.ruleForm.ways);
		        para.append('cityNames',this.ruleForm.cityNames);
		        para.append('startValidTime',this.ruleForm.startValidTime);
		        para.append('endValidTime',this.ruleForm.endValidTime);
		        para.append('contactMobile',this.ruleForm.contactMobile);

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
	          } else {
	            return false;
	          }
	        });
	      }
	    }
  }
</script>

<style lang="scss">
.add-account{
	padding-top:20px;
	/* 公共样式 */
	.wid400{
    	width:400px;
    }
    p,h6,ul{
    	margin:0;
    	padding:0;
    }
    .tishi{
		font-size: 12px;
		color: #999999;
	}
	ul{
		list-style: none;
		width:195px;
		margin-top:-570px;
		border-top:1px solid #ddd;
		border-right:1px solid #ddd;
		min-height:570px;
		background:#F5F7FA;
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
				line-height:20px;
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
		}
		li.on:before,li.on:after{
			border: solid transparent;
		  	content: ' ';
		  	height: 0;
		  	left: 174px;
		  	position: absolute;
		  	width: 0;
		}
		li.on:before {
		    border-width: 10px;
		    border-right-color: #ddd;
		    top: 35px;
		}
		li.on:after{
			border-width: 9px;
			border-right-color: #fff;
			top: 36px;
			left:176px;
		}
		
	}
	form.el-form{
		margin-left:195px;
		height:570px;
		min-width:600px;
		padding-top:30px;
		border-top:1px solid #ddd;
	}	
}
</style>