<template>
    <div class="goods-table">
      <el-table
        :data="tableData"
        style="width: 100%" 
        class="seller-table" highlight-current-row v-loading="listLoading">
        <el-table-column
          prop="productId"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productTitle"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productCoverUrl"
          label="图片">
          <template slot-scope="scope">
            <div class="table-pic">
              <img :src="scope.row.productCoverUrl" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="storeCateNameList"
          label="店铺分类">
          <template slot-scope="scope">
            <span v-if="scope.row.storeCateNameList">{{scope.row.storeCateNameList.join('/')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productSkuAllQuantity"
          label="库存">
        </el-table-column>
        <el-table-column
          prop="productSellPrice"
          label="展示价">
        </el-table-column>
        <el-table-column
          prop="productStatus"
          label="上架状态">
          <template slot-scope="scope">
            <span>{{getProductStatusValue(scope.row.productStatus)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="operational"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="onCancelHandle(scope.row)">取消审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" v-if="pagination.total > pagination.pageSize">
        <pagination 
          :paginationConfig="pagination"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"></pagination>
      </div>

    <el-dialog
      :visible.sync="dialogVisible"
      size="tiny" width="300" class="dialog-wrap" :title="dialogConfig.title">

      <div class="block"><h3 class="tips">{{dialogConfig.content}}</h3></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="entryDialogHandle(tableRow)">确 定</el-button>
      </span>
    </el-dialog>
    </div>

</template>

<script>
  import Pagination from './components/Pagination.vue'
  export default {
    components: {
      Pagination
    },
    data() {
      return {
        listLoading: true,
        tableRow: null,
        dialogVisible: false
      }
    },
    props: {
      tableData: {
        type: Object,
        default: {
          storeId: '',
          productId: '',
          productName: '',
          storeCateId: '',
          searchStartTime: '',
          searchEndTime: '',
          pageNum: 1,
          pageSize: 10
        }
      },
      paginationConfig: {
        type: Object,
        default: {
          total: '',
          pageSize: 10,
          curPage: 1
        }  
      },
      dialogConfig: {
        type: Object,
        default: {
          title: '',
          content: '',
          message: ''
        }     
      },
      dialogVisible: false
    },
    mounted: function () {

    },
    methods: {
      getProductStatusValue(statusNumber){
        var statusValue = getProductStatus(statusNumber)
        if(statusValue) {
          return statusValue
        }
      },
      /**
       * getInreviewList 获取商品列表
       * @param  { String } storeId         店铺ID
       * @param  { Number } pageNum         当前页面
       * @param  { Number } pageSize        当前页面显示条目
       * @param  { Number } productId       商品ID
       * @param  { Number } productName   商品名称 
       * @param  { String } storeCateId     店铺分类ID
       * @param  { String } searchStartTime 搜索开始时间
       * @param  { String } searchEndTime   搜索结束时间
       * @return {[type]}                 [description]
       */
      getInreviewList (params){
        var self = this
        var formartData = merge(self.searchData, params)
        getInreviewList(formartData).then((res)=>{
          var data = res.data.data
          if(res.data.code === 0) {
            self.tableData = data.list
            self.pagination.total = parseInt(data.total)
            self.pagination.pageSize = formartData.pageSize
            self.listLoading = false
          }
          console.log('获取商品列表', res)
        })
      },
      handleSizeChange(pageSize) {
        this.getInreviewList({
          pageNum:1, 
          pageSize: pageSize
        })
        console.log(`每页 ${pageSize} 条`);
      },
      handleCurrentChange(pageNum) {
        this.getInreviewList({
          pageNum: pageNum, 
          pageSize: 10              
        })
        console.log(`当前页: ${pageNum}`);
      },

      entryDialogHandle (row){
        let self = this;
        self.dialogVisible = false;
        self.tableData.slice(row,1)
        self.$message({
          message: self.dialogConfig.message,
          type: 'success'
        });
      },
      searchSubmitHandle (value){
        console.log(value)
        if(!value) {
          return 
        }
        this.getInreviewList(value)
        console.log('商品查询后的', value)
      },
      /**
       * onCancelHandle 取消审核
       * @param  {[type]} row [description]
       * @return {[type]}     [description]
       */
      onCancelHandle (row) {
        let self = this
        self.confirmHandle({
          title: '取消审核',
          content: '确定要取消审核这个商品吗'
        }, function(){
          cancelReview({
            productId: row.productId
          }).then((res)=>{
            self.listLoading = false;
            console.log('取消审核',res)
            self.messageHandle('商品删除成功！', 'success')
          })
        })
      },
      messageHandle (message, type){
        let self = this
        self.$message({
          message: message,
          type: type
        });
      },
      confirmHandle (config, callback){
        let self = this
        self.$confirm(config.content, config.title, {
          type: 'warning'
        }).then(() => {
          self.listLoading = true;
          //NProgress.start();
          
          callback()
        }).catch(() => {

        });
      },

    } 
  }

</script>

<style scoped>

</style>