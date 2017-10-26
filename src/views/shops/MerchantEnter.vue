<template>
	<section class="merchant-enter">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			<el-button type="text" class="selector-btn" @click="selector('ruleForm')">{{shopHtml}}</el-button>
			<div v-if="isShop==1">				
				<category-bar :title="categoryBarTitle1"></category-bar>
				<el-form-item label="企业名称" prop="enterpriseName"  label-width="200px">
					<el-input v-model="ruleForm.enterpriseName" placeholder="请输入企业名称"  class="wid400"></el-input>
				</el-form-item>
				<el-form-item label="组织机构代码证/营业执照" label-width="200px">
					<upload-pictures :note="uploadTishi1"></upload-pictures>
				</el-form-item>
				<el-form-item label="组织机构代码（注册号）" label-width="200px" prop="orgCode">
					<el-input v-model="ruleForm.orgCode" placeholder="请输入组织机构代码（注册号）" class="wid400"></el-input>
				</el-form-item>
			</div>

			<category-bar :title="categoryBarTitle2"></category-bar>
			<div v-if="isShop==1">
				<el-form-item label="法人姓名" label-width="200px" prop="legalPerson">
					<el-input v-model="ruleForm.legalPerson" placeholder="请输入法人姓名" class="wid400"></el-input>
				</el-form-item>
				<el-form-item label="法人身份证" label-width="200px" prop="identityNumber">
					<el-input v-model="ruleForm.identityNumber" placeholder="请输入法人身份证号" class="wid400"></el-input>
				</el-form-item>
			</div>
			<div v-else>
				<el-form-item label="联系人手机号" prop="contactMobile" label-width="200px">
					<el-input v-model="ruleForm.contactMobile" placeholder="请输入联系人手机号" class="wid400"></el-input>
				</el-form-item>
				<el-form-item label="联系人姓名" label-width="200px" prop="contactName">
					<el-input v-model="ruleForm.contactName" placeholder="请输入联系人姓名" class="wid400"></el-input>
				</el-form-item>

				
				<el-form-item label="身份证号" label-width="200px" prop="identityNumber">
					<el-input v-model="ruleForm.identityNumber" placeholder="请输入身份证" class="wid400"></el-input>
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
					<el-input v-model="ruleForm.contactName" placeholder="请输入联系人姓名" class="wid400"></el-input>
				</el-form-item>
				<el-form-item label="联系人手机号" prop="contactMobile" label-width="200px">
					<el-input v-model="ruleForm.contactMobile" name="username" placeholder="请输入联系人手机号" class="wid400"></el-input>
				</el-form-item>	
			</div>

			<category-bar :title="categoryBarTitle4"></category-bar>
			<el-form-item label="店铺名称" prop="name"  label-width="200px">
				<el-input v-model="ruleForm.name" placeholder="请输入店铺名称"  class="wid400"></el-input>
			</el-form-item>
			<el-form-item label="选择您的主营行业 "  prop="selIndustry" label-width="200px">
				<el-button class='selIndustryBtn'>选择主营行业</el-button>
				<div class="myIndustry" v-if="ruleForm.selIndustry">
					<h4>已选：</h4>
					<ul>
						<li>
							<b>家装>卫浴陶瓷</b>
							<el-button type="text">删除</el-button>
						</li>
					</ul>
				</div>
				
			</el-form-item>
			
			<el-form-item label="门店地址"  label-width="200px">
				<v-distpicker :province="select.province" :city="select.city" :area="select.area" @province="onProvince" @city="onCity" @selected="onSelected"></v-distpicker>
			</el-form-item>
			<el-form-item label="" label-width="200px" prop="address">
				<el-input v-model="ruleForm.address" placeholder="输入详细地址" class="wid280"></el-input>
				<el-button type="primary" class="mapbtn" @click="searchbtn">搜索地图</el-button>
			</el-form-item>
			<el-form-item label="经纬坐标" label-width="200px">
				<p>{{ ruleForm.latitude+","+ruleForm.longitude}}</p>
			</el-form-item>
			<el-form-item label="" label-width="200px">
				<map-view :height="height" :longitude="ruleForm.longitude" :latitude="ruleForm.latitude" @listenToChildEvent="showsite" ref="MapView">
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
			size="tiny">
			<div class="suc">
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
	</section>
	
</template>

