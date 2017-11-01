<template>
  <div>
    <el-radio label="立即上架" v-model="publishTimeType"></el-radio>
    <el-radio label="定时上架" v-model="publishTimeType"></el-radio>
    <div style="margin-top:5px;" v-if="publishTimeType === '定时上架'">
      <el-date-picker
        v-model="curTime"
        type="datetime"
        placeholder="选择日期时间" style="width: 280px;" @change="timeHandle">
      </el-date-picker>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        curTime: '',
        publishTimeType: '立即上架'
      }
    },
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    watch: {
      publishTimeType: function (newVal, oldVal){
        if(newVal === '立即上架'){
          this.$emit('input', '')
          this.curTime = ''
        }
      }
    },
    
    created (){

      if(this.value) {
        this.curTime = this.value
        this.publishTimeType = '定时上架'
      }
    },
    methods: {
      timeHandle(value){

        this.$emit('input', value)
      }
    }
  }
</script>

<style lang="scss">

</style>