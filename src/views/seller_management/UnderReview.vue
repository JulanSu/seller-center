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
        </el-table-column>
        <el-table-column
          prop="operational"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="onEditorHandle(scope.row)">编辑</el-button>
            <el-button type="text" @click="onDelHandle(scope.row)">删除</el-button>
            <el-button type="text" @click="onSubmitHandle(scope.row)">提交</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" v-if="pagination.total > pagination.pageSize">
        <el-pagination class="pagination-wrap"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.curPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
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
  import { getInreviewList, getStoreCate } from '@/api/seller'
  const win = window;
  const storeId = win.config && win.config.storeId ? win.config.storeId : ''
    export default {
      components: {
        SearchNav
      },
        data() {
            return {
              pagination: {
                total: '',
                pageSize: 10,
                curPage: 1
              },
              listLoading: true,
              tableRow: null,
              formInline: {
                user: '',
                region: '',
                goodsId: '',
                goodsName: '',
                storeCateNameList: '',
                createDate: '',
                createBegin: '',
                createEnd: ''

              },
              initData: {
              },
              dialogConfig: {
                title: '',
                content: '',
                message: ''
              },
              dialogVisible: false,
              currentPage: 4,
              tableData: []
            }
        },
        mounted () {

        },
        created(){

          this.getInreviewList(storeId, 1, 10)
        },
        methods: {
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
          getInreviewList (
              storeId, 
              pageNum,
              pageSize,
              productId, 
              productName, 
              storeCateId, 
              searchStartTime, 
              searchEndTime
            ){
            var self = this
            getInreviewList({
              storeId: storeId,
              productId: productId || '',
              productName: productName || '',
              storeCateId: storeCateId || '',
              searchStartTime: searchStartTime || '',
              searchEndTime: searchEndTime || '',
              pageNum: pageNum,
              pageSize: pageSize
            }).then((res)=>{
              var data = res.data.data
              if(res.data.code === 0) {
                self.tableData = data.list
                self.pagination.total = parseInt(data.total)
                self.pagination.pageSize = pageSize
                self.listLoading = false
              }
              console.log('获取商品列表', res)
            })
          },
          onSubmit() {
            console.log('submit!');
          },
          handleClick(row){
            this.dialogVisible = true
          },
          handleSizeChange(pageSize) {
            this.getInreviewList(storeId, 1, pageSize)
            console.log(`每页 ${pageSize} 条`);
          },
          handleCurrentChange(pageNum) {
            this.getInreviewList(storeId, pageNum, 10)
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
          submitHandle (row){

          },
          dropdownHandle (event, index, row){
            if(event === 'delete') {
              this.onDelHandle(index, row)
            }else if(event === 'submit') {
              this.submitHandle(row)
            }
          },
          deleteHandle (row){
            this.dialogConfig.title = '删除'
            this.dialogConfig.content = '确定要删除这个商品吗？'
            this.dialogConfig.message = '商品删除成功'
            this.tableRow = row
            this.dialogVisible = true
          },
          onEditorHandle() {

          },
          onSubmitHandle(){
            let self = this
            self.confirmHandle({
              title: '提交',
              content: '确定要提交这个商品吗？',
              message: '商品提成功！',
              type: 'success'
            }, function(){
              let para = { id: row.id };
              removeUser(para).then((res) => {
                self.listLoading = false;
                //NProgress.done();
                self.messageHandle('商品提交成功！', 'success')
              });
            })
          },
          searchSubmitHandle (value){
            console.log('商品查询后的', value)
          },
          onDelHandle (index, row) {
            let self = this
            self.confirmHandle({
              title: '删除',
              content: '确定要删除这个商品吗？',
              message: '商品删除成功！',
              type: 'success'
            }, function(){
              let para = { id: row.id };
              removeUser(para).then((res) => {
                self.listLoading = false;
                //NProgress.done();
                self.messageHandle('商品删除成功！', 'success')
              });
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
          }
        }

    }

</script>

<style lang="scss">

</style>