<template>
    <div>
      <div class="block">
        <el-row> 
          <el-col :span="2">
        <el-button type="primary" icon="plus">创建商品</el-button>
      </el-col>
      <el-col :span="22">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model="formInline.goodsName" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品ID">
            <el-input v-model="formInline.goodsId" placeholder="商品ID"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-select v-model="formInline.storeCategory" placeholder="店铺分类" style="width: 160px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
                <el-date-picker
                  v-model="formInline.createDate"
                  type="daterange"
                  placeholder="选择日期范围">
                </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      </el-row>
      </div>
        <el-table
          :data="tableData"
          style="width: 100%" 
          class="seller-table" highlight-current-row v-loading="listLoading">
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
            <template scope="scope">
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
            <template scope="scope">
            <el-dropdown @command="dropdownHandle($event, scope.$index, scope.row)">
              <el-button type="primary">
                编辑<i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="delete">删除</el-dropdown-item>
                <el-dropdown-item command="submit">提交</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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

    export default {
        data() {
            return {
              listLoading: false,
              tableRow: null,
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
              dialogConfig: {
                title: '',
                content: '',
                message: ''
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

              },{
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
          onSubmit() {
            console.log('submit!');
          },
          handleClick(row){
            this.dialogVisible = true
          },
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
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
              this.handleDel(index, row)
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
          handleDel: function (index, row) {
            let self = this
            this.$confirm('确定要删除这个商品吗？', '提示', {
              type: 'warning'
            }).then(() => {
              this.listLoading = true;
              //NProgress.start();
              let para = { id: row.id };
              removeUser(para).then((res) => {
                this.listLoading = false;
                //NProgress.done();
                this.$message({
                  message: '商品删除成功',
                  type: 'success'
                });
                this.getUsers();
              });
            }).catch(() => {

            });
          }
        }

    }

</script>

<style lang="scss">
  .seller-table {
    .table-pic {
      width: 60px;
      height: 60px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .cell {
      padding-top: 20px;
      padding-bottom: 20px;
    }   
  }

  .dialog-wrap {
    .tips {
      font-size: 16px;
      text-align: center;
    }
  }
  .pagination-wrap {
    float: right;
  }
  .block {
    padding: 30px 0;
    overflow: hidden;
  }
</style>