<template>
	<section class="bypass-index" v-if='$route.name=="子账号管理"' v-loading="listLoading">
		<h2>账号概况</h2>
		<ul class="use-style">
			<li>
				<span>使用中</span>
				<b>{{formList.usedNum}}</b>
			</li>
			<li>
				<span>可激活</span>
				<b>{{formList.unUsedNum}}</b>
			</li>
			<li>
				<span>总数</span>
				<b>{{formList.total}}</b>
			</li>
		</ul>
		<ul class="use-style bapass-btn">
			<li @click='jump'>
				<i class="iconfont icon-zizhanghao"></i>
				<span>新建子账号</span>
			</li>
			<li style="border-left:1px solid #ddd;border-right:1px solid #ddd;">
				<router-link to="/store/bypass-management/role-list">
					<i class="iconfont icon-gangweijiaose"></i>
					<span>岗位角色</span>
				</router-link>
			</li>
			<li style="width:326px;">

				<router-link to="/store/bypass-management/account-list">
					<i class="iconfont icon-zizhanghaoliebiao"></i>
					<span>子账号列表</span>
				</router-link>
			</li>
		</ul>
	</section>
	<router-view v-else></router-view>
</template>

<script>
import {operatorGetNum} from '@/api/shopApi';

export default {
	data() {
      return {
      		listLoading:false,
      		formList:{
      			total:0,
	      		unUsedNum:0,
	      		usedNum:0
      		}	
		}
	},
	watch: {
       '$route' (to, from) {
	        if(this.$route.path=="/store/bypass-management"){
	          this.getNum();
	        }
        }
    },
	methods:{
		//新建子账号按钮
		jump(){
			this.getNum();
			if(this.formList.usedNum>=5){
				this.$message({message: '子账号使用数量已满，先去冻结子账号',type: 'warning'});
				return false;
			}
			this.$router.push({ path: '/store/bypass-management/new-account'});
		},
		//获取子账号使用数量
		getNum(){
			let para = {
				storeId:config.storeId
			};
			this.listLoading = true;
			operatorGetNum(para).then((res) => {
				this.listLoading = false;
		    	if(res.data.code==0){
		    		this.formList=res.data.data;
		    	}else{
		    		this.$message.error(res.data.message);
		    	}
		    }).catch((res)=> {
		        this.listLoading = false;
		        this.$message.error('接口建立连接失败');
		    });
		}
    },
    mounted() {
      this.getNum();
    }
}




</script>

<style lang="scss">
.bypass-index{
	width:962px;
	padding:20px 0 0 20px;
	a{
	    text-decoration:none;
	}
	
	h2{
		margin:0;
		font-size:14px;
		color:#333333;
		height:44px;
		line-height:44px;
		padding-left:20px;
		font-weight:100;
		background:#f5f7fa;
		box-shadow:0 1px 0 0 #dddddd;
	}
	ul{
		padding:0;
		margin-top:0;
		height: 95px;
		line-height:95px;
		border:1px solid #ddd;
		margin-bottom:30px;
		list-style: none;
		li{
			float:left;
			width:306px;
			height:93px;
			text-align:center;
			span{
				font-size:14px;
				color:#666666;
				padding-right:15px;
			}
			b{
				font-size:30px;
				color:#ff6c60;
			}
			a{
				display:block;
			}
		}
		li:nth-of-type(1) b{
			color:#6bcac9;;
		}
		li:nth-of-type(3) b{
			color:#56c8f2;
		}
	}
	.bapass-btn{
		cursor:pointer;
		background:#f5f7fa;
		height:80px;
		line-height:80px;

		li:hover{
			background:#fff;
			span{
				color:#41cac0 !important;
			}
		}
		li{
			height:78px;

			i{
				font-size: 24px;
				color:#41cac0;
				padding-right:10px;
				vertical-align: middle;
			}
		}
	}
}
</style>