<template>
  <div class="uploadpic">
    <div class="load_hezi">
      <p>{{note}}</p>
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture-card"
        :before-upload="beforeAvatarUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
        <p>添加上传图片</p>
      </el-upload>
      <el-dialog v-model="dialogVisible" size="tiny">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>
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
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  methods: {
    beforeAvatarUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
  
    /*删除图片*/
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    /*查看大图*/
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
  .el-upload--picture-card{
    padding-top:23px;
    width:100px;
    height:100px;
    line-height:30px;
    i{
      font-size: 28px;
      color: #41CAC0;
    }
    p{
      font-size:14px;
      color:#666;
    }

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
</style>
