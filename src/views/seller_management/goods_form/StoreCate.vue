<template>
  <div class="block-form cate-property store-cate">
    <el-checkbox-group 
      v-model="storeCateArr">
      <ul class="">
        <li v-for="storeCate in storeCateList">
          <el-checkbox :label="storeCate.storeCateId" :key="storeCate.cateName" @change="changeHandle(storeCate)">{{storeCate.cateName}}</el-checkbox>
        </li>
      </ul>
    </el-checkbox-group>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        storeCateArr: this.value
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
        //var data = this.formartData(newVal)
        this.$emit('input', newVal)
      }
    },
    
    created (){
      // console.log('店铺中分类',this.storeCateArr)
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
        console.log(val)
      }
    }
  }
</script>

<style lang="scss">
  .store-cate {
    ul,li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
</style>