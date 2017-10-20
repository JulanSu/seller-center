<template>
  <section class="shop-list" v-if='$route.name=="门店管理"'>
    <!--工具条-->
    <el-col :span="24" class="tool-bar">
      <router-link to="/store/shop-management/add"  icon="plus">
        <el-button type="primary" icon="plus">添加门店</el-button>
      </router-link>
    </el-col>

    <!--列表-->
    <el-table :data="users" v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="name" label="门店名称" width="190" align="center">
      </el-table-column>
      <el-table-column prop="age" label="门店地址" min-width="190" align="center">
      </el-table-column>
      <el-table-column prop="password" label="营业时间" width="190" align="center">
      </el-table-column>
      <el-table-column prop="state" label="联系人" width="190" align="center">
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template scope="scope">
          <router-link :to="{ name: '编辑门店', params: { id: scope.$index }}">编辑</router-link>
          <span @click="handleDel(scope.$index, scope.row)">{{scope.row.sex==0?"编辑":"设为总店"}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="tool-bar">
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="20"
      layout="prev, pager, next, jumper,total"
      :total="total" style="float:right;">
    </el-pagination>
    </el-col>
  </section>
  <router-view  v-else></router-view>
</template>

<script>
  import util from 'common/js/util'
  //import NProgress from 'nprogress'
  import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from 'api/api';

  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列

        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        }

      }
    },
    methods: {
      //获取用户列表
      getUsers() {
        let para = {
          page: this.page,
          name: this.filters.name
        };
        this.listLoading = true;
        //NProgress.start();
        getUserListPage(para).then((res) => {
          this.total = res.data.total;
          this.users = res.data.users;
          console.log(this.users)
          this.listLoading = false;
          //NProgress.done();
        });
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      //禁用启用
      handleDel: function (index, row) {
          const h = this.$createElement;
          const tit=row.sex==1?"冻结":"解冻";
          this.$msgbox({
            title: tit,
            message: h('p', null, [
              h('span', null, '确认要'+tit+'邱某人这个子帐号吗？ '),
              h('i', { style: 'text-align: center' }, '')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
              } else {
                done();
              }
            }
          }).then(action => {
            setTimeout(() => {
              instance.confirmButtonLoading = false;
              done();
            }, 3000);
            this.$message({
              type: 'info',
              message: 'action: ' + action
            });
          });
      },

      selsChange: function (sels) {
        this.sels = sels;
      },
    },
    mounted() {
      this.getUsers();
    }
  }

</script>

<style lang="scss">

.shop-list{
  a{
    text-decoration:none;
  }
  .tool-bar{
    width:100%;
    background:none;
    margin:20px 0;
  }
  .cell{
    a{
      color:#45cdb6;
    }
    span{
      color:#45cdb6;
      padding-left:20px;
      cursor:pointer;
    }
  }
}
</style>