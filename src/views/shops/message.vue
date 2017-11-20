<template>
	<section class="shop-message" id='shop-message' ref="viewBox">
		<category-bar :title="categoryBarTitle"></category-bar>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			<el-form-item label="入驻类型" prop="shopType" label-width="120px" class="lefttit">
				<div class="exhibition">
					<span>{{ruleForm.shopType}}</span>
				</div>
			</el-form-item> 
			<el-form-item label="店铺名称" prop="name"  label-width="120px">
				<el-input :maxlength="20" v-model="ruleForm.name" placeholder="店铺名称"  class="wid280" @blur="findName()"></el-input>
			</el-form-item>
			<el-form-item label="店铺公告"  prop="notice" label-width="120px">
				<el-input  :maxlength="50" v-model="ruleForm.notice" placeholder="店铺公告"  class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="店铺LOGO" label-width="120px" class="requireHezi">
				<span class="require" style='left:-90px;'>*</span>
				<upload-pictures :url="ruleForm.logo" :note="uploadTishi1" :listen="'listenToPic1'" :picSize='"10.MB"' @listenToPic1="sucpic1"></upload-pictures>
			</el-form-item>
			<el-form-item label="" prop="logo"  label-width="120px" class='updata'>
				<el-input v-model="ruleForm.logo" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="店铺主图" label-width="120px" class="requireHezi">
				<span class="require" style='left:-78px;'>*</span>
				<upload-pictures :url="ruleForm.broadwiseLogo" :note="uploadTishi2" :listen="'listenToPic2'" :picSize='"10.MB"' @listenToPic2="sucpic2"></upload-pictures>
			</el-form-item>
			<el-form-item label="" prop="broadwiseLogo"  label-width="120px" class='updata'>
				<el-input v-model="ruleForm.broadwiseLogo" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="门店地址"  label-width="120px" prop="address">
				<v-distpicker :province="select.province" :city="select.city" :area="select.area" @province="onProvince" @city="onCity" @selected="onSelected"></v-distpicker>
			</el-form-item>
			<el-form-item label="" label-width="120px" prop="address">
				<el-input v-model="ruleForm.address" id="ser" placeholder="输入详细地址" class="wid280"></el-input>
				<el-button type="primary" class="mapbtn" @click="searchbtn">搜索地图</el-button>
			</el-form-item>
			<el-form-item label="经纬坐标" label-width="120px"> 
				<p>{{ ruleForm.longitude+","+ruleForm.latitude}}</p>
			</el-form-item>
			<el-form-item label="" label-width="120px">
				<map-view :longitude="ruleForm.longitude" :latitude="ruleForm.latitude" @listenToChildEvent="showsite" @listenTolongitude="getResult" ref="MapView"></map-view>
			</el-form-item>
			<el-form-item label="营业时间" prop="workTime" label-width="120px">
				<el-input :maxlength="50" v-model="ruleForm.workTime" placeholder="请输入营业时间" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="服务范围" label-width="120px">
				<div class="exhibition">
					<span>{{ruleForm.cityString}}</span>
				</div>
			</el-form-item>
			<el-form-item label="主营行业" label-width="120px">
				<div class="exhibition">
					<span>{{ruleForm.industryCateString}}</span>
				</div>
			</el-form-item>
			<el-form-item v-if="!personals" label="经营品牌" label-width="120px">
				<div class="exhibition">
					<span>{{ruleForm.brandString}}</span>
				</div>
			</el-form-item>
			<el-form-item label="运营人姓名" prop="contactName" label-width="120px">
				<el-input :maxlength="30" v-model="ruleForm.contactName" placeholder="入驻时的姓名 " class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="运营人手机号" prop="contactMobile" label-width="120px">
				<el-input :maxlength="11" v-model="ruleForm.contactMobile" name="username" placeholder="入驻时的手机号" class="wid280"></el-input>
			</el-form-item>		
			<el-form-item label="合作有效期" label-width="120px">
				<div class="exhibition">
				{{time}}
				</div>
			</el-form-item>
			<el-form-item label="" label-width="120px">
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>

			</el-form-item>	
		</el-form>
	</section>
	
</template>

<script>
import CategoryBar from '@/components/CategoryBar.vue'/*标题*/
import UploadPictures from '@/components/UploadPictures.vue'/*上传图片组件*/
import VDistpicker from 'v-distpicker';/*城市三级联动*/
import MapView from '@/components/Map1';/*地图组件*/
import { getShopMessage,updateShopMessage,storeCheckname } from '@/api/shopApi';


