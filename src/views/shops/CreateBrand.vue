<template>
	<section class="create-brand" >
	    <div class="gotoPrev">阶段一：填写品牌信息</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-loading="listLoading">
			
			<el-form-item label="注册地" label-width="200px" class="lefttit">
			    <el-radio-group v-if="isCreat" v-model="ruleForm.registerLocation" @change="resetForm('ruleForm')">
			        <el-radio label="中国大陆"></el-radio>
			        <el-radio label="港澳台"></el-radio>
			        <el-radio label="国外"></el-radio>
			    </el-radio-group>
			    <el-radio-group v-else v-model="ruleForm.registerLocation">
			        <el-radio :label="ruleForm.registerLocation"></el-radio>
			    </el-radio-group>
			</el-form-item>
			<category-bar :title="categoryBarTitle1"></category-bar>

			<el-form-item prop="nameCn" label="品牌名称" label-width="200px">
				<el-input :maxlength="20" v-model="ruleForm.nameCn" class="wid400" @blur="findName('china')" placeholder="请输入品牌名称"></el-input>
			</el-form-item>	
			<el-form-item  prop="nameEn" label="品牌英文名称"  label-width="200px">
				<el-input :maxlength="50" v-model="ruleForm.nameEn" class="wid400" @blur="findName('english')" placeholder="请输入品牌英文名称"></el-input>
			</el-form-item>

			<div v-if="isshow">
				<el-form-item prop="orign" label="品牌发源地"  label-width="200px">
					<el-input :maxlength="50" v-model="ruleForm.orign" class="wid400" placeholder="请输入品牌发源地"></el-input>
				</el-form-item>
			</div>

			<div v-if="!isshow">	
				<el-form-item prop="trademarkNumber" label="商标注册号" label-width="200px">
					<el-input :maxlength="8" v-model="ruleForm.trademarkNumber" class="wid400" placeholder="请输入商标注册号"></el-input>
				</el-form-item>	
				<el-form-item prop="trademarkApplicant" label="商标申请人"  label-width="200px">
					<el-input :maxlength="30" v-model="ruleForm.trademarkApplicant" class="wid400"  placeholder="请输入商标申请人"></el-input>
				</el-form-item>
				<el-form-item prop="trademarkType" label="注册类型" label-width="200px" class="requireHezi">
					<span class="require" style='left:-78px;'>*</span>
				    <el-radio-group v-model="ruleForm.trademarkType">
				        <el-radio :label="1">R标</el-radio>
				        <el-radio :label="0">TM标</el-radio>
				    </el-radio-group>
				    <p class="tishi">R：已获得《商标注册证》TM：未获得《商标注册证》，仅有《注册申请受理通知书》</p>
				</el-form-item>
				<el-form-item prop="registerIndustry" label="品牌注册所属行业" label-width="200px">
				    <el-select v-model="ruleForm.registerIndustry" placeholder="请选择活动区域">
				      <el-option label="农、林、牧、渔业" value="农、林、牧、渔业"></el-option>
				      <el-option label=" 采矿业" value=" 采矿业"></el-option>
				      <el-option label=" 制造业" value=" 制造业"></el-option>
				      <el-option label="  电力、热力、燃气及水的生产和供应业" value="  电力、热力、燃气及水的生产和供应业"></el-option>
				      <el-option label=" 环境和公共设施管理业 " value=" 环境和公共设施管理业 "></el-option>
				      <el-option label=" 建筑业" value=" 建筑业"></el-option>
				      <el-option label=" 交通运输、仓储业和邮政业" value="交通运输、仓储业和邮政业"></el-option>
				      <el-option label="信息传输、计算机服务和软件业" value="信息传输、计算机服务和软件业"></el-option>
				      <el-option label=" 批发和零售业" value=" 批发和零售业"></el-option>
				      <el-option label="住宿、餐饮业" value="住宿、餐饮业"></el-option>
				      <el-option label="  金融、保险业" value="  金融、保险业"></el-option>
				      <el-option label=" 房地产业" value=" 房地产业"></el-option>
				      <el-option label=" 租赁和商务服务业" value=" 租赁和商务服务业"></el-option>
				      <el-option label="科学研究、技术服务和地质勘查业" value="科学研究、技术服务和地质勘查业"></el-option>
				      <el-option label="水利、环境和公共设施管理业" value="水利、环境和公共设施管理业"></el-option>	      
				      <el-option label="居民服务和其他服务业" value="居民服务和其他服务业"></el-option>
				      <el-option label=" 教育" value=" 教育"></el-option>
				      <el-option label="卫生、社会保障和社会服务业" value="卫生、社会保障和社会服务业"></el-option>
				      <el-option label="文化、体育、娱乐业" value="文化、体育、娱乐业"></el-option>
				      <el-option label="综合（含投资类、主业不明显）" value="综合（含投资类、主业不明显）"></el-option>
				      <el-option label="其他" value="其他"></el-option>
				    </el-select>
				</el-form-item>
			</div>
			
			<el-form-item prop="ways" label="授权渠道 " label-width="200px">
				<el-input :maxlength="50" v-model="ruleForm.ways" class="wid400" placeholder="请输入授权渠道"></el-input>
			</el-form-item>	
			<el-form-item prop="cityNames" label="授权城市"  label-width="200px">
				<el-input :maxlength="20" v-model="ruleForm.cityNames" class="wid400" placeholder="请输入授权城市"></el-input>
			</el-form-item>
			<el-form-item label="有效时间"  label-width="200px" prop="endValidTime" class="timers">
		        <el-date-picker  type="date" :editable="false" v-model="ruleForm.endValidTime" style="width: 100%;" placeholder="请选择有效截至时间"></el-date-picker>

			    </el-col>
			</el-form-item>
			<el-form-item label="品牌LOGO" label-width="200px" class="requireHezi">
				<span class="require" style='left:-90px;'>*</span>
				<upload-pictures :note="uploadTishi1" :url="ruleForm.logo" :listen="'listenToPic4'" :picSize='"800.KB"' @listenToPic4="sucpic4" ref="uploadPic4"></upload-pictures>
			</el-form-item>
			<el-form-item label="" prop="logo"  label-width="200px" class='updata'>
				<el-input v-model="ruleForm.logo" class="wid280"></el-input>
			</el-form-item>
			<div v-if="!isshow" >
				<el-form-item label="品牌资质" label-width="200px" class="requireHezi">
					<span class="require" style='left:-78px;'>*</span>
					<upload-pictures2 :note="uploadTishi1" :url="ruleForm.trademarkCertificate" :listen="'listenToPic1'" :picSize='"800.KB"' @listenToPic1="sucpic1" ref="uploadPic1" class="h"></upload-pictures2>
				</el-form-item>
				<el-form-item label="" prop="trademarkCertificate"  label-width="200px" class='updata'>
					<el-input v-model="ruleForm.trademarkCertificate" class="wid280"></el-input>
				</el-form-item>
			</div>
			
			<div v-if="isshow">
				<el-form-item label="报关单" label-width="200px" class="requireHezi">
					<span class="require" style='left:-64px;'>*</span>
					<upload-pictures :note="uploadTishi2" :url="ruleForm.customsDeclaration" :listen="'listenToPic3'" :picSize='"800.KB"' @listenToPic3="sucpic3" ref="uploadPic3" class="rr"></upload-pictures>
					<div class="example"  @click="iconSimple(src1)">
						<div><img :src='customsDeclarationPic'/></div>
						<span>参考示例</span>
					</div>
				</el-form-item>	
				<el-form-item label="" prop="customsDeclaration"  label-width="200px" class='updata'>
					<el-input v-model="ruleForm.customsDeclaration" class="wid280"></el-input>
				</el-form-item>
				<category-bar :title="categoryBarTitle2"></category-bar>
				<el-form-item prop="domesticOperator" label="国内经营人姓名" label-width="200px">
					<el-input :maxlength="30" v-model="ruleForm.domesticOperator" class="wid400" placeholder="请输入国内经营人姓名"></el-input>
				</el-form-item>	
				<el-form-item prop="domesticOperatorIdCard" label="身份证号"  label-width="200px" >
					<el-input :maxlength="18" v-model="ruleForm.domesticOperatorIdCard" class="wid400" placeholder="请输入身份证号"></el-input>
				</el-form-item>
				<el-form-item prop="domesticOperatorPhone" label="手机号码"  label-width="200px">
					<el-input :maxlength="11" v-model="ruleForm.domesticOperatorPhone" class="wid400" placeholder="请输入手机号码"></el-input>
				</el-form-item>
				
			</div>

			<el-form-item prop="contactMobile" label="联系电话"  label-width="200px">
				<el-input :maxlength="11" v-model="ruleForm.contactMobile" class="wid400" placeholder="请输入联系电话"></el-input>
				<p class="tishi">审核同学有疑问时，会通过此联系方式联系您</p>
			</el-form-item>
			<el-form-item label="" label-width="200px">
				<el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
			</el-form-item>
			<el-dialog
			    title=""
			    top="30%"
				:visible.sync="dialogVisible1"
				:show-close='false'
		        :close-on-click-modal='false'
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
			    <img :src="customsDeclarationPic"/>
			</el-dialog>
		</el-form>
	</section>
	
