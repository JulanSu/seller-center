<template>
  <div>
    <search-nav @onSearchClick="searchSubmitHandle"></search-nav>
      <el-table
      :highlight-current-row="false"
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
            <el-button type="text" @click="onRestoreHandle(scope.row)">恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template v-if="pagination.total">
        <pagination 
          :paginationConfig="pagination"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"></pagination>
      </template> 

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
  import { getProductList, getStoreCate, onRecycleBinToDraftBox } from '@/api/seller'
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
              pageSize: 20,
              productStatus: 5
            },
            pagination: {
              total: '',
              pageSize: 20,
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
            pageNum: this.pagination.curPage,
            pageSize: this.pagination.pageSize
          })
        },
        methods: {
          /**
           * getProductStatusValue 获取上架状态（ ）
           * @param  {[type]} statusNumber [description]
           * @return {[type]}              [description]
           */
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
            })
          },
          handleSizeChange(pageSize) {
            this.getProductList({
              pageNum:1, 
              pageSize: pageSize
            })
          },
          handleCurrentChange(pageNum) {
            this.getProductList({
              pageNum: pageNum, 
              pageSize: this.pagination.pageSize          
            })
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
            if(!value) {
              return 
            }
            this.getProductList(value)
          },
          /**
           * onCancelHandle 删除回调方法
           * @param  { Object } row 当前行对象
           * @return {[type]}     [description]
           */
          onRestoreHandle (row) {
            let self = this
            self.confirmHandle({
              title: '恢复商品',
              content: '确定要恢复这个商品吗'
            }, function(){
              onRecycleBinToDraftBox({
                productId: row.productId,
                storeId: storeId
              }).then((res)=>{
                if(res.data.code == 0) {
                  self.listLoading = false;
                  self.messageHandle('商品恢复成功！', 'success')
                  self.getProductList({
                    pageNum: self.pagination.curPage,
                    pageSize: self.pagination.pageSize
                  })
                }else {
                  self.messageHandle(res.data.message, 'warning')
                }
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
              callback()
            }).catch(() => {
            });
          },

        }

    }

</script>

<style lang="scss">

</style>