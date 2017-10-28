<template>
  <div class="goods-form">
    <el-form :model="goodsForm" :rules="goodsFormRules" ref="goodsForm" label-width="120px">
      <el-form-item label="当前类目" prop="cate">
        {{initForm.productCateName}}
      </el-form-item>

      <el-form-item label="选择品牌" prop="brandId">
        <el-select v-model.number="goodsForm.brandId" placeholder="选择品牌">
          <template v-for="brand in initForm.brandDTOList">
            <el-option :label="brand.nameCn" :value="brand.brandId" :key="brand.nameCn">{{brand.nameCn}}</el-option>
          </template>
          
        </el-select>
      </el-form-item>

      <el-form-item label="商品标题" prop="productTitle">
        <el-input v-model="goodsForm.productTitle" placeholder="商品标题"><template slot="append"><span :class="['error', titleRulesClass]">{{initForm.productTitleRules.curLen}}</span>/25</template></el-input>
      </el-form-item>

      <el-form-item label="商品卖点" prop="sellingPoint">
        <el-input v-model="goodsForm.sellingPoint" placeholder="商品卖点"><template slot="append"><span :class="['error', sellingPointRulesClass]">{{initForm.sellingPointRules.curLen}}</span>/50</template></el-input>
      </el-form-item>

    <el-form-item label="类目属性" prop="productCateProperty">
      <cate-property v-if="initForm.productCateProperty.length" :catePropertyData="initForm.productCateProperty"></cate-property>
    </el-form-item> 

    <el-form-item label="商品规格" prop="catePropertyGroupList">
      <div class="block-form product-sku">
        <template v-for="productCate in initForm.productSkuProperty">
          <div class="cate-property-item" v-if="productCate.catePropertySelection == 1">
            <el-form-item :label="productCate.catePropertyName">
              <el-checkbox-group v-model="productCate.values" @change="setProductSkuProperty(productCate)">
                <template v-for="option in productCate.options">
                  <el-checkbox :label="option.catePropertyValue" :value="option.productCatePropertyValuesId" :key="option.productCatePropertyValuesId"></el-checkbox>
                </template>
              </el-checkbox-group>
            </el-form-item>
          </div>
        </template>
      </div>
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
                    <template v-for="productSku in goodsForm.productSkuTable">
                      <tr class="el-table__row">

                        <td v-for="data in productSku.data">
                          <div class="cell">{{data.value}}</div>
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
        <el-select v-model="goodsForm.sysArea" multiple placeholder="请选择服务范围">
          <template v-if="initForm.sysAreaList" v-for="sysArea in initForm.sysAreaList">
            <el-option :label="sysArea.areaName" :value="sysArea.sysAreasId" :key="sysArea.areaName">
            </el-option>
          </template>
        </el-select>
      </el-form-item>

      <el-form-item label="店铺中分类" prop="storeCateList">
        <div class="block-form cate-property">
          <el-checkbox-group 
            v-model="goodsForm.storeCateList">
            <el-checkbox v-for="storeCate in initForm.storeCateList" :label="storeCate.cateName" :key="storeCate.cateName">{{storeCate.cateName}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>

      <div class="logistics-info wuliu" prop="shippingTemplateId">
        <category-bar title="宝贝物流服务"></category-bar>
        <logistics-services v-model="goodsForm.shippingTemplateId" :logisticsData="initForm.storeShippingTemplate"></logistics-services>
      </div>
      <div class="other-info">
        <category-bar title="其他信息"></category-bar> 
        <el-form-item label="上架时间" prop="publishTimeType">
          <el-radio-group v-model="initForm.publishTimeType">
            <el-radio label="立即上架" name="1"></el-radio>
            <el-radio label="定时上架" name="2"></el-radio>
          </el-radio-group>
          <div style="margin-top:5px;" v-if="goodsForm.initForm === '定时上架'">
            <el-date-picker
              v-model="goodsForm.publishTime"
              type="datetime"
              placeholder="选择日期时间" style="width: 280px;">
            </el-date-picker>
          </div>
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
  import LogisticsServices from './goods_form/LogisticsServices.vue'
  import VueQuillEditor from 'vue-quill-editor'
  import { getStrLength } from '@/util/validator'
  import { getGoodsFormData } from '@/api/seller'
  const win = window;
  const storeId = win.storeInfo && win.storeInfo.storeId ? win.storeInfo.storeId : ''
  console.log('店铺ID', storeId)
  export default {
    components: {
      CategoryBar, 
      VueQuillEditor, 
      Summernote, 
      UpdateImg, 
      CateProperty,
      LogisticsServices
    },
    data() {
      var validatorStrLength = (rule, value, callback, fn) => {
        var len = getStrLength(value)
        fn(len)
      }
      return {
        //表单提交所需要的数据结构
        goodsForm: {
          productCateId: 24, //类目ID
          brandId: '', //品牌ID
          storeId: storeId,
          productTitle: '', //商品标题
          sellingPoint: '', //商品卖点
          storeCateList: [],//店铺中分类
          catePropertyGroupList: [], 
          productCatePropertyValue: [],
          productPicUrlList: ['http://3.tthunbohui.cn/n/00400M0y003100iFPx00aH8-c300x225-1ab9ae.jpg','http://3.tthunbohui.cn/n/00400M0y003100iFPx00aH8-c300x225-1ab9ae.jpg','http://3.tthunbohui.cn/n/00400M0y003100iFPx00aH8-c300x225-1ab9ae.jpg'], //商品图片列表 链接LIST
          productSkuTable: [{
            productPrice: 999,
            productSkuQuantity: 100,
            data:[{
              id: 111,
              name: '颜色',
              value: '红色'
            },{
              id: 222,
              name: '尺码',
              value: 'L'
            }]
          }], //商品销售规格
          detailsContent: '这是在测试文本', //富文本
          sysArea: '', //服务范围 逗号隔开
          shippingTemplateId: 3333, //物流模板ID
          publishTime: '', //上架时间
          productRecommend: '', //是否推荐
          productStatus: '', //提交状态
          productSellPrice: '', //展示价格及库存的价格
        },
        //初始化表单时数据结构
        initForm: {
          productCateName: '',
          //上架时间类型
          publishTimeType: '',
          //商品销售规格
          sellFormat: [],
          //服务范围
          sysAreaList:[], 
          storeShippingTemplate: {
            peisongArea: [
              {city: [], price: 12323, count: 222, cprice: 333},
              {city: [], price: 12323, count: 222, cprice: 333}
            ]
          },
          cateName: '婚纱摄影',
          brandDTOList: [{
            brandId: 1233,
            nameCn: '三安啊',
            storeId: 133111

          },{
            brandId: 34444,
            nameCn: '中国啊啊啊',
            storeId: 555555
          }],
          productTitleRules: {
            max: 25,
            curLen: 0
          },
          sellingPointRules: {
            max: 50,
            curLen: 0
          },
          publishTimeType: [],
          productSkuLength: 0,
          productSkuQuantity: 0,
          storeCateList: [{
            cateName: '性价比之王',
            storeCateId: 13131            
          },{
            cateName: '豪华套系',
            storeCateId: 13131            
          }],
          //商品销售规格
          productSkuProperty: [] , 
          //商品规格
          skuPropertyData: [],
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
        console.log(val)
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
      this.initProductSkuProperty()
    },
    methods: {
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

          console.log('初始化数据', res)  
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
          }

        });
        console.log(initForm.sysAreaList)      
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
            console.log(data[i].productSkuQuantity)
          }          
        }

        this.initForm.productSkuQuantity = productSkuQuantity
      },
      initProductSkuProperty (){
        var obj = {};

        var productSkuProperty = this.initForm.productSkuProperty;
        for(var i=0; i < productSkuProperty.length; i++) {
          
          obj[productSkuProperty[i].catePropertyName] = []
          
        }
        this.initForm.skuPropertyData = obj  
        this.initForm.productSkuLength = productSkuProperty.length
        
      },
      /**
       * gen 多维数组，多对多合并
       * @param  { Array } list 商品规格属性列表
       * @return {[type]}      [description]
       */
      gen (list){
        var result = []
        _gen(list, 0, [])
        return result

        function _gen (list, level, path) {
          if (level >= list.length) {
            return result.push(path.slice(0))
          }
          var lev = list[level]
          for (var i = 0; i < lev.length; i += 1) {
            path.push(lev[i])
            _gen(list, level + 1, path)
            path.pop()
          }
        }
      },
      /**
       * submitForm 表单提交，提交时需要对表单校验
       * @param  { String } formName 表单名称
       * @return {[type]}          [description]
       */
      submitForm(formName) {
        var self = this
        self.goodsForm.productStatus = 1
        console.log('提交数据',self.initForm.productCateProperty)

        // self.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     console.log(self.goodsForm)
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
      },
      setProductSkuProperty (row) {
        var productSkuProperty = this.initForm.productSkuProperty

        if(productSkuProperty[row.catePropertyName]) {
          var arr = []
          for(var i=0; i< row.values.length; i++) {
            var id = this.getProductCatePropertyValuesId(row.values[i], row.options)
            var obj = {
              id: id,
              name: row.catePropertyName,
              value: row.values[i]
            }
            arr.push(obj)
          }
          productSkuProperty[row.catePropertyName] = arr
        }
        
        var productSkuRowDTO = this.formartProductSkuRowDTO(productSkuProperty, row)
        var formatData = this.gen(productSkuRowDTO)
        var formartProductSku = this.getProductSkuProperty(formatData)

        this.goodsForm.productSkuTable = formartProductSku
        console.log('最终渲染列表数据',  formartProductSku)
        this.productSkuHandle(formartProductSku)
        formatData = null
        productSkuProperty = null
        productSkuRowDTO = null
        formartProductSku = null
      },

      /**
       * formartProductSkuRowDTO 根据下标格式化用户已选择的属性
       * @param  { Array } data 用户所选属性
       * @return { Array }      根据规格属性对用户所选的数据进行排序
       */
      formartProductSkuRowDTO (data) {
        var arr = []
        var self = this
        var index = 0
        for(var key in data) {
          if(data[key].length) {
            arr[index] = data[key]
            index++         
          }
        }
        return arr
      },
      /**
       * getProductCatePropertyValuesId 获取商品规格属性ID
       * @param  { String } catePropertyValue 类目属性值
       * @param  { Object } options           商品属性
       * @return { Number }                   规格属性ID
       */
      getProductCatePropertyValuesId (catePropertyValue, options){
        var id = '';
        if(options.length > 0) {
          for(var i=0; i< options.length; i++) {
            if(catePropertyValue == options[i]['catePropertyValue']) {
              id = options[i]['productCatePropertyValuesId']
              break;
            }
          }          
        }
        return id;
      }, 

      /**
       * getProductSkuProperty 给合并后的选项增加其他属性
       * @param  { Object } data 用户已选规格合并后的数据
       * @return { Array }      格式化后的规格属性列表
       */
      getProductSkuProperty (data){
        var arr = []
        if(data.length){
          for(var i=0; i<data.length; i++) {
              var obj = {};
              obj.productPrice = ''
              obj.productSkuQuantity = ''
              obj.data = data[i]
              arr.push(obj)
          }          
        }
        return arr     
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