<script>
import CategoryBar from '@/components/CategoryBar.vue'/*标题*/
import UploadPictures from '@/components/UploadPictures.vue'/*上传图片组件*/
import VDistpicker from 'v-distpicker';/*城市三级联动*/
import MapView from '@/components/Map';/*地图组件*/
import { merchantSave } from '@/api/shopApi';

export default {
	components: {
		CategoryBar,
		UploadPictures,
		VDistpicker,
		MapView	
	},
	data() {
		return {
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

			ruleForm: {
				enterpriseName:'',
				orgCode: '',
				legalPerson: '',
				identityNumber: '',
				name: '',
				selIndustry:"1",
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
	            	{ min: 18, max: 18, message: '长度为 18 位', trigger: 'blur' }
	          	],
	          	legalPerson: [
	            	{ required: true, message: '请输入法人姓名', trigger: 'blur' },
	            	{ min: 2, max: 30, message: '长度为 2 到 30 位', trigger: 'blur' }
	          	],
		        identityNumber: [
		            { required: true, message: '请输入法人身份证号码', trigger: 'blur' },
	            	{ min: 18, max: 18, message: '长度为 18 位', trigger: 'blur' }
		        ],
	          	name: [
	            	{ required: true, message: '请输入店铺名称', trigger: 'blur' },
	            	{ min: 1, max: 20, message: '长度为 1 到 20 位', trigger: 'blur' }
	          	],
	          	selIndustry:[
	          		{ required: true, message: '请选择主营行业', trigger: 'change' },
	          	],
	          	detailedAddress:[
	          		{ required: true, message: '请输入详细地址', trigger: 'blur' },
	          	],
	          	contactName: [
	            	{ required: true, message: '请输入联系人姓名', trigger: 'blur' },
	            	{ min: 2, max: 30, message: '长度为 2 到 30 位', trigger: 'blur' }
	          	],
		        contactMobile: [
	            	{ required: true, message: '请输入联系人手机号码',trigger: 'blur' },
	            	{ min: 11, max: 11, message: '长度为 11 位', trigger: 'blur' }
	          	],
		        address:[
		           { required: true, message: '请输入详细地址', trigger: 'blur' }
		        ]
	          	
	        }

		}
	},
    mounted:function(){
		//调用地图
	    this.$refs.MapView.creatmap(this.ruleForm.longitude,this.ruleForm.latitude);

    },
	methods: {
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
			this.select= { province: '省',city: '市',area: '区'};
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
		            para.append('industryCateIdList',["1","1"]);
		            para.append('address',this.ruleForm.address);
		            para.append('longitude',Number(this.ruleForm.latitude*1000000));
					para.append('latitude',Number(this.ruleForm.longitude*1000000));
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
.merchant-enter{
	position:relative;
	/* 公共样式 */
	p,ul,ol,li,h4{
		margin: 0;
		padding:0;
	}
	ol,ul{
		list-style: none;
	}
    .wid400{
    	width:400px;
    }
    .wid280{
    	width:280px;
    }

    /* 只读样式 */
    .exhibition{
    	padding-left:10px;
    	font-size:14px;
		color:#333333;
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
		span{
			float:right;
			font-size: 14px;
			color: #666666;
			line-height:40px;
			padding-right:20px;
		}
		div{
			cursor:pointer;
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

    .selector-btn{
    	padding:0;
    	position:absolute;
    	right:20px;
    	top:40px;
    	height:22px;
    	line-height:22px;
    	font-size:16px;
		color:#41cac0;
    }
    .category-bar{
    	padding:40px 0 20px 40px;
    }

    .selIndustryBtn{
    	background:#eeeeee;
    	width:118px;
    }
    .myIndustry{
    	width:398px;
    	border:1px solid #eee;
    	margin-top:20px;
    	font-size:14px;
		color:#333333;
    	h4{
    		background:#f5f7fa;
			width:398px;
			height:38px;
			line-height:38px;
			padding-left:20px;
			font-weight:normal;
    	}
    	li{
    		border-top:1px solid #eee;
    		padding:0 20px;
    		b{
    			font-weight:normal;
    		}
    		.el-button--text{
    			float:right;
    			span{
    				color:#ff0201;
    			}
    			span:hover{
    				text-decoration: underline;
    			}
    		}

    	}
    	
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
}
    
</style>