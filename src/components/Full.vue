<template>
  <div class="app-container">
    <app-header :sysUserName="sysUserName"></app-header>
        <!--导航菜单-->
    <el-menu :default-active="$route.path" class="pro-sidebar" unique-opened router backgroundColor="#545c64"
    textColor="#fff" activeTextColor="#ffd04b">
      <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
        <el-submenu :index="index+''" v-if="!item.leaf">
          <template slot="title"><i :class="item.iconCls"></i><span slot="title" class="side-title">{{item.name}}</span></template>
          <el-menu-item v-for="child in item.children" :key="child.name" :index="child.path" v-if="!child.hidden" >{{child.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-if="item.leaf && item.children.length>0" :index="item.children[0].path" class="sub-title"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
      </template>
    </el-menu>
    <section class="content-container">
      <div class="main">
        <div class="grid-content bg-purple-light">
          <div :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view :key="key"></router-view>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import AppHeader from './Header'
  export default {
    components: { AppHeader },
    data() {
      return {
        sysName:'商户中心',
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
     '$route' (to, from) {
        let menuArray = document.getElementsByClassName('el-menu-item');
        for(let i=0; i<menuArray.length; i++){
          let that = menuArray[i].innerText;
          
        }
     }
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

      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      }

    }
  }

</script>

<style lang="scss">
  @import '~scss_vars';
  html,body {
    height: 100%;
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
    padding: 60px 0 0 200px;
    height: 100%;
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
    .main {
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0px;
      z-index: 100;
    }
    .content-container {
      position: relative;
      height: 100%;
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
        padding-left:20px;
        margin-top:10px;
      }
      .breadcrumb-router{
        border:none;
        padding-left:40px;
      }
    }
  }
</style>