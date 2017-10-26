<template>
  <section class="account-list">
    <!--工具条-->
    <el-col :span="24" class="tool-bar" style="padding-bottom: 0px;">
      <router-link to="/store/bypass-management/new-account" class="add-account">
        <el-button type="primary" icon="plus">新建子账号</el-button>
      </router-link>
    </el-col>

    <!--列表-->
    <el-table :data="datas" v-loading="listLoading">
      <el-table-column prop="account" label="帐号名" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="使用者" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="roleName" label="岗位" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="isUsed" :formatter="formatUsed" label="状态" min-width="200" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="{name:'编辑子帐号', params: { id: scope.row.storeOperatorId}}">编辑</router-link>
          <span @click="handleOptation(scope.row)">{{scope.row.isUsed==1?"使用中":"已冻结"}}</span>
          <span @click="handleDel(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="tool-bar" style="margin-top:20px;">
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="pageSize"
      layout="prev, pager, next, jumper,total"
      :total="total" style="float:right;">
    </el-pagination>
    </el-col>
  </section>
</template>

<script>
import {operatorList,operatorChangeStatus,operatorRemove} from '@/api/shopApi';

  export default {
    data() {
      return {
        datas: [],
        total: 20,
        pageSize: 10,//每页显示多少条
        page:1,//当前页数
        listLoading: false,
        addLoading: false
      }
    },
    methods: {
      //转换角色状态
      formatUsed(row){
        return row.isUsed == 0 ? '禁用' : '启用';
      },
      //获取用户列表
      getAccountList() {
        let para = {
          storeId:storeId,
          pageSize: this.pageSize,
          pageNum: this.page
        };
        this.listLoading = true;

        operatorList(para).then((res) => {
          this.listLoading = false;
          this.total = res.data.data.total;
          this.datas = res.data.data.list;

        });
      },
      //解冻或冻结子帐号
      handleOptation(row) {
        var tit="解冻";
        var isUsed=1;
        if(row.isUsed == 1){
            tit="冻结";
            isUsed=0;
        }

        this.$confirm('确定要'+tit+row.account+'这个账号吗?', "提示", {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          var para = new URLSearchParams();
          para.append('storeOperatorId',row.storeOperatorId);
          para.append('isUsed',isUsed);

          operatorChangeStatus(para).then((res) => {
            this.listLoading = false;
            this.getAccountList();//更新列表
          }).catch((res)=> {
            this.listLoading = false;
          });
        });
      },
      //删除子帐号
      handleDel: function (row) {
        this.$confirm('确定要删除'+row.account+'子账号吗?', "提示", {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          var para = new URLSearchParams();
          para.append('storeOperatorId',row.storeOperatorId);

          operatorRemove(para).then((res) => {
            this.listLoading = false;
            this.getAccountList();//更新列表
          }).catch((res)=> {
            this.listLoading = false;
          });
        });
      },
      //分页
      handleCurrentChange:function(val){
        this.page=val;
        this.getAccountList();
      }
    },
    mounted() {
      this.getAccountList();
    }
  }

</script>

<style lang="scss">
.account-list{
  padding:40px 0 0 40px;
  a{
    text-decoration:none;
  }
  .tool-bar{
    background:none;
    padding:0;
    margin-bottom:20px;
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