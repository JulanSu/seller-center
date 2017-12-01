<template>
  <div class="">
    <p class="desc">请编辑可送达的地区，当用户选择下述地区以外的配送地址时，将提示用户无法下单。</p>
    <div class="area-list">
      <div class="area-list-wrap">
        <div class="area-item" style="width: 218px"> 
          <el-checkbox-group v-model="entireCountryChecked" @change="entireCountryChangeHandle">
          <el-checkbox  label="全国">全国</el-checkbox>
        </el-checkbox-group>
        </div>
        <div class="area-item">+运费</div>
        <div class="area-item">
          <input class="el-input__inner" type="number"  v-model="entireCountry.shippingCost" name="" placeholder="" style="width:80px">
        </div>
        <div class="area-item">元/件，满</div>
        <div class="area-item">
          <input class="el-input__inner" type="number" v-model="entireCountry.shippingLimitNum" name="" placeholder="" style="width:80px">
        </div>
        <div class="area-item">件</div>
        <div class="area-item">
          <input class="el-input__inner" type="number" v-model="entireCountry.shippingLimitCost" name="" placeholder="" style="width:80px">
        </div>
        <div class="area-item">元</div>
      </div>
    </div>
    <div class="area-list">
      <div style="padding-left: 5px; color: #999">指定其它地区的运费：</div>
      <template v-for="(item, index) in templateValueList" v-if="item.sysAreaCodes != '000000'" >
        <div class="area-list-wrap">
          <div class="area-item"><el-input v-model="item.sysAreaNames.join(',')" style="width:208px" placeholder="浙江、江苏、上海"></el-input></div>
          <div class="area-item">+运费</div>
          <div class="area-item">
            <input class="el-input__inner" type="text" v-model="item.shippingCost" name="" placeholder="" style="width:80px">
          </div>
          <div class="area-item">元/件，满</div>
          <div class="area-item">
            <input type="text" class="el-input__inner" v-model="item.shippingLimitNum" name="" placeholder="" style="width:80px">
            
          </div>
          <div class="area-item">件</div>
          <div class="area-item">
            <input type="text" class="el-input__inner" v-model="item.shippingLimitCost" name="" placeholder="" style="width:80px">
          </div>
          <div class="area-item">元</div>
          <div class="area-item" v-if="index"><el-button type="text" @click="onDelHandle(item, index)">删除</el-button></div>
        </div>
      </template>
      <el-button type="text" @click="onAddHandle">增加</el-button>
    </div>
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

  export default {
    data() {
      return {
        citiesMap: {},
        dialogForm: {
          checkedCities: []
        },
        dialogFormRules: {
          checkedCities:[{
            required: false,
            message: '请选择城市'
          }]
        },
        dialogVisible: false,
        templateValueList: [{
          sysAreaCodes: '',
          shippingCost: '',
          shippingLimitNum: '',
          shippingLimitCost: '',
          sysAreaNames: []
        }],
        entireCountryChecked: false,
        citySite: [],
        entireCountry:{
          sysAreaCodes: '000000',
          shippingCost: '',
          shippingLimitNum: '',
          shippingLimitCost: '',
          sysAreaNames: ['全国']
        }
      }
    },
    props: {
      value:[Array,Object],
      areaList: [Array],
      templateType: {
        type: Number
      }
    },
    watch: {
      value(newVal, oldVal){
        this.templateValueList = newVal
        this.renderView(newVal)
      }
    },
    created (){
      this.renderView(this.value)
      
    },
    methods: {
      createAreaMpas(areaList){
        var newArea = areaList.concat()
        var citiesMap = this.createCityMap(newArea) 
        return citiesMap
      },
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
      /**
       * onDialogCancelHandle 弹窗关闭时的响应事件，重置表单
       * @param  {[type]} formName [description]
       * @return {[type]}          [description]
       */
      onDialogCancelHandle (formName){
        this.$refs[formName].resetFields();
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
      onAddHandle (){
        var self = this
        self.templateValueList.push(self.defaultTemplate())
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

        self.templateValueList.splice(index, 1)
      },
      renderView(val){
        let self = this
        let entireCountryChecked = false
        if(val && val.length) {
          for(let i = 0; i<val.length; i++) {
            if(val[i].sysAreaCodes == '000000') {
              self.entireCountry = val[i]
              entireCountryChecked = true
              break
            }
          }
        }
        if(!entireCountryChecked) {
          self.entireCountry = {
            sysAreaCodes: '000000',
            shippingCost: '',
            shippingLimitNum: '',
            shippingLimitCost: '',
            sysAreaNames: ['全国']
          }
        }
        self.entireCountryChecked = entireCountryChecked
      },
      // inputChangeHandle(event, value){
      //   let reg = /^[1-9]\d*$/;
      //   event.target.value = value.replace(/\D/g,'')
      // }, 
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
    }
  }
</script>

<style lang="scss">
  .area-list {

  }
</style>