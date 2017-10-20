<template>
	<section class="shopmessage">
		<category-bar :title="categoryBarTitle"></category-bar>
		<el-form ref="form" :model="ruleForm" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
			<el-form-item label="入驻类型" label-width="100px" class="lefttit">
				<el-input v-model="ruleForm.username" name="username" placeholder="入驻类型" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="店铺名称"  label-width="100px">
				<el-input v-model="ruleForm.username" name="username" placeholder="店铺名称"  class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="店铺公告"  label-width="100px">
				<el-input v-model="ruleForm.username" name="username" placeholder="店铺公告"  class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="店铺LOGO" label-width="100px">
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
			<el-form-item label="店铺主图" label-width="100px">
				<div class="load_hezi">	
					<p>请上传750*320，格式要求jpg、jpeg、png，不超过10MB</p>
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
			
			<el-form-item label="门店地址"  label-width="100px">
				<v-distpicker @province="onProvince" @city="onProvince" @selected="onProvince"></v-distpicker>
			</el-form-item>
			<el-form-item label="" label-width="100px" prop="accountname">
				<el-input v-model="searchsite" placeholder="输入详细地址" class="wid280"></el-input>
				<el-button type="primary" class="mapbtn" @click="searchbtn">搜索地图</el-button>
			</el-form-item>
			<el-form-item label="经纬坐标" label-width="100px" prop="accountname">
				<p>{{site}}</p>
			</el-form-item>
			<el-form-item label="" label-width="100px" prop="accountname">
				<map-view :height="height" :longitude="longitude" :latitude="latitude" @listenToChildEvent="showsite" ref="MapView">
				</map-view>
			</el-form-item>
			<el-form-item label="营业时间" label-width="100px">
				<el-input v-model="ruleForm.username" name="username" placeholder="营业时间" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="服务范围" label-width="100px">
				<div class="exhibition">杭州/上海/北京</div>
			</el-form-item>
			<el-form-item label="主营行业" label-width="100px">
				<div class="exhibition">亲子摄影／旅拍</div>
			</el-form-item>
			<el-form-item label="经营品牌" label-width="100px">
				<div class="exhibition">卡萨帝／海尔／统帅</div>
			</el-form-item>
			<el-form-item label="运营人姓名" label-width="100px">
				<el-input v-model="ruleForm.username" name="username" placeholder="运营人姓名" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="运营人手机号" label-width="100px">
				<el-input v-model="ruleForm.username" name="username" placeholder="运营人手机号" class="wid280"></el-input>
			</el-form-item>		
			<el-form-item label="合作有效期" label-width="100px">
				<div class="exhibition">2017／02／08——2018／02／08</div>
			</el-form-item>
			<el-form-item label="" label-width="100px">
				<el-button type="primary" @click="test">保存</el-button>
			</el-form-item>	
		</el-form>
	</section>
	
</template>

<script>
	import CategoryBar from 'components/CategoryBar.vue'/*标题*/
	import VDistpicker from 'v-distpicker';/*城市三级联动*/
	import MapView from 'components/Map';/*地图组件*/
	import { Group,  ChinaAddressData, XAddress } from 'vux';


	export default {
		components: {
			CategoryBar,
			Group,
			XAddress,
			MapView,
			VDistpicker

		},
		data() {
			return {
				ruleForm: {
					username: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
					
				},
				categoryBarTitle: '店铺基本信息',
				addressData: ChinaAddressData,
				addressValue: ['广东省', '深圳市', '南山区'],
				imageUrl: '',
				height:300,
		　　　　longitude:116.404,
		　　　　latitude:39.915,
				site:"116.4.404015,39.912734",
				searchsite:"",
				selcity:""
			}
		},
		methods: {
			/*城市三级联动，选择城市后将数据存储起来，点击搜索地图按钮时，加在自己输入的地址之前*/
			onProvince(data) {
			    var province=data.province.code==undefined?"":data.province.value;
			    var city=data.city.code==undefined?"":data.city.value;
			    var area=data.area.code==undefined?"":data.area.value;
			    this.selcity=province+city+area;
		    },
		    /*点击搜索地图调用map子组件里面的地图事件*/
			searchbtn(){
				var addr=this.selcity+this.searchsite
				this.$refs.MapView.againmap(this.longitude,this.latitude,addr);
			},
			showsite(data){
				this.site=data;
			},
			onSubmit() {
				console.log('submit!');
			},
			test(){
				console.log(this.addressData);
			},

			handleAvatarSuccess(res, file) {//上传头像
		        this.imageUrl = URL.createObjectURL(file.raw);
		      },
		    beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		    }

		}
	}

</script>

<style lang="scss">
.shopmessage{
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
    	font-size:14px;
		color:#333333;
    }
    .load_hezi p{
    	margin:0px 0px 10px;

    	font-size:12px;
		color:#aaaaaa;
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

}
    
</style>