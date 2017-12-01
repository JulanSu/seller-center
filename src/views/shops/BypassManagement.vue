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
			<li>
				<router-link to="/store/bypass-management/role-list">
					<i class="iconfont icon-gangweijiaose"></i>
					<span>岗位角色</span>
				</router-link>
			</li>
			<li style="width:347px;">

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
    	if(this.$route.name=="子账号管理"){
    		this.getNum();
    	}
      
    }
}
</script>
