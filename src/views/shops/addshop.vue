<template>
	<section class="add-store">
		<el-form :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm" style="width:60%;min-width:600px;">
			<el-form-item label="门店名称" label-width="120px" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入门店名称" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="门店联系人" label-width="120px" prop="contactPerson">
				<el-input v-model="ruleForm.contactPerson" placeholder="请输入门店联系人" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="联系人手机号" label-width="120px" prop="contactMobile">
				<el-input v-model="ruleForm.contactMobile" placeholder="请输入联系人手机号" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="营业时间" label-width="120px" prop="workTime">
				<el-input v-model="ruleForm.workTime" placeholder="请输入营业时间" class="wid280"></el-input>
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
			<el-form-item label="" label-width="120px">
				<el-button type="primary" @click="submitForm('ruleForm')">
					<span v-if="isAdd==1" >添加</span>
					<span v-else>保存</span>
				</el-button>
			</el-form-item>
			<el-dialog
			    title=""
			    top="30%"
				:visible.sync="dialogVisible1"
				size="tiny">
				<div class="suc">
					<span class="el-icon-circle-check"></span>
					<div>
						<h2>您已提交成功</h2>
					</div>
				</div>
			    
			    <span slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="getBack">返回门店列表</el-button>
			    </span>
			</el-dialog>
		</el-form>
	</section>
	
</template>

<script>

import VDistpicker from 'v-distpicker';/*城市三级联动*/
import MapView from '@/components/Map';/*地图组件*/
import {saveClassify,getClassifyGet, updateClassify} from '@/api/shopApi';

  export default {
  	components: {
		VDistpicker,
      	MapView
  	},
    data() {
      return {
      	dialogVisible1: false,
      	/*地图组件需要传递的数据*/
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

        ruleForm: {
        	storeBranchId:'',
	        name: '',
	        contactPerson: '',
	        contactMobile:'',
	        workTime: '',
	        address: '',
	        longitude:120.186535,
	　　　　latitude:30.310288,
			isHead:''
        },
        rules: {
          name: [
            { required: true, message: '请输入门店名称', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 位', trigger: 'blur' }
          ],
          contactMobile:[
          	{ required: true, message: '请输入联系人手机号', trigger: 'blur' },
            { min:11, max: 11, message: '长度为 11 位', trigger: 'blur'}
          ],
          contactPerson: [
            { required: true, message: '请输入门店联系人', trigger: 'blur' },
            { min:1, max: 30, message: '长度在 1 到 30 位', trigger: 'blur'}
          ],
          address:[
           { required: true, message: '请输入详细地址', trigger: 'blur' }
          ],
          workTime: [
            { required: false, message: '长度在最多 30 位', trigger: 'change' }
          ]
        }
      };
    },
    mounted:function(){
    	/*如果是编辑门店页面，需要取该店铺的数据*/
    	var id=this.$route.params.id;
		if(id){
			this.isAdd=2;//1是添加,2是编辑
			this.dataFetch(id);
			
		}else{
			//调用地图
	        this.$refs.MapView.creatmap(this.ruleForm.longitude,this.ruleForm.latitude);
		}
    },
    methods: {
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
		/*如果是编辑门店页面，需要取该店铺的数据*/
		dataFetch(id){
			let para = {
				storeBranchId:id
			}
			getClassifyGet(para).then((res) => {
	        	if(res.data.data){
	        		this.ruleForm=res.data.data;
	        		let address="浙江省*杭州市*下城区*野风现代中心";
	        		this.switchover(this.ruleForm.address);
	        		this.ruleForm.longitude/=1000000;
	        		this.ruleForm.latitude/=1000000;
	        		//调用地图
	        		this.$refs.MapView.creatmap(this.ruleForm.longitude,this.ruleForm.latitude);

	        	}else{
	        		this.$message.error(res.data.message);
	        	}
	        	
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
		/*返回商户中心按钮*/
	    getBack(){
	    	this.dialogVisible1 = false;
	    	this.$router.push({ path: '/store/shop-management' });
	    	location.reload();
	    },
		add(para){//添加门店提交接口
			saveClassify(para).then((res) => {
				this.dialogVisible1 = true;
	        	if(res.data.code==0){
	        		
	        	}else{
	        		this.$message.error(res.data.message);
	        	}
	        }).catch((res)=> {
		        this.listLoading = false;
		    });
		},
		update(para){//编辑门店提交接口
			updateClassify(para).then((res) => {
				
	        	if(res.data.code==0){
	        		this.dialogVisible1 = true;
	        	}else{
	        		this.$message.error(res.data.message);
	        	}
	        	
	        }).catch((res)=> {
		        this.listLoading = false;
		    });
		},
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
					
					para.append('name',this.ruleForm.name);
					para.append('contactPerson',this.ruleForm.contactPerson);
					para.append('contactMobile',this.ruleForm.contactMobile);	
					para.append('workTime',this.ruleForm.workTime);
					para.append('address',this.sel+'*'+this.ruleForm.address);
					para.append('longitude',Number(this.ruleForm.latitude*1000000));
					para.append('latitude',Number(this.ruleForm.longitude*1000000));
					para.append('isHead',Number(this.ruleForm.isHead));


		            if(this.isAdd==1){//添加
		            	para.append('storeId',storeId);
						this.add(para);
		            }else{//编辑
		            	para.append('storeBranchId',Number(this.ruleForm.storeBranchId));
		            	this.update(para);
		            }
	            }else{
	            	return false;
	            }
	        });
        }
    }
  }
</script>

<style lang="scss">
.add-store{
	padding-top:20px;
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
    /* 成功弹框样式 */
	.el-dialog--tiny{
		min-width:490px;
		.el-dialog__footer{
			padding-bottom:50px;
			.dialog-footer{
				display:block;
				text-align:center;
			}
		}
		.el-dialog__body{
			padding:40px 20px;
			.suc{
				width:340px;
				height:50px;
				margin:0 auto;
				
				span{
					float:left;
					display:inline-block;
					width:50px;
					height:50px;
					font-size: 46px;
		    		margin-top: 3px;
		    		color:#41cac0;
		    		padding-right:10px;
				}
				div{
					float:left;
					width:280px;
					h2{
						font-size: 18px;
						color: #333333;
						height:50px;
						line-height:50px;
						margin:0;
						margin-left:15px;
					}
					p{
						font-size: 14px;
						color: #999999;
						height:20px;
						line-height:20px;
						padding-top:5px;
					}
				}
			}
		}
		
	}
}

</style>