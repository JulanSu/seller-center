<template>
  <div class="wuliu">
    <el-row class="block">
      <el-col :span="24">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="wuliu-form">
          <el-form-item label="物流模板" prop="storeShippingTemplateId">
            <el-select v-model="ruleForm.storeShippingTemplateId" placeholder="选择物流模板">
              <template v-if="initTemplateData.length">
                <el-option v-for="item in initTemplateData" :label="item.name" :value="item.versionId"></el-option>
              </template>
            </el-select>
            <el-button type="primary" @click="$router.push({psth: '/seller-management/wuliu'})" v-if="isEditorStatus">新建物流模板</el-button>
          </el-form-item>
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="ruleForm.templateName" style="width: 398px;"></el-input>
          </el-form-item>
          <el-form-item label="配送自提" prop="type">
            <el-radio-group v-model.number="ruleForm.templateType" @change="peiSongHandle">
              <el-radio :label="0">配送</el-radio>
              <el-radio :label="1">自提</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="配送范围及运费" prop="title" v-if="ruleForm.templateType == 0">
            <p class="desc">请编辑可送达的地区，当用户选择下述地区以外的配送地址时，将提示用户无法下单。</p>
            <div class="area">
              <ul>
                <li v-for="(item, index) in ruleForm.templateValueList">
                  <div class="area-item"><el-input v-model="item.sysAreaIds" style="width:208px" placeholder="浙江、江苏、上海" @focus="citySelectHandle(item,index)"></el-input></div>
                  <div class="area-item">+运费</div>
                  <div class="area-item"><el-input v-model="item.shippingCost" style="width:80px" placeholder=""></el-input></div>
                  <div class="area-item">元/件，满</div>
                  <div class="area-item"><el-input v-model="item.shippingLimitNum" style="width:80px" placeholder=""></el-input></div>
                  <div class="area-item">件</div>
                  <div class="area-item"><el-input v-model="item.shippingLimitCost" style="width:80px" placeholder=""></el-input></div>
                  <div class="area-item">元</div>
                </li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item label="自提描述" prop="title" v-if="ruleForm.templateType == 'ziti'">
            <p class="desc">请填写买家自提商品时，需要注意的事项。</p>
            <div class="area">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="ruleForm.textarea">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    
    <el-dialog
      title="选择区域"
      :visible.sync="dialogVisible"
      size="small" @close="onDialogCancelHandle('dialogForm')">
        <el-form :model="dialogForm" :rules="dialogFormRules" ref="dialogForm" class="area-selection">
          <el-form-item label="" prop="checkedCities">
              <ul class="area-wrap">
                <el-checkbox-group v-model="dialogForm.checkedCities">
<!--                   <li v-for="(value, key, index) in citiesMap" >
                    <template v-if="value.checked">
                      <el-checkbox :label="key" v-if="checkedCitiesIndex != value.index" :key="key" disabled></el-checkbox>
                      <el-checkbox :label="key" v-else="" :key="key"></el-checkbox>
                    </template>
                    <el-checkbox :label="key" v-else="" :key="key"></el-checkbox>
                  </li> -->

                </el-checkbox-group>
              </ul>
            </el-checkbox-group>  
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onConfirmHandle('dialogForm')">确 定</el-button>
        </span>
    </el-dialog>
  </div>

</template>

