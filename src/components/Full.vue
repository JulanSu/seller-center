<template>
  <div class="app-container">
    <app-header :sysUserName="sysUserName"></app-header>
    <div class="main">
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
      <div class="grid-content bg-purple-light">
        <div class="breadcrumb-container">
          <!-- <strong class="title">{{$route.path}}</strong> -->
          <el-breadcrumb separator="/" class="breadcrumb-router">
            <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{ path: item.path }">
             {{ item.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
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
        sysName:'商户中心',
        sysUserName: '',
        sysUserAvatar: ''
      }
    },
    created(){

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


      },
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

  .pro-sidebar {
    width: 200px;
    background:#2a3542;
    border-radius: 0;
    color: #fff;
    .iconfont {
      margin-right: 10px;
    }
    .title {
      color: #fff;
    }
    .el-menu {
      background-color: #2a3542;
    }
    .el-submenu__title,
    .el-menu-item {
      color: #FFF;

      &:hover {
        background-color: #35404d;
        color: $color-primary;
      }
    }
    .el-menu-item {
      font-size:12px;
    }
    .el-menu-item.is-active {
      color: $color-primary;
      background-color: #35404d;
    }

  }

  .el-menu--collapse {
    width: 64px;
  }
  .breadcrumb-router {
    position: relative;
    padding-bottom: 20px;
    border-bottom: 1px solid $color-primary;
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
      // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex:0 0 200px;
        width: 200px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
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
        // background: #f1f2f7;
        flex:1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 200px;
        overflow-y: scroll;
        padding: 20px;
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
      }
    }
  }
</style>