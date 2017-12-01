<template>
  <div class="goods-form" style="height: 1200px">
    <category-bar title="商品创建"></category-bar>
    <template v-if="initForm.finished">
      <el-row>
         <el-col :md="24" :lg="16">
      <el-form :model="goodsForm" :rules="goodsFormRules" ref="goodsForm" label-width="120px">
        <el-form-item label="当前类目" prop="cate">
          {{initForm.productCateName}}
        </el-form-item>

        <el-form-item label="选择品牌" prop="brandId" v-if="storeType == 1">
          <brand-select v-model="goodsForm.brandId" :brandDTOList="initForm.brandDTOList"></brand-select>
        </el-form-item>

        <el-form-item label="商品名称" prop="productTitle">
          <el-input v-model="goodsForm.productTitle" placeholder="商品名称"><template slot="append"><span :class="['error', titleRulesClass]">{{initForm.productTitleRules.curLen}}</span>/20</template></el-input>
        </el-form-item>

        <el-form-item label="商品卖点" prop="sellingPoint">
          <el-input v-model="goodsForm.sellingPoint" placeholder="商品卖点"><template slot="append"><span :class="['error', sellingPointRulesClass]">{{initForm.sellingPointRules.curLen}}</span>/100</template></el-input>
        </el-form-item>

        <el-form-item label="类目属性" prop="catePropertyList" v-if="initForm.productCateProperty.length">
          <cate-property ref="subjectchildMethod"  v-model="goodsForm.catePropertyList"  :catePropertyData="initForm.productCateProperty" @onUploadStatus="uploadStatusHandle"></cate-property>
        </el-form-item> 

        <el-form-item label="商品规格">
          <product-sku-options 
          v-if="initForm.productSkuProperty.length" 
          :editorStatus="editorStatus"
          :skuData="initForm.productSkuProperty"></product-sku-options>
        </el-form-item>

        <el-form-item label="商品销售规格" style="margin-bottom: 30px;" prop="productSkuTable" class="sellFormat-sku">
          <product-sku-table 
          v-model="goodsForm.productSkuTable" 
          :skuTableData="initForm.productSkuTable" 
          :productSkuProperty="initForm.productSkuProperty"
          @updateSkuTableError="updateSkuTableError"
          @updateSkuQuantity="updateSkuQuantity"></product-sku-table>
        </el-form-item>
        <el-form-item label="展示价格及库存" prop="productSellPrice" class="sellFormat-sku">
          <product-sell-price 
            v-model="goodsForm.productSellPrice"
            :skuQuantity="initForm.productSkuQuantity" 
            @change="changeProductSellPrice"></product-sell-price>
        </el-form-item>
        <el-form-item label="商品图片" prop="productPicUrlList" class="sellFormat-sku update-img">
          <upload-pictures v-model="goodsForm.productPicUrlList" :note="initForm.uploadTishi1" @change="uploadHandle"></upload-pictures>
        </el-form-item>
        <el-form-item label="商品描述" prop="detailsContent" class="sellFormat-sku">
         <goods-summernote v-model="goodsForm.detailsContent" @change="contentChangehandle"></goods-summernote>
        </el-form-item>

        <el-form-item label="服务范围" prop="serviceArea">
          <city-site-list :citySiteList="initForm.citySiteList" v-model="goodsForm.serviceArea" @change="upSysAreaHandle"></city-site-list>
        </el-form-item>

        <el-form-item label="店铺中分类" prop="storeCateList" v-if="initForm.storeCateList && initForm.storeCateList.length">
          <store-cate v-model="goodsForm.storeCateProduct" :storeCateList="initForm.storeCateList"></store-cate>
        </el-form-item>
        
        <div class="logistics-info logistics-block" v-if="goodsForm.productType == 2 || goodsForm.productType == 3 || goodsForm.productType == 4">
          <category-bar title="宝贝物流服务"></category-bar>
          <el-form-item label="提取方式">
            <el-checkbox checked="checked" disabled>电子交易凭证</el-checkbox>
          </el-form-item>
          <el-form-item label="适用店铺" prop="applicableShop" :rules="[{required: true, message: '请填自提时的适用店铺！', trigger: 'change,blur'}]">
            <el-input
              type="textarea"
              v-model="goodsForm.applicableShop"
              :rows="3"
              placeholder="最多只能输入200个文字"
               :maxlength="200" @change="validApplicableShopField">
            </el-input>
          </el-form-item>
        </div>
        <div class="logistics-info logistics-block" v-if="goodsForm.productType == 1">
          <category-bar title="商品物流服务"></category-bar>
        <div class="logistics-wrap">
            <template v-if="!initForm.storeShippingTemplate.data">
              <el-form-item label="物流模板" prop="shippingTemplateId">
                <p class="desc" style="color:#999">你还没有创建物流模板，请先新建物流模板。</p>
                <el-button type="primary" @click="createLogisticsTemplate">新建物流模板</el-button>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item label="物流模板" prop="shippingTemplateId">
                <el-select v-model="goodsForm.shippingTemplateId" placeholder="选择物流模板" @change="selectChange">
                  <template v-if="initForm.storeShippingTemplate.data && initForm.storeShippingTemplate.data.length" v-for="item in initForm.storeShippingTemplate.data">
                    <el-option :label="item.templateName" :value="item.storeShippingTemplateId"></el-option>
                  </template>
                </el-select>
              </el-form-item>
              <template v-if="goodsForm.shippingTemplateId">
                <el-form-item label="配送自提">
                  <span v-if="template.templateType == 0">配送</span>
                  <div v-else-if="template.templateType == 1">
                    <div>自提</div>
                  </div>
                </el-form-item>
                <el-form-item label="配送范围及运费" v-if="template.templateType == 0">
                  <div class="area-list">
                    <div class="area-list-wrap" v-if="template.templateValueList.length" v-for="item in template.templateValueList">
                        <div class="area-item"><el-input style="width:208px" :value="item.sysAreaNames.join(',')" disabled></el-input></div>
                        <div class="area-item">+运费</div>
                        <div class="area-item"><el-input disabled :value="item.shippingCost" style="width:80px" placeholder=""></el-input></div>
                        <div class="area-item">元/件，满</div>
                        <div class="area-item"><el-input disabled :value="item.shippingLimitNum" style="width:80px" placeholder=""></el-input></div>
                        <div class="area-item">件</div>
                        <div class="area-item"><el-input disabled :value="item.shippingLimitCost" style="width:80px" placeholder=""></el-input></div>
                        <div class="area-item">元</div>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item 
                label="适用店铺" 
                :class="!applicableShopStatus ? 'is-error' : ''" 
                v-else 
                prop="applicableShop" 
                id="applicableShop">
                  <el-input
                    type="textarea"
                    :rows="3"
                    required
                    placeholder="最多只能输入200个文字"
                    v-model="goodsForm.applicableShop" @keydown="validApplicableShopField" @blur="validApplicableShopField" :maxlength="200">
                  </el-input>
                  <div class="el-form-item__error" v-if="!applicableShopStatus">适用店铺不能为空！</div>
                </el-form-item>
              </template>
          </template>
        </div>

        </div>
        <div class="other-info">
          <category-bar title="其他信息"></category-bar> 
          <el-form-item label="上架时间" prop="publishTime" >
            <publish-time v-model="goodsForm.publishTime"></publish-time>
          </el-form-item>
          <el-form-item label="是否推荐" prop="productRecommend">
            <el-radio-group v-model="goodsForm.productRecommend">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('goodsForm', 1)" :loading="submitLoading">保存</el-button>
          <template v-if="!$route.query.productStatus || $route.query.productStatus != 1">
            <!-- <el-button @click="submitForm('goodsForm', 0)" :loading="draftboxLoading">放入草稿箱</el-button> -->
          <el-button @click="putRecycleBin('goodsForm')" :loading="draftboxLoading">放入草稿箱</el-button>
          </template>
          <!-- <el-button @click="resetForm('goodsForm')">重置</el-button> -->
        </el-form-item>

      </el-form>
      </el-col>
      </el-row>
    </template>

  </div>
