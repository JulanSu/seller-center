<template>
	<section class="merchant-enter">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			<el-button type="text" class="selector-btn" @click="selector('ruleForm')">{{shopHtml}}</el-button>
			<div v-if="isShop==1">				
				<category-bar :title="categoryBarTitle1"></category-bar>
				<el-form-item label="企业名称" prop="enterpriseName"  label-width="200px">
					<el-input :maxlength="30" v-model="ruleForm.enterpriseName" placeholder="请输入企业名称"  class="wid400"></el-input>
				</el-form-item>
				<el-form-item label="组织机构代码证/营业执照" label-width="200px">
					<upload-pictures :note="uploadTishi1"></upload-pictures>
				</el-form-item>
				<el-form-item label="组织机构代码（注册号）" label-width="200px" prop="orgCode">
					<el-input :maxlength="18" v-model="ruleForm.orgCode" placeholder="请输入组织机构代码（注册号）" class="wid400"></el-input>
				</el-form-item>
				<!-- <el-form-item label="组织机构代码（注册号）" label-width="200px" prop="orgCode">
					<el-input :maxlength="30" v-model = 'ruleForm.searcBarCode' placeholder="请输入组织机构代码（注册号）"  class="wid400"></el-input>
				</el-form-item> -->
			</div>

			<category-bar :title="categoryBarTitle2"></category-bar>
			<div v-if="isShop==1">
				<el-form-item label="法人姓名" label-width="200px" prop="legalPerson">
					<el-input  :maxlength="30" v-model="ruleForm.legalPerson" placeholder="请输入法人姓名" class="wid400"></el-input>
				</el-form-item>
				<el-form-item label="法人身份证" label-width="200px" prop="identityNumber">
					<el-input :maxlength="18" v-model="ruleForm.identityNumber" placeholder="请输入法人身份证号" class="wid400"></el-input>
				</el-form-item>
			</div>
			<div v-else>
				<el-form-item label="联系人手机号" prop="contactMobile" label-width="200px">
					<el-input :maxlength="11" v-model="ruleForm.contactMobile" placeholder="请输入联系人手机号" class="wid400"></el-input>
				</el-form-item>
				<el-form-item label="联系人姓名" label-width="200px" prop="contactName">
					<el-input :maxlength="30" v-model="ruleForm.contactName" placeholder="请输入联系人姓名" class="wid400"></el-input>
				</el-form-item>

				
				<el-form-item label="身份证号" label-width="200px" prop="identityNumber">
					<el-input :maxlength="18" v-model="ruleForm.identityNumber"  placeholder="请输入身份证" class="wid400"></el-input>
				</el-form-item>
			</div>
			<el-form-item label="法人身份证正面" label-width="200px">
				<upload-pictures :note="uploadTishi2"></upload-pictures>
				<div class="example">
					<div @click="iconSimple(src1)"><img src="../../assets/logo.png"/></div>
					<span>参考示例</span>
				</div>
			</el-form-item>
			<el-form-item label="法人身份证反面" label-width="200px">
				<upload-pictures :note="uploadTishi2"></upload-pictures>
				<div class="example">
					<div @click="iconSimple(src1)"><img src="../../assets/logo.png" /></div>
					<span>参考示例</span>
				</div>
			</el-form-item>

			<div v-if="isShop==1">
				<category-bar :title="categoryBarTitle3"></category-bar>
				<el-form-item label="联系人姓名" prop="contactName" label-width="200px">
					<el-input :maxlength="30" v-model="ruleForm.contactName" placeholder="请输入联系人姓名" class="wid400"></el-input>
				</el-form-item>
				<el-form-item  label="联系人手机号" prop="contactMobile" label-width="200px">
					<el-input  :maxlength="11" v-model="ruleForm.contactMobile" name="username" placeholder="请输入联系人手机号" class="wid400"></el-input>
				</el-form-item>	
			</div>

			<category-bar :title="categoryBarTitle4"></category-bar>
			<el-form-item  label="店铺名称" prop="name"  label-width="200px">
				<el-input :maxlength="20" v-model="ruleForm.name" placeholder="请输入店铺名称"  class="wid400"></el-input>
			</el-form-item>
			<el-form-item label="选择您的主营行业 "  prop="selIndustry" label-width="200px">
				<el-button class='selIndustryBtn' @click="selCategory">选择主营行业</el-button>
				<div class="myIndustry" v-if="ruleForm.selIndustry.length">
					<h4>已选：</h4>
					<ul>
						<li v-for="(item,index) in ruleForm.selIndustry">
							<b>{{item[0]}}>{{item[1]}}</b>
							<el-button type="text" @click="delIndustry(index)">删除</el-button>
						</li>
					</ul>
				</div>
				
			</el-form-item>
			
			<el-form-item label="门店地址"  label-width="200px">
				<v-distpicker :province="select.province" :city="select.city" :area="select.area" @province="onProvince" @city="onCity" @selected="onSelected"></v-distpicker>
			</el-form-item>
			<el-form-item label="" label-width="200px" prop="address" class="search-hezi">
				<el-input v-model="ruleForm.address" id="ser" placeholder="输入详细地址" class="wid280" @change="searchDetail" @focus="searchFocus"></el-input>
				<el-button type="primary" class="mapbtn" @click="searchbtn">搜索地图</el-button>
				<ol class="search-ol" v-if="searchKeyArr.length">
					<li>123</li>
				</ol>
			</el-form-item>

			<el-form-item label="经纬坐标" label-width="200px">
				<p>{{ ruleForm.latitude+","+ruleForm.longitude}}</p>
			</el-form-item>
			<el-form-item label="" label-width="200px">
				<map-view :height="height" :longitude="ruleForm.longitude" :latitude="ruleForm.latitude" @listenToChildEvent="showsite" @listenToSel="showKey" ref="MapView">
				</map-view>
			</el-form-item>
			<el-form-item label="" label-width="200px">
				<el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
			</el-form-item>	
			 
		</el-form>

		<el-dialog title="" :visible.sync="dialogVisible" custom-class="big-img">
		    <img :src="exampleSrc"/>
		</el-dialog>

		<el-dialog
		    title=""
		    top="30%"
			:visible.sync="dialogVisible1"
			custom-class="suc"
			size="tiny">
			<div class="suc-string">
				<span class="el-icon-circle-check"></span>
				<div>
					<h2>您已成功提交审核</h2>
			    	<p>我们的审核人员会在1-5个工作日内完成审核</p>
			    	<p>现在前往商户中心，上传商品吧～</p>
				</div>
			</div>
		    
		    <span slot="footer" class="dialog-footer">
			    <el-button type="primary" @click="getBack">立即进入商户中心</el-button>
		    </span>
		</el-dialog>

		<el-dialog
	        title="选择主营行业"
	        top="30%"
	        :visible.sync="dialogVisible2"
	        custom-class="relevance-good"
	        size="tiny">
	      <div class="">
	        <el-row>
		      <el-col :span="8">
		        <category-menu title="一级行业" v-if="categoryData.length" :categoryData="categoryData" @categoryClick="firstHandle">
		        </category-menu>
		      </el-col>
		      <el-col :span="8">
		        <category-menu title="二级行业" v-if="secoundCategoryData.length" :categoryData="secoundCategoryData" @categoryClick="secondHandle"></category-menu>
		      </el-col>
		    </el-row>
		    <div class="category-nav-breadcrumb">
		      <span class="icon-arrow-top arrow-top-a"><span class="icon-arrow-top arrow-top-b"></span></span>
		      <el-breadcrumb separator=">">
		        <span class="breadcrumb-tips">已选：</span>
		        <template v-if="curCateName.length" v-for="(item,index) in curCateName">
		        	<b v-if="index!=0" class="el-breadcrumb__separator">/</b>
		        	<span v-for="(value,index) in item">
		        		<b v-if="index==1" class="el-breadcrumb__separator">&gt;</b>
						<b>{{value}}</b>
		        	</span>
		        </template>
		      </el-breadcrumb>
		    </div>
	      </div>
	        
	        <span slot="footer" class="dialog-footer">
	          <el-button type="primary"  @click="industrySel">确定</el-button>
	          <el-button @click="dialogVisible2 = false">取消</el-button>
	        </span>
	    </el-dialog>
	   
	</section>
	
