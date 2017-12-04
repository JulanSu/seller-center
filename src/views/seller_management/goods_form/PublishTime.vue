<template>
  <div>
    <el-radio label="立即上架" v-model="publishTimeType"></el-radio>
    <el-radio label="定时上架" v-model="publishTimeType"></el-radio>
    <div style="margin-top:5px;" v-if="publishTimeType === '定时上架'">
      <el-date-picker
        v-model="value1"
        :editable="false"
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
        value1: '',
        publishTimeType: '立即上架'
      }
    },
    props: {
      value: {
        type: [String,Number],
        default: 'productPublishedOnTime'
      },
      validPublishTime: Function
    },
    watch: {
      publishTimeType: function (newVal, oldVal){
        console.log(newVal)
        if(newVal === '立即上架'){
          this.$emit('input', 'productPublishedOnTime')
          this.$emit('validPublishTime', 'productPublishedOnTime')
        }else if(newVal === '定时上架'){
          this.$emit('input', this.value1)        
        }
      }
    },
    
    created (){
      if(this.value && this.value != 'productPublishedOnTime') {
        this.value1 = this.value
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