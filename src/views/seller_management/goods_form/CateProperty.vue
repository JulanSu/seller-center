<template>
  <div class="cate-property block-form">
    <template v-if="catePropertyGroupList.length" v-for="productCate in catePropertyGroupList">
        <div class="cate-property-item" v-if=" productCate.catePropertySelection == 0">
          <div class="text">{{productCate.catePropertyName}}</div>
          <el-select v-model="productCate.values[0].value" placeholder="请选择服务范围" @change="changeHandle">
            <template v-for="option in productCate.options">  
              <el-option :text="option.catePropertyValue" :value="option.catePropertyValue" :key="option.productCatePropertyValuesId"></el-option>
            </template>
          </el-select>
        </div>
        <div class="cate-property-item" v-else-if="productCate.catePropertySelection == 1">
          <div class="text">{{productCate.catePropertyName}}</div>
          <div class="input">
            <template v-for="(item, index) in productCate.options">
              <el-checkbox :key="item.catePropertyValue" :label="item.catePropertyValue" v-model="productCate.values[index].value" :true-label="item.catePropertyValue" false-label=""  @change="changeHandle"></el-checkbox>
            </template>
          </div>
        </div>        
        <template v-else-if="productCate.catePropertySelection == 2 && productCate.catePropertyParentId == '-1'">
          <div class="cate-property-item" v-if="productCate.values.length" v-for="item in productCate.values">
              <div class="text">{{item.name}}</div>
              <div class="input">
                  <el-input  v-model="item.value" :value="item.value" placeholder="自定义属性" @change="changeHandle"></el-input>
              </div>
          </div>
        </template>
        <div class="cate-property-item" v-else-if="productCate.catePropertySelection == 2 && productCate.catePropertyParentId != '-1'">
          <div class="text">{{productCate.catePropertyName}}</div>
          <div class="input">
              <el-input  v-model="productCate.values[0].value" :value="productCate.values[0].value" placeholder="自定义属性" @change="changeHandle"></el-input>
            
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
        catePropertyGroupList: []
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
      
    },
    created (){
      this.formartData(this.catePropertyData)
    },
    methods: {
      formartData: function(data){
        var saveData = this.formartSaveData(data)
        this.catePropertyGroupList = this.formartValues(saveData)

      },

      formartValues: function(data){
        var arr = []
        for(var i=0 ; i<data.length; i++) {
          arr.push(this.getGroupSaveDTO(data[i]))
        }
        return arr
      },
      formartOptions(options, data){
        var arr = []
        for(var i=0; i<options.length;i++) {
          var obj ={}
          obj.id = options[i].productCatePropertyValuesId
          obj.name = data.catePropertyName
          obj.value = ''
          arr.push(obj)
        }
        return arr;
      },
      formartSaveData: function(data){

        var input = []
        var aaaa = []
        for(var i=0; i < data.length; i++) {
          if(data[i]['catePropertySelection'] == 2 && data[i]['catePropertyParentId'] == "-1") {
            data[i]['value'] = []
            input.push(data[i])
          }else if(data[i]['catePropertySelection'] == 2 && data[i]['catePropertyParentId'] != 0) {
            
            data[i]['values'] = [this.getGroupSaveValueDTO(data[i])]
            aaaa.push(data[i])
          }else if(data[i]['catePropertySelection'] == 2 && data[i]['catePropertyParentId'] == 0){
            
            data[i]['values'] = [this.getGroupSaveValueDTO(data[i])]
            input.push(data[i])
          }else if(data[i]['catePropertySelection'] == 1){
            var arr = []
            if(data[i]['options'].length) {
              data[i]['values'] = this.formartOptions(data[i]['options'], data[i])
            }
            
            input.push(data[i])
          }else if(data[i]['catePropertySelection'] == 0) {
            
            data[i]['values'] = [this.getGroupSaveValueDTO(data[i])]
            input.push(data[i])           
          }
        }
        
        if(input.length) {
          for (var j=0; j<input.length;j++) {
            for(var k=0;k<aaaa.length;k++) {
              if(input[j]['productCatePropertyId'] == aaaa[k]['catePropertyParentId']) {
                input[j]['values'].push(this.getGroupSaveValueDTO(aaaa[k]))
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
        obj.catePropertySelection = data.catePropertySelection
        obj.options = data.options
        if(data)
        obj.values = data.values
        return obj
      },
      getGroupSaveValueDTO(data){
        var obj = {}
        obj.id = data.productCatePropertyId
        obj.name = data.catePropertyName
        obj.value = ''
        return obj;
      },

      changeHandle(value){
        var jsonData = JSON.stringify(this.catePropertyGroupList)
        var saveData = this.getSaveData(jsonData)
        this.$emit('updateCatePropertyGroupList', saveData);
      },
      getSaveData(json){
        var newData = JSON.parse(json)
        if(newData.length) {
          for(var i=0;i<newData.length;i++) {
            for(var obj in newData[i]) {
              if(obj === 'catePropertySelection' || obj === 'options') {
                delete newData[i][obj]
              }
            }
          }
        }
        return newData;
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