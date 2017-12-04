<template>
  <div class="app-container bgColor">
    <app-header :sysUserName="sysUserName"></app-header>
    <div class='shadows'></div>
    <div class="errorTop">
      <a class="topCont" href="javascript:;">
        <div class="logos"></div>
        <p>商户中心登录</p>
      </a>
    </div>
    <div class="main mains">
    <section class="content-container">
      <div class="grid-content bg-purple-light">
        <div :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view :key="key"></router-view>
          </transition>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
  import AppHeader from './Header'
  export default {
    components: { AppHeader },
    data() {
      return {
        sysName:'',
        sysUserName: '',
        sysUserAvatar: ''
      }
    },
    created(){

    },
    computed: {
        key() {
            return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date();
        }
    },
    watch: {
   },
    methods: {
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });


      }
      //折叠导航栏
      // collapse:function(){
      //   this.isCollapse=!this.isCollapse;
      // },
      // showMenu(i,status){
      //   this.$refs.menuisCollapse.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
      // }
    },
    mounted() {

      /*var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      }*/

    }
  }

</script>

<style lang="scss">
  @import '~scss_vars';
  .bgColor{
    background:#f5f5f5;
    .shadows{
      position:absolute;
      width:100%;
      top:56px;
      left:0;
      height:4px;
      z-index:999;
      box-shadow: 0 2px 5px 0 rgba(204, 204, 204, 0.5);
    }
  }
  .mains{
    .content-container{
      background:#fff;
    }
    .content-wrapper{
      padding:0 !important;
    }
  }
  .errorTop{
    position:absolute;
    top:0;
    width:100%;
    min-width:1190px;
    height:60px;
    background:#Fff;
    transform:translate(-50%,0);
    z-index:99;
    .topCont{
      display:block;
      width:595px;
      height:60px;
      float:right;
      line-height:60px;
      .logos{
        width:104px;
        height:60px;
        float:left;
        background:url(../assets/logos.png) no-repeat center;
        background-size:contain;
      }
      p{ 
        width:170px;
        padding:0;
        float:left;
        padding-left:20px;
        font-size: 20px;
        color: #333333;
        height:60px;
        line-height:60px;

      }
    }
  }
  .el-menu--collapse {
    width: 64px;
  }
  .breadcrumb-router {
    position: relative;
    padding-bottom: 20px;
    border-radius: 0
  }
  .app-container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .main {
      width: 100%;
      display: flex;
      bottom: 0px;
      overflow: hidden;
      position:absolute;
      top:60px;
      aside {
        flex:0 0 200px;
        width: 200px;
        .el-menu{
          height: 100%;
        }
        .isCollapse{
          width:60px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }

        }
      }
      .content-container {
        position: relative;
        flex:1;
        overflow-y: scroll;
        .breadcrumb-container {
          //margin-bottom: 15px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
        .breadcrumb-router{
          border:none;
          padding-left:40px;
        }
      }
    }
  }
</style>