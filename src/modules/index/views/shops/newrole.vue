<template>
	<section class="addaccount">
		<el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" style="width:60%;min-width:600px;">
			<el-form-item label="岗位名称" label-width="100px" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入岗位名称" class="wid270"></el-input>
			</el-form-item>	
			<el-form-item label="权限" label-width="100px" prop="jurisdiction">
			    <el-checkbox-group v-model="ruleForm.jurisdiction">
			      <el-checkbox label="权限A" name="type"></el-checkbox>
			      <el-checkbox label="权限B" name="type"></el-checkbox>
			    </el-checkbox-group>
			</el-form-item>
			<el-form-item label="" label-width="100px">
				<el-button type="primary" @click="submitForm('ruleForm')">修改权限</el-button>
			</el-form-item>
		</el-form>
	</section>
	
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          jurisdiction: []
        },
        rules: {
          name: [
            { required: true, message: '请输入岗位名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 位', trigger: 'blur' }
          ],
          jurisdiction: [
            { type: 'array', required: true, message: '请选择用户权限', trigger: 'change' }
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
  
  .wid270{
    width:270px;
  }
  .addaccount .el-button{
    width:100px;
    height:34px;
    line-height:34px;
    background:#41cac0;
    padding:0;
    border-color:#41cac0;
    border-radius:0;
  }
</style>