<script>
  import CitySelection from './components/CitySelection.vue'
  import { getNewestTemplate } from '@/api/seller'
  import merge from 'merge'
  const win = window;
  const storeId = win.storeInfo && win.storeInfo.storeId ? win.storeInfo.storeId : ''
  export default {
    components: { CitySelection },
    data() {
      return {
        storeId: '1',
        initTemplateData:{},
        citiesMap: {},
        curInputVal: [],
        checkedCitiesIndex: '',
        areaList: [],
        dialogForm: {
          checkedCities: []
        },
        isEditorStatus: false,
        dialogVisible: false,
        ruleForm: {
          templateValueList: [{
            sysAreaIds: '',
            shippingCost: '',
            shippingLimitNum: '',
            shippingLimitCost: ''
          }],//运费模板列表
          storeId: '1',  //店铺ID
          templateName: '', //模板名称
          storeShippingTemplateId: '',//运费模板ID
          templateType: 0
        },
        initForm: {

        },
        rules: {
          templateName: [{
            required: true, message: '请输入模板名称', trigger: 'blur'
          }]
        },
        dialogFormRules: {
          checkedCities:[{
            required: false,
            message: '请选择城市'
          }]
        }
      }
    },
    computed: {

    },
    created () {
      var self = this
      self.getNewestTemplateData(this.storeId, function(res){

        console.log('获取物流数据',res, self.ruleForm)
        self.initTemplateData = res.data
        self.ruleForm = res.firstData
        self.ruleForm.templateValueList[0].sysAreaIds = '110000,210000,150000'
        var cityMap = self.createCityMap(res.area) 
        var selectedCity = self.userSelectedArea(res.firstData.templateValueList)
        self.citiesMap = self.updateCityMap(cityMap, selectedCity)
      })
      
      // this.initCityMap()
      //console.log(this.$route)
    },
    methods: {
      initCityMap(){
        let self = this;
        let templateValueList = self.ruleForm.templateValueList
        let cityMap = self.createCityMap(self.areaList)
        // let selectedCity = self.userSelectedArea(templateValueList)
        // let finishedMaps = self.updateCityMap(cityMap, selectedCity)
        // self.citiesMap = finishedMaps
      },
      createCityMap (cityList){
        let self = this;
        var obj = {}
        if(cityList.length) {
          for(var i=0;i<cityList.length;i++) {
            if(cityList[i].areaName !== '全国') {
              obj[cityList[i].areaCode] = {
                checked: false,
                index: '',
                id: cityList[i].areaCode,
                name: cityList[i].areaName
              }              
            }

          }
        }
        console.log('格式化车呢故事', obj)
        return obj
      },  
      /**
       * userSelectedArea 获取用户已选城市
       * @param  { Array } templateValueList 用户已保存的物流模板信息
       * @return {[type]}                   [description]
       */
      userSelectedArea (templateValueList){
        var sysAreaCodeArr = []
        if(templateValueList.length) {
          for(var i=0;i<templateValueList.length;i++) {
            var arr = this.formartArr(templateValueList[i]['sysAreaIds'])
            for(var j=0;j<arr.length;j++) {
              var obj = {
                areaCode: arr[j],
                index: i
              }
              sysAreaCodeArr.push(obj)
            }
          }
        }

        console.log('dasda',sysAreaCodeArr)
        return sysAreaCodeArr
      },
      formartArr (str){
        if(str){
          return str.split(',')
        }
      },
      getNewestTemplateData (storeId, callback){
        var self = this
          getNewestTemplate({
            storeId: 1
          }).then((res)=>{

            if(res.data.code === 0) {
              callback(res.data.data)
              console.log(res.data.data)
            }
          })
      },
      disabledCheckedCities (city){
        console.log(city)
      },
      /**
       * citySelectHandle 模板城市选择
       * @param  { Object } row 运费模板对象
       * @return {[type]}     [description]
       */
      citySelectHandle (row, index){
        let templateValueList = this.ruleForm.templateValueList
        this.dialogForm.checkedCities = row.city
        this.curInputVal = row
        this.checkedCitiesIndex = index
        this.dialogVisible = true
      },
      /**
       * onConfirmHandle 弹窗确认事件
       * @param  { String } formName 表单对象
       * @return {[type]}          [description]
       */
      onConfirmHandle (formName){
        let self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('确认',self.dialogForm.checkedCities)
            self.addInputText()
            self.dialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      addInputText() {
        let self = this
        let checkedCities = self.dialogForm.checkedCities
        let checkedCitiesIndex = self.checkedCitiesIndex
        self.curInputVal.city = checkedCities
        self.updateCityMap(self.citiesMap, checkedCities,  checkedCitiesIndex)
      },
      updateCityMap (citiesMap, checkedCities, checkedCitiesIndex){

        var citiesMap = citiesMap,
            checkedCities = checkedCities;

            console.log(citiesMap, checkedCities)
        if(checkedCities.length) {
          for(var i=0;i<checkedCities.length; i++) {
            console.log('测试数据',citiesMap[checkedCities[i].areaCode])
            if(citiesMap[checkedCities[i].areaCode] != 'undefined') {
              citiesMap[checkedCities[i].areaCode].checked = true
              if(checkedCitiesIndex != undefined) {
                citiesMap[checkedCities[i].areaCode].index = checkedCitiesIndex
              }else {
                citiesMap[checkedCities[i].areaCode].index = checkedCities[i].index
              }
              
            }else {
              citiesMap[checkedCities[i].areaCode].checked = false
              citiesMap[checkedCities[i].areaCode].index = ''
            }
          }
        }else {
          this.resetCitiesMap(citiesMap)
        }

        console.log('合并数据',citiesMap)
        return citiesMap;
        
      },
      resetCitiesMap(citiesMap){
        for (var obj in citiesMap){
          citiesMap[obj]['checked'] = false
          citiesMap[obj]['index'] = ''
        }
      },
      /**
       * onDialogCancelHandle 弹窗关闭时的响应事件，重置表单
       * @param  {[type]} formName [description]
       * @return {[type]}          [description]
       */
      onDialogCancelHandle (formName){
        this.$refs[formName].resetFields();
      },
      /**
       * peiSongHandle 配送方式选择
       * @param  { String } value 配送类型
       * @return {[type]}       [description]
       */
      peiSongHandle (value){
        console.log(value,event)
      },
      /**
       * submitForm 表单提交
       * @param  { String } formName 表单对象名称 ruleForm
       * @return {[type]}          [description]
       */
      submitForm (formName){
        let self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('提交表单',self.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      /**
       * resetForm 重置表单
       * @param  { String } formName 表单对象名称
       * @return {[type]}          [description]
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss">

</style>
            return false;
          }
        });
      },

      /**
       * resetForm 重置表单
       * @param  { String } formName 表单对象名称
       * @return {[type]}          [description]
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss">

</style>