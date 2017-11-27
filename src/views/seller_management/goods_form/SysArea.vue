<template>
    <el-select v-model="citySite" multiple placeholder="请选择服务范围" @change="citySiteHandel">
      <template v-if="citySiteList.length" v-for="citySite in citySiteList">
        <el-option :label="citySite.cityName" :value="citySite.cityName" :key="citySite.cityName">
        </el-option>
      </template>
    </el-select>
</template>

<script>

  export default {
    data() {
      return {
        citySite: []
      }
    },
    props: {
      value:{},
      citySiteList: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    computed: {
      
    },
    created (){
    },
    methods: {
      /**
       * citySiteHandel 城市选择后的回调方法
       * @param  { String } value 城市名称
       * @return {[type]}       [description]
       */
      citySiteHandel (value){
        const citySiteStr = this.updateSysArea(value)
        this.$emit('change', citySiteStr)
      },
      updateSysArea (value){

        if(value.length) {
          return value.join(',')
        }
      }
    }
  }
</script>

<style lang="scss">

</style>