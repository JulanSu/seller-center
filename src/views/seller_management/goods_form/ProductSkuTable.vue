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
            <template v-if="skuData" v-for="(value, key, index) in skuData">
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
        skuData: null,
        editorSkuListCache: null
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
      if(this.value && this.value.length) {
        this.initEditorSku()
      }
    },
    watch: {
      userSelectedTheSku(newVal, oldVal){
        if(newVal && newVal.length) {
          var genData = this.gen(newVal)
          var result  = this.getProductSkuProperty(genData)
          var resultById = this.formartByIdSku(result)
          var resultBySerialId = this.getProductSkuSerialId(resultById)
          // if(!this.skuData) {
          //   this.skuData = resultBySerialId
          // }else {
          //   this.skuData = resultBySerialId
          // }
          this.skuData = resultBySerialId
          this.inputChangeHandle()
        }else {
          this.skuData = null
          this.$emit('updateSkuQuantity', [])
        }
      }
    },
    methods: {
      /**
       * initEditorSku 初始化渲染数据，
       * @return {[type]} [description]
       */
    initEditorSku(){
      var skuProperty = this.productSkuProperty
      var skuTableList = this.value
      var skuPropertyMap = this.getSkuProperty(skuProperty)
      //判断类目是否完整，商品规格组是否有增删
      var isCateIntegrity = this.validCateIntegrity(skuPropertyMap, skuTableList)
      
      if(!isCateIntegrity) {
        this.skuData = []
        return
      }
      
      this.skuData = this.formartByIdSku(skuTableList)
      this.editorSkuListCache = this.formartByIdSku(skuTableList)
    },
    /**
     * validCateIntegrity 判断类目是否完整，对比用户已保存的商品销售规格的名称和商品规格的品牌
     * @param  { Object } skuPropertyMap 根据商品规格名称为key的map
     * @param  { Array } skuTableList   已存商品销售规格
     * @return {[type]}                [description]
     */
    validCateIntegrity(skuPropertyMap, skuTableList){
      var validStatus = true
      for(var j=0; j<skuTableList[0].data.length; j++) {
        var name = skuTableList[0].data[j].name
        var id = skuTableList[0].data[j].id
        if(!skuPropertyMap[name]){
          validStatus = false
        }else if(skuPropertyMap[name].productCatePropertyId != id) {
          validStatus = false
        }
      }
      return validStatus
    },
    /**
     * getSkuProperty 使用skuProperty生成map,key为catePropertyName
     * @param  { Array } data skuProperty数据
     * @return { Object }     map
     */
    getSkuProperty(data){
      var obj = {}
      for(var i=0; i<data.length; i++) { 
        obj[data[i].catePropertyName] = {
          options:data[i].options,
          productCatePropertyId: data[i].productCatePropertyId
        }
      }
      return obj
    },

      /**
       * getProductSkuSerialId 获取缓存数据中的productSkuSerialId,并赋值给对应的组合
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
    getProductSkuSerialId(data){
      if(this.editorSkuListCache) {
        for(var item in data){
          if(this.editorSkuListCache[item]) {
            data[item].productSkuSerialId = this.editorSkuListCache[item].productSkuSerialId
            data[item].productSkuQuantity = this.editorSkuListCache[item].productSkuQuantity
            data[item].productPrice = this.editorSkuListCache[item].productPrice
          }
        }
      }
      return data
    },
    /**
     * selectedSkuChange 获取用户已组合出来的项，并把其值赋值给最新的项 this.skuData 商品销售规格数据
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    selectedSkuChange(options){
      var skuData = this.editorSkuListCache
      for(var key in skuData) {
        if(options[key]) {
          //obj[key] = skuData[key]
          options[key] = skuData[key]
          //obj[key].data = this.validValuesIntegrity(skuData[key].data, options[key].data)
          options[key].data.productPrice = skuData[key].data.productPrice
          options[key].data.productPrice = skuData[key].data.productPrice
          //options[key].data = data
        }
      }
      return options
    },
    /**
     * validValuesIntegrity 校验商品规格组值和商品销售规格值是否相等
     * @param  { Object } skuData 商品销售规格map
     * @param  { Object } options 商品规格Map
     * @return { Array }  获取用户所选的规格组的值
     */
    validValuesIntegrity(skuData, options){
      var arr = []
      for(var i=0;i<skuData.length;i++) {
        for(var j=0;j<options.length;j++) {
          if(skuData[i].name ==  options[j].name && skuData[i].value == options[j].value) {
            arr.push(skuData[i])
          }
        }
      }
      return arr
    },
    /**
     * inputChangeHandle 向父组件传递数据
     * @return {[type]} [description]
     */
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
      /**
       * formartByIdSku 根据valueId生成maps
       * @param  {[type]} list [description]
       * @return {[type]}      [description]
       */
      formartByIdSku(data){
        var json = JSON.stringify(data)
        var list = JSON.parse(json)
        var obj = new Object()

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
      /**
       * initTableTitle 初始化Table Title
       * @return {[type]} [description]
       */
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