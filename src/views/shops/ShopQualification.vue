<template>
	<section class="qualification" v-loading="listLoading">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			<div v-if='shopStyle==1'>
				<category-bar :title="categoryBarTitle1"></category-bar>
				<el-form-item label="企业名称" label-width="200px" prop="enterpriseName">
					<div class="only-ready">{{ruleForm.enterpriseName}}</div>
				</el-form-item>
				<el-form-item label="组织机构代码证/营业执照" label-width="200px" class="requireHezi">
					<span class="require" style='left:-180px;'>*</span>
					<upload-pictures :note="uploadTishi" :url="ruleForm.enterpriseLicence" :listen="'listenToPic1'" :picSize='"800.kB"' @listenToPic1="sucpic1"></upload-pictures>
				</el-form-item>
				<el-form-item label="" prop="enterpriseLicence"  label-width="200px" class='updata'>
					<el-input v-model="ruleForm.enterpriseLicence" class="wid280"></el-input>
				</el-form-item>
				<el-form-item label="组织机构代码（注册号）" label-width="200px" prop="orgCode">

					<el-input  :maxlength="18" v-model="ruleForm.orgCode" placeholder="请输入组织机构代码（注册号）" class="wid280"></el-input>
				</el-form-item>
				<el-form-item label="法人姓名" label-width="200px" prop="legalPerson">
					<el-input :maxlength="30" v-model="ruleForm.legalPerson" placeholder="请输入法人姓名" class="wid280"></el-input>
				</el-form-item>
				<el-form-item label="法人身份证" label-width="200px" prop="identityNumber">
					<el-input :maxlength="18" v-model="ruleForm.identityNumber" placeholder="请输入法人身份证" class="wid280"></el-input>
				</el-form-item>
			</div>

			<div v-else>		
				<category-bar :title="categoryBarTitle2"></category-bar>
				<el-form-item label="店主姓名" label-width="200px" prop="legalPerson2">
					<el-input :maxlength="30" v-model="ruleForm.legalPerson2" placeholder="请输入店主姓名" class="wid280"></el-input>
				</el-form-item>
				<el-form-item label="店主手机号" label-width="200px" prop="legalMobile">
					<el-input :maxlength="11" v-model="ruleForm.legalMobile" placeholder="请输入店主手机号" class="wid280"></el-input>
				</el-form-item>
			</div>

			<el-form-item :label="ident1" label-width="200px" class="requireHezi">
				<span v-if="shopStyle==1" class="require" style='left:-120px;'>*</span>
				<span v-else class="require" style='left:-92px;'>*</span>
				<upload-pictures :note="uploadTishi" :url="ruleForm.identityPic1" :listen="'listenToPic2'" :picSize='"800.kB"' @listenToPic2="sucpic2"></upload-pictures>
			</el-form-item>
			<el-form-item label="" prop="identityPic1"  label-width="200px" class='updata'>
				<el-input v-model="ruleForm.identityPic1" class="wid280"></el-input>
			</el-form-item>
			<el-form-item :label="ident2" label-width="200px" class="requireHezi">
				<span v-if="shopStyle==1" class="require" style='left:-120px;'>*</span>
				<span v-else class="require" style='left:-92px;'>*</span>
				<upload-pictures :note="uploadTishi" :url="ruleForm.identityPic2" :listen="'listenToPic3'" :picSize='"800.kB"' @listenToPic3="sucpic3"></upload-pictures>
			</el-form-item>
			<el-form-item label="" prop="identityPic2"  label-width="200px" class='updata'>
				<el-input v-model="ruleForm.identityPic2" class="wid280"></el-input>
			</el-form-item>

			<div v-for="(item, index) in ruleForm.storeBrands" v-if='shopStyle==1'>
				<el-form-item label="经营品牌" label-width="200px" prop="brand">
					<div class="only-ready">{{item.nameCn}}</div>
				</el-form-item>
				<el-form-item label="品牌证书" label-width="200px">
					<div class="unchangeable">
						<img :src="item.authorizationUrl">
					</div>
				</el-form-item>
			</div>
			<el-form-item label="" label-width="200px">
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
			</el-form-item>		
		</el-form>
		
			
		
	</section>
	
</template>

<script>
import CategoryBar from '@/components/CategoryBar.vue'/*标题*/
import UploadPictures from '@/components/UploadPictures.vue'/*上传图片组件*/
import {storeGetMerchant,merchantUpdate} from '@/api/shopApi';

