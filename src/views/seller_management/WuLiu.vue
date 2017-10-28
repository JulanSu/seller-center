<template>
  <div class="wuliu">
    <el-row class="block">
      <el-col :span="24">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="wuliu-form">
          <el-form-item label="物流模板" prop="template">
            <el-select v-model="ruleForm.template" placeholder="选择物流模板">
              <el-option label="新建模板" value="new"></el-option>
              <el-option label="货运模板" value="beijing"></el-option>
            </el-select>
            <el-button type="primary" @click="$router.push({psth: '/seller-management/wuliu'})" v-if="isEditorStatus">新建物流模板</el-button>
          </el-form-item>
          <el-form-item label="模板名称" prop="templateName">
            <el-input v-model="ruleForm.templateName" style="width: 398px;"></el-input>
          </el-form-item>
          <el-form-item label="配送自提" prop="type">
            <el-radio-group v-model="ruleForm.wuliuType" @change="peiSongHandle">
              <el-radio label="peisong">配送</el-radio>
              <el-radio label="ziti">自提</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="配送范围及运费" prop="title" v-if="ruleForm.wuliuType == 'peisong'">
            <p class="desc">请编辑可送达的地区，当用户选择下述地区以外的配送地址时，将提示用户无法下单。</p>
            <div class="area">
              <ul>
                <li v-for="peisong in ruleForm.peisongArea">
                  <div class="area-item"><el-input v-model="peisong.city.join('、')" style="width:208px" placeholder="浙江、江苏、上海" @focus="citySelectHandle(peisong)"></el-input></div>
                  <div class="area-item">+运费</div>
                  <div class="area-item"><el-input v-model="peisong.price" style="width:80px" placeholder=""></el-input></div>
                  <div class="area-item">元/件，满</div>
                  <div class="area-item"><el-input v-model="peisong.count" style="width:80px" placeholder=""></el-input></div>
                  <div class="area-item">件</div>
                  <div class="area-item"><el-input v-model="peisong.cprice" style="width:80px" placeholder=""></el-input></div>
                  <div class="area-item">元</div>
                </li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item label="自提描述" prop="title" v-if="ruleForm.wuliuType == 'ziti'">
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
            <el-checkbox-group v-model="dialogForm.checkedCities">
              <ul class="area-wrap">
                <li v-for="city in cities"><el-checkbox :label="city" :key="city">{{city}}</el-checkbox></li>
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
  const win = window;
  const storeId = win.storeInfo && win.storeInfo.storeId ? win.storeInfo.storeId : ''
  const cityOptions = ['全国', '杭州市','宁波市','温州市']
  export default {
    components: { CitySelection },
    data() {
      return {
        storeId: storeId,
        cities:cityOptions,
        dialogForm: {
          checkedCities: []
        },
        curRow: {},
        isIndeterminate: false,
        isEditorStatus: false,
        dialogVisible: false,
        showPeiSongTemp: false,
        showZiTiTemp: false,
        ruleForm: {
          template: '',
          templateName: '',
          wuliuType: 'peisong',
          textarea:'dadadada',
          peisongArea: [
          {city: [], price: 12323, count: 222, cprice: 333},
          {city: [], price: 12323, count: 222, cprice: 333}]
        },
        rules: {
          templateName: [{
            required: true, message: '请输入模板名称', trigger: 'blur'
          }]
        },
        dialogFormRules: {
          checkedCities:[{
            required: true,
            message: '请选择城市'
          }]
        }
      }
    },
    mounted () {

      this.getNewestTemplateData(this.storeId)
      console.log(this.$route)
    },
    methods: {
      getNewestTemplateData (storeId){

        getNewestTemplate({
          storeId: storeId
        }).then((res)=>{
          console.log('获取模板内容', res)
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
      citySelectHandle (row){
        this.curRow = row;
        if(!this.dialogForm.checkedCities.length) {
          this.dialogForm.checkedCities = row.city 
        }else {

        }
        
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
            console.log(self.dialogForm.checkedCities)
            self.curRow.city =  self.dialogForm.checkedCities
            self.dialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });

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