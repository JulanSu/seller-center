<template>
  <div class="goods-form">
    <template v-if="initForm.finished">
      <el-form :model="goodsForm" :rules="goodsFormRules" ref="goodsForm" label-width="120px">
        <el-form-item label="当前类目" prop="cate">
          {{initForm.productCateName}}
        </el-form-item>

        <el-form-item label="选择品牌" prop="brandId" v-if="storeType == 1">
          <brand-select v-if="initForm.brandDTOList.length" v-model="goodsForm.brandId" :brandDTOList="initForm.brandDTOList"></brand-select>
        </el-form-item>

        <el-form-item label="商品标题" prop="productTitle">
          <el-input v-model="goodsForm.productTitle" placeholder="商品标题"><template slot="append"><span :class="['error', titleRulesClass]">{{initForm.productTitleRules.curLen}}</span>/25</template></el-input>
        </el-form-item>

        <el-form-item label="商品卖点" prop="sellingPoint">
          <el-input v-model="goodsForm.sellingPoint" placeholder="商品卖点"><template slot="append"><span :class="['error', sellingPointRulesClass]">{{initForm.sellingPointRules.curLen}}</span>/50</template></el-input>
        </el-form-item>

      <el-form-item label="类目属性" prop="productCateProperty">
        <cate-property v-if="initForm.productCateProperty.length" :catePropertyData="initForm.productCateProperty" @updateCatePropertyGroupList="updateCatePropertyGroupList"></cate-property>
      </el-form-item> 

      <el-form-item label="商品规格" prop="catePropertyList">
        <product-sku v-if="initForm.productSkuProperty.length" :skuData="initForm.productSkuProperty" @updateProductSkuProperty="updateProductSkuProperty"></product-sku>
      </el-form-item>

        <el-form-item label="商品销售规格" prop="productSkuTable" class="sellFormat-sku">
            <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
              <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width:100%">
                    <thead>
                      <tr>
                        <template v-for="productCate in initForm.productSkuProperty">
                          <th colspan="1" rowspan="1" class="is-leaf">
                            <div class="cell">{{productCate.catePropertyName}}</div>
                          </th>
                        </template>
                        <th colspan="1" rowspan="1" class="is-leaf">
                          <div class="cell">价格</div>
                        </th>
                        <th colspan="1" rowspan="1" class="is-leaf">
                          <div class="cell">库存</div>
                        </th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div class="el-table__body-wrapper">
                  <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%">
                    <tbody>
                      <template v-if="goodsForm.productSkuTable.length" v-for="productSku in goodsForm.productSkuTable">
                          <tr class="el-table__row">

                              <td v-for="item in productSku.data">
                                <div class="cell">{{item.value}}</div>
                              </td>
                            <td>
                              <div class="cell">
                                <input class="" v-model="productSku.productPrice" @keyup="initForm.productSkuQuantity = productSkuHandle(goodsForm.productSkuTable)" /></div>
                            </td>
                            <td>
                              <div class="cell">
                                <input class="" v-model="productSku.productSkuQuantity" @keyup=" initForm.productSkuQuantity = productSkuHandle(goodsForm.productSkuTable)" />
                              </div>
                            </td>
                          </tr>
                      </template>
                    </tbody>
                  </table><!---->
                </div><!----><!----><!----><!---->

          </div>   
        </el-form-item>

        <el-form-item label="展示价格及库存" prop="productSellPrice" class="sellFormat-sku">
          <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
              <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width:100%">
                  <thead>
                    <tr>
                      <th colspan="1" rowspan="1" class="is-leaf">
                        <div class="cell">价格（元）</div>
                      </th>
                      <th colspan="1" rowspan="1" class="is-leaf">
                        <div class="cell">总数量</div>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="el-table__body-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%">
                  <tbody>
                      <tr class="el-table__row">
                        <td >
                          <div class="cell">
                            <input class="" v-model.number="goodsForm.productSellPrice" type="number" />
                          </div>
                        </td>
                        <td>
                          <div class="cell" v-if="initForm.productSkuQuantity">
                            {{initForm.productSkuQuantity}}
                          </div>
                        </td>
                      </tr>
                  </tbody>
                </table><!---->
              </div><!----><!----><!----><!---->
          </div> 
        </el-form-item>
        <el-form-item label="商品图片" prop="productPicUrlList" class="sellFormat-sku update-img">
        <upload-pictures v-model="goodsForm.productPicUrlList" :note="initForm.uploadTishi1"></upload-pictures>
        </el-form-item>

        <el-form-item label="商品描述" prop="detailsContent" class="sellFormat-sku">
