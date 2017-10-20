<template>
	<div class="bypassindex">
		<div v-if='$route.name!="新建子帐号"&&$route.name!="岗位角色"&&$route.name!="子帐号列表"&&$route.name!="新建角色"'>
			<h2>账号概况</h2>
			<ul class="usestyle">
				<li>
					<span>使用中</span>
					<b>1</b>
				</li>
				<li>
					<span>可激活</span>
					<b>4</b>
				</li>
				<li>
					<span>总数</span>
					<b>5</b>
				</li>
			</ul>
			<ul class="usestyle bapassbtn">
				<li>
					<router-link to="/store/bypass_management/newaccount">
						<i icon="el-icon-delete2"></i>
						<span>新建子帐号</span>
					</router-link>
				</li>
				<li style="border-left:1px solid #ddd;border-right:1px solid #ddd;">
					<router-link to="/store/bypass_management/rolelist">
						<i icon="el-icon-delete2"></i>
						<span>岗位角色</span>
					</router-link>
				</li>
				<li>
					<router-link to="/store/bypass_management/accountlist">
						<i icon="el-icon-delete2"></i>
						<span>子帐号列表</span>
					</router-link>
				</li>
			</ul>
		</div>
		<router-view ></router-view>
	</div>
</template>

<script>
	import { Group,  ChinaAddressData, XAddress } from 'vux';

	export default {
		components: {
			Group,
			XAddress,
		},
		data() {
			return {
				form: {
					username: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				addressData: ChinaAddressData,
				addressValue: ['广东省', '深圳市', '南山区']
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			test(){
				console.log(this.addressData);
			}
		}
	}

</script>
<style scoped>
	a{
	    text-decoration:none;
	}
	.bypassindex{
		padding:20px;

	}

	.bypassindex h2{
		font-size:14px;
		color:#333333;
		height:44px;
		line-height:44px;
		padding-left:20px;
		font-weight:100;
	}
	.bypassindex ul{
		height: 95px;
		line-height:95px;
		border:1px solid #ddd;
		margin-bottom:30px;
		list-style: none;
	}
	.bypassindex ul li{
		float:left;
		width:33%;
		text-align:center;

	}
	.bypassindex ul li span{
		font-size:14px;
		color:#666666;
		padding-right:15px;
	}
	.bypassindex ul li b{
		font-size:30px;
		color:#ff6c60;
	}
	.bypassindex ul li:nth-of-type(1) b{
		color:#6bcac9;;
	}
	.bypassindex ul li:nth-of-type(3) b{
		color:#56c8f2;
	}
	.bypassindex .bapassbtn{
		cursor:pointer;
	}
	.bypassindex .bapassbtn li:hover span{
		color:#41cac0 !important;
	}
</style>