</template>
<script>

  import CategoryBar from '@/components/CategoryBar.vue'
  import CateProperty from './goods_form/CateProperty.vue'
  import ProductSkuOptions from './goods_form/ProductSkuOptions.vue'
  import ProductSkuTable from './goods_form/ProductSkuTable.vue'
  import PublishTime from './goods_form/PublishTime.vue'
  import CitySiteList from './goods_form/CitySiteList.vue'
  import StoreCate from './goods_form/StoreCate.vue'
  import BrandSelect from './goods_form/BrandSelect.vue'
  import LogisticsServices from './goods_form/LogisticsServices.vue'
  import ProductSellPrice from './goods_form/ProductSellPrice.vue'
  import VueQuillEditor from 'vue-quill-editor'
  import { getStrLength } from '@/util/validator'
  import UploadPictures from './components/UploadPictures.vue'/*上传图片组件*/
  import GoodsSummernote from './components/summernote.vue'
  import { getGoodsFormData, saveGoodsFormData} from '@/api/seller'
  import { validInputIsNumber, validInputIsFloat } from '@/util/validator'
  import merge from 'merge'
  // import schema from 'async-validator'
  const win = window;
  const storeId = win.config && win.config.storeId ? win.config.storeId : ''
  const storeType = win.config && win.config.storeType ? win.config.storeType : ''

  export default {
    name: 'GoodsForm',
    componentName: 'GoodsForm',
    components: {
      GoodsSummernote,
      CategoryBar, 
      VueQuillEditor, 
      CateProperty,
      LogisticsServices,
      ProductSkuOptions,
      ProductSkuTable,
      CitySiteList,
      PublishTime,
      StoreCate,
      BrandSelect,
      UploadPictures,
      ProductSellPrice
    },
    data() {
      var validatorStrLength = (rule, value, callback) => {
        var len = getStrLength(value)
        if(!value){
            callback(new Error('请填写商品名称'))
        }else if(len.length>20){
            callback(new Error('商品名称最多不超过20个'))
        }else {
          callback()
        }
      }
      return {
        editorStatus: false,
        //物流模板
        template: {
          templateValueList: [{
            sysAreaCodes: '',
            shippingCost: '',
            shippingLimitNum: '',
            shippingLimitCost: '',
            sysAreaNames: []
          }],//运费模板列表
          storeId: '',  //店铺ID
          templateName: '', //模板名称
          storeShippingTemplateId: '',//运费模板ID
          templateType: 0
        },
        applicableShopStatus: false,
        storeType: storeType,
        editorProductStatus: '',
        submitLoading: false,
        draftboxLoading: false,
        catePropertyValidStatus: false,
        //表单提交所需要的数据结构
        goodsForm: {
          storeCateProduct: [],
          applicableShop: '',
          productId: null, //商品ID 10000061
          //productCateName: '',
          productCateId: '', //类目ID
          brandId: '', //品牌ID
          storeId: storeId, //店铺ID
          productTitle: '', //商品名称
          sellingPoint: '', //商品卖点
         //storeCateList: [],//店铺中分类
          productVersionId: null,
          catePropertyList: [], //类目属性列表
          productType: '', //商品类型
          productPicUrlList: [], //商品图片列表 链接LIST
          productSkuTable: [], //商品销售规格
          detailsContent: '', //富文本
          serviceArea: '', //服务范围 逗号隔开
          shippingTemplateId: '', //物流模板ID
          publishTime: 'productPublishedOnTime', //上架时间
          productRecommend: 0, //是否推荐
          productStatus: '', //提交状态
          productSellPrice: '', //展示价格及库存的价格
        },
        //初始化表单时数据结构
        initForm: {
          uploadTishi1:"图片尺寸：190*48 ,最多9张，格式要求jpg,jpeg,png,不超过10MB，图片可拖动排序。",
          productCateName: '',
          publishTimeType: '',
          citySiteList:[], 
          storeShippingTemplate: {},
          brandDTOList: [],
          templateType: '',
          productTitleRules: {
            max: 20,
            curLen: 0
          },
          sellingPointRules: {
            max: 100,
            curLen: 0
          },
          productSkuLength: 0,
          productSkuQuantity: 0,
          storeCateList: [],
          //商品销售规格
          productSkuProperty: [] , 
          //商品规格
          productCateProperty: [],
          finished: false

        },
        //表单校验
        goodsFormRules: {
          brandId: [
            {required: true, message: '请选择品牌', trigger: 'blur, change'}
          ],
          //商品名称
          productTitle: [
            { required: true,validator: (rule, value, callback) => {
              var len = getStrLength(value)
              var productTitleRules = this.initForm.productTitleRules;
                if(!value){
                  callback(new Error('请填写商品名称'))
                }else if(len>20){
                  callback(new Error('商品名称字数最多不超过20'))
                }else {
                  callback()
                }
              productTitleRules.curLen = len
            }, trigger: 'blur, change' },
          ],
          //商品描述
          detailsContent: [
            { required: true, type: 'string', message: '请输入商品描述', trigger: 'blur, change'}
          ],
          // //商品卖点
          sellingPoint: [
            { validator: (rule, value, callback) => {
              var len = getStrLength(value)
              var sellingPointRules = this.initForm.sellingPointRules;
              if(len > 100){
                callback(new Error('商品卖点字数最多不超过100个'))
              }else {
                callback()
              }
              sellingPointRules.curLen = len
            }, trigger: 'blur, change' },
          ],

          //服务范围
          serviceArea: [
            {required: true, type: 'string', message: '请选择服务范围', trigger: 'change, blur' }
          ],
          //运费模板
          shippingTemplateId: [
            {required: true, type: 'string', message: '请选择物流模板', trigger: 'change, blur' }
          ],
          //商品图片列表
          productPicUrlList: [
            {required: true, type: 'array', message: '请上传商品图片', trigger: 'change, blur' }
          ],
          productSellPrice: [
            {required: true, validator: (rule, value, callback) => {

              if(!value){
                callback(new Error('展示价格不能为空！'))
              }else {
                if(!(/^\d+(\.\d{0,2})?$/.test(value))){
                  callback(new Error('展示价格只能输入整数且最多2位小数！'))
                }      
              }
              callback()
            }, trigger: 'change, blur' }
          ],

          // 上架时间
          publishTime: [
            {required: true, message: '请选择商品上架时间', trigger: 'change, blur' },
            // { validator: validatorTime}
          ],
          productSkuTable: [
            {required: true, validator: (rule, value, callback) => {
              var isFinished = true
              if(!value.length){
                callback(new Error('请先选择商品规格！'))
              }
              if(value.length){
                for(var i=0;i<value.length;i++) {
                  
                  if(!value[i].productPrice.length || !value[i].productSkuQuantity.toString().length){
                    callback(new Error('价格和库存不能为空！'))
                  }
                  if(value[i].productPrice) {
                    if(!(/^\d+(\.\d{0,2})?$/.test(value[i].productPrice))){
                      callback(new Error('价格只能输入整数且最多2位小数！'))
                    }
                  }
                  if(value[i].productSkuQuantity) {
                    if(!(/^\d+$/.test(value[i].productSkuQuantity))){
                      callback(new Error('库存只能为整数！'))
                    }
                  }
                }
              }
              callback()
            }, trigger: 'change'}
          ]
          // applicableShop: [
          //   {required: true, message: '请填自提时的适用店铺！', trigger: 'change,blur'}
          // ]
        }
      }
    },
    computed: {
      titleRulesClass: function(value){

        var productTitleRules = this.initForm.productTitleRules;
        return {
          'error-red':productTitleRules.curLen > productTitleRules.max
        }
      },
      sellingPointRulesClass: function(){
        var sellingPointRules = this.initForm.sellingPointRules;
        return {
          'error-red':sellingPointRules.curLen > sellingPointRules.max
        }
      }
    },
    created(){
      this.initFormData()
      
    },
    methods: {
      /**
       * putRecycleBin 放入草稿箱
       * @param  { String } str 表单对象名称
       * @return {[type]}     [description]
       */
      putRecycleBin(str){
        let self = this
        if(!self.goodsForm.productTitle) {
          self.$message({
            message: '填写标题后方可以放入草稿箱！',
            type: 'warning'
          });
          self.$refs.goodsForm.validateField('productTitle');
          return
        }
        self.goodsForm.productStatus = 0
        self.submitProductFormData(0)
      },
      validField(){
        var productType = this.goodsForm.productType
        var templateType = this.template.templateType
        if(productType == 1){
          if(!templateType) {
            this.applicableShopStatus = true
            return
          }
        }
        this.validApplicableShopField()
        
      },
      /**
       * validApplicableShopField 校验适配店铺的问题
       * @return {[type]} [description]
       */
      validApplicableShopField(){
        if(this.goodsForm.applicableShop != '') {
          this.applicableShopStatus = true
        }else {
          this.applicableShopStatus = false
        }
      },
      blurValidHandle(event, obj){
        var value = validInputIsNumber(event.target.value)
        obj.productSellPrice = value
        event.target.value = value
        this.$refs.goodsForm.validateField('productSellPrice')
      },
      validPriceHandle(){
        var regExp =  /^\d+\.?\d{0,2}/
        var value = event.target.value
        if(regExp.test(value)) {
          event.target.value = value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2')
        }else {
          event.target.value = ''
        }    
      },
      /**
       * createLogisticsTemplate 新建物流模板
       * @return {[type]} [description]
       */
      createLogisticsTemplate(){
        let self = this
        self.$confirm('新建物流模板将会离开当前操作，你是否需要离开？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$router.push({path: '/seller-management/logistics'})
        }).catch(() => {
        
        });
      },
      /**
       * changeTemplate 切换物流模板
       * @param  { String } tid 物流模板ID
       * @return {[type]}     [description]
       */
      changeTemplate(tid){
        let logisticsData = this.initForm.storeShippingTemplate
        if(logisticsData && logisticsData.data) {
          for(var i=0; i<logisticsData.data.length;i++) {
            if(tid == logisticsData.data[i].storeShippingTemplateId) {
              this.template = logisticsData.data[i]
            }
          }          
        }
      },
      /**
       * selectChange 切换物流模板事件回调函数
       * @param  { String } value 物流模板ID
       * @return {[type]}       [description]
       */
      selectChange(value){
        this.goodsForm.shippingTemplateId = value
        this.changeTemplate(value)
        if(!this.template.templateType) {
          this.applicableShopStatus = true
        }else {
          this.validField()
        }
      },
      logisticsTemplateType (value){
        this.initForm.templateType = value
      },
      publishTimeHandle (value){
        this.goodsForm.publishTime = value  
      },
      /**
       * initFormData 初始化表单数据（加载表单默认数据）
       * @param  { Object } route 路由查询信息
       * @return {[type]}       [description]
       */
      initFormData() {
        let self = this
        let route = this.$route
        let goodsForm = this.goodsForm
        let initForm = this.initForm
        //判断是否编辑页面，是否存在店铺ID，是否存在商品ID
        if(route.name == '编辑商品' && storeId && route.query.productId &&route.query.productStatus || route.query.productStatus == 0 || route.query.productStatus == -1){
          self.editorStatus = true
          self.getEditorFormdata(storeId, route.query.productId, route.query.productStatus)
          goodsForm.productId = route.query.productId
          return 
        }
        //判断是否存在类目ID
        if(route.name === '新建商品' && storeId && route.query.productCateId && route.query.productCateName) {
          self.getGoodsFormDataHandle(storeId, route.query.productCateId)

        }

      },

      /**
       * getEditorFormdata 获取编辑商品的数据
       * @param  { String } storeId   店铺ID
       * @param  { String } productId 商品ID
       * @param { String } productStatus 商品状态
       * @return {[type]}           [description]
       */
      getEditorFormdata(storeId, productId, productStatus){
        let self = this
        getGoodsFormData({
          storeId: storeId,
          productId: productId,
          productStatus: productStatus
        }).then((res) => {
          let data = res.data.data
          if(res.data.code === 0) {
           self.initForm = merge(self.initForm, data)
            self.formartEditorData(data)
          }
          self.validField()
          self.initForm.finished = true
        })

      },
      formartEditorData(data){
        let self = this
        let goodsForm = self.goodsForm
        let initForm = self.initForm
        // initForm.brandDTOList = data.brandDTOList
        // initForm.productSkuProperty = data.productSkuProperty
        // initForm.productCateProperty = data.productCateProperty
        goodsForm.productTitle = data.productTitle
        goodsForm.brandId = data.brandId
        goodsForm.productId = data.productId
        goodsForm.sellingPoint = data.sellingPoint
        goodsForm.productId = data.productId
        goodsForm.productRecommend = data.productRecommend
        goodsForm.serviceArea =  data.serviceArea
        goodsForm.publishTime = data.publishTime
        goodsForm.productSellPrice = data.productSellPrice
        goodsForm.productType = data.productType
        goodsForm.detailsContent = data.detailsContent
        goodsForm.productSkuTable = data.productSkuTable
        goodsForm.catePropertyList =data.catePropertyList
        goodsForm.productCateId = data.productCateId
        goodsForm.storeCateProduct = data.storeCateProduct
        goodsForm.productPicUrlList = data.productPicUrlList || []
        goodsForm.productVersionId = data.productVersionId
        goodsForm.shippingTemplateId = data.shippingTemplateId == 0 ? '' : data.shippingTemplateId
        initForm.storeShippingTemplate = data.storeShippingTemplate
        if(data.productType == 1) {
          if(data.shippingTemplateId){
            self.changeTemplate(data.shippingTemplateId)
          }          
        }
        goodsForm.applicableShop = data.applicableShop
        initForm.productSkuQuantity = self.getProductSkuQuantity(data.productSkuTable)

        setTimeout(function(){
          self.$refs.goodsForm.validateField('productTitle');
          self.$refs.goodsForm.validateField('sellingPoint');
        },100)
        
        // self.$refs.ruleForm.validate()
        //goodsForm.storeCateList = data.storeCateList  //店铺分类
      },
      getGoodsFormDataHandle (storeId, productCateId){
        let self = this
        let initForm = self.initForm
        let goodsForm = self.goodsForm
        getGoodsFormData({
          storeId: storeId,
          productCateId: productCateId
        }).then((res)=>{
          let data = res.data.data
          if(res.data.code === 0) {
            initForm = merge(initForm, data)
            goodsForm.productType = data.productType
            goodsForm.productId = data.productId
            goodsForm.productCateId = self.$route.query.productCateId
            goodsForm.shippingTemplateId = data.shippingTemplateId
            initForm.productCateName = self.$route.query.productCateName
            if(storeType != 1) {
              goodsForm.brandId = 0
            }

            initForm.finished = true
          }
          
        })
      },
      getProductSkuQuantity (data){
        var productSkuQuantity = 0
        if(data && data.length) {
          for(var i= 0; i<data.length; i++) {
            var number = parseInt(data[i].productSkuQuantity);
            if(number) {
              productSkuQuantity += number
            }
          }          
        }
        return productSkuQuantity
      },
      /**
       * submitForm 表单提交，提交时需要对表单校验
       * @param  { String } formName 表单名称
       * @return {[type]}          [description]
       */
      submitForm(formName, statusVal) {
        var self = this
        var goodsForm = self.goodsForm
        var initForm = self.initForm
        goodsForm.productStatus = statusVal
        if(initForm.productCateProperty && initForm.productCateProperty.length) {
          self.$refs.subjectchildMethod.submitForm();
        }else {
          self.catePropertyValidStatus = true
        }
        
        // console.log('表单提交', self.goodsForm, self.applicableShopStatus, self.catePropertyValidStatus)
        self.$refs[formName].validate((valid) => {
          if(!self.applicableShopStatus){
            return false;
          }
          if (valid && self.catePropertyValidStatus) {
            self.submitProductFormData(statusVal)
          } else {
            self.$message({
              message: '请检查必填项是否已填写完！',
              type: 'warning'
            });
            return false;
          }
        });
      },
      submitProductFormData(statusVal){
        var self = this;        
        if(statusVal == 1) {
          self.submitLoading = true
        }else if(statusVal == 0) {
          self.draftboxLoading = true
        }
        //表单提交
        saveGoodsFormData(self.goodsForm).then((res)=> {
          var data = res.data.data
           if(res.data.code == 0) {
             if(statusVal == 1) {
                self.submitLoading = true
                self.$router.push({path: '/seller-management/underreview'})
             }else if(statusVal == 0) {
                self.draftboxLoading = true
                self.$router.push({path: '/seller-management/draftbox'})
             }
           }else {
              self.$message({
                message: res.data.message,
                type: 'warning'
              });
              self.submitLoading = false
              self.draftboxLoading = false            
           }
        }).catch((res)=>{
          self.submitLoading = false
          self.draftboxLoading = false
        })
      },
      uploadStatusHandle(value){
        this.catePropertyValidStatus = value
      },
      updateSkuTableError(value){
        this.$refs.goodsForm.validateField('productSkuTable')
      },
      updateSkuQuantity(value){
        this.initForm.productSkuQuantity  = this.getProductSkuQuantity(value)
      },
      /**
       * changeProductSellPrice 商品展示价格校验，又子组件触发
       * @param  { String } value 商品展示价格
       * @return {[type]}       [description]
       */
      changeProductSellPrice(value) {
        this.$refs.goodsForm.validateField('productSellPrice');
      },
      upSysAreaHandle (value) {
        this.goodsForm.serviceArea = value
      },
      uploadHandle(value){
        this.$refs.goodsForm.validateField('productPicUrlList');
        
      },
      contentChangehandle(value){
        var self = this
        setTimeout(function(){
          self.$refs.goodsForm.validateField('detailsContent');
        },100)
      }
    }
  }
</script>
<style lang="scss">
  .el-upload-list--picture-card {
    .el-upload-list__item {
      border-radius: 0;
    }
  }
  .content-wrapper {
    padding-right: 20px;
  }
  .block-form {
    background:#f5f7fa;
    border:1px solid #eeeeee;
    padding: 10px 20px 10px;
  }
  .error.error-red {
    color: #f00
  }
  .product-sku {
    .el-form-item__label {
      float: none;
      display: inline-block;
      width: auto !important;
      margin-left: 0 !important;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .sellFormat-sku {
      th {
        text-align: center;
      }
      input {
        width: 100%;
        height: 35px;
        line-height: 35px;
        text-align: center;
       // border-width: 0;
        opacity: 1;
        background: border-box;
      //&:hover,
      //&:focus {
      // border: 0;
      //}
    }
    .cell {
      text-align: center;
    }
  }
  .modal-dialog {
    margin-top: 150px;
  }
  .note-editable {
    max-height: 100% !important;
  }
  .note-group-image-url {
    display: none;
  }

</style>