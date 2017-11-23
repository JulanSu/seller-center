<template>
  <section class="add-fenlei">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="名称" label-width="100px" prop="cateName">
        <el-input :maxlength="10" v-model="ruleForm.cateName" placeholder="请输入店铺名称" class="wid280"></el-input>
      </el-form-item>
      <el-form-item label="店铺LOGO" label-width="100px">
        <upload-pictures :note="uploadLogo" :url="ruleForm.catePic" :listen="'listenToPic1'" :picSize='"10.MB"' @listenToPic1="sucpic1"></upload-pictures>
      </el-form-item>
      <el-form-item label="显示" label-width="100px" prop="isUsed" class="requireHezi">
          <span class="require" style='left:-50px;'>*</span>
          <el-radio-group v-model="ruleForm.isUsed">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="" label-width="100px">
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
      
    </el-form>
  </section>
  
</template>

<script>
import {cateGet,cateSave,cateUpdate} from '@/api/shopApi';
import UploadPictures from '@/components/UploadPictures.vue'/*上传图片组件*/

export default {
  components: {
    UploadPictures
  },
  data() {
    return {
      isAdd:1,
      uploadLogo:"请上传160*160，格式要求jpg、jpeg、png，不超过10MB",
      ruleForm: {
        storeCateId:'',
        cateName: '',
        catePic:'',
        isUsed: 1
      },
      rules: {
        cateName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 位', trigger: 'blur' }
        ]/*,
        isUsed: [
          { required: true, message: '请选择是否显示', trigger: 'change' }
        ]*/
      }
    };
  },
  mounted:function(){
    /*如果是编辑分类页面，需要取该分类的数据*/
    var id=this.$route.params.id;
    if(id){
      this.dataFetch(id);
      this.isAdd=2;
    }
  },
  methods: {
    //分类图片上传成功之后
    sucpic1(url){
      this.ruleForm.catePic=url;
    },
    /*如果是编辑分类页面，需要取该分类的数据*/
    dataFetch(id){
      let para = {
        storeCateId:id
      };
      this.listLoading = true;
      cateGet(para).then((res) => {
        this.listLoading = false;

        if(res.data.code==0){
          this.ruleForm= res.data.data;
        }
        
      }).catch((res)=> {
        this.listLoading = false;
      });
      
    },
    //新增或编辑成功后的回调
    sucFun(res){
      var that=this;
      this.listLoading = false;
      if(res.data.code==0){
        this.$message({
          message: '提交成功',
          type: 'success',
          onClose:function(){
            that.$router.push({ path: '/store/classify-management' });
          }
        });
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.listLoading = true;
          var para = new URLSearchParams();
          para.append('cateName',this.ruleForm.cateName);
          para.append('catePic',this.ruleForm.catePic);
          para.append('isUsed',this.ruleForm.isUsed);
          
          if(this.isAdd==2){//2是编辑
            para.append('storeCateId',this.ruleForm.storeCateId);
            cateUpdate(para).then((res)=> {
              this.sucFun(res);
            }).catch((res)=> {
              this.listLoading = false;
            });
          }else{
            para.append('storeId',config.storeId);
            cateSave(para).then((res)=> {
              this.sucFun(res);
            }).catch((res)=> {
              this.listLoading = false;
            });
          }
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss">
.add-fenlei{
  .wid280{
    width:280px;
  }
}
</style>