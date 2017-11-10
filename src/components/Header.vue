<template>
  <div class="app-header app-navbar">
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

        <div class="user-item">欢迎你，{{ueseName}}</div>
        <div class="user-item" style="padding:0 30px 0 10px;">
          <el-dropdown trigger="click"  @command="handleCommand" @visible-change="triangle">
            <span class="el-dropdown-link userinfo-inner">商户中心<i class="iconfont icon-xiala2 el-xuanzhuan1"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  command="a">设置</el-dropdown-item>
              <el-dropdown-item command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>          
        </div>
        <i class="pipe"></i>
        <div class="user-item" style="width:90px;text-align:center;"><router-link to="/person/message">消息<i>{{total}}</i></router-link></div>
        <i class="pipe"></i>
        <div class="user-item" style="cursor:pointer;"><i class="iconfont icon-shouji"></i>商户中心手机版</div>
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
      elXuanzhuan1:false,
      elXuanzhuan2:false
    }
  },
  created(){
    let params = {
      uid: config.uid,
      page: 1,
      size: 20
    }
    msgNumber(params).then( res => {
      if(res.data.data){
        let tal = Number(res.data.data)
        this.total = tal > 999 ? '999+' : tal;
      } 
    }).catch(res => {

    })
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
    
  },
  methods: {
    handleCommand(command) {
     if(command=="exit"){
        userLogout({}).then((res) => {
          window.location.href=config.apiHost;
        });
      }
       
    },
    //下拉框出现/隐藏时触发
    triangle(isShow){

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
      box-shadow:0 2px 5px 0 rgba(204,204,204,0.50);
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
          a{
            color: #666;
            i{
              font-style: normal;
              display: inline-block;
              color: #f00;
              margin-left: 3px;
            }

          }
          
        }
        i.icon-shouji{
          color:#41cac0;
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
    display:inline-block;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg);   /* IE 9 */
    -moz-transform:rotate(180deg);  /* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg);  /* Opera */
  }

  

</style>