<template>
  <section class="account-list" v-loading="listLoading">
    <!--工具条-->
    <el-col :span="24" class="tool-bar" style="padding-bottom: 0px;">
      <el-button type="primary" icon="plus" @click="addAccount">新建子账号</el-button>
    </el-col>

    <!--列表-->
    <el-table :data="datas">
      <el-table-column prop="account" label="账号名" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="name" label="使用者" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="roleName" label="岗位" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="isUsed" :formatter="formatUsed" label="状态" min-width="200" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="{name:'编辑子账号', query: { id: scope.row.storeOperatorId}}">编辑</router-link>
          <span @click="handleOptation(scope.row)">{{scope.row.isUsed==1?"冻结":"解冻"}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="tool-bar" style="margin-top:20px;">
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
</template>

<script>
import {operatorList,operatorChangeStatus,operatorGetNum} from '@/api/shopApi';

  export default {
    data() {
      return {
        datas: [],
        total: 0,
        pageSize: 20,//每页显示多少条
        pageNum:1,//当前页数
        listLoading: false,
        addLoading: false,
        usedNum:'',
        addFlag:false
      }
    },
    methods: {
      //获取子账号使用数量
      getNum(row){
        let para = {
          storeId:config.storeId
        };
        this.listLoading = true;
        operatorGetNum(para).then((res) => {
          this.listLoading = false;
          if(res.data.code==0){
            this.usedNum=res.data.data.usedNum;
            if(this.usedNum>=5){
              this.$message({message: '子账号使用数量已满，先去冻结子账号',type: 'warning'});
            }else{
              if(this.addFlag){//新建子账号按钮
                this.optation();
              }else{//解冻、冻结
                this.handleAjax(row);
              }
            }
          }
        }).catch((res)=> {
          this.listLoading = false;
          this.$message.error('接口建立连接失败');
        });
      },

      //新建子账号的按钮
      addAccount(){
        this.addFlag=true;
        this.getNum();
      },
      optation(){
        this.addFlag=false;
        this.$router.push({ path: '/store/bypass-management/new-account'});
      },
      //转换角色状态
      formatUsed(row){
        return row.isUsed == 0 ? '已冻结' : '使用中';
      },
      //获取用户列表
      getAccountList() {
        let para = {
          storeId:config.storeId,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        };
        this.listLoading = true;

        operatorList(para).then((res) => {
          if(res.data.code==0){
            this.total = Number(res.data.data.total);
            this.datas = res.data.data.list;
          }else{
            this.$message.error(res.data.message);
          }
          this.listLoading = false;
        }).catch((res)=> {
          this.listLoading = false;
          this.$message.error('接口建立连接失败');
        });
      },
      //当选择每页多少条时触发
      handleSizeChange(val){
        this.pageNum=1;
        this.pageSize = val;
        this.getAccountList();
      },
      //解冻或冻结子账号
      handleOptation(row) {
        if(row.isUsed == 1){
          this.handleAjax(row);
        } else{
          this.getNum(row);
        }
      },
      handleAjax(row){
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
            if(res.data.code==0){
              this.getAccountList();//更新列表
            }else{
              if(res.data.message=='所选角色已冻结'){
                this.$message.error('请先在管理角色中启用该子账号的角色');
              }else{
                this.$message.error(res.data.message);
              } 
            }
      
          }).catch((res)=> {
            this.listLoading = false;
            this.$message.error('接口建立连接失败');
          });
        });
      },
      //分页
      handleCurrentChange:function(val){
        this.pageNum=val;
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
  padding:40px 40px 0 20px;
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