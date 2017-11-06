<template>
  <div>
    <div class="category-nav">
      <div class="category-title">
        <h3>{{title}}</h3>
      </div>
      <div class="category-main">
        <div class="category-search" v-if="isSearch">
          <el-input
            placeholder="请输入关键字搜索"
            v-model="keywords">
          </el-input>
        </div>
        <el-menu default-active="" unique-opened class="category-menu" v-if="categoryData.length">
          <template  v-for="(item, index) in categoryData">
            <el-menu-item :index="index+''" class="sub-title" @click="selectproductCateName(item, index)">
              {{item.industryCateName}}
              <i class="el-icon-arrow-right" v-if="item[arrKey]&& item[arrKey].length"></i>
            </el-menu-item>
          </template>     
        </el-menu>
        <el-menu default-active="" unique-opened class="category-menu search-list" v-if="searchList.length || keywords">
          <template  v-for="(item, index) in searchList">
            <el-menu-item v-if="item.industryCateName"  :index="index+''" class="sub-title" @click="selectproductCateName(item, index)">
              {{item.industryCateName}}
              <i class="el-icon-arrow-right" v-if="item[arrKey].length"></i> 
            </el-menu-item>
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
            curCateName: [],
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
          },
          arrKey: {
            type: String,
            default: ''
          }
        },
        watch: {
          keywords (){
            this.searchHandle();
          },
          categoryData (){
            console.log('监听变化')
            this.categoryDataCache = this.categoryData;
          }
        },
        mounted () {
          this.categoryDataCache = this.categoryData;
        },
        methods: {
          searchHandle: function() {
            var reg = new RegExp(this.keywords);
            if(!this.keywords) {
              this.searchList = []
            }else {
              var _arr = [];
              for(var i in this.categoryData){
                
                if(this.categoryData[i].industryCateEname.match(reg) ||this.categoryData[i].industryCateName.match(reg)){

                  _arr.push(this.categoryData[i]);
                  this.searchList = _arr;
                }else{
                  if(this.searchList.length==1){
                    this.searchList=[];
                  }
                }
              }
            }  
          },
          selectproductCateName (row, index) {
            let self = this;
            this.$emit('categoryClick', row, index);
          },
          getCateName(){

          }
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
    background-color: #FFF;

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