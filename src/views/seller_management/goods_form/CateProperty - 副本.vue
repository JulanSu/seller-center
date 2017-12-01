<template>
  <div class="cate-property block-form">
    <el-form :model="catePropertyForm" label-position="top" ref="catePropertyForm" label-width="100px">
      <template  v-if="catePropertyForm.list.length" v-for="(item, index) in catePropertyForm.list">
        <!-- 单选组 -->
        <template v-if="item.catePropertySelection == 0">       
          <el-form-item 
            :label="item.catePropertyName" 
            v-if="!item.catePropertyRequired"
            :key="item.catePropertyParentId"
            :prop="'list.'+index+'.values[0].value'"
            :rules="{required: true, message: item.catePropertyName + '不能为空！', trigger: 'blur'}">
            <el-select v-model="item.values[0].value" :placeholder="'请选择'+item.catePropertyName">
              <template v-for="option in item.options">  
                <el-option :label="option.catePropertyValue" :value="option.catePropertyValue" :key="option.itemPropertyValuesId"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item v-else :label="item.catePropertyName">
            <el-select v-model="item.values[0].value" :placeholder="'请选择'+item.catePropertyName">
              <template v-for="option in item.options">  
                <el-option ::label="option.catePropertyValue" :value="option.catePropertyValue" :key="option.itemPropertyValuesId"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </template>
        <!-- 多选框 -->
        <template v-else-if="item.catePropertySelection == 1">
          <el-form-item 
            :label="item.catePropertyName" 
            v-if="!item.catePropertyRequired"
            :key="item.catePropertyParentId"
            :prop="'list.'+index+'.values'"
            :rules="{required: true, type: 'array', message:item.catePropertyName + '不能为空！', trigger: 'blur'}">
            
            <el-checkbox-group v-model="item.values">
              <template v-for="(option, index) in item.options">
                <el-checkbox :key="option.catePropertyValue" :label="option.catePropertyValue"></el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item v-else :label="item.catePropertyName">
            <el-checkbox-group v-model="item.values">
              <template v-for="(option, index) in item.options">
                <el-checkbox :key="option.catePropertyValue" :label="option.catePropertyValue"></el-checkbox>
              </template>
            </el-checkbox-group>
          </el-form-item>
        </template>
        <template v-else-if="item.catePropertySelection == 2 && item.catePropertyParentId != '-1'">
          <template v-if="!item.catePropertyInputLimit">
            <el-form-item 
              :label="item.catePropertyName" 
              v-if="!item.catePropertyRequired"
              :key="item.catePropertyParentId"
              :prop="'list.'+index+'.values[0].value'"
              :rules="{required: true, message:item.catePropertyName + '不能为空！', trigger: 'blur'}">
                <el-input  v-model="item.values[0].value" :value="item.values[0].value" placeholder="自定义内容" @change="" :maxlength="20">
                  <template slot="append" v-if="item.catePropertyUnit">
                    <span>{{item.catePropertyUnit}}</span>
                  </template>
                </el-input>
            </el-form-item>
            <el-form-item 
              :label="item.catePropertyName" 
              v-else
              :key="item.catePropertyParentId">
                <el-input  v-model="item.values[0].value" :value="item.values[0].value" placeholder="自定义内容" @change="" :maxlength="20">
                  <template slot="append" v-if="item.catePropertyUnit">
                    <span>{{item.catePropertyUnit}}</span>
                  </template>
                </el-input>
            </el-form-item>
          </template>

          <template v-if="item.catePropertyInputLimit == 1">
            <el-form-item 
              :label="item.catePropertyName" 
              v-if="!item.catePropertyRequired"
              :key="item.catePropertyParentId"
              :prop="'list.'+index+'.values[0].value'"
              :rules="[
              {required: true, message:item.catePropertyName + '不能为空！', trigger: 'change, blur'}]">
                <el-input  v-model="item.values[0].value" :value="item.values[0].value" placeholder="自定义内容" @change="" :maxlength="20">
                  <template slot="append" v-if="item.catePropertyUnit">
                    <span>{{item.catePropertyUnit}}</span>
                  </template>
                </el-input>
<!--                 <div class="el-input el-input-group el-input-group--append">
                  <input type="number" class="el-input__inner" v-model.number="item.values[0].value" placeholder="自定义内容">
                    <div class="el-input-group__append"><span>{{item.catePropertyUnit}}</span></div>
                </div> -->
            </el-form-item>
<!--             <el-form-item 
              :label="item.catePropertyName" 
              v-else
              :prop="'list.'+index+'.values[0].value'"
              :rules="[
              {type: 'number', message:item.catePropertyName + '必须为数值'}]"
              :key="item.catePropertyParentId"> -->
            <el-form-item 
              :label="item.catePropertyName" 
              v-else>
                <el-input  v-model="item.values[0].value" :value="item.values[0].value" placeholder="自定义内容" @change="" :maxlength="20">
                  <template slot="append" v-if="item.catePropertyUnit">
                    <span>{{item.catePropertyUnit}}</span>
                  </template>
                </el-input>