export default {
	components: {
		CategoryBar,
		UploadPictures
	},

	data() {
		var validatePhone = (rule, value, callback) => {
	        if (!value) {
	          callback(new Error('请输入手机号'));
	        } else {
	        	var first=value.slice(0,1);
		        if ((value.length!=11)||(first!=1)) {
		          	callback(new Error('请输入正确的手机号'));
		        }else{
		        	callback();
		        }
	        }
	    };
	   var validateNumber1= (rule, value, callback) => {
          var reg =/^[0-9a-zA_Z]+$/g;
          if (!value.match(reg)) {
            callback(new Error('请输入正确的组织机构代码（注册号）'));
          } else {
            callback();
          }
	    };
	    var validateNumber2= (rule, value, callback) => {
	        var reg =/(^\d{0,18}$)|(^\d{17}(\d|X|x)$)/g;
            if (!value.match(reg)) {
	            callback(new Error('请输入正确身份证号'));
	        } else {
	            callback();
	        }
	    };
	    var validateNumber3= (rule, value, callback) => {
	        var reg =/^\d+$/g;
	        if(!value){
	        	callback();
	        	return false;
	        }
            if (!value.match(reg)) {
	            callback(new Error('请输入正确的手机号'));
	        } else {
	            callback();
	        }
	    };
		return {
		  	shopStyle:config.storeType,
		  	categoryBarTitle1: '企业店铺资质',
		  	categoryBarTitle2: '个人店铺资质',
		  	ident1:'法人身份证正面',
		  	ident2:'法人身份证反面',
		  	uploadTishi:"请上传800px*800px以上，格式要求jpg、jpeg、png，不超过800k",

		  	listLoading:false,

		    ruleForm: {
		      	enterpriseName: '',
		      	legalPerson: '',
		      	orgCode:'',
		      	identityNumber: '',
		      	storeBrands: '',
		      	phone: '',
		      	enterpriseLicence:'',
		      	identityPic1:'',
		      	identityPic2:'',
		      	identityPic:'',
		      	contactName:'',
		      	contactMobile:'',
		      	legalMobile:'',
		      	legalPerson2:''
		    },

		    rules: {
		    	enterpriseLicence:[
		    		{ required: true, message: '请上传组织机构代码证／营业执照', trigger: 'blur' }
		    	],
		    	identityPic1:[
		    		{ required: true, message: '请上传法人身份证正面', trigger: 'blur' }
		    	],
		    	identityPic2:[
		    		{ required: true, message: '请上传法人身份证反面', trigger: 'blur' }
		    	],
		      	legalPerson: [
			        { required: true, message: '请输入法人姓名', trigger: 'blur' },
			        { min:2, max: 30, message: '请输入正确的法人姓名', trigger: 'blur' }
		      	],
		      	legalPerson2: [
			        { required: true, message: '请输入店主姓名', trigger: 'blur' },
			        { min:2, max: 30, message: '请输入正确的店主姓名', trigger: 'blur' }
		      	],
		      	contactName: [
			        { required: true, message: '请输入店主姓名', trigger: 'blur' },
			        { min:2, max: 30, message: '请输入正确的店主姓名', trigger: 'blur' }
		      	],
		      	orgCode: [
			        { required: true, message: '请输入组织机构代码（注册号）', trigger: 'blur' },
			        { min: 1, max: 20, message: '请输入正确的组织机构代码（注册号）', trigger: 'blur' },
			        { validator:validateNumber1,trigger: 'blur'},
			        { validator:validateNumber1,trigger: 'change'}
		      	],
		      	identityNumber: [
		        	{ required: true, message: '请输入法人身份证', trigger: 'blur' },
		        	{ min:18, max: 18, message: '请输入正确身份证号', trigger: 'blur' },
		        	{ validator:validateNumber2,trigger: 'blur'},
		        	{ validator:validateNumber2,trigger: 'change'}

		      	],
		      	legalMobile: [
		        	{  required: true,validator: validatePhone,trigger: 'blur' },
		        	{ validator:validateNumber3,trigger: 'blur'},
		        	{ validator:validateNumber3,trigger: 'change'}
		      	]
		    }
	  	};
	},
	mounted:function(){
        //获取店铺资质信息
        let para = {
          storeId:config.storeId
        };
        this.listLoading = true;
        storeGetMerchant(para).then((res) => {
        	if(res.data.code==0){

        		this.ruleForm = res.data.data;
        		var identitys=res.data.data.identityPic.split(",");
        		this.ruleForm.identityPic1=identitys[0];
        		this.ruleForm.identityPic2=identitys[1];

        		if(this.shopStyle!=1){//个人店铺
					this.ruleForm.legalPerson2=this.ruleForm.legalPerson;
				}

        	}else{
        		this.$message.error(res.data.message);
        	}
          	this.listLoading = false;
        }).catch((res)=> {
	        this.listLoading = false;
	        this.$message.error('接口建立连接失败');
	    });
        if(config.storeType!=1){
        	this.ident1="身份证正面";
        	this.ident2="身份证反面";
        }
    },
	methods: {
		//组织机构代码证／营业执照上传成功之后
		sucpic1(url){
			this.ruleForm.enterpriseLicence=url;
		},
		//组织机构代码证／营业执照上传成功之后
		sucpic2(url){
			this.ruleForm.logo=identityPic1;
		},
		//组织机构代码证／营业执照上传成功之后
		sucpic3(url){
			this.ruleForm.logo=identityPic2;
		},
		submitForm(formName) {
		    this.$refs[formName].validate((valid) => {
		      if (valid) {
				var para = new URLSearchParams();
				var identityPics=this.ruleForm.identityPic1+','+this.ruleForm.identityPic2;
				para.append('storeId',config.storeId);
				para.append('enterpriseLicence',this.ruleForm.enterpriseLicence);
				para.append('orgCode',this.ruleForm.orgCode);
				
				para.append('identityPic',this.ruleForm.identityPic);
				para.append('identityNumber',this.ruleForm.identityNumber);
				

				if(this.shopStyle!=1){//个人店铺
					para.append('legalMobile',this.ruleForm.legalMobile);
					para.append('legalPerson',this.ruleForm.legalPerson2);
				}else{
					para.append('legalPerson',this.ruleForm.legalPerson);
				}

	            merchantUpdate(para).then((res) => {
	            	this.dialogVisible1 = true;
		        	if(res.data.code==0){	
		        		this.$message({
				           message: '提交成功',
				           type: 'success'
				        });
		        	}else{
		        		this.$message.error(res.data.message);
		        	}
		        }).catch((res)=> {
			        this.listLoading = false;
			        this.$message.error('接口建立连接失败');
			    });
		      } else {
		        return false;
		      }
		    });
		}
}
}
</script>
