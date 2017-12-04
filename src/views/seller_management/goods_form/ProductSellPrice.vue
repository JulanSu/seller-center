<template>
  <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
    <div class="el-table__header-wrapper">
      <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width:100%">
        <thead>
          <tr>
            <th colspan="1" rowspan="1" class="is-leaf">
              <div class="cell">价格（元）</div>
            </th>
            <th colspan="1" rowspan="1" class="is-leaf">
              <div class="cell">总数量</div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="el-table__body-wrapper">
      <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%">
        <tbody>
            <tr class="el-table__row">
              <td >
                <div class="cell el-input el-input-group el-input-group--append">
                  <input :value="sellPrice" 
                  @keyup="validtorPriceHandle" 
                  @input="validtorPriceHandle" 
                  @blur="validtorPriceHandle" 
                  class="el-input__inner" style="border: 0" type="text" />
                </div>
              </td>
              <td>
                <div class="cell" v-if="skuQuantity">
                  {{skuQuantity}}
                </div>
              </td>
            </tr>
        </tbody>
      </table><!---->
    </div><!----><!----><!----><!---->
  </div> 
</template>

<script>
  import { validInputIsNumber } from '@/util/validator'
  export default {
    data() {
      return {
        sellPrice: ''
      }
    },
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      skuQuantity: [String, Number]
    },
    watch: {
      sellPrice: function (newVal, oldVal) {
        this.$emit('input', newVal)
        this.$emit('change', newVal)
      }
    },
    created(){
      if(this.value) {
        this.sellPrice = this.value
      }
    },
    mounted (){

    },
    methods: {
      validtorPriceHandle(event){
        var value = validInputIsNumber(event.target.value)
        event.target.value = value
        this.sellPrice  = value
        this.$emit('change', value)
      }
    }
  }
</script>

<style lang="scss">

</style>