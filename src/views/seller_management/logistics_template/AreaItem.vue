<template>
  <div class="area-list-wrap">
    <div class="area-item"><el-input v-model="templateItem.areaValue" style="width:208px" placeholder="浙江、江苏、上海" @focus="citySelectHandle(templateValue )"></el-input></div>
    <div class="area-item">+运费</div>
    <div class="area-item"><el-input v-model="templateItem.shippingCost" style="width:80px" placeholder=""></el-input></div>
    <div class="area-item">元/件，满</div>
    <div class="area-item"><el-input v-model="templateItem.shippingLimitNum" style="width:80px" placeholder=""></el-input></div>
    <div class="area-item">件</div>
    <div class="area-item"><el-input v-model="templateItem.shippingLimitCost" style="width:80px" placeholder=""></el-input></div>
    <div class="area-item">元</div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        templateItem: {},
        citySite: []
      }
    },
    props: {
      templateValue: {
        type: [Array, Object],
        default: function (){
          return []
        }
      }
    },
    computed: {
      
    },
    created (){
      this.templateItem = this.templateValue
      console.log('area-item',this.templateItem)
    },
    methods: {
      /**
       * citySelectHandle 模板城市选择
       * @param  { Object } row 运费模板对象
       * @return {[type]}     [description]
       */
      citySelectHandle (row, index){
      }

    }
  }
</script>

<style lang="scss">

</style>