<template>
  <div class="cate-property block-form">
    <template v-for="productCate in catePropertyData">
        <div class="cate-property-item" v-if=" productCate.catePropertySelection == 0">
          <div class="text">{{productCate.catePropertyName}}</div>
          <el-select v-model="productCate.values" placeholder="请选择服务范围" @change="changeHandle">
            <template v-for="option in productCate.options">  
              <el-option :text="option.catePropertyValue" :value="option.catePropertyValue" :key="option.productCatePropertyValuesId"></el-option>
            </template>
          </el-select>
        </div>
        <div class="cate-property-item" v-else-if="productCate.catePropertySelection == 1">
          <div class="text">{{productCate.catePropertyName}}</div>
          <div class="input">
            <el-checkbox-group v-model="productCate.values" @change="changeHandle">
                <template v-for="option in productCate.options">
                  <el-checkbox :label="option.catePropertyValue" :key="option.productCatePropertyValuesId"></el-checkbox>
                </template>
              </el-checkbox-group>
          </div>
        </div>        
        <div class="cate-property-item" v-else-if="productCate.catePropertySelection == 2 && productCate.catePropertyParentId != -1">
          <div class="text">{{productCate.catePropertyName}}</div>
          <div class="input">
            <el-input :model="productCate.values" value="" placeholder="自定义属性" @change="changeHandle"></el-input>
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
        goodsForm: {
          catePropertyOptionValuesDTOList: [],
          catePropertyGroupList: []
        }
      }
    },
    props: {
      catePropertyData:{
        type: Array,
        default: function(){
          return []
        }
      }
    },
    computed: {
      initGroupList: function(){

        return 'aaa'

        console.log('计算属性',this.catePropertyData)
      }
      
    },
    created (){
      this.formartData()
    },
    methods: {
      formartData: function(){
        var data = this.catePropertyData
        var saveData = this.formartSaveData(data)

        //this.formartValues(saveData)

      },
      formartValues: function(data){
        var self = this
        var dataA = []
        for(var i=0;i<data.length;i++) {
          if(data[i]['catePropertySelection'] == 2 && data[i]['catePropertyParentId'] == "-1") {
            var obj = {}
            if(data[i]['options'].length) {
              for(var j=0;j<data[i]['options'].length;j++) {
                data[i]['options'][j] = self.getGroupSaveValueDTO(data[i]['options'][j])
              }
            }
          }
          data[i] = self.getGroupSaveDTO(data[i])
        }
        //console.log('超级格式化', data)
      },
      formartSaveData: function(data){
        var input = []
        var aaaa = []
        for(var i=0; i<data.length; i++) {
          if(data[i]['catePropertySelection'] == 2 && data[i]['catePropertyParentId'] == "-1") {
            input.push(data[i])
          }else if(data[i]['catePropertySelection'] == 2 && data[i]['catePropertyParentId'] != 0) {
            aaaa.push(data[i])
          }else if(data[i]['catePropertySelection'] == 2 && data[i]['catePropertyParentId'] == 0){
            input.push(data[i])
          }else if(data[i]['catePropertySelection'] == 0 || data[i]['catePropertySelection'] == 1){
            input.push(data[i])
          }
        }
        
        if(input.length) {
          for (var j=0; j<input.length;j++) {
            for(var k=0;k<aaaa.length;k++) {
              if(input[j]['productCatePropertyId'] == aaaa[k]['catePropertyParentId']) {
                console.log(aaaa, input)
                input[j]['options'].push(aaaa[k])
              }
            }
          }
        }
        
        return input;
      },
      getGroupSaveDTO(data){
        var obj = {}
        obj.cateConnector = data.cateConnector
        obj.catePropertyName = data.catePropertyName
        obj.catePropertyParentId = data.catePropertyParentId
        obj.catePropertyUnit = data.catePropertyUnit
        obj.productCatePropertyId = data.productCatePropertyId
        obj.values = data.values
        return obj
      },
      getGroupSaveValueDTO(data){
        var obj = {}
        obj.id = data.productCatePropertyId
        obj.name = data.catePropertyName
        obj.value = data.values
      },
      changeHandle(value){
        console.log('我在被监听', value)
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
        width: 160px;
        position: relative;
        display: inline-block;
      }

    }
  }
</style>