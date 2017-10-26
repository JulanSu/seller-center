<template>
	<section class="qualification">
		<div v-if='shopStyle==1'>
			<category-bar :title="categoryBarTitle1"></category-bar>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
				<el-form-item label="企业名称" label-width="200px" prop="enterpriseName">
					<div class="only-ready">{{ruleForm.enterpriseName}}</div>
				</el-form-item>
				<el-form-item label="组织机构代码证/营业执照" label-width="200px">
					<upload-pictures :note="uploadTishi"></upload-pictures>
				</el-form-item>
				<el-form-item label="组织机构代码（注册号）" label-width="200px" prop="orgCode">
					<el-input v-model="ruleForm.orgCode" placeholder="请输入组织机构代码（注册号）" class="wid280"></el-input>
				</el-form-item>
				<el-form-item label="法人姓名" label-width="200px" prop="legalPerson">
					<el-input v-model="ruleForm.legalPerson" placeholder="请输入法人姓名" class="wid280"></el-input>
				</el-form-item>
				<el-form-item label="法人身份证" label-width="200px" prop="identityNumber">
					<el-input v-model="ruleForm.identityNumber" placeholder="请输入法人身份证" class="wid280"></el-input>
				</el-form-item>
				<el-form-item label="法人身份证正面" label-width="200px">
					<upload-pictures :note="uploadTishi"></upload-pictures>
				</el-form-item>
				<el-form-item label="法人身份证反面" label-width="200px">
					<upload-pictures :note="uploadTishi"></upload-pictures>
				</el-form-item>
				<div v-for="(item, index) in ruleForm.storeBrands">
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
		</div>
		<div v-else>		
			<category-bar :title="categoryBarTitle2"></category-bar>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
				<el-form-item label="店主姓名" label-width="160px" prop="contactName">
					<el-input v-model="ruleForm.contactName" placeholder="请输入店主姓名" class="wid280"></el-input>
				</el-form-item>
				<el-form-item label="店主手机号" label-width="160px" prop="contactMobile">
					<el-input v-model="ruleForm.contactMobile" placeholder="请输入店主手机号" class="wid280"></el-input>
				</el-form-item>
				<el-form-item label="法人身份证正面" label-width="160px">
					<upload-pictures :note="uploadTishi"></upload-pictures>
				</el-form-item>
				<el-form-item label="法人身份证反面" label-width="160px">
					<upload-pictures :note="uploadTishi"></upload-pictures>
				</el-form-item>
				<el-form-item label="" label-width="160px">
					<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
				</el-form-item>
			</el-form>
		</div>	
			
		
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
		return {
		  	shopStyle:shopType,
		  	categoryBarTitle1: '企业店铺资质',
		  	categoryBarTitle2: '个人店铺资质',
		  	uploadTishi:"不超过5mb",

		    ruleForm: {
		      	enterpriseName: '',
		      	legalPerson: '',
		      	orgCode:'',
		      	identityNumber: '',
		      	storeBrands: '',
		      	phone: '',
		      	enterpriseLicence:'',
		      	identityPic:'',
		      	contactName:'',
		      	contactMobile:''
		    },

		    rules: {
		      	legalPerson: [
			        { required: true, message: '请输入法人姓名', trigger: 'blur' },
			        { min:2, max: 30, message: '长度在 2 到 30 位', trigger: 'blur' }
		      	],
		      	contactName: [
			        { required: true, message: '请输入店主姓名', trigger: 'blur' },
			        { min:2, max: 30, message: '长度在 2 到 30 位', trigger: 'blur' }
		      	],
		      	orgCode: [
			        { required: true, message: '组织机构代码/注册号', trigger: 'blur' },
			        { min:18, max: 18, message: '长度为 18 位', trigger: 'blur' }
		      	],
		      	identityNumber: [
		        	{ required: true, message: '请输入法人身份证号码', trigger: 'blur' },
		        	{ min:18, max: 18, message: '长度为 18 位', trigger: 'blur' }

		      	],
		      	contactMobile: [
		        	{ required: true, message: '请输入店主手机号码', trigger: 'blue' },
		        	{ min:11, max: 11, message: '长度为 11 位', trigger: 'blur' }

		      	]
		    }
	  	};
	},
	mounted:function(){
        //获取店铺资质信息
        let para = {
          storeId:storeId
        };
        this.listLoading = true;
        storeGetMerchant(para).then((res) => {
          this.ruleForm = res.data.data;
          this.listLoading = false;
        });

    },
	methods: {
	  submitForm(formName) {
	    this.$refs[formName].validate((valid) => {
	      if (valid) {
			var para = new URLSearchParams();
			
			para.append('storeId',storeId);
			para.append('enterpriseLicence',this.ruleForm.enterpriseLicence);
			para.append('orgCode',this.ruleForm.orgCode);
			para.append('legalPerson',this.ruleForm.legalPerson);
			para.append('identityPic',this.ruleForm.identityPic);
			para.append('identityNumber',this.ruleForm.identityNumber);
			

			if(this.shopStyle!=1){//个人店铺
				para.append('contactName',this.ruleForm.contactName);
				para.append('contactMobile',this.ruleForm.contactMobile);
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
.qualification{
	padding:20px 0 0 0;
	.wid280{
    	width:280px;
    }
    p{
		margin:0;
	}

	.category-bar{
		padding-left:40px;
	}
	.unchangeable{
		width:100px;
		height:100px;
		text-align:center;
		line-height:100px;
		overflow: hidden;
		border: 1px dashed #c0ccda;
   		border-radius: 6px;
		img{
			max-width:100%;
			vertical-align: middle;
		}
	}
}

</style>