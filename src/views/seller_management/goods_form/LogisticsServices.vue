<template>
  <div class="logistics-wrap">
    <el-form-item label="物流模板">
      <el-select v-model="storeShippingTemplate" placeholder="选择物流模板">
        <el-option label="新建模板" value="new"></el-option>
        <el-option label="货运模板" value="beijing"></el-option>
      </el-select>
      <el-button type="primary" @click="$router.push({psth: '/seller-management/wuliu'})">新建物流模板</el-button>
    </el-form-item>
    <el-form-item label="配送自提">
      <span>配送</span>
    </el-form-item>
    <el-form-item label="配送范围及运费">
      <div class="area">
        <ul>
          <li>
            <div class="area-item"><el-input style="width:208px" value="浙江、江苏、上海" disabled></el-input></div>
            <div class="area-item">+运费</div>
            <div class="area-item"><el-input disabled value="111" style="width:80px" placeholder=""></el-input></div>
            <div class="area-item">元/件，满</div>
            <div class="area-item"><el-input disabled value="111" style="width:80px" placeholder=""></el-input></div>
            <div class="area-item">件</div>
            <div class="area-item"><el-input disabled value="111" style="width:80px" placeholder=""></el-input></div>
            <div class="area-item">元</div>
          </li>
        </ul>
      </div>
    </el-form-item>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        storeShippingTemplate: ''
      }
    },
    props: {
      logisticsData: {
        type: Object,
        default: ''
      }
    },
    watch: {

    },
    mounted () {
    },
    methods: {

    }

  }
</script>

<style lang="scss">

 
</style>