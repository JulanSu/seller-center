<template>
  <div class="summernote-wrap">
    ffff
    <vue-summernote ref="editer" @onChange="onChange"></vue-summernote>
  </div>
</template>


<script>
export default {
  name: 'app',
  data () {
    return {
      content: ''
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    content(val){
      this.$emit('input', val)
    }
  },
  created(){
    console.log('moren', this.value)
  },
  mounted () {
    const self = this
    const editer = self.$refs.editer
    editer.$on('onImageUpload', function (files) {
      console.log(files)
      // 这里做上传图片的操作，上传成功之后便可以用到下面这句将图片插入到编辑框中
      editer.run('insertImage', 'http://vuefe.cn/images/logo.png')
    })
    editer.$on('onChange', function (contents) {
      // 当富文本框内容发生变化时做什么事
      console.log('onChange:', contents)
      self.content = contents
    })
    self.setVal(this.value)
  },
  methods: {
    onChange(value){
      console.log('dddddfff')
    },
    updateValue (value) {
      this.$emit('input', 'dadadadad')
    },
    setVal (value) {
      // 设置初始值
      this.$refs.editer.run('code', value)
    },
    getVal () {
      // 获取初始值
      this.$refs.editer.run('code')
    }
  }
}
</script>

<style lang="scss">
  .summernote-wrap {
  }
</style>