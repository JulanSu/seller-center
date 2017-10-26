<template>
  <div class="prodcut-add">
    <div class="img-area">
        <div class='add-pro' @click="dialogProduct = true">
            <p>+</p>
            <span>添加商品</span>
        </div>
        <div class="img-con" v-for="item in forProduct.product" @mouseenter="item.deleteBtn=true" @mouseleave="item.deleteBtn=false" :key="item.productId">
            <img :src="item.productPicsUrl" alt="">
            <i class="el-icon-circle-cross" v-if='item.deleteBtn' @click='deleteProduct(item)'></i>
            <p>{{item.productTitle}}</p>
        </div>
    </div>
   <el-dialog title="添加商品" :visible.sync="dialogProduct" custom-class='pro-dialog' top="20%" :close-on-click-modal='false'>
        <div class="pro-container">
            <div class="pro-item" v-for="item in allProduct" @click='checkProduct(item)' :key="item.productId">
                <div class="img-con">
                    <img :src="item.productPicsUrl" alt="">
                    <div class="mask" v-if="item.checked"></div>
                    <i class="el-icon-circle-check" v-if="item.checked"></i>
                </div>
                <p>{{item.productTitle}}</p>
            </div>
        </div>
        <el-button type="primary" @click="sureCheck" class='check-btn'>提交</el-button>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        dialogProduct: false,
        forProduct: {
            type: '全部商品通用',
            product: []
        },
        allProduct: []
      }
    },
    props: {

    },
    watch: {

    },
    mounted () {
    },
    methods: {
      /*选取商品*/
      checkProduct(item){
          let self = this;
          item.checked = !item.checked;
      },
      sureCheck(){
          let self = this;
          self.dialogProduct = false;
          self.forProduct.product = [];
          for(let i=0; i<self.allProduct.length; i++){
              let that = self.allProduct[i];
              if(that.checked){
                  self.forProduct.product.push(that);
              }
          }
          for(let i=0; i<self.forProduct.product.length; i++){
              let that = self.forProduct.product[i];
              self.$set(that,'deleteBtn',false);
          }
      },
      /*删除商品*/
      deleteProduct(item){
          var self = this;
          self.removeArrItem(self.forProduct.product, item)
      },
      /*上传图片规则*/
      handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
          const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
          const isLt2M = file.size / 1024 < 800;
          if (!isJPG) {
            this.$message.error('上传图片只能是png/jpg/jpeg格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 800K!');
          }
          return isJPG && isLt2M;
      }
    }

  }
</script>

<style lang="scss">

  $color: #45cdb6;
    .img-area{
        height:184px;
        background:#f5f7fa;
        padding: 20px;
        overflow-x: hidden;
        overflow-y: auto;
        .add-pro{
            float: left;
            width: 100px;
            height: 100px;
            border:1px dashed #cccccc;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            p{
                margin:18px 0 5px;
                font-size: 80px;
                color:#41cac0;
            }
            span{
                font-size:14px;
                color:#666666;
            }
        }
        .img-con{
            display: inline-block;
            vertical-align: top;
            width: 100px;
            position: relative;
            img{
                width: 100px;
                height: 100px;
            }
            i{
                position: absolute;
                top: 5px;
                right: 5px;
                font-size: 16px;
                cursor:pointer;
                color: $color;
                background: #fff;
                border-radius: 8px;
            }
            p{
                width: 100px;
                font-size: 12px;
                color: #666666;
                line-height: 150%;
                overflow:hidden; 
                text-overflow:ellipsis;
                display:-webkit-box; 
                -webkit-line-clamp:2; 
                /* autoprefixer: off*/
                -webkit-box-orient: vertical;
                /* autoprefixer: on*/
            }
        }
        .img-con:nth-of-type(n+2){
            margin-left: 10px;
        }
        .img-con:nth-of-type(n+8){
            margin-top: 10px;
        }
        .img-con:nth-of-type(7n+1){
            margin-left: 0;
        }
    }
    /*弹窗样式*/
    .pro-dialog{
        width: 750px;
        height: 580px;
        .el-dialog__header{
            padding: 0;
            background: $color;
            height: 52px;
            line-height: 52px;
            padding: 0 20px;
            font-size: 16px;
            span{
                color: #fff;
            }
            .el-dialog__headerbtn{
                padding-top:15px;
                font-size: 14px;
                i{
                    color: #fff;
                }
            }
        }
        .el-dialog__body{
            padding: 20px;
            .pro-container{
                height: 408px;
                background: #F5F7FA;
                border: 1px solid #DDDDDD;
                padding: 20px;
                overflow-x: hidden;
                .pro-item{
                    width: 100px;
                    float: left;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    overflow: hidden;
                    cursor: pointer;
                    .img-con{
                        width: 100px;
                        height: 100px;
                        position: relative;
                        img{
                            width: 100%;
                            height: 100%
                        }
                        .mask{
                            position: absolute;
                            width: 100px;
                            height: 100px;
                            top: 0;
                            background: rgba(51,51,51,0.49);
                        }
                        i{
                            color: $color;
                            font-size: 16px;
                            position: absolute;
                            right: 5px;
                            top: 5px;
                            background: #fff;
                            border-radius: 7px 7px 8px 8px;
                        }
                    }
                    p{
                        width: 100px;
                        font-size: 12px;
                        color: #666666;
                        margin-top: 10px;
                        overflow:hidden; 
                        text-overflow:ellipsis;
                        display:-webkit-box; 
                        -webkit-line-clamp:2; 
                        /* autoprefixer: off*/
                        -webkit-box-orient: vertical;
                        /* autoprefixer: on*/
                    }
                }
                .pro-item:nth-of-type(n+2){
                    margin-left: 10px;
                }
                .pro-item:nth-of-type(6n+1){
                    margin-left: 0;
                }
                .pro-item:nth-of-type(n+7){
                    margin-top: 20px;
                }
            }
            .check-btn{
                width: 90px;
                height:34px;
                color: #fff;
                font-size: 14px;
                margin-top: 20px;
                float: right;
            }
        }
    }

</style>