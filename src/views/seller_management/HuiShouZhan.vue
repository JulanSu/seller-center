<template>
  <div>
    <search-nav @onSearchClick="searchSubmitHandle"></search-nav>
    <el-table
      :data="tableData"
      style="width: 100%" class="seller-table">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pic"
        label="图片">
        <template slot-scope="scope">
          <div class="table-pic">
            <img :src="scope.row.pic" />
            
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="storeCategory"
        label="店铺分类">
      </el-table-column>
      <el-table-column
        prop="stock"
        label="库存">
      </el-table-column>
      <el-table-column
        prop="viewPrice"
        label="展示价">
      </el-table-column>
      <el-table-column
        prop="status"
        label="上架状态">
      </el-table-column>
      <el-table-column
        prop="operational"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text">恢复</el-button>

        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination class="pagination-wrap"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

  </div>

</template>

<script>
  import SearchNav from './components/SearchNav.vue'
  export default {
      components: {
        SearchNav
      },
      data() {
        return {

          formInline: {
            user: '',
            region: '',
            goodsId: '',
            goodsName: '',
            storeCategory: '',
            createDate: '',
            createBegin: '',
            createEnd: ''
          },
          msg: {
            title: '恢复',
            message: '确定要恢复这个商品吗？',
            success: '商品恢复成功',
            error: '网络延迟，请稍后再尝试'
          },
          dialogVisible: false,
          currentPage: 4,
          tableData: [{
            id: 33131,
            goodsName: '喜乐蒂',
            pic: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
            storeCategory: '店铺分类',
            stock: 111,
            viewPrice: 998,
            status: '回收站',
            operational: null

          }]
        }
      },
      mounted () {

      },
      methods: {
        searchSubmitHandle(){

        },
        onSubmit() {
          console.log('submit!');
        },
        handleClick(row){
          var self = this;
          const h = self.$createElement;
          self.$msgbox({
            title: self.msg.title,
            message: self.msg.message,
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {

              if (action === 'confirm') {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                setTimeout(() => {
                  done();
                  setTimeout(() => {
                    self.$message({
                      type: 'warning',
                      message: self.msg.error
                    });
                    instance.confirmButtonLoading = false;

                  }, 300);
                }, 3000);
              } else {
                console.log('nihao')


                done();
              }
            }
          }).then(action => {
            console.log(action)

          })
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },

        dialogHandle (){
          this.dialogVisible = false
          this.$message({
            message: '恢复成功',
            type: 'success'
          });
        }
      }

  }

</script>

<style lang="scss">

</style>