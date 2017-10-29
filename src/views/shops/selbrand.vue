<template>
	<section class="sel-brand">
		<category-bar :title="categoryBarTitle"></category-bar>
		<div class="">
	        <el-row>
		      <el-col :span="8" style="min-width:240px;">
		        <category-menu title="一级行业" v-if="categoryData.length" :categoryData="categoryData" @categoryClick="firstHandle">
		        </category-menu>
		      </el-col>
		      <el-col :span="8" style="min-width:240px;">
		        <category-menu title="二级行业" v-if="secoundCategoryData.length" :categoryData="secoundCategoryData" @categoryClick="secondHandle"></category-menu>
		      </el-col>
		    </el-row>
		    <div class="category-nav-breadcrumb">
		      <span class="icon-arrow-top arrow-top-a"><span class="icon-arrow-top arrow-top-b"></span></span>
		      <el-breadcrumb separator=">">
		        <span class="breadcrumb-tips">已选：</span>
		        <template v-if="curCateName.length" v-for="(item,index) in curCateName">
		        	<b v-if="index!=0" class="el-breadcrumb__separator">/</b>
		        	<span v-for="(value,index) in item">
		        		<b v-if="index==1" class="el-breadcrumb__separator">&gt;</b>
						<b>{{value}}</b>
		        	</span>
		        </template>
		      </el-breadcrumb>
		    </div>
	      </div>

		<div class="show-sel">
			<div class="brand-sel">
				<b>您当前选择的是：</b>
				<template v-if="curCateName.length" v-for="(item,index) in curCateName">
		        	<b v-if="index!=0" class="el-breadcrumb__separator">/</b>
		        	<span v-for="(value,index) in item">
		        		<b v-if="index==1" class="el-breadcrumb__separator">&gt;</b>
						<b>{{value}}</b>
		        	</span>
		        </template>
			</div>
			<div class="brand-btn">
				<span>没有找到品牌？——</span>
				<router-link to="/store/brand-management/create-brand" class="addbrand">创建品牌</router-link>
			</div>
		</div>
		<div class="btns">
			<router-link to="/store/brand-management/add-brand" class="makesure">确定</router-link>
			<router-link to="/store/brand-management" class="cancel">取消</router-link>
		</div>
	</section>
</template>

<script>
import CategoryBar from '@/components/CategoryBar.vue'/*标题*/
import CategoryMenu from '@/components/CategoryMenu.vue'/*类目选择*/

