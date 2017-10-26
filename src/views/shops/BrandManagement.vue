<template>
	<section class="brand" v-if='$route.name==="品牌管理"'>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
		    <router-link to="/store/brand-management/sel-brand" class="selbrand" icon="plus">
		      	<el-button type="primary" icon="plus">创建商品</el-button>
		    </router-link>
	    </el-col>
		<ul>
			<li  v-for="(myBrand,index) in myBrands" @click="jump(myBrand.id)">
				<div class="brandlogo">
					<img :src="myBrand.src">
				</div>
				<div class="brandlist">
					<h3>
						<b>{{myBrand.tit}}</b>
						<span v-if="myBrand.state==1"  style="color:#41cac0;">(通过)</span>
						<span v-else-if="myBrand.state==2"  style="color:#ff0201;">(未通过)</span>
						<span v-else-if="myBrand.state==3" style="color:#41cac0;">(审核中)</span>
						<span v-else style="color:#ff0201;">(已取消)</span>
					</h3>
					<p>渠道：{{myBrand.channel}}</p>
					<p>授权城市：{{myBrand.hostCity}}</p>
					<p>有效时间：{{myBrand.validTime}}</p>

					<div class="btns" v-if="myBrand.state==1">
						<span class="forbidden" @click.stop="forbidden(myBrand.id)">禁用</span>
						<span class="startusing" @click.stop="startusing(myBrand.id)">启用</span>
					</div>
					<div class="btns" v-if="myBrand.state==3">
						<span class="cancel" @click.stop="cancel(myBrand.id)">取消</span>
					</div>			
				</div>
			</li>
		</ul>
		
	</section>
	<router-view  v-else></router-view>
</template>

<script>
	/*import { Group,  ChinaAddressData, XAddress } from 'vux';*/

	export default {
		data() {
			return {
				myBrands:[
					{
						id:1,
					    src:"http://1.hapn.cc:20080/n/00803Rtc00fj1k3zoMa02w4.gif",
					  	tit:'NIKE耐克',
					  	state:"1",
					  	channel:'线上渠道，线下渠道',
					  	hostCity:'上海',
					  	validTime:'2010年6月10号至2020年6月10号'
					},
					{
						id:2,
					  	src:"http://1.hapn.cc:20080/n/00803Rtc00fj1k3zoMa02w4.gif",
					  	tit:'NIKE耐克',
					  	state:"2",
					  	channel:'线上渠道，线下渠道',
					  	hostCity:'杭州',
					  	validTime:'2010年6月10号至2020年6月10号'
					},
					{
						id:3,
					  	src:"http://1.hapn.cc:20080/n/00803Rtc00fj1k3zoMa02w4.gif",
					  	tit:'NIKE耐克',
					  	state:"3",
					  	channel:'线上渠道，线下渠道',
					  	hostCity:'北京',
					  	validTime:'2010年6月10号至2020年6月10号'
					},
					{
						id:4,
					  	src:"http://1.hapn.cc:20080/n/00803Rtc00fj1k3zoMa02w4.gif",
					  	tit:'NIKE耐克',
					  	state:"4",
					  	channel:'线上渠道，线下渠道',
					  	hostCity:'杭州',
					  	validTime:'2010年6月10号至2020年6月10号'
					}
				],
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
		methods: {
			/*点击列表跳转详情*/
			jump(id){
				this.$router.push({ path: 'brand-management/add-brand', query: { id: id}});
			},
			/*禁用按钮*/
			forbidden(id){
				alert(id)
			},
			/*启用按钮*/
			startusing(id){
				alert(id)
			},
			/*删除按钮*/
			cancel(id){
				alert(id)
			},
			onSubmit() {
				console.log('submit!');
			},
			test(){
				console.log(this.addressData);
			}
		}
	}

</script>
<style lang="scss">
.brand{
	position:relative;

	/*公共样式*/
	a{
		text-decoration:none;
	}
	ul,ol{
		list-style:none;
	}
	h3,p,ul,ol{
		margin:0;
	}

	/* 创建商品按钮 */
	.toolbar{
		position:absolute;
		top:-56px;
		left:-30px;
		background:none;
  		padding:0;
  		.selbrand{
			float:right;
		}
	}

	/* 列表样式 */
	ul{
		width:100%;
		overflow:hidden;
		padding:0;
		li{
			float:left;
			width:480px;
			height:160px;
			margin-top:30px;
			cursor:pointer;
			.brandlogo{
				width:158px;
				height:158px;
				line-height:158px;
				text-align:center;
				overflow: hidden;
				float:left;
				border:1px solid #ccc;
				img{
					max-width:100%;
				}
			}
			.brandlist{
				float:left;
				padding-left:20px;
				h3{
					font-size:16px;
					color:#333333;
					height:22px;
					line-height:22px;
					margin-bottom:10px;
					b{
						float:left;
						height:22px;
						line-height:22px;
						max-width:200px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						font-size:16px;
						color:#333;
						font-weight:normal;
					}
					span{
						font-size:14px;
						float:left;
						height:22px;
						line-height:22px;
						padding-left:15px;
					}
				}
				p{
					font-size:14px;
					color:#666666;
					height:20px;
					line-height:20px;
					margin-bottom:10px;
				}
				.btns{
					margin-top:15px;
					span{
						display:inline-block;
						width:60px;
						height:30px;
						line-height:30px;
						text-align:center;
						margin-right:20px;
						color:#666666;;
						font-size:12px;
						border:1px solid #ccc;
						cursor: pointer;
					}
					.forbidden{
						background:#45cdb6;
						color:#fff !important;
						border:1px solid #45cdb6 !important;
					}
				}
			}
		}
	}
}
	

</style>