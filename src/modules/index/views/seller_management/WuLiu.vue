<template>
  <div class="wuliu">
    <el-row class="block">
      <el-col :span="24">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="wuliu-form">
          <el-form-item label="物流模板" prop="fuwu">
            <el-select v-model="ruleForm.fuwu" placeholder="选择物流模板">
              <el-option label="新建模板" value="new"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-button type="primary" @click="$router.push()">新建物流模板</el-button>
          </el-form-item>
          <el-form-item label="模板名称" prop="name">
            <el-input v-model="ruleForm.name" style="width: 398px;"></el-input>
          </el-form-item>
          <el-form-item label="配送自提" prop="title">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="配送" name="type"></el-checkbox>
              <el-checkbox label="自提" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="配送范围及运费" prop="title">
            <p class="desc">请编辑可送达的地区，当用户选择下述地区以外的配送地址时，将提示用户无法下单。</p>
            <div class="area">
              <ul>
                <li class="area-item"><el-input v-model="ruleForm.name" style="width:208px" placeholder="浙江、江苏、上海"></el-input></li>
                <li class="area-item">+运费</li>
                <li class="area-item"><el-input v-model="ruleForm.name" style="width:80px" placeholder=""></el-input></li>
                <li class="area-item">元/件，满</li>
                <li class="area-item"><el-input v-model="ruleForm.name" style="width:80px" placeholder=""></el-input></li>
                <li class="area-item">件</li>
                <li class="area-item"><el-input v-model="ruleForm.name" style="width:80px" placeholder=""></el-input></li>
                <li class="area-item">元</li>
              </ul>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">取消</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
    components: {  },
    data() {
      return {
        config: {
          peisong: ''
        },
        ruleForm: {
          template: '',
          name: '',
          type: ''
        },
        rules: {
          name: [{
            required: true, message: '请输入模板名称', trigger: 'blur'
          }]
        }
      }
    },
    mounted () {

    },
    methods: {

    }
  }
</script>

<style lang="scss">
.wuliu {
  ul,li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .area {

    .area-item {
      float: left;
      padding: 0 5px;
    }
  }
}
.block {
  .desc {
    color: #999;
  }
}
</style>