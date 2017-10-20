<template>
  <div class="sidebar">
    <div class="sidebar-nav">
      <el-menu :default-active="$route.path" class="pro-sidebar" unique-opened router :collapse="isCollapse">
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
          <el-submenu :index="index+''" v-if="!item.leaf">
            <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
            <el-menu-item v-for="child in item.children" :index="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: 'sidebar',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  computed: {
  },
  route: {
  },
  computed: {
  },
  
  created (){

  },
  methods: {

  }
}
</script>

<style lang="css">

</style>
