<template>
  <section  class="allgood">
    <!--列表-->
    <el-table :data="users" v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="name" label="ID" width="190" align="center">
      </el-table-column>
      <el-table-column prop="age" label="商品名称" width="190" align="center">
      </el-table-column>
      <el-table-column prop="age" label="图片" width="190" align="center">
      </el-table-column>
      <el-table-column prop="password" label="状态" width="190" align="center">
      </el-table-column>
      <el-table-column prop="password" label="当前所属分类" min-width="190" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template scope="scope">
          <span @click="handleDel(scope.$index, scope.row)">关联</span>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="20"
      layout="prev, pager, next, jumper,total"
      :total="total" style="float:right;">
    </el-pagination>
    </el-col>
  </section>
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

<style scoped>
a{
  text-decoration:none;
}
.allgood{
  margin-top:20px;
}
.allgood .toolbar{
  background:none;
  padding:0;
} .toolbar{
  background:none;
  padding:0;
}
.allgood .add{
  width:140px;
  height:34px;
  line-height:34px;
  text-align:center;
  background:#45cdb6;
  font-size:14px;
  color:#ffffff;
  margin:17px 0;
  cursor:pointer;
}
.allgood .cell a{
  color:#45cdb6;
}
.allgood .cell span{
  color:#45cdb6;
  padding-left:20px;
  cursor:pointer;
}
</style>