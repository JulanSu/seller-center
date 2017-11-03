<template>
  <div class="uploadpic">
    <div class="load_hezi">
      <p class="desc">{{note}}</p>
      <div class="picbox">
      <ul class="el-upload-list el-upload-list--picture-card">
        <template v-for="(item, index) in imageUrl">
          <li :tabindex="index" class="el-upload-list__item is-success pic-item">
            <img :src="item" alt="" class="el-upload-list__item-thumbnail">
            <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
            </a>
            <label class="el-upload-list__item-status-label">
              <i class="el-icon-upload-success el-icon-check"></i>
            </label>
              <i class="el-icon-close"></i><i class="el-icon-close-tip" style="display:none">按delete键可删除</i><!----><span class="el-upload-list__item-actions"><span class="el-upload-list__item-preview"><i class="el-icon-zoom-in"></i></span><span class="el-upload-list__item-delete" @click="delPicHandel(imageUrl, index)"><i class="el-icon-delete"></i></span></span>
            </li>
          </template>
        </ul>
      </div>
      <el-upload
        class="upload-pictrues"
        action="http://gss.dmp.hzjiehun.bid/gss/upload/"
        list-type="picture-card"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
        :limit="picLimit"
        :file-list="fileList"
        :on-exceed="exceedHandle"
        :on-error="errorHandle"
        :show-file-list="false"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
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
    value: {
      type: Array,
      default: function(){
        return []
      }
    },
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
      type: [String, Array],
      default: ''
    }
  },
  data () {
    return {
      fileList: [],
      picLimit: 4,
      imageUrl: this.value,
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },

  methods: {
    delPicHandel (row, index) {
      row.splice(index, 1)
    },
    errorHandle(value){
      console.log('上传失败', value)
    },
    exceedHandle (value) {
      this.$message.warning(value,'图片最多只能上传9张!');
    },
    handleRemove(value) {
      console.log(this.fileList, value)
    },
    beforeAvatarUpload(file){
      let isWarning = true
        console.log('图片上传之前',file)
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.warning('上传的商品图片只能是 JPG,JPEG,PNG 格式！');

        }
        if (!isLt2M) {
          this.$message.warning('上传的商品图片大小不能超过 10MB！');
        }

        if(this.imageUrl.length >= this.picLimit) {
          isWarning = false
          this.$message.warning('上传的商品图片最多不能超过'+ this.picLimit+'张！');
        } 
        return isJPG && isLt2M && isWarning;
      },

    handleAvatarSuccess(res, file, fileList) {
      if(res.code === 0) {
        this.imageUrl.push(URL.createObjectURL(file.raw));
      }else {
        this.$message.warning('上传商品图片失败！请重新尝试。');
      }
      this.$emit('input', this.imageUrl);
      //传递值给父组件
    },
    
  }
}
</script>

<style lang="scss">
.load_hezi {
  .desc {
    margin: 0;
    color: #999;
  }
}

.upload-pictrues{
  .el-upload--picture-card,
   .el-upload-list__item {
    width: 98px;
    height: 98px;
    //line-height: 98px;
  }

}
.picbox {
  .pic-item {
    width: 98px;
    height: 98px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
</style>
