<template>
    <el-select v-model="sysArea" multiple placeholder="请选择服务范围" @change="sysAreaHandel">
      <template v-if="sysAreaList.length" v-for="sysArea in sysAreaList">
        <el-option :label="sysArea.areaName" :value="sysArea.areaName" :key="sysArea.areaName">
        </el-option>
      </template>
    </el-select>
</template>

<script>

  export default {
    data() {
      return {
        sysArea: []
      }
    },
    props: {
      value:{},
      sysAreaList: {
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
      sysAreaHandel (value){
        const sysAreaStr = this.updateSysArea(value)
        this.$emit('change', sysAreaStr)
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