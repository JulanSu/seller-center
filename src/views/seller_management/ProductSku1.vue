<template>
  <div class="product-sku">
    <div class="cate-property-item" v-for="(productCate, topIndex) in skuData">
      <div class="text">{{productCate.catePropertyName}}</div>
      <div class="input">           
          <!-- <template v-for="(item, index) in productCate.options">
            <el-checkbox :key="item.catePropertyValue" :label="item.catePropertyValue" v-model="productCate.values[index].value" :true-label="item.catePropertyValue" false-label=""  @change="checkboxChangeHandle(item, index,productCate)"></el-checkbox>
          </template> -->
          <template v-for="(item, index) in productCate.options">
            <el-form-item label="权限" label-width="100px" prop="roleAuthority">
              <el-checkbox-group v-model="ruleForm.roleAuthority">
                <el-checkbox v-for="item in jurisdiction" :label="item.catePropertyValue" :key="item.catePropertyValue"  @change="checkboxChangeHandle(item, index,productCate)">
                  {{item.name}}
                </el-checkbox>
              </el-checkbox-group> 
            </el-form-item>
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
   /* watch:{
      calculate:{
        handler:function() {   //特别注意，不能用箭头函数，箭头函数，this指向全局
          alert(1)
        },
        deep: true 
      }
    },*/
    /*computed: {
      calculate: function () {
        var arr=[];
        for(var i=0;i<this.results.length;i++){
          
          var item=this.results[i];
          var key=Object.keys(item);
          var obj=item[key];

          if(obj.length>0){

            for(var j=this.results.length-1;j<i;j--){
          
              var item2=this.results[j];
              var key2=Object.keys(item2);
              var obj2=item2[key2];  
              if(obj2.length>0){
                for(var k=0;k<obj2.length;k++){
                  arr.push({})
                }
              }
            }
          }
        }
        return 1

      }
    },*/
    mounted () {
      this.ceshi();
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
      ceshi(){
         var data = {
            size: ['size1', 'size2', 'size3'],
            color: ['color1', 'color2', 'color3'],
            style: ['style1', 'style2', 'style3']
        };

        var pr = (function(data){
            var aa = [];
            for(var pro in data){
                aa.push(pro);
            }
            return aa;
        })(data);
        var a=Object.values(data).reduce(function(objs,props,index){
            if(objs.length==0){
                return props.reduce(function(oo,att){
                    var oob = new Object();
                    oob[pr[index]] = att;
                    return oo.concat(oob);
                },[]);
            }else{
                var item = objs.reduce(function(ritem,oo){
                    var tt = props.reduce(function(subitem,att){
                        var oob = new Object();
                        for(var i in oo){
                            oob[i] = oo[i];
                        }
                        oob[pr[index]] = att;
                        subitem.push(oob);
                        return subitem;
                    },[]);
                    return ritem.concat(tt)
                },[]);
                return item;
            }
            
        },[]);
        console.log(a)
      },
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