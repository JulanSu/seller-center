<template>
  <div>
    <category-bar :title="categoryBarTitle"></category-bar>
    <category-menu :title="categoryMenuFirst.title"></category-menu>
    <div class="block">
      <div style="text-align: center">
        <el-button type="primary">我已阅读以下规则，现在创建商品</el-button>
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

  </div>
</template>

<script>
    import CategoryBar from '@/components/CategoryBar.vue'
    import CategoryMenu from './components/CategoryMenu.vue'
    export default {
      components: { CategoryMenu, CategoryBar },
      data() {
        return {
          checked: true,
          categoryBarTitle: '商品类目选择',
          categoryMenuFirst: {
            title: '一级类目'
          }
        }
      },
      mounted: function () {

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
  .guize::-webkit-scrollbar  
  {  
    width: 6px;
    background-color: #F5F5F5;
  }  
     
  .guize::-webkit-scrollbar-thumb  {  
    background:$color-primary;
    width:6px;
    height:200px;
  }  
</style>