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
      <el-table-column prop="address" label="门店地址" min-width="190" align="center">
      </el-table-column>
      <el-table-column prop="workTime" label="营业时间" width="190" align="center">
      </el-table-column>
      <el-table-column prop="contactPerson" label="联系人" width="190" align="center">
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="{ name: '编辑门店', params: { id: scope.row.storeBranchId }}">编辑</router-link>
          <span @click="handleDel(scope.$index, scope.row)">{{scope.row.isHead==0?"设为总店":""}}</span>
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
import {getClassifyList, saveClassify, updateClassify} from '@/api/shopApi';


  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        page: 1,
        pageSize:10,
        listLoading: false,
      }
    },
    watch: {
     '$route' (to, from) {
      console.log(this.$route.path);
      if(this.$route.path=="/store/shop-management"){
        this.getUsers();
      }
     }
   },
    methods: {
      //获取用户列表
      getUsers() {
        let para = {
          storeId:storeId,
          page: this.page,
          pageSize: this.pageSize
        };
        this.listLoading = true;
        getClassifyList(para).then((res) => {
          this.total = Number(res.data.data.total);
          this.users = res.data.data.list;
          this.listLoading = false;
        });
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      //禁用启用
      handleDel: function (index, row) {
          const h = this.$createElement;
          var isHead=row.isHead==0?1:0;
          this.$msgbox({
            title: "设为总店",
            message: h('p', null, [
              h('span', null, '确认要设为总店吗？ '),
              h('i', { style: 'text-align: center' }, '')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                //instance.confirmButtonLoading = true;
                //instance.confirmButtonText = '执行中...';
                //编辑门店提交接口
                var para = new URLSearchParams();
                para.append('storeBranchId',row.storeBranchId);
                para.append('isHead',isHead);
                updateClassify(para).then((res) => {
                  if(res.data.code==0){
                    this.getUsers();
                    //instance.confirmButtonLoading = false;
                    done();

                  }else{
                    done();
                    this.$message.error(res.data.message);

                  }
                  
                }).catch((res)=> {
                  //this.listLoading = false;
                });
              }else {
                done();
              }
            }
          })
      }
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