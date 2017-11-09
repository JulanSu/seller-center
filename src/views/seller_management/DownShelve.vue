<template>
  <div>
    <search-nav @onSearchClick="searchSubmitHandle"></search-nav>
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
            <el-button type="text" @click="onEditorHandle(scope.row)">编辑</el-button>
            <el-button type="text" @click="onSoldOutHandle(scope.row)">上架</el-button>

            <el-button type="text" @click="onDelHandle(scope.row)">删除</el-button>
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
  import SearchNav from './components/SearchNav.vue'
  import Pagination from './components/Pagination.vue'
  import { getProductStatus } from '@/util/product_status'
  import { getProductList, getStoreCate, soldOutToRecycleBin, soldouttotheshelves } from '@/api/seller'
  import merge from 'merge'
  const win = window;
  const storeId = win.config && win.config.storeId ? win.config.storeId : ''
    export default {
        components: {
          SearchNav,
          Pagination
        },
        data() {
          return {
            searchData:{
              storeId: storeId,
              productId: '',
              productName: '',
              storeCateId: '',
              searchStartTime: '',
              searchEndTime: '',
              pageNum: 1,
              pageSize: 10,
              productStatus: 4
            },
            pagination: {
              total: '',
              pageSize: 10,
              curPage: 1
            },
            listLoading: true,
            tableRow: null,
            dialogConfig: {
              title: '',
              content: '',
              message: ''
            },
            messageConfig: {

            },
            dialogVisible: false,
            tableData: []
          }
        },
        mounted () {

        },
        created(){
          this.getProductList({
            pageNum: 1,
            pageSize: 10
          })
        },
        methods: {
          /**
           * onEditorHandle 编辑回调,跳转到编辑页
           * @param  { Object } row 当前行的数据
           * @return {[type]}     [description]
           */
          onEditorHandle (row){
            console.log('编辑商品',row)
            this.$router.push({
              path: '/seller-management/goods/editor', 
              query:{productId: row.productId, productStatus: row.productStatus}
            })
          },

          /**
           * onSoldOutHandle 商品下架回调方法
           * @param  { Obejct } row 当前行的数据
           * @return {[type]}     [description]
           */
          onSoldOutHandle (row){
            let self = this
            self.confirmHandle({
              title: '上架商品',
              content: '确定要上架这个商品吗'
            }, function(){
              soldouttotheshelves({
                productId: row.productId
              }).then((res)=>{
                var code = res.data.code
                if(code === 0) {
                  self.listLoading = false;
                  self.messageHandle('商品上架成功！', 'success')               
                }else if(code === 1) {
                  self.$message({
                    message: res.data.message,
                    type: 'warning'
                  });
                }
                self.getProductList({
                  pageNum: 1,
                  pageSize: 10
                })   
              })
            })
          },
          /**
           * onRecommendHandle 推荐/取消推荐回调方法
           * @param  { Object } row 当前行的数据
           * @return {[type]}     [description]
           */
          onRecommendHandle (row) {

          },
          getProductStatusValue(statusNumber){
            var statusValue = getProductStatus(statusNumber)
            if(statusValue) {
              return statusValue
            }
          },
          /**
           * getProductList 获取商品列表
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
          getProductList (params){
            var self = this
            var formartData = merge(self.searchData, params)
            getProductList(formartData).then((res)=>{
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
          onDelHandle (row){
            let self = this
            self.confirmHandle({
              title: '商品删除',
              content: '确定要删除这个商品吗'
            }, function(){
              soldOutToRecycleBin({
                productId: row.productId
              }).then((res)=>{
                self.listLoading = false;
                self.messageHandle('商品删除成功！', 'success')
                self.getProductList({
                  pageNum: 1,
                  pageSize: 10
                })
                
              })
            })
          },
          handleSizeChange(pageSize) {
            this.getProductList({
              pageNum:1, 
              pageSize: pageSize
            })
            console.log(`每页 ${pageSize} 条`);
          },
          handleCurrentChange(pageNum) {
            this.getProductList({
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
            this.getProductList(value)
            console.log('商品查询后的', value)
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

<style lang="scss">

</style>