</template>

<script>
import CategoryBar from '@/components/CategoryBar.vue'/*标题*/
import CategoryMenu from '@/components/CategoryMenu.vue'/*类目选择*/
import UploadPictures from '@/components/UploadPictures.vue'/*上传图片组件*/
import VDistpicker from 'v-distpicker';/*城市三级联动*/
import MapView from '@/components/Map';/*地图组件*/
import { merchantSave,industryListall,gssUpload } from '@/api/shopApi';
// 注册
/*Vue.filter('onlyNumber', function (value) {
  return value.replace(/[^/d]/g,''); 
});*/
export default {
	components: {
		CategoryBar,
		CategoryMenu,
		UploadPictures,
		VDistpicker,
		MapView	
	},
	data() {
		var validatePhone = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入手机号'));
	        } else {
	        	var first=value.slice(0,1);
		        if ((value.length!=11)||(first!=1)) {
		          	callback(new Error('请输入正确的手机号'));
		        }else{
		        	callback();
		        }
	        }
	    };
		return {
			
			//类目选择
			curCateName:[],
			stCateName:'',
			categoryData: [],
			industryCateId:[],
			industryCateIdList:[],
            secoundCategoryData:[],

          	dialogVisible2:false,

			dialogVisible1:false,
			height:300,
			selCity:"",
			selArea:'',
			selProvince:'',
			sel:'',
			isAdd:1,
			select: { 
				province: '省',
			    city: '市',
			    area: '区'
			},
			isShop:1,
			shopHtml:'个人身份入驻请点击这里',
			categoryBarTitle1: '企业信息',
			categoryBarTitle2: '企业法人信息',
			categoryBarTitle3: '联系人信息',
			categoryBarTitle4: '店铺信息',
			uploadTishi1:"请上传800*800px以上，格式要求jpg、jpeg、png,不超过5MB",
			uploadTishi2:"",
			exampleSrc:'',
			dialogVisible:false,
			src1:"http://2.hapn.cc:20080/n/00802v_b009W1MMTZ0a02w8.jpg",

			searchsite:"",
			selcity:"",
			listLoading:false,
			searchKeyArr:[],

			ruleForm: {
				searcBarCode:'',
				enterpriseName:'',
				orgCode: '',
				legalPerson: '',
				identityNumber: '',
				name: '',
				selIndustry:[],
				detailedAddress: '',
				contactName:'',
			    contactMobile:'',
			    enterpriseLicence:'',
			    identityPic:'',
			    longitude:120.186535,
	　　　　	latitude:30.310288,
			    address:''
				
			},
	        rules: {
	          	enterpriseName: [
	            	{ required: true, message: '请输入企业名称', trigger: 'blur' },
	            	{ min: 1, max: 30, message: '长度为 1 到 30 位', trigger: 'blur' }
	          	],
	          	orgCode: [
	            	{ required: true, message: '请输入组织机构代码/注册号', trigger: 'blur' },
	            	{ min: 18, max: 18, message: '请输入正确的组织机构代码（注册码）', trigger: 'blur' }
	          	],
	          	legalPerson: [
	            	{ required: true, message: '请输入姓名', trigger: 'blur' },
	            	{ min: 2, max: 30, message: '请输入正确的姓名', trigger: 'blur' }
	          	],
		        identityNumber: [
		            { required: true, message: '请输入身份证号', trigger: 'blur' },
	            	{ min: 18, max: 18, message: '请输入正确身份证号', trigger: 'blur' }
		        ],
	          	name: [
	            	{ required: true, message: '请输入店铺名称', trigger: 'blur' },
	            	{ min: 1, max: 20, message: '长度为 1 到 20 位', trigger: 'blur' }
	          	],
	          	/*selIndustry:[
	          		{ required: true, message: '请选择主营行业', trigger: 'change' },
	          	],*/
	          	detailedAddress:[
	          		{ required: true, message: '请输入详细地址', trigger: 'blur' },
	          	],
	          	contactName: [
	            	{ required: true, message: '请输入姓名', trigger: 'blur' },
	            	{ min: 2, max: 30, message: '请输入正确的姓名', trigger: 'blur' }
	          	],
		        contactMobile: [
		        	{ validator: validatePhone,trigger: 'blur' }
	          	],
		        address:[
		           { required: true, message: '请输入详细地址', trigger: 'blur' }
		        ]
	          	
	        }

		}
	},
