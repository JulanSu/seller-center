<template>
  <div class="uploadpic">
    <div class="load_hezi">
      <p class="desc">{{note}}</p>

      <div class="picbox">
        <ul class="el-upload-list el-upload-list--picture-card">
          <draggable 
          @update="datadragEnd"
          class="list-group" 
          v-model="imageUrl" 
          :options="{handle:'.item-draggable', animation: 200}">
           
          <template v-if="imageUrl.length" v-for="(item, index) in imageUrl">
            <li :tabindex="index" class="el-upload-list__item is-success pic-item item-draggable">
              <img :src="item" alt="" class="el-upload-list__item-thumbnail">
              <a class="el-upload-list__item-name"><i class="el-icon-document"></i>
              </a>
              <label class="el-upload-list__item-status-label">
                <i class="el-icon-upload-success el-icon-check"></i>
              </label>
                <i class="el-icon-close"></i><i class="el-icon-close-tip" style="display:none">按delete键可删除</i><!----><span class="el-upload-list__item-actions"><span class="el-upload-list__item-preview"><i class="el-icon-zoom-in"></i></span><span class="el-upload-list__item-delete" @click="delPicHandel(imageUrl, index)"><i class="el-icon-delete"></i></span></span>
              </li>
            </template>
            </draggable>
          </ul>
          <el-upload
            class="upload-pictrues"
            action="http://gss.dmp.hzjiehun.bid/gss/upload/"
            list-type="picture-card"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :file-list="fileList"
            :on-error="errorHandle"
            :show-file-list="false">
            <i class="el-icon-plus"></i>
            <p class="desc">添加上传图片</p>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
      </div>

    </div>
  </div>
</template>
<!-- 17682309067 -->

<script>
import draggable from 'vuedraggable'
export default {
  name: 'UploadPictures',
  components:{
    draggable
  },
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
      picLimit: 9,
      imageUrl: this.value || [],
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  // mounted (){
  //   console.log('图片组件',this.value, this.imageUrl)
  // },
  methods: {
    /**
     * datadragEnd 拖拽方法
     * @return {[type]} [description]
     */
    datadragEnd(){
      this.$emit('input', this.imageUrl);
    },
    /**
     * delPicHandel 删除图片回调方法
     * @param  { Array } row   图片list
     * @param  { Number } index 当前所删除图片的下标
     * @return {[type]}       [description]
     */
    delPicHandel (row, index) {
      row.splice(index, 1)
    },
    /**
     * errorHandle 
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    errorHandle(value){
      this.$message.warning('上传商品图片失败！请重新尝试。');
    },
    /**
     * beforeAvatarUpload 图片上传成功之前
     * @param  { Object } file 图片Object
     * @return {[type]}      [description]
     */
    beforeAvatarUpload(file){
      let isWarning = true

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
    /**
     * handleAvatarSuccess 图片上传成功后
     * @param  { Object } res    respons
     * @return {[type]}          [description]
     */
    handleAvatarSuccess(res) {

      if(res.code === 0) {
        this.imageUrl.push(res.data);
        this.$emit('change', res.data)
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
  position: relative;
  .desc {
    position: absolute;
    left: 0;
    bottom: 15px;
    height: 14px;
    font-size: 14px;
    color: #666;
    width: 100%;
    line-height: 14px;
  }
  .el-upload--picture-card,
   .el-upload-list__item {
    width: 98px;
    height: 98px;
    //line-height: 98px;
  }


}
.picbox {
  overflow: hidden;
  .pic-item {
    width: 98px;
    height: 98px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .el-upload--picture-card {
    line-height: 98px;
    .el-icon-plus {
      color: #41CAC0;
    }
  }
    .list-group{
    margin: 0;
  }
  .el-upload-list {
    float: left;
  }
  .upload-pictrues {
    float: left;
  }
}
</style>
