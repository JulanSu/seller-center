<template>
<div>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="goods-form">
    <el-form-item label="当前类目" prop="cate">
      婚纱摄影
    </el-form-item>
    <el-form-item label="选择品牌" prop="fuwu">
      <el-select v-model="ruleForm.fuwu" placeholder="请选择服务范围">
        <el-option label="全部" value="shanghai"></el-option>
        <el-option label="其他" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="商品标题" prop="title">
      <el-input v-model="ruleForm.title"><template slot="append">0/25</template></el-input>
    </el-form-item>
    <el-form-item label="商品卖点" prop="subTitle">
      <el-input v-model="ruleForm.subTitle"><template slot="append">0/50</template></el-input>
    </el-form-item>
    <el-form-item label="类目属性">
      <div class="block-form">
        <el-row>
          <el-col :span="11">
            <el-form-item label="服务范围" prop="fuwu">
              <el-select v-model="ruleForm.fuwu" placeholder="请选择服务范围">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="服务范围" prop="fuwu">
              <el-select v-model="ruleForm.fuwu" placeholder="请选择服务范围">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="服务范围" prop="fuwu">
              <el-select v-model="ruleForm.fuwu" placeholder="请选择服务范围">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="服务范围" prop="fuwu">
              <el-select v-model="ruleForm.fuwu" placeholder="请选择服务范围">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form-item>
    <el-form-item label="商品规格" prop="delivery">
      <div class="block-form">
        <el-form-item label="活动性质" prop="type" label-width="80px" class="form-guige">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="活动性质" prop="type" label-width="80px" class="form-guige">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
    </el-form-item>
    <el-form-item label="商品销售规格" prop="type">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label="展示价格及库存" prop="resource">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="价格（元）"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总数量（件）"
          width="180">
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label="商品图片" prop="desc">
        <div class="load_hezi"> 
          <p >请传160*160,格式要求jpg,jpeg,png,不超过10MB</p>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
    </el-form-item>
    <el-form-item label="商品描述" prop="desc">

    </el-form-item>
    <el-form-item label="服务范围" prop="fuwu">
      <el-select v-model="ruleForm.fuwu" placeholder="请选择服务范围">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="店铺中分类" prop="fuwu">
      <el-checkbox-group v-model="ruleForm.checkList" size="small" class="store-fenlei">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <category-bar :title="categoryBarTitle"></category-bar> 
    <el-form-item label="提取方式" prop="desc">
      <div class="get-type">
        <div class="get-type-hd">
          <el-checkbox-group v-model="ruleForm.checkList" size="small">
            <el-checkbox label="电子交易凭证"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="get-type-bd">
          <el-form-item label="设置有效期" prop="fuwu">
            <el-radio-group v-model="ruleForm.onlineTimeType" style="width: 100%">
              <ul class="ul">
                <li>
                  <div class="radio-title">
                    <el-radio label=""></el-radio>
                  </div>
                  <div class="radio-content">
                    <el-date-picker
                      v-model="ruleForm.value1"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions0">
                    </el-date-picker>
                    <span class="pipe">至</span>
                    <el-date-picker
                      v-model="ruleForm.value1"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions0">
                    </el-date-picker>
                  </div>
                </li>
                <li>
                  <div class="radio-title">
                    <el-radio label="购买成功日至"></el-radio>
                  </div>
                  <div class="radio-content">
                    <el-date-picker
                      v-model="ruleForm.value1"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions0">
                    </el-date-picker>
                  </div>
                </li>
                <li>
                  <div class="radio-title">
                    <el-radio label="购买成功后"></el-radio>
                  </div>
                  <div class="radio-content">
                    <el-input v-model="ruleForm.onlineTimeType" style="width:100px;" placeholder="请输入内容"></el-input>
                    <span class="pipe">天内有效果</span>
                  </div>
                </li>
              </ul>
            </el-radio-group>
          </el-form-item>
          <div class="get-type-ft">
            <el-form-item label="核销地址" prop="fuwu">
              <el-input v-v ="ruleForm.subTitle" placeholder="请输入门店核销库"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form-item>
    <category-bar :title="categoryBarTitle"></category-bar> 
    <el-form-item label="上架时间" prop="onlineTimeType">
      <el-radio-group v-model="ruleForm.onlineTimeType">
        <el-radio label="立即上架"></el-radio>
        <el-radio label="定时上架"></el-radio>
      </el-radio-group>
      <div style="margin-top:5px;">
        <el-date-picker
          v-model="ruleForm.onlineTime"
          type="datetime"
          placeholder="选择日期时间" style="width: 280px;">
        </el-date-picker>
      </div>
    </el-form-item>
    <el-form-item label="是否推荐" prop="desc">
      <el-radio-group v-model="ruleForm.desc">
        <el-radio label="是"></el-radio>
        <el-radio label="否"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">放入草稿箱</el-button>
      <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
    </el-form-item>
  </el-form>
</div>
</template>
<script>
  import CategoryBar from '@/components/CategoryBar'
  import VueQuillEditor from 'vue-quill-editor'
  export default {
    components: { CategoryBar, VueQuillEditor },
    data() {
      return {
        imageUrl: '',
      editor: {
        options: {
        },
        content: ''
      },
        categoryBarTitle: '商品类目选择',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        valie1: '',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          fuwu: '',
          onlineTime: '',
          onlineTimeType: '',
          checkList: [],
          value1: '',
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onEditorBlur () {
        console.log(11213)
      },
      onEditorFocus () {

      },
      onEditorReady () {

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(){

      },
      beforeAvatarUpload (){

      }
    }
  }
</script>
<style lang="scss">
  @import '~scss_vars';
  .block-form {
    background: #F5F7FA;
    border: 1px solid #EEEEEE;
    padding: 15px 20px;
    overflow: hidden;
    .el-row + .el-row {
      margin-top: 15px;
    }
  }
  .form-guige {
    .el-form-item__content {
      clear: both;
      padding-left: 5px;
      margin-left: 0 !important;
      padding-bottom: 10px;
    }
    +.form-guige {
      border-top: 1px solid #EEEEEE;
    }
  }

  .ql-container.ql-snow {
    height: 360px !important;
  }
  .get-type {
    .radio-title {
      float: left;
      line-height: 35px;
      margin-right: 15px;
    }
    .radio-content {
      float: left;
    }
    .ul {
      padding: 0;
      margin: 0;
      li {
        margin-bottom: 20px;
        overflow: hidden;
        span.pipe {
          font-size: 14px;
          margin: 0 10px;
          display:inline-block;
        }
      }
    }
    .get-type-ft {
      border-top: 1px solid #EEE;
      padding: 20px 0 10px;
    }
  }
  .store-fenlei,
  .get-type {
    background: #F5F7FA;
    border: 1px solid #EEEEEE;
    padding: 10px 20px;
    .el-checkbox,
    .el-radio {
      display: block;

    }
    .el-checkbox + .el-checkbox {
      margin-left:0;
    }
  }

  .upload-img-wrap p{
    margin:0px 0px 10px;
    font-size:12px;
    color:#999;

  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
      border-color: #20a0ff;
  }
  .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
  }
  .avatar {
      width: 178px;
      height: 178px;
      display: block;
  }
  .el-upload .avatar-uploader-icon{
    width:100px;
    height:100px;
    line-height:100px;
    font-size:28px;
    border:1px dashed #41cac0;
    color:#41cac0;
  }
</style>