/*	watch:{
		'ruleForm.searcBarCode':function(){
			
            this.ruleForm.searcBarCode=this.ruleForm.searcBarCode.replace(/\W/g,'');
            var newVal=this.ruleForm.searcBarCode;
            console.log(newVal)
            this.$set(this.ruleForm,'searcBarCode',newVal);
            console.log(this.ruleForm.searcBarCode)
        },

		'ruleForm.orgCode':function(){
			this.ruleForm.orgCode=this.ruleForm.orgCode.replace(/[\d]/g,'');
			console.log(this.ruleForm.orgCode)
		}
		'ruleForm.orgCode':function(){
            this.ruleForm.orgCode=this.ruleForm.orgCode.replace(/\D/g,'');
            console.log(this.ruleForm.orgCode)
        }
	},*/
    mounted:function(){
		//调用地图
	    this.$refs.MapView.creatmap(this.ruleForm.longitude,this.ruleForm.latitude);

	    //获取行业数据
	    industryListall({}).then((res) => {
	        this.categoryData = res.data.data;
	    });

	    var that=this;
	    window.document.onclick=function(){
	    	that.$refs.MapView.clearKey();
	    }

    },
	methods: {
		//搜索关键字后点击筛选下拉结果，点击的元素的值传给父元素的input输入框
		showKey(key){
			this.ruleForm.address=key;
		},
		searchFocus(){
			var addr=this.selProvince+this.selCity+this.selArea+this.ruleForm.address;
			if(!addr){
				this.$message({
		          message: '请先选择省市区',
		          type: 'warning'
		        });
			}
		},
		//地图输入框输入时匹配地址
		searchDetail(){
			var addr=this.selProvince+this.selCity+this.selArea+this.ruleForm.address;
			this.$refs.MapView.againmap(this.ruleForm.longitude,this.ruleForm.latitude,addr,this.ruleForm.address);

		},
		/*filterNumber(value){
			this.ruleForm.orgCode=this.ruleForm.orgCode.replace(/[^/d]/g,'');
		},*/
		//选择行业
		selCategory(){
			this.dialogVisible2=true;
			this.curCateName=[];
			this.secoundCategoryData=[];
		},
		//一级类目选择事件
		firstHandle (row, index){

			this.stCateName='';
			this.stCateName=row.industryCateName;
	        if(row.secondIndustryList.length) {
	            this.secoundCategoryData = row.secondIndustryList;
	        }else {
	            this.secoundCategoryData = [];
	        }
        },
        //二级类目选择事件
        secondHandle (row, index) {
        	var maxArr=this.ruleForm.selIndustry.concat(this.curCateName);
   			this.industryCateId.push(row.industryCateId);
        	if(maxArr.length>9){
        		this.$message({
		          message: '主营行业不能超过10个哦',
		          type: 'warning'
		        });
		        return false;
        	}

        	this.curCateName.push([this.stCateName,row.industryCateName]);


        },
        //选择行业的确定按钮
        industrySel(){
        	if (this.curCateName.length==0) {
        		return false;
        	}else{
        		this.ruleForm.selIndustry=this.ruleForm.selIndustry.concat(this.curCateName);
        		this.industryCateIdList=this.industryCateIdList.concat(this.industryCateId);
				
        		this.dialogVisible2=false;
        	}
        },
        //删除所选行业
        delIndustry(index){
        	Array.prototype.baoremove = function(dx) 
			{ 
			  if(isNaN(dx)||dx>this.length){return false;} 
			  this.splice(dx,1); 
			} 
        	this.ruleForm.selIndustry.baoremove(index);
        	this.industryCateIdList.baoremove(index);
        },
		/*查看示例图*/
		iconSimple(src){
			this.exampleSrc=src;
			this.dialogVisible=true;
		},

		/*城市三级联动，选择城市后将数据存储起来，点击搜索地图按钮时，加在自己输入的地址之前*/
		onProvince(data) {
		    this.select.province=data.value;
		    if(data.code){
		    	this.selProvince=data.value;
		    }else{
		    	this.selProvince='';
		    }
		    this.selCity='';
		    this.selArea="";
	    },
	    onCity(data){
	    	this.select.city=data.value;
	    	if(data.code){
		    	this.selCity=data.value;
		    }else{
		    	this.selCity='';
		    }
		    this.selArea="";
	    },
	    onSelected(data){
	    	this.select.area=data.area.value;
	    	if(data.area.code){
		    	this.selArea=data.area.value;
		    }else{
		    	this.selArea='';
		    }
	    },
	    /*点击搜索地图调用map子组件里面的地图事件*/
		searchbtn(){
			var addr=this.selProvince+this.selCity+this.selArea+this.ruleForm.address
			this.$refs.MapView.againmap(this.ruleForm.longitude,this.ruleForm.latitude,addr);
		},
		/*地图组件更改后传递数据到父组件*/
		showsite(lng,lat){
			this.ruleForm.longitude=lng;
			this.ruleForm.latitude=lat;
		},
		/*点击切换企业和个人店铺*/
		selector(formName){
			this.$refs[formName].resetFields();/*清空输入的内容*/
			this.select= { province: '选择省',city: '选择市',area: '选择区'};
			if(this.isShop==1){/*isShop为1是企业店铺*/
				this.isShop=0;
				this.shopHtml="企业身份入驻请点击这里";
				
			}else{
				this.isShop=1;
				this.shopHtml="个人身份入驻请点击这里";
			}
		},
		/*保存按钮*/
		submitForm(formName) {
		    this.$refs[formName].validate((valid) => {
	            if (valid) {
		      		if(!this.selProvince){//如果没有选择省，提示选择省市区
						this.$message({
				          message: '请选择省市区',
				          type: 'warning'
				        });
				        return false;
					}else{//选择了城市，将选择的城市拼接
						this.sel=this.selProvince;
						if(this.selCity){
							this.sel+="*"+this.selCity;
						}
						if(this.selArea){
							this.sel+="*"+this.selArea;
						}
					}
		        	this.listLoading = true;
		            var para = new URLSearchParams();
		            para.append('userId',userId);
		            para.append('enterpriseName',this.ruleForm.enterpriseName);
		            para.append('enterpriseLicence',this.ruleForm.enterpriseLicence);
		            para.append('orgCode',this.ruleForm.orgCode);
		            para.append('legalPerson',this.ruleForm.legalPerson);
		            para.append('identityNumber',this.ruleForm.identityNumber);
		            para.append('identityPic',this.ruleForm.identityPic);		          
		            para.append('contactName',this.ruleForm.contactName);
		            para.append('contactMobile',this.ruleForm.contactMobile);
		            para.append('name',this.ruleForm.name);
		            para.append('industryCateIdList',this.industryCateIdList);
		            para.append('address',this.ruleForm.address);
		            para.append('longitude',Number(this.ruleForm.longitude*1000000));
					para.append('latitude',Number(this.ruleForm.latitude*1000000));

		            merchantSave(para).then((res)=> {
		            	this.listLoading = false;
		            	if(res.data.code==0){
		            		this.dialogVisible1=true;
		            	}
		                
		            }).catch((res)=> {
		                this.listLoading = false;
		            });
		      	}else {
		        	return false;
		      	}
		    });
		},
		/*返回商户中心按钮*/
	    getBack(){
	    	this.dialogVisible1 = false;
	    	this.$router.push({ path: '/seller-management/goods' });
	    }

	}
}
</script>
<style lang="scss">
.search-hezi{
	position:relative;
	.search-ol{
		border:1px solid rgb(191, 216, 217);
		position:absolute;
		top:36px;
		width:280px;
		background:#fff;
		z-index:999;
		padding-left:10px;
	}
}
</style>