<!--           <el-input
            type="textarea"
            :rows="2"
            placeholder="暂用文本域替代富文本（富文本编辑器存在问题，会影响流程）"
            v-model="goodsForm.detailsContent">
          </el-input> -->
         <!-- <vue-summernote ref="editer" @onChange="onChange"></vue-summernote> -->
         <goods-summernote v-model="goodsForm.detailsContent"></goods-summernote>
        </el-form-item>

        <el-form-item label="服务范围" prop="serviceArea">
          <city-site-list :citySiteList="initForm.citySiteList" v-model="goodsForm.serviceArea" @change="upSysAreaHandle"></city-site-list>
        </el-form-item>

        <el-form-item label="店铺中分类" prop="storeCateList" v-if="initForm.storeCateList && initForm.storeCateList.length">
          <store-cate v-model="goodsForm.storeCateProduct" :storeCateList="initForm.storeCateList"></store-cate>
        </el-form-item>
        
        <div class="logistics-info wuliu" prop="shippingTemplateId" v-if="goodsForm.productType == 2 || goodsForm.productType == 3">
          <category-bar title="宝贝物流服务"></category-bar>
          <el-form-item label="提取方式">
            <el-checkbox checked="checked" disabled>电子交易凭证</el-checkbox>
          </el-form-item>
        </div>
        <div class="logistics-info wuliu" prop="shippingTemplateId" v-if="goodsForm.productType == 1">
          <category-bar title="商品物流服务"></category-bar>
          <logistics-services v-model="goodsForm.shippingTemplateId" :logisticsData="initForm.storeShippingTemplate.data"></logistics-services>
<!--           <p class="desc" v-else>
            你还未创建物流模板，请先创建物流模板后再选择噢。
          </p> -->
          
        </div>
        <div class="other-info">
          <category-bar title="其他信息"></category-bar> 
          <el-form-item label="上架时间" prop="publishTimeType" >
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
          <template v-if="this.$route.query.productStatus && this.$route.query.productStatus == 1">
          <el-button type="primary" @click="submitForm('goodsForm', 0)" :loading="draftboxLoading">放入草稿箱</el-button>
          </template>
          <!-- <el-button @click="resetForm('goodsForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </template>
    <loading-mask v-else></loading-mask>
  </div>
