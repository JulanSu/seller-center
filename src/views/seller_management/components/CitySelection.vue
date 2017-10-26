<template>
  <div class="area-selection">
    <el-checkbox-group v-model="checkedCities">
      <ul class="area-wrap">
        <li v-for="city in cities"><el-checkbox :label="city" :key="city">{{city}}</el-checkbox></li>
      </ul>
    </el-checkbox-group>  
  </div>
</template>

<script>
  const cityOptions = ['上海', '北京', '广州'];
  export default {
    data() {
      return {
        cities: cityOptions,
        checkedCities: [],
        isIndeterminate: false,
        checkAll: false,
      }
    },
    props: {
      areas:{
        type: Array,
        default(){
          return [{
            areaName: '华东',
            areaId: 111,
            province: [{
              name: '浙江省',
              id: 123,
              city: [{
                name: '杭州市',
                id:1234
              },{
                name: '宁波市',
                id:1234                
              },{
                name: '宁还是',
                id:1234                
              }]
            }]
          }]
        }
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
  @import '~scss_vars';

  .area-selection {
    ul, li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .area-wrap {
      ul {

      }
      li {
        float: left;
        margin-right: 20px;
      }
    }
  }
</style>