<!--                 <div class="el-input el-input-group el-input-group--append">
                  <input type="number" class="el-input__inner" v-model.number="item.values[0].value" placeholder="自定义内容">
                    <div class="el-input-group__append"><span>{{item.catePropertyUnit}}</span></div>
                </div> -->
            </el-form-item>
          </template>

          <template v-if="item.catePropertyInputLimit == 2">
            <!-- 2017/11/28 update -->
            <!-- 注意：选择一次时间，再次选择相同的时间会抛出异常； -->
            <el-form-item 
              :label="item.catePropertyName" 
              v-if="!item.catePropertyRequired"
              :key="item.catePropertyParentId"
              :prop="'list.'+index+'.values[0].value'"
              :rules="{required: true, type: 'string', message:item.catePropertyName + '不能为空或格式不正确！', trigger: 'change'}">
                <el-date-picker
                  v-model="item.values[0].value"
                  :editable="false"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd" @change="datePickerChangeHandle(item.values[0])">
                </el-date-picker>
            </el-form-item>
            <el-form-item 
              :label="item.catePropertyName" 
              v-else
              :key="item.catePropertyParentId">
                <el-date-picker
                  :editable="false"
                  v-model="item.values[0].value"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd" @change="datePickerChangeHandle(item.values[0])">
                </el-date-picker>
            </el-form-item>
          </template>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        catePropertyForm: {
          list: []
        }
      }
    },
    props: {
      catePropertyData:{
        type: Array,
        default: function(){
          return []
        }
      },
      value: [Array]
    },
    watch:{
      'catePropertyForm': {
        handler (newVal, oldVal){
        }
      },
      deep: true
    },
    computed: {
      
    },
    created (){
      let catePropertyData = this.catePropertyData.concat()
      this.catePropertyForm.list = this.initCatePropertyFormData(catePropertyData)
    },
    methods: {
      /**
       * datePickerChangeHandle 日期处理并校验当前时间格式是否正确
       * @param  { Object } obj 当前选择的时间
       * @return {[type]}     [description]
       */
      datePickerChangeHandle(obj){
        var dateRegExp = /^(\d{4})\-(\d{2})\-(\d{2})$/
        if(obj.value) {
          var dataStr = moment(obj.value).format("YYYY-MM-DD")
          if(dateRegExp.test(dataStr)){
            obj.value = dataStr
          }
        }
      },
      /**
       * submitForm 表单校验，校验通过后向父组件传递参数
       * @return {[type]} [description]
       */
      submitForm() {
        let self = this
        self.$refs['catePropertyForm'].validate((valid) => {
          if (valid) {
            let fdata = self.formartSubmitData()
            let sdata = self.getSubmitData(fdata)
            let results = self.formartValues(sdata)
            self.$emit('input', results)
            self.$emit('onUploadStatus', true)
          } else {
            self.$emit('onUploadStatus', false)
            self.$message({
              message: '请检查必填项是否已填写完！',
              type: 'warning'
            });
            return false;
          }
        });
      },
      /**
       * getSubmitData 获取表单提交数据
       * @param  { Object } data 表单数据
       * @return {[type]}      [description]
       */
      getSubmitData: function(data){
        let results = []
        let father = []
        let children = []
        for(var i = 0, len = data.length; i < len; i++) {
          if(data[i].catePropertySelection == 2) {
            if(data[i].catePropertyParentId == '-1'){
              data[i].values = []
              father.push(data[i])
            }else if(data[i].catePropertyParentId != 0) {
              //某个父的儿子
              children.push(data[i])
            }else if(data[i].catePropertyParentId == 0) {
              results.push(data[i])
            } 
          }else {
            results.push(data[i])
          }
        }
        for(var j=0; j< father.length; j++) {
          for(var k=0; k< children.length; k++) {
            if(children[k].catePropertyParentId == father[j].productCatePropertyId) {
              father[j].values.push(children[k].values[0])
            }
          }
          results.push(father[j])
        }
        return results
      },
      /**
       * formartValues 格式化表单数据
       * @param  { Array } data 表单数据
       * @return {[type]}      [description]
       */
      formartValues: function(data){
        var arr = []
        for(var i=0 ; i<data.length; i++) {
          arr.push(this.getGroupSaveDTO(data[i]))
        }
        return arr
      },
      getGroupSaveDTO(data){
        var obj = {}

        obj.cateConnector = data.cateConnector
        obj.catePropertyName = data.catePropertyName
        obj.catePropertyParentId = data.catePropertyParentId
        obj.catePropertyUnit = data.catePropertyUnit
        obj.catePropertySelection = data.catePropertySelection
        obj.catePropertyRequired = data.catePropertyRequired
        obj.catePropertyType = data.catePropertyType
        obj.productCatePropertyId  = data.productCatePropertyId 
        obj.values = data.values
        return obj
      },
      initCatePropertyFormData(data){
        var self = this
        for(var i=0,cLen =data.length; i<cLen; i++) {
          if(!data[i].catePropertySelection) {
            //data[i].values = self.formartSelectValues(data[i])
          }else if(data[i].catePropertySelection == 1) {
            data[i].values = self.formartCheckboxValues(data[i])
          }
        }
        return data
      },
      formartCheckboxValues(obj){
        var arr = []
        for(var i =0; i < obj.values.length; i++) {
          if(obj.values[i].value) {
            arr.push(obj.values[i].value)
          }
        }

        return arr
      },
      formartSelectValues(obj){
        return [{
            name: obj.catePropertyName,
            id: obj.productCatePropertyId,
            value: obj.value
          }]
      },
      /**
       * formartSubmitData 格式化提交的数据
       * @return {[type]} [description]
       */
      formartSubmitData(){
        var json = JSON.stringify(this.catePropertyForm.list)
        var data = JSON.parse(json)
        for(var i=0, len = data.length; i< len; i++) {
          var checkboxData = data[i]
          var arr = []
          if(checkboxData.catePropertySelection == 1) {
            for(var j=0, arrLen = checkboxData.values.length; j<arrLen;j++) {
              var obj = {}
              obj.value = checkboxData.values[j]
              obj.id = checkboxData.productCatePropertyId
              obj.name = checkboxData.catePropertyName
              arr.push(obj)
            }
            checkboxData.values = arr
          }
        }

        return data
      }

    }
  }
</script>

<style lang="scss">
  .cate-property-list {

  }
  .cate-property  {
    .el-form-item {
      margin-bottom:18px;
    }
  }
</style>