export default {
    components: {
    	CategoryBar,
    	CategoryMenu
    },

    data() {
        return {
            categoryBarTitle: '选择品牌',

            //类目选择
			curCateName:[],
			stCateName:'',
			categoryData: [],
			industryCateId:[],
			industryCateIdList:[],
	        secoundCategoryData:[]
        }
	},

    methods:{
		//一级类目选择事件
		firstHandle (row, index){

			this.stCateName='';
			this.stCateName=row.industryCateName;
	        if(row.secondIndustryList.length) {
	            this.secoundCategoryData = row.secondIndustryList;
	        }else {
	            this.secoundCategoryData = [];
	        }
        },

        //二级类目选择事件
        secondHandle (row, index) {
   			this.industryCateId.push(row.industryCateId);
            this.curCateName.push([this.stCateName,row.industryCateName]);
        },

        //选择行业的确定按钮
        industrySel(){
        	if (this.curCateName.length==0) {
        		return false;
        	}else{
        		this.industryCateIdList=this.industryCateIdList.concat(this.industryCateId);
        		this.dialogVisible2=false;
        	}
        }

  	},

	mounted:function(){
		this.categoryData =[
    {
      "industryCateId": 1,
      "industryCateName": "婚纱",
      "industryCateAlias": "hs",
      "industryCateEname": "hunsha",
      "secondIndustryList": [
        {
          "createdBy": 0,
          "createdAt": 1508399314000,
          "updatedBy": 0,
          "updatedAt": 1509004887000,
          "delFlag": 0,
          "idStr": "4",
          "industryCateId": 4,
          "industryCateName": "地板",
          "industryCateAlias": "asjdhjasgd,asjdhgasgd",
          "industryCateEname": "asdhjasfjahs",
          "parentId": 1,
          "shortOrder": 2,
          "catePath": 0,
          "isUse": 0,
          "id": 4
        },
        {
          "createdBy": 0,
          "createdAt": 1508399347000,
          "updatedBy": 0,
          "updatedAt": 1509004890000,
          "delFlag": 0,
          "idStr": "5",
          "industryCateId": 5,
          "industryCateName": "门窗",
          "industryCateAlias": "asjdh",
          "industryCateEname": "asd",
          "parentId": 1,
          "shortOrder": 3,
          "catePath": 0,
          "isUse": 1,
          "id": 5
        },
        {
          "createdBy": 0,
          "createdAt": 1508399750000,
          "updatedBy": 0,
          "updatedAt": 1509004928000,
          "delFlag": 0,
          "idStr": "6",
          "industryCateId": 6,
          "industryCateName": "挖土",
          "industryCateAlias": "asj",
          "industryCateEname": "as",
          "parentId": 1,
          "shortOrder": 4,
          "catePath": 0,
          "isUse": 1,
          "id": 6
        },
        {
          "createdBy": 0,
          "createdAt": 1508399756000,
          "updatedBy": 0,
          "updatedAt": 1509020887000,
          "delFlag": 0,
          "idStr": "7",
          "industryCateId": 7,
          "industryCateName": "美食",
          "industryCateAlias": "aj",
          "industryCateEname": "a",
          "parentId": 1,
          "shortOrder": 5,
          "catePath": 0,
          "isUse": 0,
          "id": 7
        }
      ]
    },
    {
      "industryCateId": 2,
      "industryCateName": "摄影",
      "industryCateAlias": "sy",
      "industryCateEname": "sheying",
      "secondIndustryList": [
        {
          "createdBy": 0,
          "createdAt": 1509011544000,
          "updatedBy": 0,
          "updatedAt": 1509011544000,
          "delFlag": 0,
          "idStr": "14",
          "industryCateId": 14,
          "industryCateName": "摄影2",
          "industryCateAlias": "sy2",
          "industryCateEname": "sheyinger",
          "parentId": 2,
          "shortOrder": 1,
          "catePath": 0,
          "isUse": 1,
          "id": 14
        }
      ]
    },
    {
      "industryCateId": 8,
      "industryCateName": "测试3",
      "industryCateAlias": "cs3",
      "industryCateEname": "ceshi3",
      "secondIndustryList": [
        {
          "createdBy": 0,
          "createdAt": 1508501002000,
          "updatedBy": 0,
          "updatedAt": 1508915247000,
          "delFlag": 0,
          "idStr": "9",
          "industryCateId": 9,
          "industryCateName": "测试1",
          "industryCateAlias": "cs1",
          "industryCateEname": "ceshi1",
          "parentId": 8,
          "shortOrder": 1,
          "catePath": 0,
          "isUse": 1,
          "id": 9
        },
        {
          "createdBy": 0,
          "createdAt": 1508501007000,
          "updatedBy": 0,
          "updatedAt": 1508915250000,
          "delFlag": 0,
          "idStr": "10",
          "industryCateId": 10,
          "industryCateName": "测试2",
          "industryCateAlias": "cs2",
          "industryCateEname": "ceshi2",
          "parentId": 8,
          "shortOrder": 2,
          "catePath": 0,
          "isUse": 1,
          "id": 10
        }
      ]
    },
    {
      "industryCateId": 12,
      "industryCateName": "测试",
      "industryCateAlias": "cs",
      "industryCateEname": "ceshi",
      "secondIndustryList": [
        {
          "createdBy": 0,
          "createdAt": 1509011319000,
          "updatedBy": 0,
          "updatedAt": 1509011332000,
          "delFlag": 0,
          "idStr": "13",
          "industryCateId": 13,
          "industryCateName": "测试添加二级",
          "industryCateAlias": "cstjej",
          "industryCateEname": "ceshitianjaierji",
          "parentId": 12,
          "shortOrder": 1,
          "catePath": 0,
          "isUse": 0,
          "id": 13
        }
      ]
    }
  ];
	}
}

</script>
<style lang="scss">
.sel-brand{
	a{
		text-decoration:none;
		color:#333;
	}
	ul,ol{
		list-style:none;
		padding:0;
	}
	h3,p,ul,ol{
		margin:0;
	}
	.el-dialog__header{
	  background:#f5f7fa;
	  box-shadow:inset 0 -1px 0 0 #dddddd;
	  padding:15px 20px;
	}
	.show-sel{
		background:#fffaf2;
		border:1px solid #fad29a;
		height:30px;
		line-height:30px;
		margin-top:10px;
		.brand-sel{
			padding-left:20px;
			font-size:12px;
			min-width:150px;
			float:left;
			b{
				color:#333;
			}
		}
		.brand-btn{
			float:right;
			width:220px;
			text-align:right;
			padding-right:20px;
			color:#333;
		}
	}
	.btns{
		text-align:center;
		margin-top:30px;
		a{
			display:inline-block;
			background:#41cac0;
			width:100px;
			height:40px;
			line-height:40px;
			font-size:14px;
			color:#fff;
		}
		a.cancel{
			background:#fff;
			color:#666;
			border:1px solid #cccccc;
			width:98px;
			height:38px;
			line-height:38px;
			margin-left:30px;
		}
	}

}
.selbrand .hezi .searchbrand::-webkit-input-placeholder { /* WebKit browsers */ 
	color: #333; 
} 
.selbrand .hezi .searchbrand:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
	color: #333; 
} 
.selbrand .hezi .searchbrand::-moz-placeholder { /* Mozilla Firefox 19+ */ 
	color: #333; 
} 
.selbrand .hezi .searchbrand:-ms-input-placeholder { /* Internet Explorer 10+ */ 
	color: #333; 
} 

</style>