<template>
  <section class="shop-list" v-if='$route.name=="门店管理"'  v-loading="listLoading">
    <!--工具条-->
    <el-col :span="24" class="tool-bar">
      <router-link to="/store/shop-management/add"  icon="plus">
        <el-button type="primary" icon="plus">添加门店</el-button>
      </router-link>
    </el-col>

    <!--列表-->
    <el-table :data="users" style="width: 100%;"  class="hover-style">
      <el-table-column prop="name" label="门店名称" min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="address" label="门店地址" min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="workTime" label="营业时间" min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="contactPerson" label="联系人姓名" min-width="150" align="center">
      </el-table-column>
      <el-table-column prop="contactMobile" label="联系人号码" min-width="150" align="center">
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="{ name: '编辑门店', params: { id: scope.row.storeBranchId }}">编辑</router-link>
          <span @click="handleDel(scope.$index, scope.row)">{{scope.row.isHead==0?"设为总店":""}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="tool-bar pages-bar" v-if="total">
      <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="[20, 50, 100]"
      :current-page="pageNum"
      :page-size="pageSize"
      layout="sizes,prev, pager, next, jumper,total"
      :total="total" style="float:right;">
    </el-pagination>
    </el-col>
  </section>
  <router-view  v-else></router-view>
</template>

<script>
import {getClassifyList, updateClassify} from '@/api/shopApi';


  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        pageNum: 1,
        pageSize:20,
        listLoading: false,
      }
    },
    watch: {
     '$route' (to, from) {
        if(this.$route.path=="/store/shop-management"){
          this.getUsers();
        }
     }
   },
    methods: {
      //获取用户列表
      getUsers() {
        let para = {
          storeId:config.storeId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        this.listLoading = true;
        getClassifyList(para).then((res) => {
          this.listLoading = false;
          if(res.data.code==0){
            this.total = Number(res.data.data.total);
            this.users = res.data.data.list;
          }else{
            this.$message.error(res.data.message);
          }  
        }).catch((res)=> {
          this.listLoading = false;
          this.$message.error('接口建立连接失败');
        });
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getUsers();
      },
      //当选择每页多少条时触发
      handleSizeChange(val){
        this.pageSize = val;
        this.getUsers();
      },
      handleDel: function (index, row) {
        var isHead=row.isHead==0?1:0;
        this.$confirm('确认要设为总店吗？', "设为总店", {
          type: 'warning'
        }).then(() => {
         //编辑门店提交接口
          var para = new URLSearchParams();
          para.append('storeBranchId',row.storeBranchId);
          para.append('isHead',isHead);
          this.listLoading = true;

          updateClassify(para).then((res) => {
            this.listLoading = false;
            if(res.data.code==0){
              this.getUsers(); 
            }else{
              this.$message.error(res.data.message);
            }
          }).catch(()=> {
            this.listLoading = false;
            this.$message.error('接口建立连接失败');
          });
        }).catch(() => {
        });
      }
    },
    mounted() {
      this.getUsers();
    }
  }

</script>