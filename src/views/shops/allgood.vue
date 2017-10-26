<template>
  <section  class="all-good">
    <!--列表-->
    <el-table :data="datas" v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="productId" label="ID" width="190" align="center">
      </el-table-column>
      <el-table-column prop="productTitle" label="商品名称" width="190" align="center">
      </el-table-column>
      <el-table-column width="190" align="center"
            prop="productCoverUrl"
            label="图片">
            <template slot-scope="scope">
              <div class="table-pic">
                <img :src="scope.row.productCoverUrl" />
              </div>
            </template>
          </el-table-column>
      <el-table-column prop="productStatus" :formatter="formatUsed" label="状态" width="190" align="center">
      </el-table-column>
      <el-table-column prop="storeCateNameList" label="当前所属分类" min-width="190" align="center">
      </el-table-column>
      <el-table-column label="操作" min-width="200" align="center">
        <template slot-scope="scope">
          <span style="padding:0;" @click="handleBangding(scope.row)">关联</span>
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

    <el-dialog
        title="关联"
        top="30%"
      :visible.sync="dialogVisible1"
      size="tiny">
      <div class="relevanceGood">
        <el-checkbox-group v-model="roleAuthority">
          <el-checkbox v-for="item in jurisdiction" :label="item.value" :key="item.value">
              {{item.name}}
          </el-checkbox>
        </el-checkbox-group> 
      </div>
        
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" >确定</el-button>
          <el-button>取消</el-button>
        </span>
    </el-dialog>
  </section>
</template>

<script>
import { pageStoreCateProduct,cateList } from '@/api/shopApi';

  export default {
    data() {
      return {
        dialogVisible1:false,
        jurisdiction: [],
        roleAuthority:[],
        total: 0,
        pageSize: 10,//每页显示多少条
        page:1,//当前页数
        datas: [],
        listLoading: false
      }
    },
    mounted:function(){
      let para = {
        storeId:storeId,
      };

      /*cateList(para).then((res) => {
        this.jurisdiction = res.data.data.list;*/

this.jurisdiction =[
  {storeCateId: 2, storeId: 10, cateName: "测试", catePic: "", isUsed: 0, productNum: 0},
  {storeCateId: 2, storeId: 10, cateName: "测试", catePic: "", isUsed: 0, productNum: 0},
  {storeCateId: 4, storeId: 10, cateName: "测试分类", catePic: "", isUsed: 0, productNum: 0},
  {storeCateId: 2, storeId: 10, cateName: "测试", catePic: "", isUsed: 0, productNum: 0},
  {storeCateId: 2, storeId: 10, cateName: "测试", catePic: "", isUsed: 0, productNum: 0},
  {storeCateId: 4, storeId: 10, cateName: "测试分类", catePic: "", isUsed: 0, productNum: 0},
  {storeCateId: 923149914983104500, storeId: 10, cateName: "123", catePic: "", isUsed: 1, productNum: 0},
  {storeCateId: 923153669652742100, storeId: 10, cateName: "123", catePic: "", isUsed: 1, productNum: 0}
];

      /*  this.listLoading = false;
      }).catch((res)=> {
        this.listLoading = false;
      });*/
    },
    methods: {
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
      //关联按钮
      handleBangding(row){
        this.roleAuthority=[];
        //获取该商品已关联的分类
        let para = {
          storeId:storeId
        };
        pageStoreCateProduct(para).then((res) => {
          this.roleAuthority = res.data.data.list;
          this.dialogVisible1=true;//显示关联弹框
        })
       
      },
      //获取用户列表
      getPageStoreCateProduct() {
        let para = {
          storeId:storeId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        this.listLoading = true;
        pageStoreCateProduct(para).then((res) => {
          this.total = res.data.data.total;
          this.datas = res.data.data.list;
          this.listLoading = false;
        }).catch((res)=> {
          this.listLoading = false;
        });
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getPageStoreCateProduct();
      }
    },
    mounted() {
      this.getPageStoreCateProduct();
    }
  }

</script>
<style lang="scss">

.all-good{
  padding:40px 0 0 40px;
  a{
    text-decoration:none;
  }
  .tool-bar{
    background:none;
    padding:0;
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
  .table-pic {
      width: 60px;
      height: 60px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  .el-dialog--tiny{
    width:362px;
    .el-dialog__header{
      border-bottom:1px solid #ddd;
      padding:15px 20px;
      span{
        font-size:14px;
        color:#333333;
        font-weight: normal;
      }
      .el-dialog__headerbtn{
        font-size:12px;
        color:#666;
      }
    }
    .el-dialog__body{
      padding:20px;
      .relevanceGood{
        width:342px;
        .el-checkbox-group{
          width:320px;
          height:280px;
          overflow-y: auto;
          overflow-x: hidden;
          border:1px solid #dddddd;
          padding:10px 0;
          label.el-checkbox{
            padding-left:20px;
            margin :0;
            width:285px;
            height:34px;
            line-height:34px;
            color:#333;
            font-size:14px;
          }
        }
      } 
    }
    .el-dialog__footer{
      padding:10px 20px 50px;
      button{
        padding:10px 30px;
      }
    }
    
  } 
}
</style>