<template>
  <div class="uploadpic">
    <div class="load_hezi">
      <p>{{note}}</p>
        <el-upload
          class="avatar-uploader"
          action="http://gss.dmp.hzjiehun.bid/gss/upload/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error='handleAvatarError'
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <img v-if="url" :src="url" class="avatar1">
          <i v-else class="el-icon-plus avatar-uploader-icon">
            <p>添加上传图片</p>
          </i>
          <div class="btn">重新上传</div>
          
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
  </div>
</template>
<!-- 17682309067 -->

<script>
export default {
  name: 'UploadPictures',
  props: {
    uploadtit:{
      type: String,
      default: ''
    },
    note: {
      type: String,
      default: ''
    },
    listen:{
      type: String,
      default: ''
    },
    url:{
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  mounted(){
    if(this.url==''){
      this.imageUrl='';
    }
  },
  methods: {
    beforeAvatarUpload(file){
        const isUpload =/(jpg|jpeg|png)$/.test(file.type);
        const isLt2M = file.size / 1024 / 1024 < 2;
        if(!isUpload){
          this.$message.error('上传头像图片只能是 JPG、JPEG、PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isUpload && isLt2M;
      },

    handleAvatarSuccess(res, file) {
      if(res.code==0){
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$emit(this.listen,res.data);//传递值给父组件
      }else{
        this.$message.error('图片上传失败');
      }
      
    },
    //上传失败时的回调
    handleAvatarError(){
      this.$message.error('图片上传失败');
    },

    revise(src){
      this.imageUrl=src;
    },
    ser(){
      this.url='';
    }

    
  }
}
</script>

<style lang="scss">
.uploadpic{
  p{
    margin:0;
    font-size: 12px;
    color: #999999;
  }
  .avatar-uploader{
    height:100px;
  }
  .avatar-uploader-icon{
    padding-top:23px;
    width:100px;
    height:100px;
    line-height:30px;
    font-size: 28px;
    color: #41CAC0;

    p{
      font-size:14px;
      color:#666;
      padding-top:10px;

    }

  }
  .el-upload--text{
    width:100px;
    height:100px;
    img{
      width:100%;
      height:100%;
    }
  }
  .el-upload--text img:hover ~ .btn{
    display:block;
  } 

  .btn{
    display:none;
    height:24px;
    line-height: 24px;
    background:rgba(0,0,0,0.40);
    color:#fff;
    position:absolute;
    bottom:0;
    left:0;
    width:100px;
    font-size:12px;
    padding:0;
  }

}
.el-upload-list__item{
  width:100px !important;
  height:100px !important;
}
.el-progress--circle,.el-progress-circle{
  width:100px !important;
  height:100px !important;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
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

</style>
