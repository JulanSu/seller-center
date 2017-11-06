<template>
  <div class="logistics-wrap">
    <el-form-item label="物流模板">
      <el-select v-model="storeShippingTemplateId" placeholder="选择物流模板">
        <template v-if="logisticsData.length" v-for="item in logisticsData">
          <el-option :label="item.templateName" :value="item.storeShippingTemplateId"></el-option>
        </template>
      </el-select>
<!--       <el-button type="primary" @click="$router.push({psth: '/seller-management/wuliu'})">新建物流模板</el-button> -->
    </el-form-item>
    <el-form-item label="配送自提">
      <span v-if="template.templateType == 0">配送</span>
      <span v-else-if="template.templateType == 1">自提</span>
    </el-form-item>
    <el-form-item label="配送范围及运费" v-if="template.templateType == 0">
      <div class="area-list">
        <div class="area-list-wrap" v-if="template.templateValueList.length" v-for="item in template.templateValueList">
            <div class="area-item"><el-input style="width:208px" :value="item.sysAreaNames.join(',')" disabled></el-input></div>
            <div class="area-item">+运费</div>
            <div class="area-item"><el-input disabled :value="item.shippingCost" style="width:80px" placeholder=""></el-input></div>
            <div class="area-item">元/件，满</div>
            <div class="area-item"><el-input disabled :value="item.shippingLimitNum" style="width:80px" placeholder=""></el-input></div>
            <div class="area-item">件</div>
            <div class="area-item"><el-input disabled :value="item.shippingLimitCost" style="width:80px" placeholder=""></el-input></div>
            <div class="area-item">元</div>
        </div>
      </div>
    </el-form-item>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        storeShippingTemplateId: '',
        template: {
          templateValueList: [{
            sysAreaCodes: '',
            shippingCost: '',
            shippingLimitNum: '',
            shippingLimitCost: '',
            sysAreaNames: []
          }],//运费模板列表
          storeId: '',  //店铺ID
          templateName: '', //模板名称
          storeShippingTemplateId: '',//运费模板ID
          templateType: 0
        }
      }
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      logisticsData: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    watch: {
      storeShippingTemplateId (newVal, oldVal){
        this.changeTemplate(newVal)
        this.$emit('input', newVal)
      }
    },
    created () {
      this.template = this.logisticsData[0]
      this.storeShippingTemplateId = this.logisticsData[0].storeShippingTemplateId
    },
    methods: {
      changeTemplate(tid){
        let logisticsData = this.logisticsData
        for(var i=0; i<logisticsData.length;i++) {
          if(tid == logisticsData[i].storeShippingTemplateId) {
            this.template = logisticsData[i]
          }
        }
      }
    }

  }
</script>

<style lang="scss">

 
</style>