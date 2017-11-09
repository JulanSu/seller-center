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
        this.brandId = this.value
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