<template>
  <div class="wuliu">
    <el-row class="block">
      <el-col :span="24">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="wuliu-form">
          <el-form-item label="物流模板" prop="storeShippingTemplateId">
            <el-select v-model.number="ruleForm.storeShippingTemplateId" placeholder="选择物流模板">
              <el-option label="新建物流模板" :value="0"></el-option>
              <template v-if="initTemplateData.length">
                <el-option v-for="item in initTemplateData" :label="item.name" :value="item.versionId"></el-option>
              </template>
            </el-select>
            <el-button type="primary" @click="$router.push({path: '/seller-management/wuliu'})" v-if="isEditorStatus">新建物流模板</el-button>
          </el-form-item>
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="ruleForm.templateName" style="width: 398px;"></el-input>
          </el-form-item>
          <el-form-item label="配送自提" prop="templateType">
            <el-radio-group v-model.number="ruleForm.templateType" @change="peiSongHandle">
              <el-radio :label="0">配送</el-radio>
              <el-radio :label="1">自提</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="配送范围及运费" prop="title" v-if="ruleForm.templateType == 0">
            <p class="desc">请编辑可送达的地区，当用户选择下述地区以外的配送地址时，将提示用户无法下单。</p>
            <div class="area-list">
              <div class="area-list-wrap" v-for="(item, index) in ruleForm.templateValueList">
                <div class="area-item" style="width:219px"><el-checkbox v-model="national">全国</el-checkbox></div>
                <div class="area-item">+运费</div>
                <div class="area-item"><el-input v-model="item.shippingCost" style="width:80px" placeholder=""></el-input></div>
                <div class="area-item">元/件，满</div>
                <div class="area-item"><el-input v-model="item.shippingLimitNum" style="width:80px" placeholder=""></el-input></div>
                <div class="area-item">件</div>
                <div class="area-item"><el-input v-model="item.shippingLimitCost" style="width:80px" placeholder=""></el-input></div>
                <div class="area-item">元</div>
                <div class="area-item">
                  
                </div>
              </div>
              <template v-for="(item, index) in ruleForm.templateValueList">
                <div style="padding-left: 5px; color: #999">指定地区的运费：</div>
                <div class="area-list-wrap">
                  <div class="area-item"><el-input v-model="item.sysAreaNames.join(',')" style="width:208px" placeholder="浙江、江苏、上海" @focus="citySelectHandle(item, index)"></el-input></div>
                  <div class="area-item">+运费</div>
                  <div class="area-item">
                    <el-input v-model="item.shippingCost" style="width:80px" placeholder=""></el-input>
                  </div>
                  <div class="area-item">元/件，满</div>
                  <div class="area-item">
                    <el-input v-model="item.shippingLimitNum" style="width:80px" placeholder=""></el-input>
                  </div>
                  <div class="area-item">件</div>
                  <div class="area-item">
                    <el-input v-model="item.shippingLimitCost" style="width:80px" placeholder=""></el-input>
                  </div>
                  <div class="area-item">元</div>
                </div>
              </template>
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
                  <li v-for="(value, key, index) in citiesMap">
                    <template v-if="value.checked">
                      <el-checkbox :label="key" v-if="checkedCitiesIndex != value.index" :key="value.name" disabled></el-checkbox>
                      <el-checkbox :label="key" v-else :key="key"></el-checkbox>
                    </template>
                    <el-checkbox :label="key" v-else :key="key"></el-checkbox>
                  </li>
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
  import AreaItem from './logistics_template/AreaItem.vue'
  import { getNewestTemplate, saveStoreShippingTemplate } from '@/api/seller'
  import qs from 'qs'; 
  const win = window;
  const storeId = win.storeInfo && win.storeInfo.storeId ? win.storeInfo.storeId : ''
  export default {
    components: { CitySelection, AreaItem },
    data() {
      return {
        national: false,
        storeId: '1',
        initTemplateData:{},
        citiesMap: {},
        checkedCitiesIndex: '',
        dialogForm: {
          checkedCities: []
        },
        isEditorStatus: false,
        dialogVisible: false,
        ruleForm: {
          templateValueList: [{
            sysAreaCodes: '',
            shippingCost: '',
            shippingLimitNum: '',
            shippingLimitCost: '',
            sysAreaNames: []
          }],//运费模板列表
          storeId: '1',  //店铺ID
          templateName: '', //模板名称
          storeShippingTemplateId: 0,//运费模板ID
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
        
        self.initTemplateData = res.data
        if(res.firstData.templateValueList && res.firstData.templateValueList.length) {
          self.ruleForm = res.firstData
        }
        
        var citiesMap = self.createCityMap(res.area) 
        var selectedCity = self.initSelectedArea(self.ruleForm.templateValueList, citiesMap)
        console.log('格式化后的城市',self.citiesMap)
      })
      
      //this.initCityMap()
      //console.log(this.$route)
    },
    methods: {
      /**
       * createCityMap 初始化area数据结构，用于记录用户所选择的area
       * @param  { Array } cityList area list
       * @return { Object }       area Object
       */
      createCityMap (cityList){
        let self = this;
        var obj = {}
        if(cityList.length) {
          for(var i=0;i<cityList.length;i++) {
            if(cityList[i].areaName !== '全国') {
              obj[cityList[i].areaName] = {
                checked: false,
                index: '',
                areaCode: cityList[i].areaCode,
                areaName: cityList[i].areaName
              }              
            }
          }
        }
        return obj
      },
      addAreaRow (){
        var obj = {
          sysAreaCodes: '',
          shippingCost: '',
          shippingLimitNum: '',
          shippingLimitCost: '',
          sysAreaNames: []
        }
        return obj
      },
      /**
       * initSelectedArea 根据用户已选area来初始化数据
       * @param  { Array } templateValueList 用户已保存的物流模板信息
       * @return {[type]}                   [description]
       */
      initSelectedArea (templateValueList, maps){
        var areaMaps = null
        var self = this
        if(templateValueList && templateValueList.length) {
          for(var i=0;i<templateValueList.length;i++) {
            if(templateValueList[i]['sysAreaCodes']) {
              var areaArr = []
              var arr = self.formartArr(templateValueList[i]['sysAreaCodes'])
              console.log('遍历过后的数据', templateValueList[i])
              for(var j=0;j<arr.length;j++) {
                var areaName = self.getAreaName(arr[j], maps)
                
                var obj = {
                  areaCode: arr[j],
                  index: i,
                  areaName: areaName
                }
                areaMaps = self.addSelectArea(areaName, i, maps)
                areaArr.push(obj.areaName)
              }
              templateValueList[i].sysAreaNames = areaArr
            }
          }
        }
        if(areaMaps) {
          self.citiesMap = areaMaps
        }else {
          self.citiesMap = maps
        }
        console.log('遍历过后的数据', areaMaps)
        
      },
      addSelectArea (areaName, index, maps){
        for(var obj in maps) {
          if(maps[obj].areaName == areaName) {
            maps[obj].checked = true
            maps[obj].index = index
          }
        }
        return maps;
      },
      getAreaName(code, maps){
        for(var obj in maps) {
          if(code == maps[obj].areaCode) {
            return maps[obj].areaName
          }
        }
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
            }
          })
      },
      /**
       * citySelectHandle 模板城市选择
       * @param  { Object } row 运费模板对象
       * @return {[type]}     [description]
       */
      citySelectHandle (row, index){
        this.dialogForm.checkedCities = row.sysAreaNames
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
            self.updateCityMap()
            self.dialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      updateCityMap (){
        let self = this
        let checkedCities = self.dialogForm.checkedCities
        let checkedCitiesIndex = self.checkedCitiesIndex
        let citiesMap = self.citiesMap
        self.ruleForm.templateValueList[checkedCitiesIndex].sysAreaNames = checkedCities

        if(checkedCities.length) {
          for(var i=0;i<checkedCities.length; i++) {
            self.addSelectArea(checkedCities[i], checkedCitiesIndex, citiesMap)
          }
        }else {
          this.resetCitiesMap(citiesMap)
        }
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
            self.saveTemplateData()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      saveTemplateData (){
        var templateValueList = this.ruleForm.templateValueList
        var citiesMap = this.citiesMap
        var obj = {};
        for(var i=0; i<templateValueList.length;i++) {
          if(templateValueList[i].sysAreaNames.length){
            var areaCodeArr = [] 
            for(var j=0; j<templateValueList[i].sysAreaNames.length; j++) {
              var areaObj = citiesMap[templateValueList[i].sysAreaNames[j]]
              if(areaObj){
                areaCodeArr.push(areaObj.areaCode)
              }
            }
            templateValueList[i].sysAreaCodes = areaCodeArr.join(',')
          }
        }


        var ruleForm = this.ruleForm

        saveStoreShippingTemplate(ruleForm).then((res)=>{

        })
        console.log('提交表单', this.ruleForm)
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