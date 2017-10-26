<template>
  <div>
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
            <template v-if="curCateName.length" v-for="item in curCateName">
              <el-breadcrumb-item>{{item.cateName}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>
        <div class="block">
          <div style="text-align: center">
            <el-button type="primary" @click="linkGoodsForm">我已阅读以下规则，现在创建商品</el-button>
            <div class="block">
              <el-checkbox v-model="checked">中国婚博会规则</el-checkbox>
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
    <router-view v-if="$route.name === '新建'"></router-view>
  </div>
</template>

<script>
    import CategoryBar from '@/components/CategoryBar'
    import CategoryMenu from './components/CategoryMenu'
    export default {
      components: { CategoryMenu, CategoryBar },
      data() {
        return {
          curCateName: [],
          checked: true,
          categoryBarTitle: '商品类目选择',
          categoryData: [{
            cateName:'大家电',
            cateId:'222', 
            ename:'dajia',
            category:[{
              cateName:'小家电',
              ename:'fushixiebao', 
              cateId:'2334', 
              category:[{
                cateName:'迷你家电',
                ename:'fushixiebao', 
                cateId:'24445', 
                category:[]
              }]
            },{
              cateName:'你好',
              ename:'fushixiebao', 
              cateId:'2334', 
              category:[]
            }]
          },{
            cateName:'迷你家电',
            ename:'mini', 
            cateId:'24445', 
            category:[]
          }],
          secoundCategoryData:[],
          thirstCategoryData:[]
        }
      },
      mounted: function () {
      },
      created(){
        //this.getGoodsCategory()
      },
      methods: {
        linkGoodsForm (){
          console.log(this.curCateName)
          var curCate = this.curCateName
          if(!curCate[2]) {
            return false
          }else {
            this.$router.push({
                name: '新建',
                query: {
                  productCateId: curCate[2]['cateId'],
                  cateName: curCate[2]['cateName']
                }
              })
          }

        },
        getGoodsCategory(){
          getGoodsCategoryList.then((res) => {
            console.log(res)
            //NProgress.done();
          });
        },
        firstHandle (row, index){
          // this.curCateName.push(row.cateName)
          this.curCateName = []
          console.log(row) 
          this.getCurCateName(0, row)
          
          if(row.category.length) {
            this.secoundCategoryData = row.category
          }else {
            this.secoundCategoryData = []
            this.thirstCategoryData = []
          }
        },
        secondHandle (row, index) {
          this.curCateName.slice(2)
          this.getCurCateName(1, row)
          this.thirstCategoryData = row.category

        },
        thirdHandle (row, index){
          this.getCurCateName(2, row)
          console.log(row, index)
        },
        getCurCateName (index, row){
          this.$set(this.curCateName, index, row)
        }
      }
    }

</script>

<style lang="scss">
@import '~scss_vars';
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
  .category-nav-breadcrumb {
    position: relative;
    border: 1px solid $color-primary;
    padding: 7px 20px;
    margin-top: 20px;
    position: relative;
    background: #F5F7FA;
    .icon-arrow-top {
      position: absolute;
      left: 30px;
      top: -17px;
      border-width: 8px;
      border-style: solid;

    }
    .arrow-top-a {
      border-color: #fff #fff #F5F7FA #fff
    }
    .arrow-top-b {
      left: -8px;
      top: -8px; 
            border-color: #fff #fff $color-primary #fff
      
    }
    .breadcrumb-tips {
      color: #333;
      float: left;
    }
  }
</style>