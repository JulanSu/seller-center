<template>
  <div class="block">
    <el-row> 
      <el-col :span="2">
        <el-button type="primary" icon="plus" @click="linkHandle" class="create-goods">创建商品</el-button>
      </el-col>
      <el-col :span="22">
        <el-form :inline="true" :model="formInline" :rolus="formInline" rel="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="formInline.goodsName" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.goodsId" placeholder="商品ID"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="formInline.storeCategory" placeholder="店铺分类" style="width: 160px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
                <el-date-picker
                  v-model="formInline.createDate"
                  type="daterange"
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
  export default {
    data() {
      return {
        formInline: {
          goodsId: '',
          goodsName: '',
          storeCategory: '',
          createDate: ''
        }
      }
    },
    mounted: function () {

    },
    methods: {
      linkHandle (){
        this.$router.push({path: '/seller-management/goods'}) 
      },
      onSubmit (){
        let self = this
        console.log(self.formInline)
        this.$emit('onSearchClick', self.formInline);
      }
    }
  }

</script>

<style>

</style>