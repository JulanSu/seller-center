<template>
	<section class="addaccount">
		<el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" style="width:60%;min-width:600px;">
			<el-form-item label="帐号名" label-width="100px" prop="accountname">
				<el-input v-model="ruleForm.accountname" placeholder="请输入帐号名" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="密码"  label-width="100px" prop="pass">
				<el-input  type="password" v-model="ruleForm.pass" placeholder="请输入密码"  class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="确认密码"  label-width="100px" prop="againpass">
				<el-input   type="password" placeholder="再一次输入密码"  class="wid280"></el-input>
			</el-form-item>		
			<el-form-item label="姓名"  label-width="100px" prop="username">
				<el-input v-model="ruleForm.username" placeholder="请输入姓名" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="性别" label-width="100px" prop="sex">
			    <el-radio-group v-model="ruleForm.sex">
			      <el-radio label="男"></el-radio>
			      <el-radio label="女"></el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="角色" label-width="100px" prop="role">
			    <el-select v-model="ruleForm.role" placeholder="请选择活动区域">
			      <el-option label="运营" value="shanghai"></el-option>
			      <el-option label="客服" value="beijing"></el-option>
			    </el-select>
			 </el-form-item>
			<el-form-item label="手机号码" label-width="100px" prop="phone">
				<el-input v-model="ruleForm.phone" name="username" placeholder="请输入手机号码" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="身份证号" label-width="100px" prop="identity">
				<el-input v-model="ruleForm.identity" name="username" placeholder="请输入身份证号码" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="" label-width="100px">
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
  
  .wid280{
    width:280px;
  }
  .addaccount .el-select{
    width:130px;
  }
  .addaccount .el-button{
    width:100px;
    height:34px;
    line-height:34px;
    background:#41cac0;
    padding:0;
    border-color:#41cac0;
  }
</style>