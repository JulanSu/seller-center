<template>
  <section  class="find-good" v-loading="listLoading">
    <!--工具条-->
    <el-col :span="24" class="tool-bar" style="padding-bottom: 0px;">
      <el-button type="primary" @click="relevance">关联其他商品</el-button>
    </el-col>

    <!--列表-->
    <el-table :data="datas" style="width: 100%;">
      <el-table-column prop="productId" label="ID" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="productTitle" label="商品名称" min-width="200" align="center">
      </el-table-column>
      <el-table-column prop="productStatus" :formatter="formatUsed" label="状态" min-width="200" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template slot-scope="scope">
          <span style="padding:0;" @click="handleDel(scope.row)">移除</span>
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
import { productList,productRemove} from '@/api/shopApi';

  export default {
    data() {
      return {
        pageSize:20,
        pageNum:1,
        datas: [],
        listLoading: false,
        total: 0
      }
    },
    methods: {
      //关联其他商品按钮
      relevance(){
        var parm={storeCateId:this.$route.params.id};
        this.$router.push({ path: '/store/classify-management/all-good', query:parm });
      },
      //转换状态
      formatUsed(row){
        var state='';
        switch(row.productStatus){
          case -1:state="未通过";break;
          case 0:state="草稿箱";break;
          case 1:state="审核中";break;
          case 2:state="待上架";break;
          case 3:state="已上架";break;
          case 4:state="已下架";break;
          case 5:state="回收站";break;
        }
        return state;
      },
      //当选择每页多少条时触发
      handleSizeChange(val){
        this.pageSize = val;
        this.getProductList();
      },
      //获取用户列表
      getProductList() {
        let para = {
          //storeCateId:this.$route.params.id,
          storeCateId:1,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        this.listLoading = true;

        productList(para).then((res) => {
          this.total = Number(res.data.data.total);
          this.datas = res.data.data.list;

          this.listLoading = false;
        }).catch((res)=> {
          this.listLoading = false;
        });
      },
      //移除商品
      handleDel: function (row) {
        this.$confirm('确定把该商品在该分类下移除吗?', "提示", {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          var para = new URLSearchParams();
          para.append('storeCateProductId',row.storeCateProductId);
          
          productRemove(para).then((res) => {
            this.listLoading = false;
            this.getProductList();//更新列表
          }).catch((res)=> {
            this.listLoading = false;
          });
        });
      },
      //分页
      handleCurrentChange:function(val){
        this.page=val;
        this.getProductList();
      }
    },
    mounted() {
      this.getProductList();
    }
  }

</script>

<style lang="scss">
.find-good{
  padding:40px 0 0 40px;
  a{
    text-decoration:none;
  }
  .tool-bar{
    margin-bottom:20px;
    background:none;
    padding:0;
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