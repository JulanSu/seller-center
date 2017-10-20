<template>
  <div class="block">
    <el-row> 
      <el-col :span="2">
        <el-button type="primary" icon="plus" @click="linkHandle">创建商品</el-button>
      </el-col>
      <el-col :span="22">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model="formInline.goodsName" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品ID">
            <el-input v-model="formInline.goodsId" placeholder="商品ID"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-select v-model="formInline.storeCategory" placeholder="店铺分类" style="width: 160px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
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
          user: '',
          region: '',
          goodsId: '',
          goodsName: '',
          storeCategory: '',
          createDate: '',
          createBegin: '',
          createEnd: ''
        }
      }
    },
    mounted: function () {

    },
    methods: {
      linkHandle (){
        this.$router.push({name: '创建商品'}) 
      },
      onSubmit (){
        let self = this
        this.$emit('onSearchClick', self.formInline);
      }
    }
  }

</script>

<style scoped>

</style>