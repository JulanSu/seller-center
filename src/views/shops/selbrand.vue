<!-- <template>
　　<div>
　　　　<ul>
　　　　　　<li v-for="(item,$index) in items" @click="selectStyle (item, $index) " :class="{'active':item.active,'unactive':!item.active}" >
　　　　　　{{item.select}} 
　　　　　　<span class="icon" v-show="item.active">当我是图标</span>
　　　　　　</li>
　　　　</ul>
　　</div>
</template> -->


<template>
	<section class="sel-brand">
		<category-bar :title="categoryBarTitle"></category-bar>
		<div style="min-width:980px">
	        <el-row>
		      <el-col :span="8" style="width:240px;">
		        <category-menu title="一级行业" :categoryData="categoryData" @categoryClick="firstHandle" :arrKey="secondIndustryList">
		        </category-menu>
		      </el-col>
		      <el-col :span="8" style="width:240px;" class="no-bor">
		        <category-menu title="二级行业" v-if="secoundCategoryData.length" :categoryData="secoundCategoryData" @categoryClick="secondHandle" :arrKey="brandList"></category-menu>
		      </el-col>
          <el-col v-if="logos.length||allBrand.length" :span="8" style="min-width:240px;" class="all-logo">
            <ul>
              <li v-for="(item,index) in logosBtn"  :class="{ sel:index==thisIndex }" @click="searchBrand(item,index)">{{item}}</li>
            </ul>
            <ol>
              <li v-for="(item,index) in logos" @click="thirdHandle(item,index)" :class="{'on':item.active}">{{item.nameCn}}</li>
            </ol>
          </el-col>
		    </el-row>

	      </div>

		<div class="show-sel">
			<div class="brand-sel">
				<b v-if="curCateName">您当前选择的是：</b>
				<template v-if="curCateName" v-for="(item,key) in curCateName">
		        <span>
              <b>{{item}}</b>
              <i class="el-icon-circle-close" @click="delBrand(item,key)"></i> 
            </span>	
		    </template>
			</div>
			<div class="brand-btn">
				<span>没有找到品牌？——</span>
				<router-link to="/store/brand-management/create-brand" class="addbrand">创建品牌</router-link>
			</div>
		</div>
		<div class="btns">
      <el-button type="primary" @click="addBrandBtn">确定</el-button>
			<router-link to="/store/brand-management">
        <el-button>取消</el-button>   
      </router-link>
		</div>
	</section>
</template>

<script>
import CategoryBar from '@/components/CategoryBar.vue'/*标题*/
import CategoryMenu from '@/components/CategoryMenu2.vue'/*类目选择*/
import { listindustrybrand } from '@/api/shopApi';

export default {
    components: {
    	CategoryBar,
    	CategoryMenu
    },

    data() {
      return {
        categoryBarTitle: '选择品牌',
        secondIndustryList:'secondIndustryList',
        brandList:'brandList',

        //类目选择
  			curCateName:{},
  			stCateName:'',
  			categoryData: [],
  			industryCateId:[],
  			industryCateIdList:[],
	      secoundCategoryData:[],
        brands:{},

        //品牌按照字母筛选品牌
        logosBtn:["全部","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
        ],
        logos:[],//品牌数据
        allBrand:[],//用于记录品牌的全部数据
        thisIndex:0
      }
	  },

    methods:{
  		//一级类目选择事件
  		firstHandle (row, index){

  			this.stCateName='';
  			this.stCateName=row.industryCateName;

        this.secoundCategoryData = row.secondIndustryList;
        this.thirstCategoryData = [];
        this.logos = [];
      },

      //二级类目选择事件
      secondHandle (row, index) {
        this.thirstCategoryData = [];
        this.allBrand=this.logos = row.brandList;
  			this.industryCateId.push(row.industryCateId);
       
      },
      //三级类目选择事件
      thirdHandle(row){
        var isOn=row.active;
        if(!isOn){
          this.$set(row,'active',true);
          this.$set(this.curCateName,row.brandId,row.nameCn);
        }else{
          this.$set(row,'active',false);
          this.$delete(this.curCateName,row.brandId);
        }


        


      },
      //删除品牌
      delBrand(val,key){console.log(val,key)
        var that=this;
        this.$delete(this.curCateName,key);
        this.logos.forEach(function (item) {
          if(item.brandId==key){
            that.$set(item,'active',false);
            return false;
          }
　　　　　　
　　　　});


      },
      //添加品牌的确定按钮
      addBrandBtn(){
        if(JSON.stringify(this.curCateName)== "{}"){
          this.$message({
            message: '请选择品牌',
            type: 'warning'
          });
        }else{
          this.$router.push({ path: '/store/brand-management/add-brand', query:this.curCateName })
        }
      },

      //按照字符搜索品牌
      searchBrand(item,index){
        this.thisIndex=index;
        if(index==0){//全部
          this.logos=this.allBrand;
        }else{
          this.logos=[];
          for(var i=0;i<this.allBrand.length;i++){
            if(this.allBrand[i].nameEn.substr(0,1).toUpperCase()==item){
               this.logos.push(this.allBrand[i]);
            }
          }
        }
      }

  	},

  	mounted:function(){
      let para = {
        storeId:config.storeId
      };
      this.listLoading = true;
      listindustrybrand(para).then((res) => {
        this.listLoading = false;
        if(res.data.code==0){
          this.categoryData= res.data.data;
        }
        
      }).catch((res)=> {
        this.listLoading = false;
      });
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
    width:980px;
		background:#fffaf2;
		border:1px solid #fad29a;
		overflow: hidden;
    padding:10px 0;
		margin-top:10px;
		.brand-sel{
			padding-left:20px;
			font-size:12px;
			min-width:150px;
			float:left;
			b{
				color:#333;
			}
      span{
        margin-left:20px;
        cursor:pointer;
        position:relative;
        i{
          position:absolute;
          display:block;
          top:-4px;
          right:-12px;
          color:red;
        }
      }
		}
		.brand-btn{
			float:right;
			width:220px;
			text-align:right;
			padding-right:20px;
			color:#333;
      font-size:12px;
		}
	}
	.btns{
    width:980px;
    text-align:center;
		text-align:center;
		margin-top:30px;

	}
  .all-logo{
    width:500px;
    height:365px;
    border:1px solid #ddd;
    border-left:0;
    ul{
      height:40px;
      line-height:40px;
      border-bottom:1px solid #ddd;
      li{
        display:inline-block;
        width:17px;
        cursor:pointer;
        text-align:center;
        display:inline;
        padding:0 4px;
      }
      
      li.all{

      }
      li.sel{
        color:#41cac0;
      }
    }
    ol{
      padding:8px 0;
      li{
        display:inline-block;
        width:112px;
        text-align:center;
        height:34px;
        line-height:34px;
        cursor:pointer;
        margin:0 0 10px 10px;
      }
      li.on{
        color:#fff;
        background:#41cac0;
      }
    }

  }
  .no-bor{
    .category-nav{
      border-left:0;
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