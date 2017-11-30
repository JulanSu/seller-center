<template>
	<section class="sel-brand">
		<category-bar :title="categoryBarTitle"></category-bar>
		<div style="min-width:980px">
	        <el-row>
		      <el-col :span="8" style="width:240px;">
		        <category-menu title="一级行业" :categoryData="categoryData" :ind="index1" @categoryClick="firstHandle" :arrKey="secondIndustryList">
		        </category-menu>
		      </el-col>
		      <el-col :span="8" style="width:240px;" class="no-bor" id="erji">
		        <category-menu title="二级行业" v-if="secoundCategoryData.length" :ind="index2" :categoryData="secoundCategoryData" @categoryClick="secondHandle" :arrKey="brandList"></category-menu>
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
        <i v-if="JSON.stringify(curCateName) =='{}'">无</i>
				<template v-if="curCateName" v-for="(item,key) in curCateName">
		        <span><b>{{item.nameCn}}</b><i class="iconfont icon-guanbi1" @click="delBrand(item,key)"></i> </span>	
		    </template>
			</div>
			<div class="brand-btn">
				<span>没有找到品牌？——</span>
				<router-link to="/store/brand-management/create-brand" class="addbrand">创建品牌</router-link>
			</div>
		</div>
		<div class="btns">
      <el-button type="primary" @click="addBrandBtn" class="wid100">确定</el-button>
			<router-link to="/store/brand-management">
        <el-button class="wid100">取消</el-button>   
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
        index1:"",
        index2:"",
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

        //删除刚才二级选中的状态
        var o=document.querySelector("#erji").querySelectorAll(".is-active")
        console.log(o)
        for(var i=0;i<o.length;i++){
          var cla=o[i].getAttribute("class");
          cla=cla.replace("is-active",'');
          o[i].setAttribute("class",cla);
        }
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
          var objs={
            nameCn:row.nameCn
          };
          if(row.registerLocation=='中国大陆'){
            objs.registerLocation=1;//设置该品牌是否是中国大陆品牌
          }else{
            objs.registerLocation=2;//2为国外或是港澳台
          }

          this.$set(this.curCateName,row.brandId,objs);
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
          sessionStorage.setItem("addBrand",JSON.stringify(this.curCateName));
          this.$router.push({ path: '/store/brand-management/add-brand', query:{'add':'y'} })
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