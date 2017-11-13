<template>
  <div class="summernote-wrap">
    <vue-summernote ref="editer"></vue-summernote>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    
    data() {
      return {
        currentValue: ''
      }
    },
    props: {
      value: [String, Number],
      validateEvent: {
        type: Boolean,
        default: true
      },
    },
    watch: {
      currentValue(newVal, oldVal){
        this.setCurrentValue(newVal)
      }
    },

    mounted () {
      const self = this
      const editer = self.$refs.editer
      this.setVal(this.value)
      editer.$on('onImageUpload', function (files) {
        self.updateimage(files, editer)
        // 这里做上传图片的操作，上传成功之后便可以用到下面这句将图片插入到编辑框中
        // editer.run('insertImage', 'http://ikz2ydxo.gic.bgp.cnbj01.cdsgss.com/rest/927381435927494656.jpg')
      })
      editer.$on('onChange', function (currentValues) {
        // 当富文本框内容发生变化时做什么事
        self.currentValue = currentValues
        self.$emit('input', currentValues)
        self.$emit('change', currentValues)
      })

      // editer.$on('onBlur', function (currentValues) {
      // 
      //   // 当富文本框内容发生变化时做什么事
      //   self.$emit('change', currentValues)
      // })
    },
  methods: {

    updateimage(files, editer){
      let self = this
      let file = files[0]      
      let param = new FormData(); //创建form对象
      param.append('file', file, file.name);//通过append向form对象添加数据
      //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };  //添加请求头
      axios.post('http://gss.dmp.hzjiehun.bid/gss/upload/', param, config)
      .then(res=>{
        if(res.data.code == 0) {
          editer.run('insertImage', res.data.data)
        }else {
          self.$message({
            message: '图片上传失败，请重新尝试！',
            type: 'warning'
          });
        }
      })   

    },
    // updateValue (value) {
    //   this.$emit('input', 'dadadadad')
    // },
    setVal (value) {
      // 设置初始值
      this.$refs.editer.run('code', value)
    },
    getVal () {
      // 获取初始值
      this.$refs.editer.run('code')
    },      
    setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.currentValue = value;
      }
  }

  }
</script>

<style lang="scss">
  .summernote-wrap {

  }
</style>