<template>
  <div class="pagination-wrap">
    <el-pagination 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationConfig.curPage"
      :page-sizes="[20, 50, 100]"
      :page-size="paginationConfig.pageSize"
      layout="sizes, prev, pager, next, jumper,total"
      :total="paginationConfig.total">
    </el-pagination>
  </div>
</template>

<script>

  export default {
    data() {
      return {
      }
    },
    props: {
      paginationConfig: {
        type: Object,
        default: function(){
          return {
            total: '',
            pageSize: 20,
            curPage: 1
          }
        }
      }
    },
    mounted: function () {

    },
    methods: {
      handleSizeChange (pageSize) {
        this.$emit('handleSizeChange', pageSize)
      },
      handleCurrentChange (pageNum) {
        this.$emit('handleCurrentChange', pageNum)
      }
    }

  }

</script>

<style scoped>

</style>