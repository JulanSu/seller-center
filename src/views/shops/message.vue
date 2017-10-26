<template>
	<section class="shop-message">
		<category-bar :title="categoryBarTitle"></category-bar>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			<el-form-item label="入驻类型" prop="shopType" label-width="120px" class="lefttit">
				<el-input v-model="ruleForm.shopType" :readonly="true" placeholder=""  class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="店铺名称" prop="name"  label-width="120px">
				<el-input v-model="ruleForm.name" placeholder="店铺名称"  class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="店铺公告"  prop="notice" label-width="120px">
				<el-input v-model="ruleForm.notice" placeholder="店铺公告"  class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="店铺LOGO" label-width="120px">
				<upload-pictures :note="uploadTishi1"></upload-pictures>
			</el-form-item>
			<el-form-item label="店铺主图" label-width="120px">
				<upload-pictures :note="uploadTishi2"></upload-pictures>
			</el-form-item>
			<el-form-item label="门店地址"  label-width="120px">
				<v-distpicker :province="select.province" :city="select.city" :area="select.area" @province="onProvince" @city="onCity" @selected="onSelected"></v-distpicker>
			</el-form-item>
			<el-form-item label="" label-width="120px" prop="address">
				<el-input v-model="ruleForm.address" placeholder="输入详细地址" class="wid280"></el-input>
				<el-button type="primary" class="mapbtn" @click="searchbtn">搜索地图</el-button>
			</el-form-item>
			<el-form-item label="经纬坐标" label-width="120px">
				<p>{{ ruleForm.latitude+","+ruleForm.longitude}}</p>
			</el-form-item>
			<el-form-item label="" label-width="120px">
				<map-view :height="height" :longitude="ruleForm.longitude" :latitude="ruleForm.latitude" @listenToChildEvent="showsite" ref="MapView">
				</map-view>
			</el-form-item>
			<el-form-item label="营业时间" prop="workTime" label-width="120px">
				<el-input v-model="ruleForm.workTime" placeholder="请输入营业时间" class="wid280"></el-input>
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
			<el-form-item label="经营品牌" label-width="120px">
				<div class="exhibition">
					<span>{{ruleForm.brandString}}</span>
				</div>
			</el-form-item>
			<el-form-item label="运营人姓名" prop="contactName" label-width="120px">
				<el-input v-model="ruleForm.contactName" placeholder="请输入运营人姓名" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="运营人手机号" prop="contactMobile" label-width="120px">
				<el-input v-model="ruleForm.contactMobile" name="username" placeholder="请输入运营人手机号" class="wid280"></el-input>
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
import MapView from '@/components/Map';/*地图组件*/
import { getShopMessage,updateShopMessage } from '@/api/shopApi';



export default {
	components: {
		CategoryBar,
		UploadPictures,
		VDistpicker,
		MapView	
	},
	data() {
		return {
			categoryBarTitle: '店铺基本信息',
			uploadTishi1:"请传160*160,格式要求jpg,jpeg,png,不超过10MB",
			uploadTishi2:"请上传750*320，格式要求jpg、jpeg、png，不超过10MB",

			height:300,
	　　　　longitude:116.404,
	　　　　latitude:39.915,
			site:"116.4.404015,39.912734",
			searchsite:"",
			selcity:"",

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
	        rules: {
	          	name: [
	            	{ required: true, message: '请输入活店铺名称', trigger: 'blur' },
	            	{ min: 1, max: 20, message: '长度在 1 到 20 位', trigger: 'blur' }
	          	],
	          	notice: [
	            	{ required: false, max: 50, message: '长度最多 50 位', trigger: 'blur' }
	          	],
	          	address: [
	            	{ required: true, message: '请输入门店详细地址', trigger: 'blur' }
	          	],
		        workTime: [
		            { required: true, message: '请输入营业时间', trigger: 'blur' }
		        ],
	          	contactName: [
	            	{ required: true, message: '请输入运营人姓名', trigger: 'blur' },
	            	{ min: 2, max: 30, message: '长度在 2 到 30 位', trigger: 'blur' }
	          	],
	          	contactMobile: [
	            	{ required: true, message: '请输入运营人手机号码', trigger: 'blur' },
	            	{ min: 11, max: 11, message: '长度为 11 位', trigger: 'blur' }
	          	]
	        }

		}
	},
    mounted() {
      this.getShop();
    },
    computed: {
    	//将毫秒数转化为时间格式
        time: function () {
        	var startData=new Date(this.ruleForm.startValidTime);
        	var endData=new Date(this.ruleForm.endValidTime);
        	return startData.getFullYear()+" / "+(startData.getMonth()+1)+" / "+startData.getDate()+" - "+endData.getFullYear()+" / "+(endData.getMonth()+1)+" / "+endData.getDate();
        }
    },

	methods: {
		//获取店铺信息
	    getShop() {
	        let para = {
	          storeId: storeId
	        };
	        getShopMessage(para).then((res) => {
	        	this.ruleForm=res.data.data;
	        	this.ruleForm.shopType=this.ruleForm.shopType==1?"个人店铺":"企业店铺";
	        	let address="浙江省*杭州市*下城区*野风现代中心";

        		this.switchover(this.ruleForm.address);
        		this.ruleForm.longitude/=1000000;
        		this.ruleForm.latitude/=1000000;
        		//调用地图
        		this.$refs.MapView.creatmap(this.ruleForm.longitude,this.ruleForm.latitude);

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
			        		this.$message({
					           message: '保存成功',
					           type: 'success'
					        });
			        	}else{
			        		this.$message.error(res.data.message);
			        	}
			        	
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
    	padding:40px 0 20px 40px;
    }
}
    
</style>