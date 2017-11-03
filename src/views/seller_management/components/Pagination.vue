<template>
  <div class="pagination-wrap">
    <el-pagination 
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationConfig.curPage"
      :page-sizes="[10, 30, 50]"
      :page-size="paginationConfig.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
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
            pageSize: 10,
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