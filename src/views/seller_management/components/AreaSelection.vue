<template>
  <div class="area-selection">
    <ul class="area-wrap">
      <li class="area-item" v-for="area in areas">
        <div class="options">
          <div class="items">{{area.areaName}}</div>
        </div>
        <ul class="provinect-wrap">
          <li class="provinect-item" v-for="province in area">
            <div class="options">
              <div class="items">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>&nbsp;&nbsp;<span class="item-name" @click="showCityPannel">{{province.name
                }}<i class="count">(1)</i>&nbsp;<i class="icon icon-arrow-bottom"></i></span>
              </div>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <ul class="city-wrap scrollbar">
                <li class="city-item" v-for="city in cities">
                    <el-checkbox  :label="city" :key="city">{{city}}</el-checkbox>
                </li>
              </ul>
              </el-checkbox-group>
            </div>
          </li>
        </ul>
      </li>
    </ul>
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
      handleCheckAllChange(event) {
        this.checkedCities = event.target.checked ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        console.log(this.isIndeterminate)
      },
      showCityPannel() {

      }
    }

  }
</script>

<style lang="scss">
  @import '~scss_vars';
  .icon {
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    vertical-align: sub;
  }
  .icon-arrow-bottom {
    border-width: 5px;
    border-color: $color-primary #FFF #FFF #FFF;
    border-style: solid;
  }
  .area-item {
    .items {
      padding: 10px;
      width: 120px;
    }
  }
  .area-selection {
    .options,
    .provinect-wrap {
      float: left;
      .city-wrap {
        display: none;
      }
      .is-active {
        height: 300px;
        .icon-arrow-bottom {
          border-width: 5px;
          border-color: $color-primary #FFF #FFF #FFF;
          border-style: solid;
        }
        .items {
          background:#f5f7fa;
          box-shadow:0 7px 22px 0 rgba(0,0,0,0.18);
          display: inline-block;
        }
        .city-wrap {
          display: block;
          padding-top: 5px;
          z-index: 9;
          position: absolute;
          background:#f5f7fa;
          box-shadow:0 12px 22px 0 rgba(0,0,0,0.18);
          width:200px;
          height:290px;
            .city-item {
              padding: 10px 10px 0;
              float: left;
            }
          }
        }
    }
    .provinect-wrap {
      .provinect-item {
        width: 150px;
        float: left;
        .item-name {
          cursor: pointer;
        }
        .count {
          font-size:14px;
          color:#ff6969;
          font-style: normal;
        }
        .options {
          position: relative;
        }
        .items {
          width: auto;
        }
      }
    }

    .city-wrap {
      
    }
  }
  .scrollbar {
    overflow-x: hidden;
    overflow-y: auto;
  }
  .scrollbar::-webkit-scrollbar{  
    width: 6px;
    background-color: #F5F5F5;
  }  
  .scrollbar::-webkit-scrollbar-thumb  {  
    background:$color-primary;
    width:6px;
    height:50px;
  }  
</style>