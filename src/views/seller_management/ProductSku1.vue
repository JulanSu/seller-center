<template>
  <div class="product-sku">
    <div class="cate-property-item" v-for="(productCate, topIndex) in skuData">
      <div class="text">{{productCate.catePropertyName}}</div>
      <div class="input">           
          <template v-for="(item, index) in productCate.options">
            <el-checkbox :key="item.catePropertyValue" :label="item.catePropertyValue" v-model="productCate.values[index].value" :true-label="item.catePropertyValue" false-label=""  @change="checkboxChangeHandle(item, index,productCate)"></el-checkbox>
          </template>
      </div>
    </div>
    <div v-if="results.length">
      <template v-for="(item,index) in results">
        <!-- <div>
          <span>{{}}</span>
          <el-input v-model=""></el-input>
        </div> -->
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      
    },
    data() {
      return {
        results:[],//用于展示展示数据（排列组合）
        calculate:[],//用于展示展示数据（排列组合）

        formartSelectedSku: {},

        
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
      for (var i=0;i<this.skuData.length;i++)
      {
        var o=this.skuData[i];
        var key=o.catePropertyName
        this.$set(this.calculate, key, []);
      }
      console.log(this.calculate)
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
      checkboxChangeHandle (value, index,productCate){
        var flag=false;
        var that=this;
        var objkey=productCate.catePropertyName;//记录当前点击的是存储(删除)在calculate数据的哪个key里面;

        var obj=that.calculate[objkey];
        for(var i=0;i<obj.length;i++)
        {
          if(obj[i]==value){//如果calculate数据里面有传过来的value值，就是取消选中
            flag=true;
            that.$delete(that.calculate[objkey],index);
          }
        }
        if(!flag){//如果calculate数据里面没有传过来的value值，就是选中
          that.$set(obj, obj.length, value);
        }
        console.log(that.calculate)


      },
      selectedSkuhandle (){
        let sortByNameData = this.sortByNameData

      }

    }

  }

</script>

<style lang="scss">

</style>