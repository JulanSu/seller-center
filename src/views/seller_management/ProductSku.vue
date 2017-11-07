<template>
  <div class="product-sku">
    <div class="cate-property-item" v-for="(productCate, topIndex) in skuData">
      <div class="text">{{productCate.catePropertyName}}</div>
      <div class="input">            
        <template v-for="(item, index) in productCate.options">
          <el-checkbox :key="item.catePropertyValue" :label="item.catePropertyValue" v-model="productCate.values[index].value" :true-label="item.catePropertyValue" false-label=""  @change="checkboxChangeHandle(productCate.values[index], topIndex)"></el-checkbox>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      
    },
    data() {
      return {
        formartSelectedSku: {},
        
        //初始化数据格式 注意格式
        skuData:[{
          cateConnector:"",
          catePropertyInputLimit:0,
          catePropertyName:"组成",
          catePropertyParentId:"0",
          catePropertyRequired:1,
          catePropertySelection:1,
          catePropertyType:2,
          catePropertyUnit:"",
          productCatePropertyId:"14",
          sort: 0,
          options:[{
            catePropertyValue:"冷藏室",
            productCatePropertyValuesId:"21"
          },{
            catePropertyValue:"冷冻室",
            productCatePropertyValuesId:"22"
          }],
          values:[{
            id: '14',
            name: '组成',
            value: ''
          },{
            id: '14',
            name: '组成',
            value: ''
          }]
        }],
        // formartSkuData: [],
        //表单数据
        tableData: [],
        //已选择的sku
        selectedSku: [],
        hasDid: {},
        hasText: [],
        sortByNameData: []
      }
    },
    mounted () {

    },
    created(){
      this.formartSkuDataHandel()
    },
    methods: {
      formartSkuDataHandel () {
        let skuData = this.skuData
        this.sortByNameData = this.sortByName(skuData)
        //根据名称格式化数据
      },
      sortByName (data){
        let obj = {}
        for(let i=0; i < data.length; i++) {
          var arr = []
          for(let j=0;j < data[i].options.length; j++) {
            var options = data[i].options[j]
            var obj2 = {
              name: data[i].catePropertyName,
              value: '',
              properyName: options.catePropertyValue,
              id: data[i].productCatePropertyId,
              vid: options.productCatePropertyValuesId,
              hidden: false
            }
            arr.push(obj2)
          }
          obj[data[i].catePropertyName] = arr
        }
        return obj;
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
      checkboxChangeHandle (value, index){
        let skuData = this.skuData
        let selectedSku = this.selectedSkuhandle()

        // var formartSelectedSku = this.formartSelectedSku
        console.log(selectedSku)
      },
      selectedSkuhandle (){
        let sortByNameData = this.sortByNameData

      }

    }

  }

</script>

<style lang="scss">

</style>