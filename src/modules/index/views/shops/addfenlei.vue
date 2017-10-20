<template>
  <section class="addfenlei">
    <el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" style="width:60%;min-width:600px;">
      <el-form-item label="名称" label-width="100px" prop="accountname">
        <el-input v-model="ruleForm.accountname" placeholder="请输入店铺名称" class="wid280"></el-input>
      </el-form-item>
      <el-form-item label="店铺LOGO" label-width="100px">
        <div class="load_hezi"> 
          <p >请传160*160,格式要求jpg,jpeg,png,不超过10MB</p>
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
      <el-form-item label="显示" label-width="100px" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
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
  .addfenlei{
    padding-top:30px;
  }
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