<template>
  <div class="logistics-wrap">
      <template v-if="!logisticsData">
        <el-form-item label="物流模板" prop="shippingTemplateId">
          <p class="desc" style="color:#999">你还没有创建物流模板，请先新建物流模板。</p>
          <el-button type="primary" @click="createLogisticsTemplate">新建物流模板</el-button>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="物流模板" prop="shippingTemplateId">
          <el-select v-model="storeShippingTemplateId" placeholder="选择物流模板" @change="selectChange">
            <template v-if="logisticsData && logisticsData.length" v-for="item in logisticsData">
              <el-option :label="item.templateName" :value="item.storeShippingTemplateId"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <template v-if="storeShippingTemplateId">
          <el-form-item label="配送自提">
            <span v-if="template.templateType == 0">配送</span>
            <div v-else-if="template.templateType == 1">
              <div>自提</div>
            </div>
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
        </template>
    </template>
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

      let logisticsData = this.logisticsData
      if(logisticsData && logisticsData.length){
        if(this.value) {
          this.storeShippingTemplateId = this.value
        }     
      }
      // console.log('获取物流模板', this.logisticsData)
      // this.template = this.logisticsData[0]
      // this.storeShippingTemplateId = this.logisticsData[0].storeShippingTemplateId
    },
    methods: {
      createLogisticsTemplate(){
        let self = this
        self.$confirm('新建物流模板将会离开当前操作，你是否需要离开？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$router.push({path: '/seller-management/logistics'})
        }).catch(() => {
        
        });
        
      },
      selectChange(value){
        this.$emit('logisticsTemplateType', this.template.templateType)
      },
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