<template>
	<section class="merchant-enter" id="merchant-enter">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			<!-- <el-form-item label="门店地址"  label-width="200px" prop="address">
				<v-distpicker :province="select.province" :city="select.city" :area="select.area" @province="onProvince" @city="onCity" @selected="onSelected"></v-distpicker>
			</el-form-item> -->
			<el-form-item label="" label-width="200px" prop="address" class="search-hezi">
				<el-input v-model="ruleForm.address" id="ser" placeholder="输入详细地址" class="wid280"></el-input>
				<el-button type="primary" class="mapbtn"  @click="searchbtn">搜索地图</el-button>
			</el-form-item>

			<el-form-item label="经纬坐标" label-width="200px">
				<p>{{ ruleForm.longitude+","+ruleForm.latitude}}</p>
			</el-form-item>
			<el-form-item label="" label-width="200px">
				<map-view :longitude="ruleForm.longitude" :latitude="ruleForm.latitude" @listenToChildEvent="showsite" @listenTolongitude="getResult" ref="MapView"></map-view>
			</el-form-item>
			<el-form-item label="" label-width="200px">
				<el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
			</el-form-item>	
			 
		</el-form>


	   
	</section>
	
</template>

<script>

import VDistpicker from 'v-distpicker';/*城市三级联动*/
import MapView from '@/components/Map1';/*地图组件*/
import { merchantSave,industryListall,gssUpload,storeCheckname} from '@/api/shopApi';
// 注册
/*Vue.filter('onlyNumber', function (value) {
  return value.replace(/[^/d]/g,''); 
});*/
export default {
	components: {
		VDistpicker,
		MapView	
	},

    mounted:function(){


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
		}
	},
	data() {
		return {
			

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
			categoryBarTitle5: '个人信息',
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
			    address:''
				
			},
	        rules: {
	          	
	        }

		}
	}
}
</script>
<style lang="scss">
.merchant-enter{
	.address + .el-form-item__error{
		display:none;
	}
	/* .hangye{
		.el-input__inner{
			display: none;
		}
	} */
	.requireHezi{
		position:relative;
		.require{
			position:absolute;
			color:#ff4949;
		}
	}
}

</style>
