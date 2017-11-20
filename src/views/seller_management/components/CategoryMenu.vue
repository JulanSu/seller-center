<template>
  <div>
    <div class="category-nav">
      <div class="category-title">
        <h3>{{title}}</h3>
      </div>
      <div class="category-main">
        <div class="category-search" v-if="isSearch">
          <el-input
            placeholder="输入名称/拼音"
            v-model="keywords">
          </el-input>
        </div>
        <el-menu default-active="" unique-opened class="category-menu" v-if="categoryDataCache.length">
          <template  v-for="(item, index) in categoryDataCache">
            <el-menu-item :index="index+''" v-if="item.productCateName" class="sub-title" @click="selectproductCateName(item, index)">
              <span class="first-letter" v-if="showLetterIcon">{{item.firstLetter}}</span>{{item.productCateName}}
              <i class="el-icon-arrow-right" v-if="item.child && item.child.length"></i>
            </el-menu-item>
          </template>     
        </el-menu>
        <el-menu default-active="" unique-opened class="category-menu search-list" v-if="keywords">

          <template v-if="!searchList.length">
            <el-menu-item index="2-1" class="sub-title">没有找到相关内容</el-menu-item>
          </template>

          <template v-else v-for="(item, index) in searchList">
            <el-menu-item  :index="index+''" class="sub-title" @click="selectproductCateName(item, index)"><span class="first-letter" v-if="showLetterIcon">{{item.firstLetter}}</span>{{item.productCateName}}<i class="el-icon-arrow-right" v-if="item.child && item.child.length"></i></el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
          return {
            searchList: [],
            keywords: '',
            searchValue: '',
            curproductCateName: [],
            categoryNavIndex: 0,
            categoryDataCache: [],
            secoundCategoryData: []
          }
        },
        props: {
          title: {
            type: String,
            default: ''
          },

          categoryData:{
            type: Array,
            default: function(){
              return []
            }
          },
          isSearch: {
            type: Boolean,
            default: true
          },
          showLetterIcon: {
            type: Boolean,
            default: true
          },
          theme: {
            type: String,
            default: ''
          },
          selectedPannel: {
            type: Boolean,
            default: true
          }
        },
        watch: {
          keywords (newVal, oldVal){
            this.searchHandle(newVal);
          },
          categoryData (){
            var json = JSON.stringify(this.categoryData)
            var data = JSON.parse(json)
            this.categoryDataCache = data
          }
        },
        created () {
          this.categoryDataCache = this.categoryData
        },
        methods: {
          getFirstLetter(str){
            if(str) {
              return str.substring(0,1).toLocaleUpperCase()
            }
          },
          searchHandle(keywords) {
              var reg = new RegExp(keywords == '' ? 'xxyy' :
                  keywords, 'ig')
              if(!keywords) {
                 this.searchList = []
              }else {
              var _arr = [];
              for(var i in this.categoryDataCache){

                if(
                    reg.test(this.categoryDataCache[i][
                        'productCateEname'
                    ]) ||
                    reg.test(this.categoryDataCache[i][
                        'productCateName'
                    ])
                ){
                    _arr.push(this.categoryDataCache[i]);
                }
              }

              this.searchList = _arr
            }  
          },

          selectproductCateName (row, index) {
            let self = this
            this.$emit('categoryClick', row, index)
          },
        }

    }

</script>

<style lang="scss">
  @import '~scss_vars';
  .search-results {
    position: absolute;
    top: 44px;
    width: 100%;
    bottom: 0;
    padding-top: 44px;
    z-index: 10003;
    background: #fff;
    overflow: auto;      
  }
  .category-nav {
    border: 1px solid #DDD;
    height: 365px;
  }

  .category-title {
    padding: 12px 20px;
    border-bottom: 1px solid #DDD;
    h3 {
      font-size: 14px;
      color: #333333;
      font-weight: 400;
      margin: 0;
    }

  }
  .category-main {
    overflow-y: auto;
    overflow-x: hidden; 
    height: 319px;
    position: relative;
    .search-list {
      position: absolute;
      width: 100%;
      top: 56px;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .el-menu-item {
      transition: initial;
    }
  }
  .category-search {
    padding: 10px 20px;
    input {
      border-color: #EEE;
      color: #999;
      border-radius: initial;
    }
  }
  .category-menu {
    background-color: #FFF !important;

    .el-menu-item {
      position: relative;
      height: 38px;
      line-height:38px;
      border-left: 2px solid #FFF;
      font-size: 14px;
      .first-letter {
        font-size: 12px;
        color: #FFF;
        background: #CCCCCC;
        width: 14px;
        height: 14px;
        line-height: 14px;
        text-align: center;
        display:inline-block;
        margin-right: 10px;
      }
      &:hover {
        background-color: #EEE;
        border-left: 2px solid $color-primary;
      }
      i {
        position: absolute;
        right: 5px;
        top: 50%;
        margin-top: -7px;
        color: #666666;
        font-size:12px;
      }
    }
    .is-active {
      background-color: #EEE;
      border-left: 2px solid $color-primary;
    }
  }
.category-main::-webkit-scrollbar  {  
  width: 6px;
  background-color: #F5F5F5;
}  
  

  
/*定义滑块 内阴影+圆角*/  
.category-main::-webkit-scrollbar-thumb  {  
  background:$color-primary;
  width:6px;
  height:200px;
}  
</style>