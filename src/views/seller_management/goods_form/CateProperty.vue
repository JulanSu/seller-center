<template>
  <div class="cate-property block-form">
    <template v-for="productCate in catePropertyData">
        <div class="cate-property-item" v-if="productCate.catePropertySelection == 1">
          <div class="text">{{productCate.catePropertyName}}</div>
          <el-select v-model="productCate.values" placeholder="请选择服务范围">
            <template v-for="option in productCate.options">  
              <el-option :text="option.catePropertyValue" :value="option.productCatePropertyValuesId" :key="option.productCatePropertyValuesId"></el-option>
            </template>
          </el-select>
        </div>
        <div class="cate-property-item" v-else-if="productCate.catePropertySelection == 2">
          <div class="text">自定义属性</div>
          <div class="input">
            <el-input :model="productCate.values" value="" placeholder="自定义属性"></el-input>
          </div>
        </div>
    </template>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    props: {
      catePropertyData:{
        type: Array,
        default: function(){
          return []
        }
      }
    },
    watch: {

    },
    mounted () {
    },
    methods: {

    }

  }
</script>

<style lang="scss">
  .cate-property {
    overflow: hidden;
    .el-form-item {
      margin-bottom: 20px;
    }
    .cate-property-item {
      margin:0 80px 20px 0;
      float: left;
      .text {
        margin-right: 20px;
        float: left;
        text-align: right;
        width: 80px;
      }
      .input {
        width: 160px;
        position: relative;
        display: inline-block;
      }

    }
  }
</style>