<template>
  <div class="product-sku">

  </div>
</template>

<script>
  export default {
    components: {
      
    },
    data() {
      return {
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
      }
    },
    mounted () {

    },
    created(){
    },
    methods: {

    }

  }

</script>

<style lang="scss">

</style>