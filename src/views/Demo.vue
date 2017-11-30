<template>
  <div>
    这是一个Demo
    <input type="text" :value="price" @keyup="inputHandle" @input="inputHandle" >
    <input type="text" :value="price" @keyup="onafterpasteHandle($event)" @input="onafterpasteHandle" >
  </div>
</template>

<script>
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        price: 2000
      }
    },
    methods: {
      inputHandle(event){
        var regExp =  /^\d+\.?\d{0,2}/
        if(regExp.test(event.target.value)) {
          event.target.value = event.target.value.replace(/^(\d+)\.(\d\d).*$/,'$1.$2')
        }else {
          event.target.value = ''
        }
        //event.target.value = event.target.value.replace(/^(\d+)\.(\d\d).*$/,'')
      },
      onKeyPress(event){
        var value = event.target.value
        if (!value.match(/^[\+\-]?\d*?\.?\d*?$/)) {
          value = ob.t_value;
        } else ob.t_value = value; if (value.match(/^(?:[\+\-]?\d+(?:\.\d+)?)?$/)) ob.o_value = value;
      },
      onKeyUp(){

      },
      onBlur(){

      },
      onafterpasteHandle(event){
        event.target.value = event.target.value.replace(/\D/g,'')
      }
    }
  }

</script>

<style lang="scss" scoped>
  .demo {

  }
</style>