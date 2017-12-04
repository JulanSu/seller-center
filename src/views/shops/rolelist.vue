<template>
  <section class="role-list"  v-loading="listLoading">
    <!--工具条-->
    <el-col class="tool-bar" style="padding-bottom: 0px;">
      <router-link to="/store/bypass-management/new-role" class="add-role">
          <el-button class="wid125" type="primary" icon="plus">新建角色</el-button>
      </router-link>
    </el-col>
    <!--列表-->
    <el-table :data="users" width="100%;"  class="hover-style">
      <el-table-column prop="roleName" label="角色名称" min-width="200"  align="center">
      </el-table-column>
      <el-table-column prop="isUsed" label="状态" :formatter="formatUsed" min-width="200"  align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="200"  align="center">
        <template slot-scope="scope">
          <router-link :to="{ name: '编辑角色', params: { id: scope.row.storeOperatorRoleId }}">编辑</router-link>
          <span @click="handleBtn(scope.$index, scope.row)">{{scope.row.isUsed==1?"禁用":"启用"}}</span>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { roleList,roleChangeStatus } from '@/api/shopApi';

  export default {
    data() {
      return {
        pageSize:1000000,
        pageNum:1,
        users: [],
        listLoading: false
      }
    },
    methods: {
      //转换角色状态
      formatUsed(row){
        return row.isUsed == 0 ? '禁用' : '启用';
      },
      //点击禁用启用按钮
      handleBtn: function (index, row) {
        var tit="启用";
        var isUsed=1;
        if(row.isUsed == 1){
            tit="禁用";
            isUsed=0;
        }

        this.$confirm('确定要'+tit+'该角色吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;

          var para = new URLSearchParams();
          para.append('storeId',config.storeId);
          para.append('storeOperatorRoleId',row.storeOperatorRoleId);
          para.append('isUsed',isUsed);

          roleChangeStatus(para).then((res) => {
            this.listLoading = false;
            if(res.data.code==0){
              this.getRoleList();//更新列表
            }else{
              this.$message.error(res.data.message);
            }
            
          }).catch((res)=> {
            this.listLoading = false;
          });
        }).catch(() => {
        });
      },
      //获取角色列表
      getRoleList() {
        let para = {
          storeId:config.storeId,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        };
        this.listLoading = true;
        roleList(para).then((res) => {
          if(res.data.code==0){
            this.users = res.data.data;
          }else{
            this.$message.error(res.data.message);
          }
          
          this.listLoading = false;
        }).catch((res)=> {
          this.listLoading = false;
        });
      }
    },
    mounted() {
      this.getRoleList();
    }
  }

</script>