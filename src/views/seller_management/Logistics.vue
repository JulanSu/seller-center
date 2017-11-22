<template>
  <div class="logistics-block">
    <loading-mask v-if="!isRenderFinished"></loading-mask>
    <el-row>
      <el-col :span="24">
        <el-form :model="logisticsForm" :rules="logisticsRules" ref="logisticsForm" label-width="120px" class="logistics-form">
          <el-form-item label="物流模板" prop="storeShippingTemplateId">
            <el-select v-model="defaultTemplateId" @change="changeTemplateHandle" placeholder="选择物流模板">
              <el-option label="新建物流模板" value="-1"></el-option>
              <template v-if="templateList.length">
                <el-option v-for="item in templateList" :label="item.templateName" :key="item.templateName" :value="item.storeShippingTemplateId">{{item.templateName}}</el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="logisticsForm.templateName" :maxlength="20" style="width: 398px;"></el-input>
          </el-form-item>
          <el-form-item label="配送自提" prop="templateType">
            <el-radio-group v-model.number="logisticsForm.templateType">
              <el-radio :label="0">配送</el-radio>
              <el-radio :label="1">自提</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="配送范围及运费" prop="templateValueList" v-if="logisticsForm.templateType == 0">
            <p class="desc">请编辑可送达的地区，当用户选择下述地区以外的配送地址时，将提示用户无法下单。</p>
            <template v-for="(item, index) in logisticsForm.templateValueList">
            <div class="area-list" v-if="item.sysAreaCodes == '000000'">
