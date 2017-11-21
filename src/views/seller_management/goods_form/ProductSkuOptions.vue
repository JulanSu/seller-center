<template>
  <div class="cate-property block-form">
    <el-form  label-position="top" ref="prodcutSkuOptions" label-width="100px">
      <template  v-if="prodcutSkuOptions.length" v-for="(item, curIndex) in prodcutSkuOptions">
        <!-- 单选组 -->
        <template v-if="item.catePropertySelection == 0">       
          <el-form-item :label="item.catePropertyName">
            <el-select 
            v-model="item.values[0].value" 
            @change="changeHandle(item)"
            :placeholder="'请选择'+item.catePropertyName" >
              <template v-for="option in item.options">  
                <el-option ::label="option.catePropertyValue" :value="option.catePropertyValue" :key="option.itemPropertyValuesId"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </template>

        <!-- 多选框 -->
        <template v-else-if="item.catePropertySelection == 1">
          <el-form-item :label="item.catePropertyName">
              <template v-for="(option, index) in item.options">
                <el-checkbox 
                :key="option.catePropertyValue" 
                v-model="item.values[index].value" 
                :label="option.catePropertyValue" 
                :true-label="option.catePropertyValue"
                @change="changeHandle(item)"></el-checkbox>
              </template>
          </el-form-item>
        </template>

        <template v-else-if="item.catePropertySelection == 2">
          <!-- 文本框 可以任意类型 -->
          <template v-if="!item.catePropertyInputLimit">
            <el-form-item 
              :label="item.catePropertyName" 
              :key="item.catePropertyParentId">
                <el-input  v-model="item.values[0].value" :value="item.values[0].value" placeholder="自定义内容" @change="changeHandle(item)">
                  <template slot="append" v-if="item.catePropertyUnit">
                    <span>{{item.catePropertyUnit}}</span>
                  </template>
                </el-input>
            </el-form-item>
          </template>
          <!-- 文本框 只能输入数字 -->
          <template v-if="item.catePropertyInputLimit == 1">
            <el-form-item :label="item.catePropertyName">
                <div class="el-input el-input-group el-input-group--append">
                  <input 
                  type="number" 
                  class="el-input__inner" 
                  v-model.number="item.values[0].value" 
                  placeholder="自定义内容" 
                  @keyup="changeHandle(item)"
                  @keydown="changeHandle(item)">
                    <div class="el-input-group__append"><span>{{item.catePropertyUnit}}</span></div>
                </div>
            </el-form-item>
          </template>

          <template v-if="item.catePropertyInputLimit == 2">
            <!-- 时间组件 -->
            <el-form-item 
              :label="item.catePropertyName" 
              :key="item.catePropertyParentId">
                <el-date-picker
                  v-model="item.values[0].value"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd" @change="changeHandle(item)">
                </el-date-picker>
            </el-form-item>
          </template>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        prodcutSkuOptions: []
      }
    },
    props: {

      skuData:{
        type: Array,
        default: function(){
          return []
        }
      },
      value: [Array]
    },
    created (){
      var prodcutSkuOptions = this.skuDataAddParam()
      this.prodcutSkuOptions = prodcutSkuOptions
    },
    methods: {
      skuDataAddParam(){
        var skuData = this.skuData
        for(var i=0;i<skuData.length;i++) {
          if(skuData[i].catePropertySelection == 1) {
            for(var j=0;j<skuData[i].options.length;j++) {
skuData[i].values[j].valueId = skuData[i].options[j].productCatePropertyValuesId
            }
          }else {
            skuData[i].values[0].valueId = skuData[i].productCatePropertyId
          }
        }

        return skuData
      },
      /**
       * changeHandle 用户操作商品规格选项时的回调方法
       * @param  { Object } row 当前所操作的对象
       * @return {[type]}     [description]
       */
      changeHandle(row){
        if(row.catePropertySelection == 2 && row.catePropertyInputLimit == 2) {
          row.values[0].value = moment(row.values[0].value).format("YYYY-MM-DD")
        }
        var sku = this.getUserSelectedSku()
        this.$store.dispatch('updateUserSelectedSku', sku)
        //this.$emit('input', sku)
      },
      /**
       * getUserSelectedSku 获取用户已选择的options
       * @return { Array } 二维数组，根据用户选择的组，使用组下标进行组合
       */
      getUserSelectedSku(){
        var arr = []
        var options = this.prodcutSkuOptions

        for(var i=0, flen = options.length;  i< flen; i++) {
          arr[i] = []
          for(var j=0, clen = options[i].values.length;  j < clen;j++) {
            if(options[i].values[j].value) {
              arr[i].push(options[i].values[j])
            }
          }
        }
        //如果用户没有选择完规格，直接返回空
        for(var k=0, alen = arr.length; k<alen; k++) {
          if(!arr[k] || !arr[k].length){
            arr = []
          }
        }
        return arr
      }
    }
  }
</script>

<style lang="scss">
  .cate-property-list {

  }
</style>