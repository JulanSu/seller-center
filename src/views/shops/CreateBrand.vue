<template>
	<section class="create-brand">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			<h2>阶段一：填写品牌信息</h2>
			<el-form-item label="注册地" label-width="200px" class="lefttit">
			    <el-radio-group v-model="ruleForm.domicile" @change="resetForm('ruleForm')">
			        <el-radio :label="1">中国大陆地区</el-radio>
			        <el-radio :label="2">中国港澳台地区</el-radio>
			        <el-radio :label="3">国外地区</el-radio>
			    </el-radio-group>
			</el-form-item>
			<category-bar :title="categoryBarTitle1"></category-bar>

			<el-form-item prop="brandChineseName" label="品牌名称" label-width="200px">
				<el-input v-model="ruleForm.brandChineseName" class="wid400" ></el-input>
			</el-form-item>	
			<el-form-item  prop="brandEnglishName" label="品牌英文名称"  label-width="200px">
				<el-input v-model="ruleForm.brandEnglishName" class="wid400"></el-input>
			</el-form-item>

			<div v-if="isshow">
				<el-form-item prop="hongkong" label="品牌发源地"  label-width="200px">
					<el-input v-model="ruleForm.hongkong" class="wid400"></el-input>
				</el-form-item>
			</div>

			<div v-if="!isshow">	
				<el-form-item prop="registratNumber" label="商标注册号" label-width="200px">
					<el-input v-model="ruleForm.registratNumber" class="wid400"></el-input>
				</el-form-item>	
				<el-form-item prop="applicant" label="商标申请人"  label-width="200px">
					<el-input v-model="ruleForm.applicant" class="wid400"></el-input>
				</el-form-item>
				<el-form-item prop="registratType" label="注册类型" label-width="200px">
				    <el-radio-group v-model="ruleForm.registratType">
				        <el-radio label="R标"></el-radio>
				        <el-radio label="TM标"></el-radio>
				    </el-radio-group>
				    <p class="tishi">R：已获得《商标注册证》TM：未获得《商标注册证》，仅有《注册申请受理通知书》</p>
				</el-form-item>
				<el-form-item label="品牌注册所属行业" label-width="200px" >
				    <el-checkbox-group v-model="ruleForm.industry">
				      <el-checkbox label="行业1" name="industry"></el-checkbox>
				      <el-checkbox label="行业2" name="industry"></el-checkbox>
				    </el-checkbox-group>
				</el-form-item>
			</div>
			
			<el-form-item prop="authorized" label="授权渠道 " label-width="200px">
				<el-input v-model="ruleForm.authorized" class="wid400"></el-input>
			</el-form-item>	
			<el-form-item prop="hostCity" label="授权城市"  label-width="200px">
				<el-input v-model="ruleForm.hostCity" class="wid400"></el-input>
			</el-form-item>
			<el-form-item label="有效时间"  label-width="200px">
			    <el-col style="width:190px;">
			      <el-form-item prop="dateStart">
			        <el-date-picker type="date" v-model="ruleForm.dateStart" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			    <el-col class="line" style="text-align:center;width:20px;">-</el-col>
			    <el-col style="width:190px;">
			      <el-form-item prop="dateEnd">
			        <el-date-picker type="date" v-model="ruleForm.dateEnd" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			</el-form-item>
			<el-form-item label="品牌LOGO" label-width="200px">
				<upload-pictures :note="uploadTishi1"></upload-pictures>
			</el-form-item>
			<el-form-item label="报关单" label-width="200px">
				<upload-pictures :note="uploadTishi2"></upload-pictures>
				<div class="example"  @click="iconSimple(src1)">
					<div><img src="../../assets/logo.png"/></div>
					<span>参考示例</span>
				</div>
			</el-form-item>	
			

			<div v-if="isshow">
				<category-bar :title="categoryBarTitle2"></category-bar>
				<el-form-item prop="domestic" label="国内经营人姓名" label-width="200px">
					<el-input v-model="ruleForm.domestic" class="wid400"></el-input>
				</el-form-item>	
				<el-form-item prop="idNumber" label="身份证号"  label-width="200px" >
					<el-input v-model="ruleForm.idNumber" class="wid400"></el-input>
				</el-form-item>
				<el-form-item prop="phone" label="手机号码"  label-width="200px">
					<el-input v-model="ruleForm.phone" class="wid400"></el-input>
				</el-form-item>
				
			</div>

			<el-form-item prop="tel" label="联系电话"  label-width="200px">
				<el-input v-model="ruleForm.tel" class="wid400"></el-input>
				<p class="tishi">审核同学有疑问时，会通过此联系方式联系您</p>
			</el-form-item>
			<el-form-item label="" label-width="200px">
				<el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
			</el-form-item>
			<el-dialog
			    title=""
			    top="30%"
				:visible.sync="dialogVisible1"
				size="tiny">
				<div class="suc">
					<span class="el-icon-circle-check"></span>
					<div>
						<h2>您已成功提交审核</h2>
				    	<p>我们的审核人员会在1-5个工作日内完成审核</p>
					</div>
				</div>
			    
			    <span slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="getBack">返回商户中心</el-button>
			    </span>
			</el-dialog>

			<el-dialog title="" :visible.sync="dialogVisible" custom-class="big-img">
			    <img :src="exampleSrc"/>
			</el-dialog>
		</el-form>
	</section>
	
