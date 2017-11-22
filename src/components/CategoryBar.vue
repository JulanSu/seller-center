<template>
  <div class="category-bar">
    <h2 class="title">{{title}}</h2>
  </div>
</template>
<script>
export default {
  name: 'CategoryBar',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
  .category-bar {
    padding: 0 0 20px 0;
    .title {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
      font-weight: 400;
      line-height: 16px;
      margin: 0;
      border-left: 3px solid #41CAC0;
      padding-left: 12px;
      height: 16px;
    }
  }
</style>
