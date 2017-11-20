<template>
  <div class="block-form cate-property">
    <el-checkbox-group 
      v-model="storeCateArr">
      <el-checkbox v-for="storeCate in storeCateList" :label="storeCate.cateName" :key="storeCate.cateName" @change="changeHandle(storeCate)">{{storeCate.cateName}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        storeCateArr: []
      }
    },
    props: {
      value: {
        type: Array,
        default: ''
      },
      storeCateList: {
        type: Array,
        default: function(){
          return []
        }
      }
    },
    watch: {
      storeCateArr: function(newVal, oldVal){
        var data = this.formartData(newVal)
        this.$emit('input', data)
      }
    },
    
    created (){


    },
    methods: {
      formartData (newVal){
        var arr = []
        for(var i=0; i < this.storeCateList.length;i++) {
          for(var j=0; j < this.storeCateArr.length; j++) {
            if(this.storeCateArr[j] == this.storeCateList[i].cateName) {
              arr.push(this.storeCateList[i])
            }
          }
        }
        return arr
      },
      changeHandle(val) {
      }
    }
  }
</script>

<style lang="scss">

</style>