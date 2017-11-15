<template>
  <section class="fenlei-list" v-if='$route.name=="分类管理"'  v-loading="listLoading">
    <!--工具条-->
    <el-col :span="24" class="tool-bar" style="padding-bottom: 0px;">
      <router-link to="/store/classify-management/add-fen-lei">
        <el-button type="primary" icon="plus">新增分类</el-button>
      </router-link>
    </el-col>
    <!--列表-->
    <el-table :data="datas">
      <el-table-column prop="cateName" label="分类名称" min-width="190" align="center">
      </el-table-column>
      <el-table-column prop="productNum" label="商品数量" min-width="190" align="center">
      </el-table-column>
      <el-table-column prop="isUsed" :formatter="formatUsed" label="显示状态" min-width="190" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="{ name: '编辑分类', params: { id: scope.row.storeCateId }}">编辑</router-link>
          <span @click="handleOptation(scope.row)">{{scope.row.isUsed==1?"隐藏":"显示"}}</span>
          <span @click="handleDel(scope.row)">删除</span>
          <span @click="handleSee(scope.row)">查看商品</span>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="tool-bar" style="margin-top:20px;">
      <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="[20, 50, 100]"
      :current-page="page"
      :page-size="pageSize"
      layout="sizes,prev, pager, next, jumper,total"
      :total="total" style="float:right;">
    </el-pagination>
    </el-col>

  </section>
  <router-view  v-else></router-view>
</template>

<script>
import { cateList,cateRemove,cateUpdate } from '@/api/shopApi';

  export default {
    data() {
      return {
        dialogVisible1: true,
        
        roleAuthority:[1],
        datas: [],
        total: 0,
        pageSize: 20,//每页显示多少条
        page:1,//当前页数
        listLoading: false,
        addLoading: false
      }
    },
    methods: {
      //当选择每页多少条时触发
      handleSizeChange(val){
        this.pageSize = val;
        this.getCateList();
      },
      //获取分类列表
      getCateList() {
        let para = {
          storeId:config.storeId,
          pageSize: this.pageSize,
          pageNum: this.page
        };
        this.listLoading = true;
        cateList(para).then((res) => {
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
      //转换显示状态
      formatUsed(row){
        return row.isUsed == 0 ? '隐藏' : '显示';
      },
      //显示或隐藏该分类
      handleOptation(row) {
        var tit="显示";
        var isUsed=1;
        if(row.isUsed == 1){
            tit="隐藏";
            isUsed=0;
        }

        this.$confirm('确定要'+tit+row.cateName+'该分类?', "提示", {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          var para = new URLSearchParams();
          para.append('storeCateId',row.storeCateId);
          para.append('isUsed',isUsed);
          cateUpdate(para).then((res) => {
            if(res.data.code==0){
              this.getCateList();//更新列表
            }else{
              this.$message.error(res.data.message);
            }
            this.listLoading = false;

          }).catch((res)=> {
            this.listLoading = false;
            this.$message.error('接口建立连接失败');
          });
        });
      },
       //删除子帐号
      handleDel: function (row) {
        this.$confirm('确定要删除'+row.cateName+'该分类吗?', "提示", {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          var para = new URLSearchParams();
          para.append('storeCateId',row.storeCateId);

          cateRemove(para).then((res) => {
            this.listLoading = false;
            if(res.data.code==0){
              this.getCateList();//更新列表
            }else{
              this.$message.error(res.data.message);
            }
            
          }).catch((res)=> {
            this.listLoading = false;
            this.$message.error('接口建立连接失败');
          });
        });
      },
       //产看商品
      handleSee: function (row) {
        var parm={id:row.storeCateId};
        this.$router.push({ path: '/store/classify-management/find-good/', query:parm });
      },
      //分页
      handleCurrentChange:function(val){
        this.page=val;
        this.getCateList();
      }
    },
    mounted() {
      this.getCateList();
    }
  }

</script>

<style lang="scss">
.fenlei-list{
  padding:20px 40px 0 20px;
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
      padding-right:20px;
    }
    span{
      color:#45cdb6;
      padding-right:20px;
      cursor:pointer;
    }
  }
}
</style>