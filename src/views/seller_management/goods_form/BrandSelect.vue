<template>
  <el-select v-model="brandId" placeholder="选择品牌" @change="changeHandle">
    <el-option label="无" value="0"  key="无"></el-option>
    <template v-for="brand in brandDTOList">
      <el-option :label="brand.nameCn" :value="brand.brandId"  :key="brand.nameCn"></el-option>
    </template>
  </el-select>
</template>

<script>

  export default {
    data() {
      return {
        brandId: ''
      }
    },
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      brandDTOList: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    watch: {
      brandId: function(newVal, oldVal){
        this.$emit('input', newVal)
      }
    },
    computed: {
      // formartBrandId: function(value){
      //   console.log(value, 'dad')
      //   return this.value
      // }
    },
    mounted (){
      var listLen = this.brandDTOList.length
      var curBrandId = this.value
      var isBrandId = false
      if(listLen) {
        for(var i=0; i<listLen; i++) {
          if(curBrandId == this.brandDTOList[i].brandId) {
            isBrandId = true
          } 
        }
      }
      if(!isBrandId) {
        curBrandId = '0'
      }
      this.brandId = curBrandId
    },
    methods: {
      changeHandle(val) {
        console.log(val)
      }
    }
  }
</script>

<style lang="scss">

</style>