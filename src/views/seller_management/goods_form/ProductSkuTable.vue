<template>
  <div class="product-skutable">
    <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width:100%">
          <thead>
            <tr>
              <template v-for="title in tableTitle">
                <th colspan="1" rowspan="1" class="is-leaf">
                  <div class="cell">{{title}}</div>
                </th>
              </template>
            </tr>
          </thead>
        </table>
      </div>
      <div class="el-table__body-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%">
          <tbody>  
            <template v-if="tableList" v-for="(value, key, index) in skuData">
              <tr class="el-table__row">
                  <td v-for="item in value.data">
                    <div class="cell">{{item.value}}</div>
                  </td>
                <td>
                  <div class="cell cell el-input el-input-group el-input-group--append">
                    <input type="number" class="el-input__inner" v-model="value.productPrice" @keyup="inputChangeHandle" @keydown="inputChangeHandle"  />
<!--                     <div :class="!value.productPrice ? 'el-form-item__error' : 'hidden'">价格不能为空！</div> -->
                  </div>
                    
                </td>
                <td>
                  <div class="cell cell el-input el-input-group el-input-group--append">
                    <input type="number" class="el-input__inner"  v-model="value.productSkuQuantity" @keyup="inputChangeHandle" @keydown="inputChangeHandle" />
<!--                     <div :class="!value.productSkuQuantity ? 'el-form-item__error' : 'hidden'">库存不能为空！</div> -->
                  </div>
                  
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
  </div>   
  </div>
</template>

<script>
  import merge from 'merge'
  export default {
    data() {
      return {
        tableTitle: [],
        tableList: [],
        skuData: null
      }
    },
    props: {
      value:[Array],
      productSkuProperty: [Array],
      productSkuTable: [Array]
    },
    computed: {
      userSelectedTheSku () {
        return this.$store.state.userSelectedTheSku
      }
    },
    mounted(){
      this.initTableTitle()
      this.getTableList()
    },
    watch: {

      userSelectedTheSku(newVal, oldVal){
        if(newVal && newVal.length) {
          var genData = this.gen(newVal)
          var result  = this.getProductSkuProperty(genData)
          var resultById = this.formartByIdSku(result)
          if(!this.skuData) {
            this.skuData = resultById
          }else {
            this.selectedSkuChange(resultById)
          }
          this.inputChangeHandle()
        }else {
          this.skuData = null
          this.$emit('updateSkuQuantity', [])
        }
      }
    },
    methods: {
    getTableList(){
      var editorData = this.value
      if(editorData && editorData.length) {
        var resultById = this.formartByIdSku(editorData)
        this.skuData = resultById
      }
      
    },
    selectedSkuChange(options){
      var skuData = this.skuData
      for(var key in skuData) {
        if(options[key]) {
          options[key] = skuData[key]
        }
      }
      this.skuData = options
    },
      inputChangeHandle(){

        var data = this.getFormartSkuData()
        this.$emit('input', data)
        this.$emit('updateSkuQuantity', data)
        this.$emit('updateSkuTableError')
      },
      getFormartSkuData(){
        var skuData = this.skuData
        var arr = []
        for(var item in skuData) {
          arr.push(skuData[item])
        }
        return arr
      },
      formartByIdSku(list){
        var obj = {}
        for(var i=0;i<list.length;i++){
          var str = ""
          for(var j=0;j < list[i].data.length; j++) {
            if(j) {
              str += '-' + list[i].data[j].valueId
            }else {
              str = list[i].data[j].valueId
            }
          }
          obj[str] = list[i]
        }
        return obj
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
            obj.data = []
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
      initTableTitle(){
        var productSkuProperty = this.productSkuProperty
        for(var i=0,len = productSkuProperty.length; i< len; i++) {
          this.tableTitle[i] = productSkuProperty[i].catePropertyName
        }
        this.tableTitle.push('价格')
        this.tableTitle.push('库存')
      }
    }
  }
</script>

<style lang="scss">
.product-skutable{
  .cell {
    position: relative;
  }
  .el-form-item__error {
    position: static;
  }
}
</style>