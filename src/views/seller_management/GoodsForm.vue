<template>
  <div class="goods-form">
    <el-form :model="goodsForm" :rules="goodsFormRules" ref="goodsForm" label-width="120px">
      <el-form-item label="当前类目" prop="cate">
        {{initForm.productCateName}}
      </el-form-item>

      <el-form-item label="选择品牌" prop="brandId">
        <brand-select v-model="goodsForm.brandId" :brandDTOList="initForm.brandDTOList"></brand-select>
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
                              <input class="" v-model="productSku.productPrice" @keyup="productSkuHandle(goodsForm.productSkuTable)" /></div>
                          </td>
                          <td>
                            <div class="cell">
                              <input class="" v-model="productSku.productSkuQuantity" @keyup="productSkuHandle(goodsForm.productSkuTable)" />
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
        <p class="desc">请编辑可送达的地区，当用户选择下述地区以外的配送地址时，将提示用户无法下单。</p>
        <div>
          <update-img v-model="goodsForm.productPicUrlList"></update-img>
        </div>
      </el-form-item>

      <el-form-item label="商品描述" prop="detailsContent" class="sellFormat-sku">
        <summernote v-model="goodsForm.detailsContent"></summernote>
      </el-form-item>

      <el-form-item label="服务范围" prop="sysArea">
        <sys-area :sysAreaList="initForm.sysAreaList" @change="upSysAreaHandle"></sys-area>
      </el-form-item>

      <el-form-item label="店铺中分类" prop="storeCateList">
        <store-cate v-model="goodsForm.storeCateList" :storeCateList="initForm.storeCateList"></store-cate>
      </el-form-item>

      <div class="logistics-info wuliu" prop="shippingTemplateId">
        <category-bar title="宝贝物流服务"></category-bar>
        <logistics-services v-model="goodsForm.shippingTemplateId" :logisticsData="initForm.storeShippingTemplate"></logistics-services>
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
        <el-button type="primary" @click="submitForm('goodsForm')">保存</el-button>
        <el-button type="primary" @click="">放入草稿箱</el-button>
        <!-- <el-button @click="resetForm('goodsForm')">重置</el-button> -->
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
  import 'vue-easytable/libs/themes-base/index.css'
  import CategoryBar from '@/components/CategoryBar.vue'
  import Summernote from './summernote/Summernote.vue'
  import UpdateImg from './goods_form/UpdateImg.vue'
  import CateProperty from './goods_form/CateProperty.vue'
  import ProductSku from './goods_form/ProductSku.vue'
  import PublishTime from './goods_form/PublishTime.vue'
  import SysArea from './goods_form/SysArea.vue'
  import StoreCate from './goods_form/StoreCate.vue'
  import BrandSelect from './goods_form/BrandSelect.vue'
  import LogisticsServices from './goods_form/LogisticsServices.vue'

  import VueQuillEditor from 'vue-quill-editor'
  import { getStrLength } from '@/util/validator'
  import { getGoodsFormData, saveGoodsFormData} from '@/api/seller'
  import merge from 'merge'
  const win = window;
  const storeId = win.storeInfo && win.storeInfo.storeId ? win.storeInfo.storeId : ''

  export default {
    components: {
      CategoryBar, 
      VueQuillEditor, 
      Summernote, 
      UpdateImg, 
      CateProperty,
      LogisticsServices,
      ProductSku,
      SysArea,
      PublishTime,
      StoreCate,
      BrandSelect
    },
    data() {
      var validatorStrLength = (rule, value, callback, fn) => {
        var len = getStrLength(value)
        fn(len)
      }
      return {
        //表单提交所需要的数据结构
        goodsForm: {
          productId: null, //商品ID
          productCateId: 24, //类目ID
          brandId: '', //品牌ID
          storeId: storeId, //店铺ID
          productTitle: '', //商品标题
          sellingPoint: '', //商品卖点
          storeCateList: [],//店铺中分类
          catePropertyList: [], //类目属性
          productPicUrlList: ['http://3.tthunbohui.cn/n/00400M0y003100iFPx00aH8-c300x225-1ab9ae.jpg','http://3.tthunbohui.cn/n/00400M0y003100iFPx00aH8-c300x225-1ab9ae.jpg','http://3.tthunbohui.cn/n/00400M0y003100iFPx00aH8-c300x225-1ab9ae.jpg'], //商品图片列表 链接LIST
          productSkuTable: [], //商品销售规格
          detailsContent: '这是在测试文本', //富文本
          sysArea: '', //服务范围 逗号隔开
          shippingTemplateId: 3333, //物流模板ID
          publishTime: '2017-10-30 13:47:39', //上架时间
          productRecommend: '', //是否推荐
          productStatus: '', //提交状态
          productSellPrice: '', //展示价格及库存的价格
        },
        //初始化表单时数据结构
        initForm: {
          productCateName: '',
          publishTimeType: '',
          sysAreaList:[], 
          storeShippingTemplate: {
            peisongArea: [
              {city: [], price: 12323, count: 222, cprice: 333},
              {city: [], price: 12323, count: 222, cprice: 333}
            ]
          },
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

        },
        //表单校验
        goodsFormRules: {
          brandName: [
            { required: true, message: '请选择品牌', trigger: 'blur' }
          ],
          productTitle: [
            { required: true, message: '请填写商品标题', trigger: 'blur' },
            { max: 25, message: '商品标题最多不超过25个', trigger: 'blur' },
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
          sysArea: [  
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
    watch: {
    
    },

    created() {

      this.initFormData(this.$route.query)
      //this.initProductSkuProperty()
    },
    methods: {
      publishTimeHandle (value){

        this.goodsForm.publishTime = value
        console.log(value)
      },
      /**
       * initFormData 初始化表单数据（加载表单默认数据）
       * @param  { Object } route 路由查询信息
       * @return {[type]}       [description]
       */
      initFormData(query) {

        let goodsForm = this.goodsForm
        let initForm = this.initForm
        //判断是否存在类目ID
        if(query.productCateId) {
          goodsForm.productCateId = query.productCateId
        }
        if(query.productCateName) {
          this.initForm.productCateName = query.productCateName
        }

        //获取表单初始化数据
        this.getGoodsFormDataHandle(goodsForm.storeId, goodsForm.productCateId).then((res) => {
          var data = res.data;
          console.log('表单数据', res.data)
          //console.log('表单合并后的数据', merge({}, this.initForm, res.data.data ))
          if(data.code === 0) {

            if(data.data.sysAreaList && data.data.sysAreaList.length) {
              initForm.sysAreaList = data.data.sysAreaList
            }
            
            if(data.data.brandDTOList && data.data.brandDTOList.length) {
              initForm.brandDTOList = data.data.brandDTOList
            }

            if(data.data.productCateProperty && data.data.productCateProperty.length) {
              initForm.productCateProperty = data.data.productCateProperty
            }

            if(data.data.productSkuProperty && data.data.productSkuProperty.length) {
              initForm.productSkuProperty = data.data.productSkuProperty
            }

            if(data.data.storeCateList && data.data.storeCateList.length) {
              initForm.storeCateList = data.data.storeCateList
            }

            if(data.data.brandDTOList && data.data.brandDTOList.length) {
              initForm.brandDTOList = data.data.brandDTOList
            }

            this.goodsForm.productId = data.data.productId
          }

        });
   
      },

      getGoodsFormDataHandle (storeId, productCateId){
        return getGoodsFormData({
          storeId: storeId,
          productCateId: productCateId
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

        this.initForm.productSkuQuantity = productSkuQuantity
      },

      /**
       * submitForm 表单提交，提交时需要对表单校验
       * @param  { String } formName 表单名称
       * @return {[type]}          [description]
       */
      submitForm(formName) {
        var self = this
        self.goodsForm.productStatus = 1
        console.log('提交数据',self.goodsForm)
        console.log(JSON.stringify(self.goodsForm))
        // saveGoodsFormData(self.goodsForm).then((res)={
        //   console.log(res)
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

      brandChangeHandle (value){
        console.log(value)

        return 11111
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
        this.goodsForm.sysArea = value
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