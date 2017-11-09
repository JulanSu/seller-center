<template>
  <div class="product-sku">
    <div class="cate-property-item" v-for="(productCate, topIndex) in skuData">
      <div class="text">{{productCate.catePropertyName}}</div>
      <div class="input">            
        <template v-for="(item, index) in productCate.options">
          <el-checkbox :key="item.catePropertyValue" :label="item.catePropertyValue" v-model="productCate.values[index].value" :true-label="item.catePropertyValue" false-label=""  @change="checkboxChangeHandle(productCate.values, topIndex)"></el-checkbox>
        </template>
      </div>
    </div>
    <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width:100%">
            <thead>
              <tr>
                <template v-for="name in tableName">
                  <th colspan="1" rowspan="1" class="is-leaf">
                    <div class="cell">{{name}}</div>
                  </th>
                </template>
              </tr>
            </thead>
            <tbody>
              <tr class="el-table__row" v-if="selectedSkuResults.length" v-for="item in selectedSkuResults">
                <td>
                  <div class="cell"><input class="" v-model="item.productPrice" /></div>
                </td>
              </tr>
            </tbody>
          </table>
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
        tableName: [],
        tableIdArr: [],
        //初始化数据格式 注意格式
        skuData:[{
          cateConnector:"",
          catePropertyInputLimit:0,
          catePropertyName:"颜色",
          catePropertyParentId:"0",
          catePropertyRequired:1,
          catePropertySelection:1,
          catePropertyType:2,
          catePropertyUnit:"",
          productCatePropertyId:"14",
          sort: 0,
          options:[{
            catePropertyValue:"红色",
            productCatePropertyValuesId:"11"
          },{
            catePropertyValue:"黄色",
            productCatePropertyValuesId:"12"
          },{
            catePropertyValue:"黑色",
            productCatePropertyValuesId:"12"
          }],
          values:[{
            id: '111',
            name: '颜色',
            value: ''
          },{
            id: '132',
            name: '颜色',
            value: ''
          },{
            id: '155',
            name: '颜色',
            value: ''
          }]
        },{
          cateConnector:"",
          catePropertyInputLimit:0,
          catePropertyName:"尺寸",
          catePropertyParentId:"0",
          catePropertyRequired:1,
          catePropertySelection:1,
          catePropertyType:2,
          catePropertyUnit:"",
          productCatePropertyId:"14",
          sort: 0,
          options:[{
            catePropertyValue:"M",
            productCatePropertyValuesId:"21"
          },{
            catePropertyValue:"L",
            productCatePropertyValuesId:"22"
          },{
            catePropertyValue:"XL",
            productCatePropertyValuesId:"23"
          }],
          values:[{
            id: '244',
            name: '尺寸',
            value: ''
          },{
            id: '255',
            name: '尺寸',
            value: ''
          },{
            id: '266',
            name: '尺寸',
            value: ''
          }]
        },{
          cateConnector:"",
          catePropertyInputLimit:0,
          catePropertyName:"性别",
          catePropertyParentId:"0",
          catePropertyRequired:1,
          catePropertySelection:1,
          catePropertyType:2,
          catePropertyUnit:"",
          productCatePropertyId:"14",
          sort: 0,
          options:[{
            catePropertyValue:"男",
            productCatePropertyValuesId:"35"
          },{
            catePropertyValue:"女",
            productCatePropertyValuesId:"36"
          },{
            catePropertyValue:"人妖",
            productCatePropertyValuesId:"37"
          }],
          values:[{
            id: '333',
            name: '性别',
            value: ''
          },{
            id: '334',
            name: '性别',
            value: ''
          },{
            id: '345',
            name: '性别',
            value: ''
          }]
        }],
        // formartSkuData: [],
        //表单数据
        tableData: [],
        //已选择的sku
        selectedSku: [],
        selectedSkuResults: [],
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
      /**
       * formartSkuDataHandel 格式化SKU数据
       * @return {[type]} [description]
       */
      formartSkuDataHandel () {
        let skuData = this.skuData
        //根据顺序进行排序
        let sortByNameData = this.sortByName(skuData)
        let tableName = this.createTableName(sortByNameData)
        let formartSelectSku = this.formartSelectSku(sortByNameData)
        
        this.tableName = tableName
        this.sortByNameData = sortByNameData
        this.selectedSku = formartSelectSku

        //根据名称格式化数据
      },
      createTableName(sortByNameData){
        
        var arr = []
        var defaultName = ['价格', '库存']
        for(var key in sortByNameData) {
          arr.push(key)
        }

        return arr.concat(defaultName)
      },
      formartSelectSku(data){
        var obj = {}
        var i = 0
        for(var key in data) {
          obj[i] = []
          i++
        }
        return obj 
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
      checkboxChangeHandle (options, index){
        let selectedSku = this.selectedSkuhandle(options, index)
        let selectedResults = this.getSelectResults(selectedSku)
    
        // let selectedResults = 
        // var formartSelectedSku = this.formartSelectedSku
      },
      selectedSkuhandle (options, index){
        let selectedSku = this.selectedSku
        let arr = []
        for(var i=0; i<options.length; i++) {
          if(options[i].value) {
            arr.push(options[i])
          }
        }
        selectedSku[index] = arr
        return selectedSku
      },

      getSelectResults (){
        var head = arguments[0][0];
        for(var i in arguments[0]) {
          if(i != 0) {
            head = this.selectedSkuGroup(head, arguments[0][i])
          }
        }

        console.log('用户点击后的结果',head)

             
      },
      selectedSkuGroup(head, item){
        var result = [];
        for(var i = 0, headlen = head.length; i < headlen; i++) {
          for(var j= 0, itemLen = item.length; j < itemLen; j++) {

            var skuItem = this.defaultSku(head[i], item[j])
            result.push(skuItem)
          }
        }

        return result
      },
      defaultSku(head, item){
        var obj = {};
        obj.id = head.id + '-' + item.id
        obj.name = head.name + '-' + item.name
        obj.value = head.value + '-' + item.value
        obj.productPrice = ''
        obj.productSkuQuantity = ''
        obj.productSkuSerialId = ''
        obj.hidden = false
        return obj 
      }
    }

  }

</script>

<style lang="scss">

</style>