</template>

<script>
import CategoryBar from '@/components/CategoryBar.vue'/*标题组件*/
import UploadPictures from '@/components/UploadPictures.vue'/*上传图片组件*/
import UploadPictures2 from '@/components/UploadPictures2.vue'/*上传图片组件*/
import { brandSavebrand,brandCheckbrandname,baseBrandGet } from '@/api/shopApi';

export default {
  	components: { 
  		CategoryBar,
  		UploadPictures,
  		UploadPictures2
  	},
	data() {
		var validateNumber1= (rule, value, callback) => {
          var reg =/^\d+$/g;
          if (!value.match(reg)) {
            callback(new Error('请输入正确的商标申请号'));
          } else {
            callback();
          }
        };
        var validateNumber2= (rule, value, callback) => {
           var reg =/(^\d{0,18}$)|(^\d{17}(\d|X|x)$)/g;
            if (!value.match(reg)&&value) {
            callback(new Error('请输入正确的身份证号'));
          } else {
            callback();
          }
        };
        var validateNumber3= (rule, value, callback) => {
          var reg =/^\d+$/g;
          if (!value.match(reg)&&value) {
            callback(new Error('请输入正确的手机号码'));
          } else {
            callback();
          }
        };
        var validateNumber4= (rule, value, callback) => {
          var reg =/^\d+$/g;
          if (!value.match(reg)) {
            callback(new Error('请输入正确的联系电话'));
          } else {
            callback();
          }
        };
      return {
      	isCreat:true,
      	customsDeclarationPic:config.customsDeclaration,
      	listLoading:false,
      	uploadTishi1:"图片尺寸200px*200px以上，大小800k以内，格式png/jpg/jpeg",
      	uploadTishi2:"图片尺寸800px*800px以上，大小800k以内，格式png/jpg/jpeg",
      	categoryBarTitle1: '品牌信息',
      	categoryBarTitle2: '国内经营人信息',
      	dialogVisible1: false,
      	exampleSrc:'',
      	dialogVisible:false,
      	src1:"http://2.hapn.cc:20080/n/00802v_b009W1MMTZ0a02w8.jpg",
      	moren:"",
      	csname:'',
      	ecsname:'',

        ruleForm: {
			registerLocation:'中国大陆',
		 	nameCn: '',
			nameEn: '',
			orign: '',
			trademarkNumber: '',
			trademarkApplicant: "",
			trademarkType:1,
			registerIndustry: '农、林、牧、渔业',
			identity: '',
			ways:"",
			logo:'',
			customsDeclaration:'',
			cityNames:"",
			startValidTime: '',
			endValidTime: '',
			domesticOperator: '',
			domesticOperatorIdCard: '',
			domesticOperatorPhone: "",
			contactMobile:"",
			trademarkCertificate:''
		},
        rules: {
        	logo: [
	            { required: true, message: '请上传品牌LOGO', trigger: 'blur' }
	        ],
        	trademarkCertificate: [
	            { required: true, message: '请上传品牌资质', trigger: 'blur' }
	        ],
	        customsDeclaration: [
	            { required: true, message: '请上传报关单', trigger: 'blur' }
	        ],
	        nameCn: [
	            { required: true, message: '请输入品牌名称', trigger: 'blur' },
	            { min: 1, max: 20, message: '长度在 1 到 20 位', trigger: 'blur' }
	        ],
	        nameEn: [
	            { required: true, message: '请输入品牌英文名称', trigger: 'blur' },
	            { min: 1, max: 50, message: '长度为 1 到 50 位', trigger: 'blur' }
	        ],
	        orign: [
	            { required: true, message: '请输入品牌发源地', trigger: 'blur' },
	            { max: 50, message: '长度最多 50 位', trigger: 'blur' }
	        ],
	        trademarkNumber: [
	            { required: true, message: '请输入商标申请号', trigger: 'blur' },
	            { min: 8, max: 8, message: '请输入正确的商标申请号', trigger: 'blur' },
	            { validator:validateNumber1,trigger: 'blur'},
	            { validator:validateNumber1,trigger: 'change'}
	        ],
	        trademarkApplicant: [
	            { required: true, message: '请输入商标申请人', trigger: 'blur' },
	            { min: 2, max: 30, message: '请输入正确的商标申请人', trigger: 'blur' }
	        ],
	        registerIndustry: [
	            { required: true, message: '请选择品牌注册所属行业', trigger: 'change' }
	        ],
	        ways: [
	            { required: true, message: '请输入授权渠道', trigger: 'blur' },
	            { max: 50, message: '长度最多 50 位', trigger: 'blur' }
	        ],
	        cityNames: [
	            { required: true, message: '请输入授权城市', trigger: 'blur' },
	            { max: 20, message: '长度最多 20 位', trigger: 'blur' }
	        ],
	        endValidTime: [
	            { type: 'date', required: true, message: '请选择有效结束时间', trigger: 'blur' }
	        ],
	        domesticOperator: [
	            { required: true, message: '国内经营人姓名', trigger: 'blur' },
	            { min:2, max: 30, message: '长度为 2 到 30 位', trigger: 'blur' }
	        ],
	        domesticOperatorIdCard: [
	            { message: '请填写身份证号', trigger: 'blur' },
	            { min:18, max: 18, message: '长度为 18 位', trigger: 'blur' },
	            { validator:validateNumber2,trigger: 'blur'},
	            { validator:validateNumber2,trigger: 'change'}
	        ],
	        domesticOperatorPhone: [
	            { message: '请填写手机号码', trigger: 'blur' },
	            { min: 11, max: 11, message: '长度为 11 位', trigger: 'blur' },
	            { validator:validateNumber3,trigger: 'blur'},
	            { validator:validateNumber3,trigger: 'change'}
	        ],
	        contactMobile: [
	            { required: true,  message: '请填写联系电话', trigger: 'blur' },
	            { min: 11, max: 11, message: '长度为 11 位', trigger: 'blur' },
	            { validator:validateNumber4,trigger: 'blur'},
	            { validator:validateNumber4,trigger: 'change'}
	        ]
        }
      };
    },
    computed: {
		isshow:function(){
    		return this.ruleForm.registerLocation=="中国大陆"?false:true;
    	}
    },
   	mounted(){
    	//测试品牌2 更新
    	if(this.$route.query.brandId){
    		this.isCreat=false;//标记是编辑页面
    		var parm={
	    		brandId:this.$route.query.brandId,
	    		storeId:config.storeId
	    	};
			this.listLoading = true;
	        baseBrandGet(parm).then((res) => {
	        	if(res.data.code==0){
	        		this.ruleForm= res.data.data;
	        		if(!this.ruleForm.registerIndustry){
	        			this.ruleForm.registerIndustry="农、林、牧、渔业";
	        		}
	        		this.ruleForm.endValidTime=new Date(this.ruleForm.endValidTime);
	        		this.ruleForm.trademarkType=Number(this.ruleForm.trademarkType);
	        		this.csname=this.ruleForm.nameCn;
	        		this.ecsname=this.ruleForm.nameEn
	        	}else{
	        		this.$message({message: res.data.message,type: 'warning'});
	        	}
	          	this.listLoading = false;
	        }).catch((res)=> {
	          	this.listLoading = false;
	          	this.$message({message: '接口建立连接失败',type: 'warning'});
	        });
    	}
    	
    },
    methods: {
    	
    	/*时间转换为毫秒数*/
    	transitionTime(t){

    		if(t instanceof Date){
    			console.log(t)
    			t=t.getTime();
    		}
    		return t;
    	},
    	/*查找品牌名车是否已存在品牌库*/
    	findName(val){
    		
    		var names=this.ruleForm.nameCn;
    		var tit='';
    		if(val=='english'){
    			names=this.ruleForm.nameEn;
    			tit='英文';
    			if(!(names)||(names==this.ecsname)){
		            return false;
		        }
    		}
    		if(!(names)||(names==this.csname)){
		            return false;
		        }
	        brandCheckbrandname({"name":names}).then((res) => {
	          	if((res.data.code==1)&&(res.data.message=='品牌名称重复')){

	          		this.$message({
			          message: '品牌'+tit+'名称重名，请重新输入',
			          type: 'warning'
			        });
	          	}
	        });
    	},
    	/*提示消息*/
    	hint(tit,type,duration,fun){
    		this.$message({
	            message: tit,
	            type: type,
	            duration:duration,
	            onClose:function(){
	            	fun();
	            }
	        });
    	},
    	/*查看示例图*/
		iconSimple(src){
			this.dialogVisible=true;
		},
    	/*提交按钮*/
	    submitForm(formName) {//this.transitionTime(
	        this.$refs[formName].validate((valid) => {
	            if (valid) {
	          		var para = new URLSearchParams();  
			        para.append('storeId',config.storeId);
			        para.append('trademarkCertificate',this.ruleForm.trademarkCertificate);
			        para.append('ways',this.ruleForm.ways);
			        para.append('cityNames',this.ruleForm.cityNames);
			        para.append('startValidTime','');
			        para.append('endValidTime',this.transitionTime(this.ruleForm.endValidTime));
			        para.append('contactMobile',this.ruleForm.contactMobile);
			        para.append('registerLocation',this.ruleForm.registerLocation);
			        para.append('trademarkNumber',this.ruleForm.trademarkNumber);
			        para.append('trademarkApplicant',this.ruleForm.trademarkApplicant);
			        para.append('trademarkType',this.ruleForm.trademarkType);
			        para.append('nameCn',this.ruleForm.nameCn);

			        para.append('nameEn',this.ruleForm.nameEn);
			        para.append('registerIndustry',this.ruleForm.registerIndustry);
			        para.append('logo',this.ruleForm.logo);
			        para.append('orign',this.ruleForm.orign);
			        para.append('customsDeclaration',this.ruleForm.customsDeclaration);
			        para.append('domesticOperator',this.ruleForm.domesticOperator);
			        para.append('domesticOperatorIdCard',this.ruleForm.domesticOperatorIdCard);
			        para.append('domesticOperatorPhone',this.ruleForm.domesticOperatorPhone);

			        if(this.$route.query.brandId){
			        	para.append('brandId',this.$route.query.brandId);
			        }

			        if(this.ruleForm.registerLocation=="中国大陆"){
			        	para.append('authorizationUrl',this.ruleForm.trademarkCertificate);
			        }else{
			        	para.append('authorizationUrl',this.ruleForm.customsDeclaration);
			        }
			        this.listLoading = true;
			        brandSavebrand(para).then((res) => {
			        	if(res.data.code==0){
			        		
			        		this.dialogVisible1=true;

			        	}else{
			        		if(res.data.message){
					    		this.hint(res.data.message,'warning',2000,function(){
					    			return false;
					    		});
			        		}
			        	}
			          	this.listLoading = false;
			        }).catch((res)=> {
			          	this.listLoading = false;
			          	this.$message.error('接口建立连接失败');
			        });
		        }else {
	            	return false;
	            }
	        });
	    },
        /*切换注册地，清空表单选项*/
        resetForm(formName) {
        	
        	if(this.ruleForm.logo){
        		this.$refs.uploadPic4.revise("");//修改图片的值
        	}
        	

        	if(this.ruleForm.registerLocation=="中国大陆"){
        		if(this.ruleForm.trademarkCertificate){
        			this.$refs.uploadPic1.revise("");//修改图片的值
        		}	

        	}else{
        		if(this.ruleForm.customsDeclaration){
        			this.$refs.uploadPic3.revise("");//修改图片的值
        		}
        		
        	}
        	this.$refs[formName].resetFields();
        	this.ruleForm.trademarkType=1;
        	this.ruleForm.registerIndustry='农、林、牧、渔业';
        	this.ruleForm.trademarkApplicant='';
        },
	    /*返回商户中心按钮*/
	    getBack(){
	    	this.dialogVisible1 = false;
	    	this.$router.push({ path: '/store/brand-management' });
	    },
	    //品牌资质图片上传成功之后
		sucpic1(url){
			this.ruleForm.trademarkCertificate=url;
		},
		//报关单上传成功之后
		sucpic3(url){
			this.ruleForm.customsDeclaration=url;
		},
		//品牌LOGO上传成功之后
		sucpic4(url){
			this.ruleForm.logo=url;
			console.log(url)
			console.log(this.ruleForm.logo)
		}
    }
}
</script>

<style lang="scss">
.create-brand{
	padding-top:10px;
	padding-left:20px;
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
	.gotoPrev{
		width:300px;
		background:#fff;
		height:60px;
		line-height:60px;
		position:fixed;
		top:0;
		left: 240px;
		font-size:14px;
		color:#666666;
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
	.timers{
		.el-form-item__content{
			width:400px;
		}
		.el-input__inner{
			width:400px;
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
				max-height:100%;
			}
		}
	}

}
  
</style>