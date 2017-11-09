<template>
  <div class="block-form product-sku">
    <template v-if="skuData.length" v-for="productCate in skuData">

      <!-- 多选框 -->
      <div class="cate-property-item" v-if="productCate.catePropertySelection == 1">
          <div class="text">{{productCate.catePropertyName}}</div>
          <div class="input">
            <template v-for="(item, index) in productCate.options">
              <el-checkbox :key="item.catePropertyValue" :label="item.catePropertyValue" v-model="productCate.values[index].value" :true-label="item.catePropertyValue" false-label=""  @change="changeHandle(productCate.values[index])"></el-checkbox>
            </template>
          </div>
      </div>

     <!-- 下拉选择框 --> 
      <div class="cate-property-item" v-else-if="productCate.catePropertySelection == 0">
        <el-form-item :label="productCate.catePropertyName">
          <el-select v-model="productCate.values[0].value" placeholder="请选择服务范围" @change="changeHandle(productCate.values[0])">
            <template v-for="option in productCate.options">  
              <el-option :label="option.catePropertyValue" :value="option.catePropertyValue" :key="option.productCatePropertyValuesId"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </div>
      <!-- 文本输入框 -->
      <div class="cate-property-item" v-else-if="productCate.catePropertySelection == 2">
          <div class="text">{{productCate.catePropertyName}}</div>
          <div class="input">
            <el-input  v-model="productCate.values[0].value" :value="productCate.values[0].value" placeholder="自定义属性" @change="changeHandle(productCate.values[0])"></el-input>
          </div>
      </div>
    </template>
  </div>
</template>

<script>
  import merge from 'merge'
  export default {
    data() {
      return {
        productSkuProperty: [],
        productSkuTable: [],
        skuDataLength: 0,
        tables: []
      }
    },
    props: {
      skuData: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    computed: {
      
    },
    created (){
      this.skuDataLength = this.skuData.length
      this.formartData()
    },
    methods: {
      formartData (){
        var self = this
        var cateData = self.formartCateData(this.skuData)
        var genData = self.gen(cateData)

        self.productSkuTable = self.getProductSkuProperty(genData)
        //console.log('商品销售规格', self.productSkuTable)
      },

      formartCateData (data){
        var arr = []
        for(var i=0; i < data.length; i++) {
          arr[i] = data[i]['values']
        }
        return arr;
      },
      /**
       * getProductSkuProperty 给合并后的选项增加其他属性
       * @param  { Object } data 用户已选规格合并后的数据
       * @return { Array }      格式化后的规格属性列表
       */
      getProductSkuProperty (data){
        var arr = []
        if(data.length){
          for(var i=0; i<data.length; i++) {
              var obj = {};
              obj.productPrice = ''
              obj.productSkuQuantity = ''
              obj.productSkuSerialId = null
              obj.data = data[i]
              arr.push(obj)
          }          
        }
        return arr     
      },
      /**
       * gen 多维数组，多对多合并
       * @param  { Array } list 商品规格属性列表
       * @return {[type]}      [description]
       */
      gen (list){
        var result = []
        _gen(list, 0, [])
        return result

        function _gen (list, level, path) {
          if (level >= list.length) {
            return result.push(path.slice(0))
          }
          var lev = list[level]
          for (var i = 0; i < lev.length; i += 1) {
            path.push(lev[i])
            _gen(list, level + 1, path)
            path.pop()
          }
        }
      },
      changeHandle (row) {
        
        var rowData = this.addRow(row)
        var productSkuTable = this.formartAddRow(rowData)
        this.$emit('updateProductSkuProperty', productSkuTable)
        productSkuTable = null
      },
      formartAddRow(data){
        var arr = []
        for(var i=0; i<data.length;i++) {
          var b = data[i]['data'].every(function(item, index, array){
            return !!item.value
          })


          if(b) {
            arr.push(data[i])
          }
        }
        data = null
        return arr
      },
      addRow(row){
        var self = this
        var productSkuTable = self.productSkuTable

        var json = JSON.stringify(productSkuTable)
        var data = JSON.parse(json)
        for(var i=0; i< data.length; i++) {
          for(var j=0; j< data[i]['data'].length; j++) {
            if(row.name == data[i]['data']['name'] &&
              row.id == data[i]['data']['id']
              ) {
              data[i]['data']['value'] = row.value
            }
          }
        }
        return data    
      },

      delRow(){

      }

    }
  }
</script>

<style lang="scss">
  .cate-property {
    overflow: hidden;
    .el-form-item {
      margin-bottom: 20px;
    }
    .cate-property-item {
      margin:0 80px 20px 0;
      height: 36px;
      float: left;
      .text {
        margin-right: 20px;
        float: left;
        text-align: right;
        width: 80px;
      }
      .input {
        position: relative;
        display: inline-block;
      }

    }
  }
</style>