<template>
	<section class="qualification">
		<h6 class="tit">企业店铺资质</h6>
		<el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" style="width:60%;min-width:600px;">
			<el-form-item label="企业名称" label-width="200px" prop="accountname">
				<p>杭州李代表科技有限公司</p>
			</el-form-item>
			<el-form-item label="组织机构代码证/营业执照" label-width="200px">
				<div class="load_hezi">	
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</el-form-item>
			<el-form-item label="组织机构代码（注册号）" label-width="200px" prop="phone">
				<el-input v-model="ruleForm.phone" placeholder="请输入组织机构代码（注册号）" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="法人姓名" label-width="200px" prop="phone">
				<el-input v-model="ruleForm.phone" placeholder="请输入法人姓名" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="法人身份证" label-width="200px" prop="phone">
				<el-input v-model="ruleForm.phone" placeholder="请输入法人身份证" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="法人身份证正面" label-width="200px">
				<div class="load_hezi">	
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</el-form-item>
			<el-form-item label="法人身份证反面" label-width="200px">
				<div class="load_hezi">	
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</el-form-item>
			<el-form-item label="经营品牌" label-width="200px" prop="phone">
				<el-input v-model="ruleForm.phone" placeholder="请输入联系电话" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="品牌证书" label-width="200px">
				<div class="load_hezi">	
					<el-upload
					  class="avatar-uploader"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</el-form-item>
			<el-form-item label="" label-width="200px">
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
			</el-form-item>
		</el-form>

			<h6 class="tit">个人店铺资质</h6>
			<el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" style="width:60%;min-width:600px;">
				<el-form-item label="店主姓名" label-width="200px" prop="accountname">
					<el-input v-model="ruleForm.phone" placeholder="请输入店主姓名" class="wid280"></el-input>
				</el-form-item>
				
				<el-form-item label="店主手机号" label-width="200px" prop="phone">
					<el-input v-model="ruleForm.phone" placeholder="请输入店主手机号" class="wid280"></el-input>
				</el-form-item>
				<el-form-item label="法人身份证正面" label-width="200px">
					<div class="load_hezi">	
						<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</el-form-item>
				<el-form-item label="法人身份证反面" label-width="200px">
					<div class="load_hezi">	
						<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</div>
				</el-form-item>
			
			<el-form-item label="" label-width="200px">
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
			</el-form-item>
			</el-form>
		
	</section>
	
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          accountname: '',
          pass: '',
          againpass: '',
          username: '',
          sex: false,
          role: [],
          phone: '',
          identity: ''
        },
        rules: {
          accountname: [
            { required: true, message: '请输入帐号名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 位', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min:6, max: 20, message: '长度在 6 到 20 位', trigger: 'blur' }
          ],
          againpass: [
            { type: 'date', required: true, message: '请输入确认密码', trigger: 'change' }
          ],
          username: [
            { type: 'date', required: true, message: '请输入姓名', trigger: 'blur' },
            { min:2, max: 30, message: '长度在 2 到 30 位', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          role: [
            {  required: true, message: '请选择角色', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min:11, max: 11, message: '手机号码有误', trigger: 'blur' }
          ],
          identity: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { min:18, max: 18, message: '身份证号码输入有误', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
	p{
		margin:0;
	}
		
  	.tit{
    	margin:20px 0;
    	padding-left:10px;
        height:22px;
        line-height:14px;
        font-size:16px;
		color:#333333;
		border-left:3px solid #41cac0;
    	height:15px;
    	display:inline-block;
    	font-weight:normal;
    }
    .wid280{
    	width:280px;
    }
    .addaccount{
   		padding-top:20px;
    }
    .load_hezi{
    	margin-top:12px;
    }

    .load_hezi p{
    	margin:0px 0px 10px;
    	font-size:12px;
		color:#aaaaaa;
    }
    .avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	}
	.avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	}
	.el-upload .avatar-uploader-icon{
		width:100px;
		height:100px;
		line-height:100px;
		font-size:28px;
		border:1px dashed #41cac0;
		color:#41cac0;
	}


</style>