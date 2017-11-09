<template>
  <div class="block">
    <el-row> 
      <el-col :span="2">
        <el-button type="primary" icon="plus" @click="linkHandle" class="create-goods">创建商品</el-button>
      </el-col>
      <el-col :span="22">
        <el-form :inline="true" :model="formInline" :rolus="formInline" rel="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.productTitle" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.productId" placeholder="商品ID"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="formInline.storeCateId" placeholder="店铺分类" style="width: 160px;">
              <template v-if="storeCate.length" v-for="item in storeCate">
                <el-option :label="item.cateName" :value="item.storeCateId"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-date-picker
              v-model="createDate"
              type="datetimerange"
              @change="datePickerHandle"
              placeholder="选择日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import { getStoreCate } from '@/api/seller'
  const win = window;
  const storeId = win.config && win.config.storeId ? win.config.storeId : ''
  export default {
    data() {
      return {
        storeCate: [],
        createDate: [],
        formInline: {
          productId: '',
          productTitle: '',
          storeCateId: '',
          searchStartTime: '',
          searchEndTime: ''
        }
      }
    },
    mounted: function () {

    },
    created(){
      this.getStoreCateHandel(storeId)

    },
    methods: {
      /**
       * datePickerHandle 用户选择时间后回调方法
       * @param  { String } value 用户选择后时间
       * @return {[type]}       [description]
       */
      datePickerHandle (value){
        let self = this
        if(value) {
          let dateArr = value.split(' - ')
          self.formInline.searchStartTime = dateArr[0] || ''
          self.formInline.searchEndTime = dateArr[1] || ''
        }
      },
      /**
       * getStoreCateHandel 获取店铺分类列表
       * @param  { Number } storeId 店铺ID
       * @return {[type]}         [description]
       */
      getStoreCateHandel (storeId){
        var self = this
        getStoreCate({
          storeId: storeId
        }).then((res)=>{
          var data = res.data.data
          if(res.data.code === 0) {
            self.storeCate =  data.list
          }
        })
      },
      /**
       * linkHandle 创建商品路由
       * @return {[type]} [description]
       */
      linkHandle (){
        this.$router.push({path: '/seller-management/goods'}) 
      },

      /**
       * onSubmit 查询回调方法
       * @return {[type]} [description]
       */
      onSubmit (){
        let self = this
        let validStatus = this.validFormInline()
        let searchValue = validStatus ? self.formInline : ''
        this.$emit('onSearchClick', searchValue);
        //this.searchProdcutHandle(storeId, 1, 10)
      },
      /**
       * searchProdcutHandle 格式化提交数据，向父组件传递数据
       * @param  { Number } storeId  店铺ID
       * @param  { Number } pageNum  当前页
       * @param  { Number } pageSize 当前页显示条数
       * @return {[type]}          [description]
       */
      searchProdcutHandle(storeId, pageNum, pageSize){
        this.formInline.storeId = storeId
        this.formInline.pageNum = 1
        this.formInline.pageSize = 10
        this.$emit('onSearchClick', self.formInline);
      },
      /**
       * validFormInline 表单校验，全部为空时提示用户
       * @return {[type]} [description]
       */
      validFormInline (){
        let formInline = this.formInline
        let finished = false
        for(var obj in formInline) {
          if(formInline[obj]) {
            finished = true
          }
        }
        if(!finished) {
          this.$message({
            message: '查询商品至少填写一条查询条件',
            type: 'warning'
          });
        }
        return finished
      }
    }
  }

</script>

<style>
  .el-picker-panel {
    z-index: 99999 !important;
  }
</style>