export default {
	components: {
		CategoryBar,
		UploadPictures,
		VDistpicker,
		MapView	
	},
	beforeRouteLeave (to, from, next) {
	    // 导航离开该组件的对应路由时调用
	    // 可以访问组件实例 `this`
	    if(this.flag){
	      	this.$confirm('您还未保存，是否去其他页面?', '提示', {
	        	type: 'warning'
	      	}).then(() => {
	        	//next();
	        	//next()
	        	next()
	      	}).catch(() => {
	      		
	      	});
	    }else{
	    	next(); 
	    } 
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
          var reg =/^\d+$/g;
          if (!value.match(reg)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
        };

		return {
			personals:false,
			listLoading:false,
			flag:false,
			categoryBarTitle: '店铺基本信息',
			uploadTishi1:"请传160*160,格式要求jpg,jpeg,png,不超过10MB",
			uploadTishi2:"请上传750*320，格式要求jpg、jpeg、png，不超过10MB",

	　　　　longitude:"",
	　　　　latitude:"",
			site:"116.4.404015,39.912734",
			searchsite:"",
			selcity:"",
			csname:'',

			select: { 
				province: '省',
			    city: '市',
			    area: '区'
			},
			ruleForm: {
				storeId:'',
				shopType: '',
				name: '',
				notice: '',
				logo:"",
				broadwiseLogo:"",
				address: '',
				cityString:'',
				industryCateString:'',
				workTime:'',
				serviceScope: '',
				Industry: '',
				BrandStandard: '',
				contactName: '',
				contactMobile: '',
				startValidTime:'' ,
				endValidTime:'',
			},
			biaoji:{},
	        rules: {
	        	logo:[
	        		{ required: true, message: '请上传店铺LOGO', trigger: 'blur' },
	        	],
	        	broadwiseLogo:[
	        		{ required: true, message: '请上传店铺主图', trigger: 'blur' },
	        	],
	          	name: [
	            	{ required: true, message: '请输入店铺名称', trigger: 'blur' },
	            	{ min: 1, max: 20, message: '长度在 1 到 20 位', trigger: 'blur' }
	          	],
	          	address: [
	            	{ required: true, message: '请输入门店详细地址', trigger: 'blur' }
	          	],
		        workTime: [
		            { required: true, message: '请输入营业时间', trigger: 'blur' }
		        ],
	          	contactName: [
	            	{ required: true, message: '请输入运营人姓名', trigger: 'blur' },
	            	{ min: 2, max: 30, message: '请输入正确的运营人姓名', trigger: 'blur' }
	          	],
	          	contactMobile: [
	          		{required: true,validator: validatePhone,trigger: 'blur' },
	          		{ validator: validateNumber1,trigger: 'blur'},
	          		{ validator: validateNumber1,trigger: 'change'}
	          	]
	        }

		}
	},
	watch: {         
        // 如果路由有变化，会再次执行该方法
    	'ruleForm.name':function(){
    		this.fillOut('name');
    	},
    	'ruleForm.notice':function(){
    		this.fillOut('notice');
    	},
    	'ruleForm.logo':function(){
    		this.fillOut('logo');
    	},
    	'ruleForm.broadwiseLogo':function(){
    		this.fillOut('broadwiseLogo');
    	},
    	'ruleForm.address':function(){
    		this.fillOut('address');
    	},
    	'ruleForm.latitude':function(){
    		this.fillOut('latitude');
    	},
    	'ruleForm.longitude':function(){
    		this.fillOut('longitude');
    	},
    	'ruleForm.workTime':function(){
    		this.fillOut('workTime');
    	},
    	'ruleForm.contactName':function(){
    		this.fillOut('contactName');
    	},
    	'ruleForm.contactMobile':function(){
    		this.fillOut('contactMobile');
    	}

    },
    mounted() {
      	this.getShop();
      	var o=document.getElementsByClassName("content-container")[0];
 		o.addEventListener('scroll', this.handleScroll);

 		if(config.storeType!=1){//个人店铺
 			this.personals=true;
 		}
    },

    computed: {
    	//将毫秒数转化为时间格式
        time: function () {
        	var flag='';
        	if(this.ruleForm.endValidTime){
	        	var endData=new Date(this.ruleForm.endValidTime);
	        	flag=endData.getFullYear()+" / "+(endData.getMonth()+1)+" / "+endData.getDate();
	        	 
        	}
        	return flag;
        }
    },

	methods: {

		handleScroll () {
			var arr=document.getElementsByClassName("tangram-suggestion-main");

			for(var i=0;i<arr.length;i++){
				arr[i].style.display="none";
			}
		},
		fillOut(key){
			if(this.biaoji[key]!=this.ruleForm[key]){
				this.flag=true;
			}
			

		},
		//判断店铺名是否重名
		findName(){
			if(!(this.ruleForm.name)||(this.ruleForm.name==this.csname)){
				return false;
			}
			let para = {
	          storeName: this.ruleForm.name
	        };
	        storeCheckname(para).then((res) => {
	        	if(res.data.code!=0){
	        		this.$message({message: '店铺重名，请重新填写',type: 'warning'});
	        	}
	        });
		},
		
		//店铺logo上传成功之后
		sucpic1(url){
			this.ruleForm.logo=url;
		},
		//店铺主图上传成功之后
		sucpic2(url){
			this.ruleForm.broadwiseLogo=url;
		},

		//获取店铺信息
	    getShop() {

	        let para = {
	          storeId: config.storeId
	        };
	        getShopMessage(para).then((res) => {
	        	if(res.data.code==0){
	        		
	        		this.ruleForm=res.data.data;
		        	this.ruleForm.shopType=this.ruleForm.shopType==1?"企业入驻":"个人入驻";

	        		this.switchover(this.ruleForm.address);
	        		this.ruleForm.longitude/=1000000;
	        		this.ruleForm.latitude/=1000000;
					this.biaoji = JSON.parse(JSON.stringify(this.ruleForm));
	        		this.$refs.MapView.creatmap(this.ruleForm.longitude,this.ruleForm.latitude);
	        		this.csname=this.ruleForm.name;
	        		var timer1=window.setTimeout(function(){
	        			var arr=document.getElementsByClassName("tangram-suggestion-main");
						for(var i=0;i<arr.length;i++){
							arr[i].style.display="none";
						}
	        			window.clearTimeout(timer1);
	        		},500);
	        		
	        	}else{
	        		this.$message.error(res.data.message);
	        	}
	        	
	        }).catch((res)=> {
		          	console.log("cw")
		    });
	    },
	    /*将取到的地址信息分割传到三级联动组件上面*/
	    switchover:function(address){
	    	//下面的操作是将城市分割，显示在页面上
    		let arrAddress=address.split("*");
    		let addressLen=arrAddress.length;
    		if(addressLen==4){
    			this.select.province=this.selProvince=arrAddress[0];
    			this.select.city=this.selCity=arrAddress[1];
    			this.select.area=this.selArea=arrAddress[2];
    			this.ruleForm.address=arrAddress[3];
    		}else if(addressLen==3){
    			this.select.province=this.selProvince=arrAddress[0];
    			this.select.city=this.selCity=arrAddress[1];
    			this.ruleForm.address=arrAddress[2];
    		}else if(addressLen==2){
    			this.select.province=this.selProvince=arrAddress[0];
    			this.ruleForm.address=arrAddress[1];
    		}else{
    			this.ruleForm.address=arrAddress[0];
    		}
    		this.$refs.MapView.againAddr(this.ruleForm.address);
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
					var para = new URLSearchParams();
					
					para.append('storeId',this.ruleForm.storeId);
					para.append('name',this.ruleForm.name);
					para.append('notice',this.ruleForm.notice);
					para.append('logo',this.ruleForm.logo);
					para.append('broadwiseLogo',this.ruleForm.broadwiseLogo);
					para.append('address',this.sel+'*'+this.ruleForm.address);
					para.append('longitude',Number(this.ruleForm.longitude*1000000));
					para.append('latitude',Number(this.ruleForm.latitude*1000000));
					para.append('workTime',this.ruleForm.workTime);
					para.append('contactName',this.ruleForm.contactName);
					para.append('contactMobile',this.ruleForm.contactMobile);	

			        updateShopMessage(para).then((res) => {
			        	if(res.data.code==0){
			        		this.flag=false;
			        		this.$message({
					           message: '保存成功',
					           type: 'success'
					        });
			        	}else{
			        		this.$message.error(res.data.message);
			        	}
			        }).catch((res)=> {
				        this.$message.error('接口建立连接失败');
				    });
		        }else {
		        	return false;
		      	}
		    });
		}

	}
}

</script>

<style lang="scss">
.shop-message{
	/* 公共样式 */
	p{
		margin: 0;
	}
    .wid280{
    	width:280px;
    }
    .wid400{
    	width:400px;
    }

    /* 只读样式 */
    .exhibition{
    	padding-left:10px;
    	font-size:14px;
		color:#333333;
    }
    .category-bar{
    	padding:20px 0 20px 20px;
    }
    ol,ul,li{
    	padding:0;
    	margin:0;
    	list-style:none;
    }
    .address + .el-form-item__error{
    	display:none;
    }
    
}
    
</style>