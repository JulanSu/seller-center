<template>
  <div>
    这是一个Demo
    <input type="text" :value="price" @keyup="inputHandle" @input="inputHandle" >
    <input type="text" :value="price" @keyup="onafterpasteHandle($event)" @input="onafterpasteHandle" >
    <div class="block">
      <input type="text" value="0" name="" @focus="focusHandle">
    </div>
    <div class="block">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <span class="demonstration">默认</span>
        <el-form-item 
        label="时间选择"
        :rules="[{ required: true, validator: validatePass, trigger: 'blur, change' }]" 
        prop="dateValue">
          <el-date-picker
            @change="changeHandle"
            v-model="ruleForm.dateValue"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        ruleForm: {
          dateValue: ''
        },
        price: 2000,
        rules: []
      }
    },
    watch:{
      ruleForm: {
        handler: function(newVal, oldVal){
          console.log(typeof newVal)
        },
        deep: true
      }
    },
    methods: {
      focusHandle(){
        function aa(){
          this.say = function(str){
            console.log(str)
          }
        }

        var dd = new aa();

        var bb = {}

        dd.say.call(bb, 'dasdada')

      },
      changeHandle(value){

      },
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
      validatePass(rule, value, callback){
        console.log(value)
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