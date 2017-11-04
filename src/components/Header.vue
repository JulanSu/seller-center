<template>
  <div class="app-header app-navbar">
      <div class="logo logo-width">
        {{sysName}}
      </div>
<!--       <div :span="2">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </div> -->
      <div class="userinfo">
        <div class="user-item">欢迎你，{{ueseName}}</div>
        <div class="user-item">
          <el-dropdown trigger="hover"  @command="handleCommand">
            <span class="el-dropdown-link userinfo-inner">商户中心<i class="el-icon-caret-bottom el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  command="a">设置</el-dropdown-item>
              <el-dropdown-item divided command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>          
        </div>
        <i class="pipe"></i>
        <div class="user-item"><router-link to="/person/message">消息<i>{{total}}</i></router-link></div>
        <i class="pipe"></i>
        <div class="user-item"><i class="el-icon-caret-bottom el-icon--right"></i>商户中心手机版</div>
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
      ueseName:''
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
      console.log(res)
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
       
    }
  }
}
</script>
<style lang="scss">
  @import '~scss_vars';
  .app-navbar {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
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
        padding-right: 35px;
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

</style>