</template>
<script>

  import CategoryBar from '@/components/CategoryBar.vue'
  import UpdateImg from './goods_form/UpdateImg.vue'
  import CateProperty from './goods_form/CateProperty.vue'
  import ProductSku from './goods_form/ProductSku.vue'
  import PublishTime from './goods_form/PublishTime.vue'
  import CitySiteList from './goods_form/CitySiteList.vue'
  import StoreCate from './goods_form/StoreCate.vue'
  import BrandSelect from './goods_form/BrandSelect.vue'
  import LogisticsServices from './goods_form/LogisticsServices.vue'
  import VueQuillEditor from 'vue-quill-editor'
  import { getStrLength } from '@/util/validator'
  import UploadPictures from './components/UploadPictures.vue'/*上传图片组件*/
  import GoodsSummernote from './components/summernote.vue'
  import { getGoodsFormData, saveGoodsFormData} from '@/api/seller'
  import merge from 'merge'
  const win = window;
  const storeId = win.config && win.config.storeId ? win.config.storeId : ''
  const storeType = win.config && win.config.storeType ? win.config.storeType : ''

  export default {
    components: {
      GoodsSummernote,
      CategoryBar, 
      VueQuillEditor, 
      UpdateImg, 
      CateProperty,
      LogisticsServices,
      ProductSku,
      CitySiteList,
      PublishTime,
      StoreCate,
      BrandSelect,
      UploadPictures
    },
    data() {
      var validatorStrLength = (rule, value, callback, fn) => {
        var len = getStrLength(value)
        fn(len)
      }

      return {
        storeType: storeType,
        editorProductStatus: '',
        submitLoading: false,
        draftboxLoading: false,
        //表单提交所需要的数据结构
        goodsForm: {
          storeCateProduct: [],
          productId: null, //商品ID 10000061
          //productCateName: '',
          productCateId: '', //类目ID
          brandId: '', //品牌ID
          storeId: storeId, //店铺ID
          productTitle: '', //商品标题
          sellingPoint: '', //商品卖点
         //storeCateList: [],//店铺中分类
          productVersionId: null,
          catePropertyList: [], //店铺中分类
          productType: '', //商品类型
          productPicUrlList: [], //商品图片列表 链接LIST
          productSkuTable: [], //商品销售规格
          detailsContent: 'dasdadasdadsadadasda', //富文本
          serviceArea: '', //服务范围 逗号隔开
          shippingTemplateId: '', //物流模板ID
          publishTime: '', //上架时间
          productRecommend: 0, //是否推荐
          productStatus: '', //提交状态
          productSellPrice: '', //展示价格及库存的价格
        },
        //初始化表单时数据结构
        initForm: {
          uploadTishi1:"图片尺寸：190*48 ,最多9张，格式要求jpg,jpeg,png,不超过10MB",
          productCateName: '',
          publishTimeType: '',
          citySiteList:[], 
          storeShippingTemplate: {},
          brandDTOList: [],
          productTitleRules: {
            max: 25,
            curLen: 0
          },
          sellingPointRules: {
            max: 50,
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
          brandName: [
            { required: true, message: '请选择品牌', trigger: 'blur' }
          ],
          productTitle: [
            { required: true, message: '请填写商品标题', trigger: ['change', 'blur'] },
            { max: 25, message: '商品标题最多不超过25个', trigger: ['change', 'blur'] },
            { validator: (rule, value, callback)=>{
              var productTitleRules = this.initForm.productTitleRules;
              validatorStrLength(rule, value, callback, function(len){
                productTitleRules.curLen = len
              })
            }, message: '商品标题最多不超过25个', trigger: 'change' 
            },
          ],
          sellingPoint: [
            { max: 50, message: '商品卖点最多不超过50个', trigger: 'blur' },
            { validator: (rule, value, callback)=>{
              var sellingPointRules = this.initForm.sellingPointRules;
              validatorStrLength(rule, value, callback, function(len){
                sellingPointRules.curLen = len
              })
            }, message: '商品卖点最多不超过50个', trigger: 'change' 
            },
          ],
          // productCateProperty: [
          //   { required: true, message: '请选择类目属性', trigger: 'blur' }
          // ],
          productSkuTable: [
            {required: true, message: '请先选择商品销售规格', trigger: 'blur'}
          ],
          // 上架时间
          publishTimeType: [
            {required: true, message: '请先选择商品销售规格', trigger: 'blur'}
          ],
          // 服务范围
          citySiteList: [  
            {required: true, message: '请先选择服务范围', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {


      productSellPrice: function(val){

      },
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

          self.getEditorFormdata(storeId, route.query.productId, route.query.productStatus)
          goodsForm.productId = route.query.productId
          return 

        }

        //判断是否存在类目ID
        if(route.name === '新建商品' && storeId && route.query.productCateId && route.query.productCateName) {

          self.getGoodsFormDataHandle(storeId, route.query.productCateId)
          goodsForm.productCateId = route.query.productCateId
          initForm.productCateName = route.query.productCateName
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
          console.log('获取编辑数据',data)
          self.initForm.finished = true
        })
      },
      formartEditorData(data){
        let self = this
        let goodsForm = self.goodsForm
        let initForm = self.initForm
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
        goodsForm.productPicUrlList = data.productPicUrlList
        goodsForm.productVersionId = data.productVersionId
        goodsForm.shippingTemplateId = data.shippingTemplateId
        initForm.productSkuQuantity = self.productSkuHandle(data.productSkuTable)

        console.log('编辑时表单内容', goodsForm)
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
            //initForm = merge(data, initForm)
            if(data.citySiteList && data.citySiteList.length) {
              initForm.citySiteList = data.citySiteList
            }
            
            if(data.brandDTOList) {
              if(data.brandDTOList.length){
                initForm.brandDTOList = data.brandDTOList
              }else {
                initForm.brandDTOList = [{
                  storeId: '0',
                  nameCn: '无'
                }]
              }

            }

            if(data.productCateProperty && data.productCateProperty.length) {
              initForm.productCateProperty = data.productCateProperty
            }

            if(data.productSkuProperty && data.productSkuProperty.length) {
              initForm.productSkuProperty = data.productSkuProperty
            }

            if(data.storeCateList && data.storeCateList.length) {
              initForm.storeCateList = data.storeCateList
            }

            // if(data.brandDTOList && data.brandDTOList.length) {
            //   initForm.brandDTOList = data.brandDTOList
            // }
            if(storeType != 1) {
              goodsForm.brandId = 0
            }
            initForm.storeShippingTemplate = data.storeShippingTemplate
            goodsForm.productType = data.productType
            goodsForm.productId = data.productId
            initForm.finished = true

          }
        })
      },
      productSkuHandle (data){
        var productSkuQuantity = 0

        if(data.length) {
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
        self.goodsForm.productStatus = statusVal
        console.log('提交数据',self.goodsForm, statusVal)
         if(statusVal == 1) {
            self.submitLoading = true
         }else if(statusVal == 0) {
            self.draftboxLoading = true
         }
        // saveGoodsFormData(self.goodsForm).then((res)=> {
        //   var data = res.data.data
        //    if(res.data.code == 0) {
        //      if(statusVal == 1) {
        //         self.submitLoading = true
        //         self.$router.push({path: '/seller-management/underreview'})
        //      }else if(statusVal == 0) {
        //         self.draftboxLoading = true
        //         self.$router.push({path: '/seller-management/draftbox'})
        //      }
        //    }else {
        //       self.submitLoading = false
        //       self.draftboxLoading = false            
        //    }
        // }).catch((res)=>{
        //   self.submitLoading = false
        //   self.draftboxLoading = false
        // })
        // self.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     console.log(self.goodsForm)
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      updateCatePropertyGroupList(value) {

        this.goodsForm.catePropertyList = value
        console.log('更新类目属性', value)
      },
      updateProductSkuProperty (value) {

        this.goodsForm.productSkuTable = value
        console.log('更新商品规格', value)
      },
      upSysAreaHandle (value) {
        this.goodsForm.serviceArea = value
      },
      onChange (value) {
        console.log(value)
      }
    }
  }
</script>
<style lang="scss">

  .block-form {
    background:#f5f7fa;
    border:1px solid #eeeeee;
    padding: 20px;
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
        border-width: 0;
        opacity: 1;
        background: border-box;
      &:hover,
      &:focus {
        border: 0;
      }
    }
    .cell {
      text-align: center;
    }
  }


</style>