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

<style lang="scss">

.home{
  .gotoPrev{
    width:300px;
    background:#fff;
    height:60px;
    line-height:60px;
    position:fixed;
    top:0;
    left: 240px;
    font-size:14px;
    color:#666666;
  }
  position:absolute;
  background: #F1F2F7;
  bottom:0;
  top:0;
  right:0;
  bottom:0;
  left:0;
  ul,ol,li{
    list-style:none;
    padding:0;
    margin:0;
  }
  .indexHezi{
    width:1000px;
    height:280px;
    margin:40px 0 0 40px;
    .indexLeft{
      width:550px;
      height:280px;
      background:#fff;
      float:left;
      margin-right:10px;
      .top{
        width:530px;
        height:82px;
        margin-top:20px;
        margin-left:20px;
        .logos{
          width:82px;
          height:82px;
          line-height:82px;
          text-align:center;
          overflow: hidden;
          border-radius:50%;
          float:left;
          margin-right:20px;
          img{
            max-width:82px;
            vertical-align: middle;
          }
        }
        ol{
          width:410px;
          float:left;
          li{
            font-size: 14px;
            color: #666666;
            margin-bottom:5px;
            h4{
              font-size: 16px;
              color: #333333;
              height:22px;

              line-height:22px;
              margin-bottom:5px;
            }
          }
          
        }
        
      }
      .goodsBtn{
        margin-top:30px;
        margin-left:122px;
        width:80px;
        text-align:center;
        cursor:pointer;
        .icon{
          width:80px;
          height:80px;
        }
        p{
          margin-top:10px;
          font-size: 12px;
          color: #333333;
        }

      }
    }
    .indexRight{
      width:420px;
      height:280px;
      background:#fff;
      float:left;
      h3{
        height:62px;
        line-height:62px;
        border-bottom:1px solid #ddd;
        font-size: 16px;
        color: #333333;
        padding-left:32px;
      }
      ol{
        padding-top:20px;
        li{
          width:33%;
          float:left;
          text-align:center;
          span{
            font-size: 14px;
            color: #333333;
            line-height:20px;
            margin-bottom:10px;
            display:block;
          }
          p{
            font-size: 20px;
            color: #41CAC0;
            line-height:28px;
          }
        }
      }
    }
  }
}
    
</style>