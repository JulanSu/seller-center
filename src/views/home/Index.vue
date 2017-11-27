<template>
  <section class="home">
  <div class="gotoPrev">店铺首页</div>
  <div class="indexHezi">
    <div class='indexLeft' v-loading="listLoading1">
      <div class="top">
        <div class="logos">
          <img :src="message.logo">
        </div>
        <ol>
          <li>
            <h4>{{message.name}}</h4>
          </li>
          <li>主营行业:{{message.industryCateString}}</li>
          <li>服务范围:{{message.cityString}}</li>
        </ol>
      </div>
      <div class="goodsBtn" @click="jump">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fabushangpin"></use>
        </svg>
        <p>发布商品</p>
      </div>
    </div>
    <div class='indexRight' v-loading="listLoading2">
      <h3>店铺账号</h3>
      <ol>
        <li>
          <span>使用中</span>
          <p>{{num.usedNum}}</p>
        </li>
         <li>
          <span>可激活</span>
          <p>{{num.unUsedNum}}</p>
        </li>
         <li>
          <span>总数</span>
          <p>{{num.total}}</p>
        </li>
      </ol>
    </div>
  </div>
  </section>
  
</template>

<script>
import { getShopMessage,operatorGetNum } from '@/api/shopApi';



export default {
  data() {
    return {
      listLoading1:false,
      listLoading2:false,
      message:{
        logo:'',
        name:'',
        industryCateString:'',
        cityString:''
      },
      num:{
        usedNum:'',
        unUsedNum:'',
        total:''
      }

    }
  },

  mounted() {  
    this.getShop();
    this.getNum();
  },
  computed: {
  },

  methods: {
    //跳转发布商品页面
    jump(){
      var arr=this.$router.options.routes;
      var flag=false;console.log(this.$router.options)
      for(var i=0;i<arr.length;i++){
        if(arr[i].path=="/seller-management"){
          flag=true;
        }
      }

      if(flag){
        this.$router.push({ path: '/seller-management/goods'});
      }else{
        this.$message({message: '您没有创建商品的权限哦',type: 'warning'});
      }
    },
    //获取店铺信息
    getShop() {
      let para = {
        storeId: config.storeId
      };
      this.listLoading1 = true;
      getShopMessage(para).then((res) => {
        this.listLoading1 = false;
        if(res.data.code==0){
          this.message=res.data.data;
        }
      }).catch((res)=> {
          this.listLoading1 = false;
      });
    },

    //获取子帐号使用数量
    getNum(){
      let para = {
        storeId:config.storeId
      };
      this.listLoading2 = true;
      operatorGetNum(para).then((res) => {
        this.listLoading2 = false;
          if(res.data.code==0){
            this.num=res.data.data;
          }
        }).catch((res)=> {
            this.listLoading2 = false;
        });
    }
  }
}

</script>