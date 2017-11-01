<template>
  <div class="create-goods page-container">
    <loading-mask v-if="!categoryData.length"></loading-mask>
    <template v-else>
    <category-bar :title="categoryBarTitle"></category-bar>
      <template v-if="$route.name === '创建商品'">
        <el-row>
          <el-col :span="8">
            <category-menu title="一级类目" v-if="categoryData.length" :categoryData="categoryData" @categoryClick="firstHandle">
            </category-menu>
          </el-col>
          <el-col :span="8">
            <category-menu title="二级类目" v-if="secoundCategoryData.length" :categoryData="secoundCategoryData" @categoryClick="secondHandle"></category-menu>
          </el-col>
          <el-col :span="8">
            <category-menu title="三级类目" v-if="thirstCategoryData.length" :categoryData="thirstCategoryData" @categoryClick="thirdHandle"></category-menu>
          </el-col>
        </el-row>
        <div class="category-nav-breadcrumb">
          <span class="icon-arrow-top arrow-top-a"><span class="icon-arrow-top arrow-top-b"></span></span>
          <el-breadcrumb separator=">">
            <span class="breadcrumb-tips">你当前选择的是：</span>
            <template v-if="curCateGroup.length" v-for="item in curCateGroup">
              <el-breadcrumb-item>{{item.productCateName}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>
        <div class="block">
          <div style="text-align: center">
            <el-button type="primary" @click="linkGoodsForm">我已阅读以下规则，现在创建商品</el-button>
            <div class="block">
              <el-checkbox v-model="hunbohuiRule">中国婚博会规则</el-checkbox>
            </div>
          </div>
          <div class="guize">
            <div class="guize-title">
              发布须知：禁止发布侵犯他人知识产权的商品，请确认商品符合只是产权保护的规定
            </div>
            <div class="guize-content">
              <p>发布须知：禁止发布侵犯他人知识产权的商品，请确认商品符合只是产权保护的规定</p>
              <p>发布须知：禁止发布侵犯他人知识产权的商品，请确认商品符合只是产权保护的规定</p>
              <p>发布须知：禁止发布侵犯他人知识产权的商品，请确认商品符合只是产权保护的规定</p>
              <p>发布须知：禁止发布侵犯他人知识产权的商品，请确认商品符合只是产权保护的规定</p>
              <p>发布须知：禁止发布侵犯他人知识产权的商品，请确认商品符合只是产权保护的规定</p>
              <p>发布须知：禁止发布侵犯他人知识产权的商品，请确认商品符合只是产权保护的规定</p>
              <p>发布须知：禁止发布侵犯他人知识产权的商品，请确认商品符合只是产权保护的规定</p>
              <p>发布须知：禁止发布侵犯他人知识产权的商品，请确认商品符合只是产权保护的规定</p>
              <p>发布须知：禁止发布侵犯他人知识产权的商品，请确认商品符合只是产权保护的规定</p>
              <p>发布须知：禁止发布侵犯他人知识产权的商品，请确认商品符合只是产权保护的规定</p>
            </div>
          </div>
        </div>
      </template>
    <router-view v-if="$route.name === '新建' || $route.name === '编辑'"></router-view>
    </template>
  </div>
</template>

<script>
    const win = window;
    const storeId = win.config && win.config.storeId ? win.config.storeId : ''
    import CategoryBar from '@/components/CategoryBar'
    import LoadingMask from '@/components/LoadingMask'
    import CategoryMenu from './components/CategoryMenu'
    
    import { getGoodsCategoryList } from '@/api/seller'
    export default {
      components: { CategoryMenu, CategoryBar, LoadingMask },
      data() {
        return {
          storeId: storeId,
          curCateGroup: [],
          curCateRow: [],
          hunbohuiRule: true,
          categoryBarTitle: '商品类目选择',
          categoryData: [],
          secoundCategoryData:[],
          thirstCategoryData:[]
        }
      },
      mounted: function () {
        this.getGoodsCategory(this.storeId);
      },
      created(){
        //this.getGoodsCategory()
      },
      methods: {

        linkGoodsForm (){
          console.log(this.curCateRow)
          if(!this.hunbohuiRule) {
            return;
          }
          var curCate = this.curCateGroup
          if(!curCate[2]) {
            return;
          }else {
            this.$router.push({
                name: '新建',
                query: {
                  productCateId: curCate[2]['productCateId'],
                  productCateName: curCate[2]['productCateName']
                }
              })
          }

        },
        getGoodsCategory(storeId){
          var self = this;
          getGoodsCategoryList({
            storeId: storeId
          }).then((res) => {
            console.log(res)
            if(res.data.code === 0) {
              self.categoryData = res.data.data
            }
            //NProgress.done();
          });

        },
        firstHandle (row, index){
          this.curCateGroup = []
          this.getcurCateGroup(0, row)
          this.secoundCategoryData = []
          this.thirstCategoryData = []
          this.secoundCategoryData = row.child
        },
        secondHandle (row, index) {
          this.thirstCategoryData = []
          this.thirstCategoryData = row.child
          this.getcurCateGroup(1, row)
        },
        thirdHandle (row, index){
          this.getcurCateGroup(2, row)
        },
        getcurCateGroup (index, row){
          this.curCateRow = row

          this.$set(this.curCateGroup, index, row)
          if(index === 1 && this.curCateGroup.length === 3) {
            this.curCateGroup.splice(index+1,1)
          }
          
        }
      }
    }

</script>

<style lang="scss">
@import '~scss_vars';
  .page-container {
    position: relative;
    min-height: 500px;
  }
  .guize {
    height: 200px;
    overflow: hidden;
    border: 1px solid #CCC;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    .guize-title {
        font-size: 12px;
        color: #333333;
        padding-bottom: 10px;
        border-bottom: 1px dashed #ccc;
    }
    .guize-content {

    }
  }
  .guize::-webkit-scrollbar{  
    width: 6px;
    background-color: #F5F5F5;
  }  
  .guize::-webkit-scrollbar-thumb  {  
    background:$color-primary;
    width:6px;
    height:50px;
  }  
  
</style>