</template>

<script>
import CategoryBar from '@/components/CategoryBar.vue'/*标题组件*/
import UploadPictures from '@/components/UploadPictures.vue'/*上传图片组件*/

export default {
  	components: { 
  		CategoryBar,
  		UploadPictures
  	},
	data() {
      return {
      	uploadTishi1:"图片尺寸200px*200px以上，大小800k以内，格式png/jpg/jpeg，格式要求jpg、jpeg、png，不超过10MB",
      	uploadTishi2:"图片尺寸800px*800px以上，大小800k以内，格式png/jpg/jpeg，格式要求jpg、jpeg、png，不超过10MB",
      	categoryBarTitle1: '品牌信息',
      	categoryBarTitle2: '国内经营人信息',
      	dialogVisible1: false,
      	exampleSrc:'',
      	dialogVisible:false,
      	src1:"http://2.hapn.cc:20080/n/00802v_b009W1MMTZ0a02w8.jpg",

        ruleForm: {
			domicile:1,
		 	brandChineseName: '',
			brandEnglishName: '',
			hongkong: '',
			registratNumber: '',
			applicant: "",
			registratType:[],
			industry: [],
			identity: '',
			authorized:"",
			hostCity:"",
			dateStart: '',
			dateEnd: '',
			domestic: '',
			idNumber: '',
			phone: "",
			tel:""
		},
        rules: {
          brandChineseName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 位', trigger: 'blur' }
          ],
          brandEnglishName: [
            { required: true, message: '请输入品牌英文名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度为 1 到 50 位', trigger: 'blur' }
          ],
          hongkong: [
            { required: true, message: '请输入品牌发源地', trigger: 'blur' },
            { max: 50, message: '长度最多 50 位', trigger: 'blur' }
          ],
          registratNumber: [
            { required: true, message: '请输入商标注册号', trigger: 'blur' },
            { min: 8, max: 8, message: '长度为8位', trigger: 'blur' }
          ],
          applicant: [
            { required: true, message: '请输入商标申请人', trigger: 'blur' },
            { min: 2, max: 30, message: '长度在 2 到 30 位', trigger: 'blur' }
          ],
          registratType: [
            { required: true, message: '请选择注册类型', trigger: 'change' }
          ],
          industry: [
            { type:'array', required: true, message: '请选择品牌注册所属行业', trigger: 'change' }
          ],
          authorized: [
            { required: true, message: '请输入授权渠道', trigger: 'blur' },
            { max: 50, message: '长度最多 50 位', trigger: 'blur' }
          ],
          hostCity: [
            { required: true, message: '请输入授权城市', trigger: 'blur' },
            { max: 20, message: '长度最多 20 位', trigger: 'blur' }
          ],
          dateStart: [
            { type: 'date', required: true, message: '请选择有效起始时间', trigger: 'blur' }
          ],
          dateEnd: [
            { type: 'date', required: true, message: '请选择有效结束时间', trigger: 'blur' }
          ],
          domestic: [
            { required: true, message: '国内经营人姓名', trigger: 'blur' },
            { min:2, max: 30, message: '长度为 2 到 30 位', trigger: 'blur' }
          ],
          idNumber: [
            { required: true, message: '请填写身份证号', trigger: 'blur' },
            { min:18, max: 18, message: '长度为 18 位', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请填写手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '长度为 11 位', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '请填写联系电话', trigger: 'blur' },
            { min: 11, max: 11, message: '长度为 11 位', trigger: 'blur' }
          ]
        }
      };
    },
    computed:{
    	isshow:function(){
    		return this.ruleForm.domicile==1?false:true;
    	}
    },
    methods: {
    	/*查看示例图*/
		iconSimple(src){
			this.exampleSrc=src;
			this.dialogVisible=true;
		},
    	/*提交按钮*/
	    submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	            if (valid) {
	          		this.dialogVisible1 = true;
		        }else {
	            	return false;
	            }
	        });
	    },
        /*切换注册地，清空表单选项*/
        resetForm(formName) {
        	this.$refs[formName].resetFields();
        },
	    /*返回商户中心按钮*/
	    getBack(){
	    	this.dialogVisible1 = false;
	    	this.$router.push({ path: '/store/brand-management' });
	    }
    }
}
</script>