<!--                 <div style="padding-left: 5px; color: #999">指定地区的运费：</div> -->
                <div class="area-list-wrap">
                  <div class="area-item" style="width: 218px"> 
                    <el-checkbox-group v-model="entireCountryChecked" @change="entireCountryChangeHandle">
                    <el-checkbox  label="全国">全国</el-checkbox>
                  </el-checkbox-group>
                  </div>
                  <div class="area-item">+运费</div>
                  <div class="area-item">
                    <input class="el-input__inner" type="number" v-model="item.shippingCost" name="" placeholder="" style="width:80px">
                  </div>
                  <div class="area-item">元/件，满</div>
                  <div class="area-item">
                    <input type="number" class="el-input__inner" v-model="item.shippingLimitNum" name="" placeholder="" style="width:80px">
                    
                  </div>
                  <div class="area-item">件</div>
                  <div class="area-item">
                    <input type="number" class="el-input__inner" v-model="item.shippingLimitCost" name="" placeholder="" style="width:80px">
                  </div>
                  <div class="area-item">元</div>
                </div>
            </div>
          </template>
          
            <div class="area-list">
              <div style="padding-left: 5px; color: #999">指定其它地区的运费：</div>
              <template v-for="(item, index) in logisticsForm.templateValueList">
                <div class="area-list-wrap"  v-if="item.sysAreaCodes != '000000'">
                  <div class="area-item"><el-input v-model="item.sysAreaNames.join(',')" style="width:208px" placeholder="浙江、江苏、上海" @focus="citySelectHandle(item, index)"></el-input></div>
                  <div class="area-item">+运费</div>
                  <div class="area-item">
                    <input class="el-input__inner" type="number" v-model="item.shippingCost" name="" placeholder="" style="width:80px">
                  </div>
                  <div class="area-item">元/件，满</div>
                  <div class="area-item">
                    <input type="number" class="el-input__inner" v-model="item.shippingLimitNum" name="" placeholder="" style="width:80px">
                  </div>
                  <div class="area-item">件</div>
                  <div class="area-item">
                    <input type="number" class="el-input__inner" v-model="item.shippingLimitCost" name="" placeholder="" style="width:80px">
                  </div>
                  <div class="area-item">元</div>
                  <div class="area-item" v-if="isAddDelBtn(logisticsForm.templateValueList, index)"><el-button type="text" @click="onDelHandle(item, index)">删除</el-button></div>
                </div>
                </template>
                <el-button type="text" @click="onAddHandle">增加</el-button>
            </div>
            
            
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('logisticsForm')" :loading="submitLoading">保存</el-button>
            <el-button @click="resetForm('logisticsForm')">取消</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog
      title="选择区域"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      size="small" @close="resetForm('dialogForm')">
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
  import { mapGetters } from 'vuex';
  import { getNewestTemplate, saveStoreShippingTemplate } from '@/api/seller'
  import LogisticsPrice from './logistics_template/LogisticsPrice.vue'
  export default {
    components:{
      LogisticsPrice
    },
    data (){
      return {
        checkedCitiesIndex: '',
        dialogVisible: false,
        entireCountryChecked: false,
        isRenderFinished: false,
        areaList: [],
        citiesMap: {},
        templateList: [],
        submitLoading: false,
        defaultTemplateId: '',
        templateType: 0,
        dialogForm: {
          checkedCities: []
        },
        dialogFormRules: {
          checkedCities:[{
            required: false,
            message: '请选择城市'
          }]
        },
        logisticsForm: {
          templateName: '', //模板名称
          storeShippingTemplateId: '',//运费模板ID
          templateType: 0,
          templateValueList: []
        },
        //表单校验规则
        logisticsRules: {
          //检验书否存在模板名称
          templateName: [{
            required: true, message: '请输入模板名称', trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      ...mapGetters([
          'getStoreId'
        ])
    },
    created(){
      this.initTemplateHandle()
    },
    methods:{
      isAddDelBtn(data, index){
        let hasEntireCountry = false
        let result = false
        for(var i=0,dLen = data.length; i<dLen; i++) {
          if(data[i].sysAreaCodes == '000000') {
            hasEntireCountry = true
          }
        }

        if(hasEntireCountry) {
          if(index <= 1) {
            result = false
          }else {
            result = true
          }
        }else {

          if(index < 1) {
            result = false
          }else {
            result = true
          }
        }

        return result
      },
      entireCountryChangeHandle(value){
        const self = this
        const h = self.$createElement
        
        var VNode = h('div', null, [
            h('div', null, '请确保你的商品可以配送到全国 '),
            h('div',{style: 'margin-top: 10px'}, [
              h('span', {style: 'color: #f60'}, '此运费将作为'),
              h('span', null, '除指定地区外，其余地区的默认运费')
              ]
            )
          ])
        var content = '<div></div><div>此运费将作为<span>除指定地区外，其余地区的默认运费。</span></div>'
        if(value){
          self.$msgbox({
            title: '温情提示',
            message: VNode,
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                self.entireCountryChecked = true
              } else {
                self.entireCountryChecked = false

              }
              done();
            }
          })
        }
      },
      entireCountryTemplate(){
        let obj = new Object()
        obj.sysAreaCodes = '000000'
        obj.shippingCost = ''
        obj.shippingLimitNum = ''
        obj.shippingLimitCost = ''
        obj.sysAreaNames = ['全国']
        return obj
      },
      defaultTemplate(){
        var obj = {
          sysAreaCodes: '',
          shippingCost: '',
          shippingLimitNum: '',
          shippingLimitCost: '',
          sysAreaNames: []
        }
        return obj
      },
      onDelHandle (value, index) {
        var self = this
        if(value.sysAreaNames && value.sysAreaNames.length) {
          for(var i=0;i<value.sysAreaNames.length; i++) {
            if(value.sysAreaNames[i]){
              self.citiesMap[value.sysAreaNames[i]].checked=false
            }
          }          
        }
        self.logisticsForm.templateValueList.splice(index, 1)
      },
      /**
       * onAddHandle 增加行
       * @return {[type]} [description]
       */
      onAddHandle (){
        var self = this
        self.logisticsForm.templateValueList.push(self.defaultTemplate())
      },

      /**
       * changeTemplateHandle 切换物流模板
       * @param  { String } tid 物流模板ID
       * @return {[type]}     [description]
       */
      changeTemplateHandle(tid){
        
        if(tid != '-1') {
          let curTemplateData = this.getCurTemplateData(tid)
          let newTemplateValueList = this.getTemplateValueList(curTemplateData.templateValueList)

          curTemplateData.templateValueList = newTemplateValueList
          this.logisticsForm = curTemplateData 
        }else {
          this.entireCountryChecked = false
          this.logisticsForm = this.getDefautTemplate()
        }
        this.citiesMap = this.createAreaMpas(this.areaList)
        this.initSelectedArea(this.logisticsForm.templateValueList, this.citiesMap)
      },

      getTemplateValueList(data){
        var hasEntireCountry = false
        var self = this
        if(data && data.length) {
          for(var j=0; j < data.length; j++) {
            if(data[j].sysAreaCodes == '000000') {
              hasEntireCountry = true
              self.entireCountryChecked = true
            }
          }
          if(!hasEntireCountry) {
            data.unshift(self.entireCountryTemplate())
            self.entireCountryChecked = false
          }else if(data.length == 1) {
            data.push(self.defaultTemplate())
          }
        }else {
          data = [self.entireCountryTemplate(), self.defaultTemplate()]
        }

        return data  
      },
      /**
       * getDefautTemplate 获取默认物流模板数据，用于新建
       * @return {[type]}         [description]
       */
      getDefautTemplate(){
        const temp = {
          templateValueList: [{
            sysAreaCodes: '',
            shippingCost: '',
            shippingLimitNum: '',
            shippingLimitCost: '',
            sysAreaNames: []
          },{
            sysAreaCodes: '000000',
            shippingCost: '',
            shippingLimitNum: '',
            shippingLimitCost: '',
            sysAreaNames: ['全国']
          }],//运费模板列表
          templateName: '', //模板名称
          storeShippingTemplateId: '-1',//运费模板ID
          templateType: 0
        }
        return temp
      },
      /**
       * getCurTemplateData 根据模板ID获取对应模板数据
       * @param  { String } tid 模板ID
       * @return { Object }     模板数据
       */
      getCurTemplateData(tid){
        let self = this
        let templateList = self.templateList
        let tData = null
        if(templateList.length){
          for(var i=0, tlen = templateList.length;i < tlen; i++) {
            if(tid == templateList[i].storeShippingTemplateId) {
              tData = templateList[i]
            }
          }
        }

        return tData
      },
      /**
       * initTemplateHandle 初始化物流模板视图
       * @return {[type]} [description]
       */
      initTemplateHandle(){
        const storeId = this.getStoreId
        let self = this
        this.getNewestTemplateList(storeId, function(res){
          //判断是否存在区域
          if(res.area && res.area.length) {
            self.areaList = res.area
            // self.citiesMap = self.createAreaMpas(self.areaList) 
          }
          //判断是否有模板列表
          if(res.data && res.data.length) {
            self.templateList = res.data 
            self.defaultTemplateId = res.data[0].storeShippingTemplateId
          }else {
            self.defaultTemplateId = '-1'
          }

          self.isRenderFinished = true 
        })

      },
      createAreaMpas(areaList){
        var newArea = areaList.concat()
        var citiesMap = this.formartAreaMpas(newArea) 
        return citiesMap
      },
      /**
       * createCityMap 初始化area数据结构，用于记录用户所选择的area
       * @param  { Array } cityList area list
       * @return { Object }       area Object
       */
      formartAreaMpas (cityList){

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
       * getNewestTemplateData 根据店铺ID获取模板列表
       * @param  { String }   storeId  [description]
       * @param  {Function} callback [description]
       * @return {[type]}            [description]
       */
      getNewestTemplateList (storeId, callback){
        var self = this
          getNewestTemplate({
            storeId: storeId
          }).then((res)=>{

            if(res.data.code === 0) {
              callback(res.data.data)
            }
          })
      },
      /**
       * submitForm 表单提交
       * @param  { String } formName 表单对象名称 logisticsRules
       * @return {[type]}          [description]
       */
      submitForm (formName){
        let self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.formartSubmitFormData()
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submitFormData(data){
        var self = this
        self.submitLoading = true
        saveStoreShippingTemplate(data).then((res)=>{
          if(res.data.code === 0) {
            self.submitLoading = false
            self.$message({
              message: '物流模板保存成功！',
              type: 'success'
            });
            window.location.href = window.location.href 
            //self.initTemplateHandle()
          }else {
            self.$message({
              message: '物流模板保存失败，请重新尝试。',
              type: 'warning'
            });  
            self.submitLoading = true          
          }
        })
      },
      formartSubmitFormData(){
        let self = this
        let templateValueList = self.formartTemplateValueList()
        if(!self.logisticsForm.templateType && !templateValueList.length) {
            self.$message({
              message: '最少填写一条配送范围及价格！',
              type: 'warning'
            });
            return 
        }
        let tData = self.formartSaveData(templateValueList)
        console.log('提交物流模板数据', tData)
        self.submitFormData(tData)
      },
      /**
       * formartTemplateValueList 去除没有完整数据(配送范围及运费)的序列
       * @return {[type]} [description]
       */
      formartTemplateValueList(){
        let templateData = this.logisticsForm
        let templateValueList = templateData.templateValueList
        let newList = []

        if(templateValueList && templateValueList.length) {
          for(var i=0; i<templateValueList.length;i++) {
            var isData = false
            for(var item in templateValueList[i]) {
              // if(item == '')
              if(!templateValueList[i][item]) {
                isData = true
              }
            }
            if(!isData) {
              newList.push(templateValueList[i])
            }
          }
        }
        return newList
      },
      /**
       * formartSaveData 获取店铺ID及完整配送数据
       * @param  {[type]} tList [description]
       * @return {[type]}       [description]
       */
      formartSaveData(tList){
        let json = JSON.stringify(this.logisticsForm)
        let templateData = JSON.parse(json)
        if(templateData.templateType) {
          templateData.templateValueList = []
        }else {
          templateData.templateValueList = tList
        }
        templateData.storeId = this.getStoreId
        return templateData
      },
      /**
       * resetForm 重置表单
       * @param  { String } formName 表单对象名称
       * @return {[type]}          [description]
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      updateCityMap (){
        let self = this
        let citiesMap = self.citiesMap
        let checkedCities = self.dialogForm.checkedCities
        let checkedCitiesIndex = self.checkedCitiesIndex
        let sysAreaCodes = []
        
        self.delSelectedArea(checkedCitiesIndex, citiesMap)
        if(checkedCities.length) {
          for(var i=0;i<checkedCities.length; i++) {
            sysAreaCodes.push(self.updateSysAreaCodes(checkedCities[i]))
            self.addSelectArea(checkedCities[i], checkedCitiesIndex, citiesMap)
          }
        } else {
          this.resetCitiesMap(citiesMap)
        }
        self.logisticsForm.templateValueList[checkedCitiesIndex].sysAreaNames = checkedCities
        self.logisticsForm.templateValueList[checkedCitiesIndex].sysAreaCodes = sysAreaCodes.join(',')
      },
      updateSysAreaCodes(checkedCities){
        let self = this
        let citiesMap = self.citiesMap
        for (var obj in citiesMap){
          if(citiesMap[obj].areaName == checkedCities) {
            return citiesMap[obj].areaCode
            break
          }
        }        
      },
      resetCitiesMap(citiesMap){
        for (var obj in citiesMap){
          citiesMap[obj]['checked'] = false
          citiesMap[obj]['index'] = ''
        }
      },
      delSelectedArea(index, maps) {
        for(var obj in maps) {
          if(maps[obj].index == index) {
            maps[obj].checked = false
            maps[obj].index = index
          }
        }        
      },
      /**
       * addSelectArea 向Map里增加用户已选择的区域
       * @param { String } areaName 区域名称
       * @param { Number } index    所选地区项的Index
       * @param { Object } maps     更改后的Map
       */
      addSelectArea (areaName, index, maps){
        for(var obj in maps) {
          if(maps[obj].areaName == areaName) {
            maps[obj].checked = true
            maps[obj].index = index
          }
        }
        return maps;
      },
    }
  }
</script>

<style lang="scss">
  .logistics-block {

  }
</style>