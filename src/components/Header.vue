<template>
  <div class="app-header app-navbar" id="appHeader">
      <router-link to="/home/index">
        <div class="logo logo-width">{{sysName}}</div>
      </router-link>
      
      <div class="breadcrumb-container">
          <!-- <strong class="title">{{$route.path}}</strong> -->
          <el-breadcrumb separator="/" class="breadcrumb-router">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{ path: item.path }">
             {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      <div class="userinfo">

        <div v-if="!login" class="user-item" @click='jump("index")'>欢迎您，{{ueseName}}</div>
        <div v-else class="user-item" @click='jump("login")'>登录</div>
        <div v-if="!login" class="user-item" style="padding:0 30px 0 10px;">
          <el-dropdown trigger="click"  @command="handleCommand" @visible-change="triangle">
            <span class="el-dropdown-link userinfo-inner">商户中心<i class="iconfont icon-xiala2" :class="{'el-xuanzhuan1':elXuanzhuan1,'el-xuanzhuan2':elXuanzhuan2}"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>          
        </div>
        <div v-if='!login' class="user-item" style="width:120px;text-align:center;"> 
          <i class="pipe"></i> 
          <div class="user-item" style="width:90px;text-align:center;"  @click='jump("note")'>消息<i>{{total}}</i>
          </div><i class="pipe"></i>
        </div>
        
        
        <div class="user-item" style="cursor:pointer;" @click='jump("phone")'>
          <i class="iconfont icon-shouji"></i>
          <span style="vertical-align:middle;">商户中心手机版</span>
        </div>
      </div>
  </div>
</template>
<script>
import { msgNumber,userLogout } from '@/api/toolApi';
export default {
  name: 'app-header',
  data(){
    return {
      total: null,
      ueseName:'',
      message:true,
      elXuanzhuan1:false,
      elXuanzhuan2:false,
      login:false
    }
  },
  created(){
    this.getMessageNumber()
  },
  props: {
    sysName: {
      type: String,
      default: '商户中心'
    },
    sysUserName: {
      type: String,
      default: ''
    }
  },
  components: {

  },
  computed: {

  },
  mounted(){
    this.ueseName=config.userName;
    //没有登录，标记login为true，显示登录按钮
    if(!config.storeId){
      this.login=true;
    }
    //如果是入驻页面，右上角的操作都是显示的，但是不可以点击
    if(this.$route.path=="/merchant/merchant-enter-before"||this.$route.path=="/merchant/merchant-enter"){
        this.login=false;
      }
  },
  methods: {
    //跳转首页，手机版页面前判断是否是入驻页面
    jump(str){
      if(this.$route.path=="/merchant/merchant-enter-before"||this.$route.path=="/merchant/merchant-enter"){
        return false;
      }
      if(str=="index"){
        this.$router.push({ path: '/home/index'});
      }else if(str=="phone"){
        this.$router.push({ path: '/home/phone'});
      }else if(str=="login"){
        window.location.href=config.apiHost+"/login";
      }else{
        this.$router.push({ path: '/person/message'});
      }
    },
    handleCommand(command) {
     if(command=="exit"){
        userLogout({}).then((res) => {
          window.location.href= config.apiHost + '/login';
        }).catch(error => {
          console.log(error)
        })
      }
    },
    //下拉框出现/隐藏时触发
    triangle(isShow){
      if(isShow){
        this.elXuanzhuan1=true;
        this.elXuanzhuan2=false;
      }else{
        this.elXuanzhuan1=false;
        this.elXuanzhuan2=true;
      }
      
    },
    //获得消息总数量
    getMessageNumber(){
      let login = this.$route.query.login;
      if(login){
        this.message = false;
        return false;
      }
      msgNumber({uid: config.uid}).then( res => {
        if(res.data.data){
          let tal = Number(res.data.data)
            this.total = tal > 999 ? '999+' : tal;
          }
        }).catch(res => {
          console.log(res)
        })
      }
  }
}
</script>
<style lang="scss">
  @import '~scss_vars';
  ul{
    margin:0;
    padding:0;
  }
  .app-navbar {
      position: relative;
  }
  .breadcrumb-container{
    float:left;
    height:60px;
    padding-bottom:0px;
    padding-left:40px;
    .breadcrumb-router{
      padding:0;
      height:60px;
      line-height:60px;
    }
  }
    .app-header {
      height: 60px;
      line-height: 60px;
      background: #FFF;
      color:#333;
      flex-direction: row;
      .userinfo {
        text-align: right;
        padding-right: 50px;
        float: right;
        color: #666;
        a{text-decoration:none;vertical-align:baseline;zoom:1;}
        .pipe {
          display: inline-block;
          height:24px;
          width: 1px;
          background-color: #ddd;
          vertical-align: middle;
        }
        .user-item {
          display: inline-block;
          padding: 0px 5px; 
          cursor:pointer;
          a{
            color: #666;
          }
          &>i{
              font-style: normal;
              display: inline-block;
              color: #f00;
              margin-left: 3px;
            }
          
        }
        i.icon-shouji{
          color:#41cac0 !important;
          font-size:20px;
          vertical-align: middle;
          padding:0 8px 0 30px;
        }
        .userinfo-inner {
          cursor: pointer;
          color:#666;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        //width:200px;
        height:60px;
        font-size:24px;
        color:#ffffff;
        text-align: center;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        background-color: $color-primary;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width:200px;
        float:left;
      }
      .logo-collapse-width{
        width:60px
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
  .user-nav {
    flex-direction: row;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      height: 30px;
      line-height: 60px;
      +li{
        border-left: 1px solid #eee;
      }
    }
  }

  .el-dropdown-menu{
    background:#ffffff;
    border:1px solid #dddddd;
    box-shadow:0 1px 13px 0 rgba(204,204,204,0.47);
    min-width:100px;
    padding:0;
    .el-dropdown-menu__item:not(.is-disabled):hover {
      background-color: #41cac0 !important;
      color: #fff !important;
    }
    li{
      padding:0 26px;
    }  
  }

  .el-xuanzhuan1{ 
    transform:rotate(-180deg);
    -ms-transform:rotate(-180deg);   /* IE 9 */
    -moz-transform:rotate(-180deg);  /* Firefox */
    -webkit-transform:rotate(-180deg); /* Safari 和 Chrome */
    -o-transform:rotate(-180deg);  /* Opera */
  }
  .el-xuanzhuan2{ 
    transform:rotate(-360deg);
    -ms-transform:rotate(-360deg);   /* IE 9 */
    -moz-transform:rotate(-360deg);  /* Firefox */
    -webkit-transform:rotate(-360deg); /* Safari 和 Chrome */
    -o-transform:rotate(-360deg);  /* Opera */
  }

  .icon-xiala2{
    display:inline-block;
    transform-origin:center;/*定义动画的旋转中心点*/
    -webkit-transform-origin:center;  /* Safari 和 Chrome */
    -moz-transition-origin:center;
    -o-transition-origin:center;
    
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
  }

  

</style>