<style lang="scss">
.create-brand{
	padding-top:10px;
	/* 公共样式 */
	p,h2{
		margin:0;
	}
	.wid400{
    	width:400px;
	}
	.tishi{
		font-size: 12px;
		color: #999999;
	}
	h2{
		font-size: 16px;
		color: #333333;
		font-weight:normal;
		margin-bottom:20px;
	}
	/* 成功弹框样式 */
	.el-dialog--tiny{
		min-width:490px;
		.el-dialog__footer{
			padding-bottom:50px;
			.dialog-footer{
				display:block;
				text-align:center;
			}
		}
		.el-dialog__body{
			padding:40px 20px;
			.suc{
				width:340px;
				height:50px;
				margin:0 auto;
				
				span{
					float:left;
					display:inline-block;
					width:50px;
					height:50px;
					font-size: 46px;
		    		margin-top: 3px;
		    		color:#41cac0;
		    		padding-right:10px;
				}
				div{
					float:left;
					width:280px;
					h2{
						font-size: 18px;
						color: #333333;
						height:25px;
						line-height:25px;
						margin:0;
					}
					p{
						font-size: 14px;
						color: #999999;
						height:20px;
						line-height:20px;
						padding-top:5px;
					}
				}
			}
		}
		
	}
	
	.category-bar{
		padding-top:0;
		margin:20px 0;
	}
	.big-img{
    	width:480px;
    	height:360px;
    	margin-bottom:0;
    	background:transparent;
    	box-shadow:0 0 0;
    	.el-dialog__body{
    		width:430px;
    		height:270px;
    		text-align:center;
    		line-height:270px;
    		padding:0;
    		img{
    			width:430px;
    		}
    	}
    }
	.example{
		position:absolute;
		width:200px;
		height:100px;
		bottom:0px;
		left:195px;
		cursor: pointer;
		span{
			float:right;
			font-size: 14px;
			color: #666666;
			line-height:40px;
			padding-right:20px;
		}
		div{
			float:right;
			width:100px;
			height:100px;
			overflow: hidden;
			line-height:100px;
			text-align:center;
			img{
				max-width:100%;
			}
		}
	}

}
  
</style>