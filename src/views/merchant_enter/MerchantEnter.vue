<template>
	<section class="merchant-enter" id="merchant-enter">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			<el-button type="text" class="selector-btn" @click="selector('ruleForm')">{{shopHtml}}</el-button>
			<div v-if="isShop==1">				
				<category-bar :title="categoryBarTitle1"></category-bar>
				<el-form-item label="企业名称" prop="enterpriseName"  label-width="200px">
					<el-input :maxlength="30" v-model="ruleForm.enterpriseName" placeholder="请输入企业名称"  class="wid400"  ></el-input>
				</el-form-item>
				<el-form-item label="组织机构代码证/营业执照" label-width="200px" class='requireHezi'>
					<span class="require" style='left:-180px;'>*</span>
					<upload-pictures :note="uploadTishi1" :url="ruleForm.enterpriseLicence" :listen="'listenToPic1'" :picSize='"5.MB"' @listenToPic1="sucpic1"  ref="uploadPic1"></upload-pictures>
				</el-form-item>
				<el-form-item label="" prop="enterpriseLicence"  label-width="200px" class='updata'>
					<el-input v-model="ruleForm.enterpriseLicence" class="wid280"></el-input>
				</el-form-item>
				<el-form-item label="组织机构代码（注册号）" label-width="200px" prop="orgCode">
					<el-input :maxlength="20" v-model="ruleForm.orgCode" placeholder="请输入组织机构代码（注册号）" class="wid400"></el-input>
				</el-form-item>
			</div>
			<div v-if="isShop==1">	
				<category-bar :title="categoryBarTitle2"></category-bar>
			</div>
			<div v-else>	
				<category-bar :title="categoryBarTitle5"></category-bar>
			</div>
			<div v-if="isShop==1">
				<el-form-item label="法人姓名" label-width="200px" prop="legalPerson">
					<el-input  :maxlength="30" v-model="ruleForm.legalPerson" placeholder="请输入法人姓名" class="wid400"></el-input>
				</el-form-item>
				<el-form-item label="法人身份证" label-width="200px" prop="identityNumber">
					<el-input :maxlength="18" v-model="ruleForm.identityNumber" placeholder="请输入法人身份证号" class="wid400"></el-input>
				</el-form-item>
			</div>
			<div v-else>
				<el-form-item label="联系人姓名" label-width="200px" prop="legalPerson">
					<el-input :maxlength="30" v-model="ruleForm.legalPerson" placeholder="请输入联系人姓名" class="wid400"></el-input>
				</el-form-item>
				<el-form-item label="联系人手机号" prop="legalMobile" label-width="200px">
					<el-input :maxlength="11" v-model="ruleForm.legalMobile" placeholder="请输入联系人手机号" class="wid400"></el-input>
				</el-form-item>
				
				<el-form-item label="身份证号" label-width="200px" prop="identityNumber">
					<el-input :maxlength="18" v-model="ruleForm.identityNumber"  placeholder="请输入身份证" class="wid400"></el-input>
				</el-form-item>
			</div>
			<el-form-item :label="ident1" label-width="200px"  class="requireHezi">
				<div v-if="isShop==1">
					<span class="require" style='left:-120px;'>*</span>
				</div>
				<div v-else>
					<span class="require" style='left:-90px;'>*</span>
				</div>
				<upload-pictures :note="uploadTishi2" :url="ruleForm.identityPic1" :listen="'listenToPic2'" :picSize='"800.KB"' @listenToPic2="sucpic2" ref="uploadPic2"></upload-pictures>
				<div class="example">
					<div @click="iconSimple(2)"><img :src='identPic2'/></div>
					<span>参考示例</span>
				</div>
				
			</el-form-item>
			<el-form-item label="" prop="identityPic1"  label-width="200px" class='updata'>
				<el-input v-model="ruleForm.identityPic1" class="wid280"></el-input>
			</el-form-item>
			<el-form-item :label="ident2" label-width="200px" class="requireHezi">
				<div v-if="isShop==1">
					<span class="require" style='left:-120px;'>*</span>
				</div>
				<div v-else>
					<span class="require" style='left:-90px;'>*</span>
				</div>
				<upload-pictures :note="uploadTishi2" :url="ruleForm.identityPic2" :listen="'listenToPic3'" :picSize='"800.KB"' @listenToPic3="sucpic3"  ref="uploadPic3"></upload-pictures>

				<div class="example">
					<div @click="iconSimple(1)"><img :src='identPic1' /></div>
					<span>参考示例</span>
				</div>
				
			</el-form-item>
			<el-form-item label="" prop="identityPic2"  label-width="200px" class='updata'>
				<el-input v-model="ruleForm.identityPic2" class="wid280"></el-input>
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
				<el-input :maxlength="20" v-model="ruleForm.name" placeholder="请输入店铺名称"  class="wid400" @blur="findName"></el-input>
			</el-form-item>
			<el-form-item label="选择您的主营行业 "  label-width="200px" class="requireHezi">
				<span class="require" style='left:-133px;'>*</span>
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
			<!-- <el-form-item label="" label-width="200px"  prop="selIndustry">
				<el-input  :maxlength="11" v-model="ruleForm.selIndustry" name="username" placeholder="请输入联系人手机号" class="wid400"></el-input>
			</el-form-item> -->
			
			<el-form-item label="门店地址"  label-width="200px" prop="address">
				<v-distpicker :province="select.province" :city="select.city" :area="select.area" @province="onProvince" @city="onCity" @selected="onSelected"></v-distpicker>
			</el-form-item>
			<el-form-item label="" label-width="200px" prop="address" class="search-hezi xxAddress">
				<el-input v-model="ruleForm.address" id="ser" placeholder="输入详细地址" class="wid280"></el-input>
				<el-button type="primary" class="mapbtn" @click="searchbtn">搜索地图</el-button>

			</el-form-item>

			<el-form-item label="经纬坐标" label-width="200px">
				<p>{{ ruleForm.longitude+","+ruleForm.latitude}}</p>
			</el-form-item>
			<el-form-item label="" label-width="200px">
				<map-view :longitude="ruleForm.longitude" :latitude="ruleForm.latitude" @listenToChildEvent="showsite" @listenTolongitude="getResult" ref="MapView">
				</map-view>
			</el-form-item>
			<el-form-item label="" label-width="200px">
				<el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
			</el-form-item>	
			 
		</el-form>

		<el-dialog title="" :visible.sync="dialogVisible3" custom-class="big-img">
		    <img :src="identPic1"/>
		</el-dialog>

		<el-dialog title="" :visible.sync="dialogVisible4" custom-class="big-img">
		    <img :src="identPic2"/>
		</el-dialog>

		<el-dialog
		    title=""
		    top="30%"
		    :show-close='false'
		    :close-on-click-modal='false'
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
		        <category-menu title="一级行业" v-if="categoryData.length" :ind="index1" :categoryData="categoryData" @categoryClick="firstHandle" :arrKey="'secondIndustryList'">
		        </category-menu>
		      </el-col>
		      <el-col :span="8" id="erji">
		        <category-menu title="二级行业" v-if="secoundCategoryData.length" :ind="index2" :categoryData="secoundCategoryData" @categoryClick="secondHandle" :arrKey="'catePath'" ref="secMenu"></category-menu>
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
import CategoryMenu from '@/components/CategoryMenu2.vue'/*类目选择*/
import UploadPictures from '@/components/UploadPictures.vue'/*上传图片组件*/
import VDistpicker from 'v-distpicker';/*城市三级联动*/
import MapView from '@/components/Map1';/*地图组件*/
import { merchantSave,industryListall,storeCheckname} from '@/api/shopApi';
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
	    var validateNumber1= (rule, value, callback) => {
          var reg =/^[0-9a-zA_Z]+$/g;
          if (!value.match(reg)) {
            callback(new Error('请输入正确的组织机构代码（注册号）'));
          } else {
            callback();
          }
	    };
	    var validateNumber2= (rule, value, callback) => {
	        var reg =/(^\d{0,18}$)|(^\d{17}(\d|X|x)$)/g;
            if (!value.match(reg)) {
	            callback(new Error('请输入正确身份证号'));
	        } else {
	            callback();
	        }
	    };
	    var validateNumber3= (rule, value, callback) => {
	        var reg =/^\d+$/g;
            if (!value.match(reg)) {
	            callback(new Error('请输入正确的手机号'));
	        } else {
	            callback();
	        }
	    };
		return {
			index1:"-1",
			index2:"-1",

			identPic1:config.ident1,
			identPic2:config.ident2,
			//类目选择
			curCateName:[],
			stCateName:'',
			categoryData: [],
			industryCateId:[],
			ident1:'法人身份证正面',
			ident2:"法人身份证反面",
			
            secoundCategoryData:[],
            dialogVisible4:false,
          	dialogVisible3:false,

			dialogVisible1:false,
			dialogVisible2:false,
			height:300,
			selCity:"",
			selArea:'',
			selProvince:'',
			sel:'',
			isAdd:1,
			select: { 
				province: '',
			    city: '',
			    area: ''
			},
			isShop:1,
			shopHtml:'个人身份入驻请点击这里',
			categoryBarTitle1: '企业信息',
			categoryBarTitle2: '企业法人信息',
			categoryBarTitle3: '联系人信息',
			categoryBarTitle4: '店铺信息',
			categoryBarTitle5: '个人信息',
			uploadTishi1:"请上传800*800px以上，格式要求jpg、jpeg、png，不超过5MB",
			uploadTishi2:"",
			exampleSrc:'',
			dialogVisible:false,
			src1:"http://2.hapn.cc:20080/n/00802v_b009W1MMTZ0a02w8.jpg",

			searchsite:"",
			selcity:"",
			listLoading:false,
			searchKeyArr:[],

			ruleForm: {
				industry:'',
				industryCateIdList:[],
				identityPic1:'',
				identityPic2:'',
				enterpriseLicence:'',
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
			    identityPic:'',
			    longitude:'',
	　　　　	latitude:'',
			    address:'',
			    legalMobile:'',
				
			},
	        rules: {
	        	enterpriseLicence: [
	            	{ required: true, message: '请上传组织结构代码证/营业执照', trigger: 'blur' }
	          	],
	          	identityPic1: [
	            	{ required: true, message: '请上传法人身份证正面', trigger: 'blur' }
	          	],
	          	identityPic2: [
	            	{ required: true, message: '请上传法人身份证反面', trigger: 'blur' }
	          	],
	          	enterpriseName: [
	            	{ required: true, message: '请输入企业名称', trigger: 'blur' },
	            	{ min: 1, max: 30, message: '长度为 1 到 30 位', trigger: 'blur' }
	          	],
	          	orgCode: [
	            	{ required: true, message: '请输入组织机构代码（注册号）', trigger: 'blur' },
	            	{ min: 1, max: 20, message: '请输入正确的组织机构代码（注册号）', trigger: 'blur' },
	            	{ validator:validateNumber1,trigger: 'blur'},
	            	{ validator:validateNumber1,trigger: 'change'}
	          	],
	          	legalPerson: [
	            	{ required: true, message: '请输入姓名', trigger: 'blur' },
	            	{ min: 2, max: 30, message: '请输入正确的姓名', trigger: 'blur' }
	          	],
		        identityNumber: [
		            { required: true, message: '请输入身份证号', trigger: 'blur' },
	            	{ min: 18, max: 18, message: '请输入正确身份证号', trigger: 'blur' },
	            	 { validator:validateNumber2,trigger: 'blur'},
	            	 { validator:validateNumber2,trigger: 'change'}
		        ],
	          	name: [
	            	{ required: true, message: '请输入店铺名称', trigger: 'blur' },
	            	{ min: 1, max: 20, message: '长度为 1 到 20 位', trigger: 'blur' }
	          	],
	          	detailedAddress:[
	          		{ required: true, message: '请输入详细地址', trigger: 'blur' },
	          	],
	          	contactName: [
	            	{ required: true, message: '请输入姓名', trigger: 'blur' },
	            	{ min: 2, max: 30, message: '请输入正确的姓名', trigger: 'blur' }
	          	],
		        contactMobile: [
		        	{ required: true,validator: validatePhone,trigger: 'blur' },
		        	{ validator:validateNumber3,trigger: 'blur'},
		        	{ validator:validateNumber3,trigger: 'change'}

	          	],
		        legalMobile: [
		        	{ required: true,validator: validatePhone,trigger: 'blur' },
		        	{ validator:validateNumber3,trigger: 'blur'},
		        	{ validator:validateNumber3,trigger: 'change'}

	          	],
		        address:[
		           { required: true, message: '请输入详细地址', trigger: 'blur' }
		        ],
		        industry:[
		          { required: true, message: '请选择主营行业', trigger: 'blur' },
		        ]
	          	
	        }

		}
	},

    mounted:function(){
    	if(localStorage.getItem('merchant')==1){
    		this.$router.push({ path: '/store/message'});
    	}

	    //获取行业数据
	    industryListall({storeId: config.storeId}).then((res) => {
	    	if(res.data.code==0){
	    		this.categoryData = res.data.data;
	    	}   
	    })    

    },
	methods: {
		/*地图组件更改后传递数据到父组件*/
		showsite(lng,lat){
			this.ruleForm.longitude=lng;
			this.ruleForm.latitude=lat;
		},
		/*点击搜索地图调用map子组件里面的地图事件*/
		searchbtn(){
			var addr=this.ruleForm.address;
			this.$refs.MapView.searchMap(addr);
		},
		//子组件里面的input内容传递给父组件的搜索框
		getResult:function(h){
			this.ruleForm.address=h;
		},
		/*查找账号是否已存在*/
	    findName(val){
	        if(!this.ruleForm.name){
	          return false;
	        }
	        storeCheckname({"storeName":this.ruleForm.name,storeId: config.storeId}).then((res) => {
	            if(res.data.code==1){
	              this.$message.error('店铺重名，请重新填写');
	            }
	        });
	    },
		//组织机构代码证／营业执照上传成功之后
		sucpic1(url){
			this.ruleForm.enterpriseLicence=url;
		},
		//法人身份证正面上传成功之后
		sucpic2(url){
			this.ruleForm.identityPic1=url;
		},
		//法人身份证反面上传成功之后
		sucpic3(url){
			this.ruleForm.identityPic2=url;
		},

		//选择行业
		selCategory(){
			//删除刚才一级选中的状态
	        var o=document.querySelectorAll(".is-active")[0];
	        if(o){
	        	var cla=o.getAttribute("class");
	        	cla=cla.replace("is-active",'');
	        	o.setAttribute("class",cla);
	        }
        	
			this.dialogVisible2=true;
			this.curCateName=[];
			this.secoundCategoryData=[];
			this.industryCateId=[];

		},

		//一级类目选择事件
		firstHandle (row, index){
			this.index2="";
			this.stCateName='';
			this.stCateName=row.industryCateName;
			this.secoundCategoryData = [];
	        if(row.secondIndustryList.length) {
	            this.secoundCategoryData = row.secondIndustryList;
	        }

	        //删除刚才二级选中的状态
	        var o=document.querySelector("#erji").querySelectorAll(".is-active")
	        console.log(o)
	        for(var i=0;i<o.length;i++){
	        	var cla=o[i].getAttribute("class");
	        	cla=cla.replace("is-active",'');
	        	o[i].setAttribute("class",cla);
	        }
        },

        //二级类目选择事件
        secondHandle (row, index) {
        	var maxArr=this.ruleForm.selIndustry.concat(this.curCateName);
   			
        	if(maxArr.length>9){
        		this.$message({message: '主营行业不能超过10个哦',type: 'warning'});
		        return false;
        	}
        	
        	var strJson=this.curCateName.join(",");
        	var str=this.stCateName+","+row.industryCateName;

        	var selIndustryJson =this.ruleForm.selIndustry.join(",");
        	if((strJson.indexOf(str)>=0)||(selIndustryJson.indexOf(str)>=0)){
        		this.$message({message: '该主营行业已选过',type: 'warning'});
        	}else{
        		this.curCateName.push([this.stCateName,row.industryCateName]);
        		this.industryCateId.push(row.industryCateId);
        	}
        	

        },
        //选择行业的确定按钮
        industrySel(){
        	if (this.curCateName.length==0) {
        		return false;
        	}else{
        		this.ruleForm.selIndustry=this.ruleForm.selIndustry.concat(this.curCateName);
        		this.ruleForm.industryCateIdList=this.ruleForm.industryCateIdList.concat(this.industryCateId);



        		this.dialogVisible2=false;

        	}
        },
        //删除所选行业
        delIndustry(index){
        	console.log(index);
			this.$delete(this.ruleForm.selIndustry, index);
			this.$delete(this.ruleForm.industryCateIdList, index);
        },
		/*查看示例图*/
		iconSimple(v){
			if(v==1){
				this.dialogVisible3=true;
			}else{
				this.dialogVisible4=true;
			}
			
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
			var addr=this.ruleForm.address;
			this.$refs.MapView.searchMap(addr);
		},
		/*地图组件更改后传递数据到父组件*/
		showsite(lng,lat){
			this.ruleForm.longitude=lng;
			this.ruleForm.latitude=lat;
		},
		/*点击切换企业和个人店铺*/
		selector(formName){
			this.$refs[formName].resetFields();/*清空输入的内容*/
			
			this.$refs.uploadPic2.revise("");//修改图片的值
			this.$refs.uploadPic3.revise("");//修改图片的值
			this.ruleForm.selIndustry=[];
			this.ruleForm.industryCateIdList=[];
			//this.select= { province: '选择省',city: '选择市',area: '选择区'};
			if(this.isShop==1){/*isShop为1是企业店铺*/
				this.isShop=0;
				this.shopHtml="企业身份入驻请点击这里";
				this.ident1='身份证正面';
				this.ident2="身份证反面";
				this.$refs.uploadPic1.revise("");//修改图片的值
				
			}else{
				this.isShop=1;
				this.shopHtml="个人身份入驻请点击这里";
				this.ident1='法人身份证正面';
				this.ident2="法人身份证反面";
			}
			this.select= { 
				province: '省',
			    city: '市',
			    area: '区'
			};
		},
		/*保存按钮*/
		submitForm(formName) {
		    this.$refs[formName].validate((valid) => {
	            if (valid) {
	            	if(!this.ruleForm.industryCateIdList.length){
	            		this.$message({
				          message: '请选择主营行业',
				          type: 'warning'
				        });
				        return false;
	            	}

		      		if(!this.selProvince){//如果没有选择省，提示选择省市区
						/*this.$message({
				          message: '请选择省市区',
				          type: 'warning'
				        });
				        return false;*/
					}else{//选择了城市，将选择的城市拼接
						this.sel=this.selProvince;
						if(this.selCity){
							this.sel+="*"+this.selCity;
						}
						if(this.selArea){
							this.sel+="*"+this.selArea;
						}
						this.sel=this.sel+"*";
					}

					var storeType=this.isShop==1?1:2;
		        	this.listLoading = true;


		            var para = new URLSearchParams();
		            para.append('storeId',config.storeId);
		            para.append('userId',config.uid);
		            para.append('shopType',storeType);
		            para.append('enterpriseName',this.ruleForm.enterpriseName);
		            para.append('enterpriseLicence',this.ruleForm.enterpriseLicence);
		            para.append('orgCode',this.ruleForm.orgCode);
		            para.append('legalPerson',this.ruleForm.legalPerson);
		            para.append('identityNumber',this.ruleForm.identityNumber);
		            para.append('identityPic',this.ruleForm.identityPic1+','+this.ruleForm.identityPic2);		          
		            para.append('contactName',this.ruleForm.contactName);
		            para.append('contactMobile',this.ruleForm.contactMobile);
		            para.append('name',this.ruleForm.name);
		            para.append('industryCateIdList',this.ruleForm.industryCateIdList);
		            para.append('address',this.sel+this.ruleForm.address);
		            para.append('longitude',Number(this.ruleForm.longitude*1000000));
					para.append('latitude',Number(this.ruleForm.latitude*1000000));

					if(this.isShop!=1){//个人
						para.append('legalMobile',this.ruleForm.legalMobile);
						
					}

		            merchantSave(para).then((res)=> {
		            	this.listLoading = false;
		            	if(res.data.code==0){
		            		this.dialogVisible1=true;
		            	}else{
		            		this.$message.error(res.data.message);
		            	}
		                
		            }).catch((res)=> {
		                this.listLoading = false;
		                this.$message.error('接口建立连接失败');
		            });
		      	}else {
		        	return false;
		      	}
		    });
		},
		/*返回商户中心按钮*/
	    getBack(){
	    	this.dialogVisible1 = false;
	    	localStorage.setItem("merchant",1);
	    	window.location.reload();
	    	
	    }

	}
}
</script>
