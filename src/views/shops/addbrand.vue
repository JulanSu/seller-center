<template>
	<section class="add-account">
		
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			<el-form-item label="品牌名称" label-width="100px" prop="name">
				<el-input readonly="true" v-model="ruleForm.name" class="wid400"></el-input>
			</el-form-item>
			<el-form-item label="品牌资质" label-width="100px">
				<upload-pictures :note="uploadAptitude"></upload-pictures>
			</el-form-item>
			<el-form-item prop="authorized" label="授权渠道 " label-width="100px">
				<el-input v-model="ruleForm.authorized" placeholder="请输入授权渠道" class="wid400"></el-input>
			</el-form-item>	
			<el-form-item prop="hostCity" label="授权城市"  label-width="100px">
				<el-input v-model="ruleForm.hostCity" placeholder="请输入授权城市" class="wid400"></el-input>
			</el-form-item>
			<el-form-item label="有效时间"  label-width="100px">
			    <el-col style="width:190px;">
			      <el-form-item prop="dateStart">
			        <el-date-picker type="date" v-model="ruleForm.dateStart"  placeholder="请输入有效起始时间" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			    <el-col class="line" style="text-align:center;width:20px;">-</el-col>
			    <el-col style="width:190px;">
			      <el-form-item prop="dateEnd">
			        <el-date-picker type="date" v-model="ruleForm.dateEnd" placeholder="请输入有效结束时间" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			</el-form-item>
			<el-form-item prop="tel" label="联系电话"  label-width="100px">
				<el-input v-model="ruleForm.tel" placeholder="请输入联系电话" class="wid400"></el-input>
				<p class="tishi">审核同学有疑问时，会通过此联系方式联系您</p>
			</el-form-item>
			<el-form-item label="" label-width="100px">
				<el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
			</el-form-item>
			
		</el-form>
		<ul>
			<template>
				<li  v-for="(brandTit,index) in brandTits" @click="switchover(index,brandTit)" :brand-id="brandTit.id" :class="{on:index==nowIndex}">
					<h6>{{brandTit.name}}</h6>
					<p>(待填写)</p>
				</li>
			</template>
		</ul>
	</section>
	
</template>

<script>
import UploadPictures from '@/components/UploadPictures.vue'/*上传图片组件*/

  export default {
  	components: {
  		UploadPictures
  	},
    data() {
      return {
      	brandTits:[
      		{
      			name:"品牌1",
      			id:"1"
      		},
      		{
      			name:"品牌2",
      			id:"2"
      		},
      		{
      			name:"品牌3",
      			id:"3"
      		},
      		{
      			name:"品牌4",
      			id:"4"
      		}
      	],
      	nowIndex:0,
      	uploadAptitude:"图片尺寸200px*200px以上，大小800k以内，格式png/jpg/jpeg，格式要求jpg、jpeg、png，不超过10MB",
        ruleForm: {
          name: '品牌1',
          authorized: '',
          hostCity: '',
          dateStart: '',
          dateEnd: '',
          tel: ''
        },
        rules: {
	        authorized: [
	          { required: true, message: '请输入授权渠道', trigger: 'blur' },
	          { max: 50, message: '长度最多 50 位', trigger: 'blur' }
	        ],
	        hostCity: [
	          { required: true, message: '请输入授权城市', trigger: 'blur' },
	          { max: 20, message: '长度最多 20 位', trigger: 'blur' }
	        ],
	        dateStart: [
	          { type: 'date', required: true, message: '请选择有效起始时间', trigger: 'blur' }
	        ],
	        dateEnd: [
	          { type: 'date', required: true, message: '请选择有效结束时间', trigger: 'blur' }
	        ],
	        tel: [
	          { required: true, message: '请填写联系电话', trigger: 'blur' },
	          { min: 11, max: 11, message: '长度为 11 位', trigger: 'blur' }
	        ]
	      }
      };
    },
    methods: {
    	/*切换品牌*/
    	switchover(index,brandTit){

    		this.nowIndex=index; 
    		this.ruleForm.name=brandTit.name;
    		store.newMessage({
		        text: this.name
		    });
		    
    	},
    	/*提交品牌信息*/
	    submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            alert('submit!');
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      }
	    }
  }
</script>

<style lang="scss">
.add-account{
	padding-top:20px;
	/* 公共样式 */
	.wid400{
    	width:400px;
    }
    p,h6,ul{
    	margin:0;
    	padding:0;
    }
    .tishi{
		font-size: 12px;
		color: #999999;
	}
	ul{
		list-style: none;
		width:195px;
		margin-top:-561px;
		border-top:1px solid #ddd;
		border-right:1px solid #ddd;
		min-height:560px;
		background:#F5F7FA;
		li{
			text-align:center;
			font-size: 14px;
			padding:22px 0;
			border-bottom:1px solid #ddd;
			border-left:2px solid transparent;
			cursor:pointer;
			position:relative;
			h6,p{
				height:20px;
				line-height:20px;
			}
			h6{
				color: #666666;
				padding-bottom:6px;
			}
			p{
				color: #FF0201;
			}
		}
		li.on{
			background:#fff;
			border-left-color:#41CAC0;
		}
		li.on:before,li.on:after{
			border: solid transparent;
		  	content: ' ';
		  	height: 0;
		  	left: 174px;
		  	position: absolute;
		  	width: 0;
		}
		li.on:before {
		    border-width: 10px;
		    border-right-color: #ddd;
		    top: 35px;
		}
		li.on:after{
			border-width: 9px;
			border-right-color: #fff;
			top: 36px;
			left:176px;
		}
		
	}
	form.el-form{
		margin-left:195px;
		height:530px;
		min-width:600px;
		padding-top:30px;
		border-top:1px solid #ddd;
	}	
}
</style>