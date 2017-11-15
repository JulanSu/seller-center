<template>
	<section class="brand" v-if='$route.name==="品牌管理"'>
		<el-col :span="24" class="tool-bar" style="padding-bottom: 0px;">
		    <router-link to="/store/brand-management/sel-brand" class="selbrand" icon="plus">
		      	<el-button type="primary" icon="plus">添加品牌</el-button>
		    </router-link>
	    </el-col>
		<ul v-loading="listLoading">
			<li  v-for="(myBrand,index) in myBrands" @click="jump(myBrand)">
				<div class="brandlogo">
					<img :src="myBrand.authorizationUrl">
				</div>
				<div class="brandlist">
					<h3><!-- 已过期 已禁用 -->
						<b>{{myBrand.nameCn}}</b>
						<!-- <span v-if="pastDue(myBrand)" style="color:#ff0201;">(已过期)</span>
						<span v-else-if="myBrand.isUsed==0" style="color:#ff0201;">(已禁用)</span>
						<span v-else>
							<span v-if="myBrand.isVerified==1"  style="color:#41cac0;">(审核通过)</span>
							<span v-else-if="myBrand.isVerified==2"  style="color:#ff0201;">(未通过)</span>
							<span v-else-if="myBrand.isVerified==0" style="color:#41cac0;">(审核中)</span>
							<span v-else-if="myBrand.isVerified==3" style="color:#ff0201;">(已取消)</span> 
						</span> -->
						<span v-if="myBrand.isVerified==2"  style="color:#ff0201;">(未通过)</span>
						<span v-else-if="myBrand.isVerified==0" style="color:#41cac0;">(审核中)</span>
						<span v-else-if="pastDue(myBrand)" style="color:#ff0201;">(已过期)</span>
						<span v-else-if="myBrand.isUsed==0" style="color:#ff0201;">(已禁用)</span>
						<span v-else="myBrand.isVerified==1"  style="color:#41cac0;">(审核通过)</span>
						
					</h3>
					<p>渠道：{{myBrand.ways}}</p>
					<p>授权城市：{{myBrand.cityNames}}</p>
					<p>截止时间：{{time(myBrand)}}</p>

					<div class="btns" v-if="!pastDue(myBrand)&&(myBrand.isVerified==0)">
						<span class="cancel" @click.stop="cancel(myBrand.storeBrandId)">取消</span>
					</div>			
				</div>
			</li>
		</ul>
		
	</section>
	<router-view  v-else :key="key"></router-view>
</template>

<script>
import { brandList,brandChangeStatus,brandCancelverify,baseBrandGet } from '@/api/shopApi';
import CategoryMenu from '@/components/CategoryMenu.vue'/*类目选择*/

	export default {
		data() {
			return {
				myBrands:[],//品牌列表的数据
				listLoading:false,//懒加载标志
				form: {
					username: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		computed: {
		    key() {
		        return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date();
		    }
		},
	    mounted() {
	        this.getBrandList();//获取品牌列表
	    },

		methods: {
			
			/*点击列表跳转详情*/
			//在品牌列表页点击品牌进入详情页，还是创建品牌（品牌库没有）的页面前判断
			jump(row){
				if(row.isNewVerified!=1){//不是在品牌库添加的品牌
					this.$router.push({ path: '/store/brand-management/create-brand', query:{ brandId:row.brandId}});


				}else{
					var parm={storeBrandId:row.storeBrandId,compile:1};

					if(this.pastDue(row)||(row.isVerified==2)||(row.isVerified==0)){
						parm.noClick=false;
					}else{
						if(row.isUsed==0){
							parm.noClick=true;
						}else{
							parm.noClick=false;
						}
					}
					/*parm.noClick=true;*/
					this.$router.push({ path: '/store/brand-management/compile-brand', query:parm });
				}
			},

			/*取消按钮*/
			cancel(id){		
			    var para = new URLSearchParams();  
			        para.append('storeBrandId',id);
		        this.listLoading = true;
		        brandCancelverify(para).then((res) => {
		        	if(res.data.code==0){
		        		this.getBrandList();
		        	}else{
		        		this.$message.error(res.data.message);
		        	}
		          	this.listLoading = false;
		        }).catch((res)=> {
		          	this.listLoading = false;
		          	this.$message.error('接口建立连接失败');
		        });
			},

			//判断时间是否过期
			pastDue(myBrand){
				var flag=false;
				var nowData=new Date().getTime();
				if(nowData>myBrand.endValidTime){
					flag=true;
				}
				return flag;
			},
			//将毫秒数转化为时间格式
	        time: function (myBrand) {
	        	var endData=new Date(myBrand.endValidTime);
	        	return endData.getFullYear()+" / "+(endData.getMonth()+1)+" / "+endData.getDate();
	        },
			//获取品牌列表
		    getBrandList() {
		        let para = {
		          storeId:config.storeId
		        };

		        this.listLoading = true;
		        brandList(para).then((res) => {
		        	if(res.data.code==0){
		        		this.myBrands = res.data.data;
		        	}
		          	this.listLoading = false;
		        }).catch((res)=> {
		          	this.listLoading = false;
		        });
		    }
		}
	}

</script>