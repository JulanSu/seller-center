<template>
	<section class="add-sub-account">
		<el-form v-loading="listLoading" :model="ruleForm" label-width="80px" :rules="rules" ref="ruleForm">
			<el-form-item label="帐号名" label-width="100px" prop="account">
				<el-input :maxlength="20" v-model="ruleForm.account" placeholder="请输入帐号名" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="密码"  label-width="100px" prop="password">
				<el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"  class="wid280" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码"  label-width="100px" prop="againpass">
				<el-input type="password" v-model="ruleForm.againpass" placeholder="再一次输入密码"  class="wid280" auto-complete="off"></el-input>
			</el-form-item>		
			<el-form-item label="姓名"  label-width="100px" prop="name">
				<el-input :maxlength="30" v-model="ruleForm.name" placeholder="请输入姓名" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="性别" label-width="100px" prop="gender">
			    <el-radio-group v-model="ruleForm.gender">
			      <el-radio :label="1">男</el-radio>
			      <el-radio :label="2">女</el-radio>
			    </el-radio-group>
			</el-form-item>
      <el-form-item label="角色" prop="role" label-width="100px">
        <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
          <el-option
            v-for="item in ruleForm.role"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
			<el-form-item label="手机号码" label-width="100px" prop="mobile">
				<el-input :maxlength="11" v-model="ruleForm.mobile" placeholder="请输入手机号码" class="wid280"></el-input>
			</el-form-item>
			<el-form-item label="身份证号" label-width="100px" prop="identityNumber">
				<el-input :maxlength="18" v-model="ruleForm.identityNumber" placeholder="请输入身份证号码" class="wid280"></el-input>
			</el-form-item> 
			<el-form-item label="" label-width="100px">
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
			</el-form-item>
			
		</el-form>
	</section>
	
</template>

<script>
import {operatorGet,roleList,operatorUpdate,operatorSave} from '@/api/shopApi';

  export default {
    data() {
      var validatePhone = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入手机号'));
          } else {
            var first=value.slice(0,1);
            if ((value.length!=11)||(first!=1)) {
                callback(new Error('请输入正确的手机号'));
            }else{
              callback();
            }
          }
      };
      var validatePass = (rule, value, callback) => {
        if (value.length<6||value.length>20) {
          callback(new Error('密码必须大于6位，小于20位'));
        } else {
          if (this.ruleForm.againpass !== '') {
            this.$refs.ruleForm.validateField('againpass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value.length<6||value.length>20){
          callback(new Error('确认密码必须大于6位，小于20位'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('密码和确认密码不一致，请重新填写'));
        } else {
          callback();
        }
      };
      return {
        roleList:[],
        listLoading:false,
        isAdd:1,
        ruleForm: {
          storeOperatorId:'',
          account: '',
          password: '',
          againpass: '',
          name: '',
          gender: 1,
          role:[],
          roleId:'',
          mobile: '',
          identityNumber: ''
        },

        rules: {
          account: [
            { required: true, message: '请输入账号名', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 位', trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          againpass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min:2, max: 30, message: '请输入正确的姓名', trigger: 'blur' }
          ],
          /*role: [
            {  required: true, message: '请选择角色', trigger: 'change' }
          ],*/
          mobile: [
            { validator: validatePhone,trigger: 'blur' }
          ],
          identityNumber: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { min:18, max: 18, message: '身份证号码输入有误', trigger: 'blur' }
          ]
        }
      };
    },
    mounted:function(){
       //先获取角色列表
      let para = {
        storeId:storeId
      };
      roleList(para).then((res) => {
        this.roleList=res.data.data;
        this.ruleForm.role=res.data.data;
      });

      /*如果是编辑子帐号页面，需要取该子帐号的数据*/
      var id=this.$route.params.id;
      if(id){
        //获取子帐号信息
        this.isAdd=2;
        this.dataFetch(id);
      }
    },
    methods: {
      /*如果是编辑子帐号页面，需要取该子帐号的数据*/
      dataFetch(id){ 
        let para = {
          storeOperatorId:id
        };
        this.listLoading = true;
        operatorGet(para).then((res) => {
          this.ruleForm= res.data.data;
          this.ruleForm.againpass=this.ruleForm.password;
          this.ruleForm.role=this.roleList;

          this.listLoading = false;
        }).catch((res)=> {
          this.listLoading = false;
        });

      },
      //新增或编辑成功后的回调
      sucFun(res){
        var that=this;
        this.listLoading = false;
        if(res.data.code==0){
          this.$message({
            message: '提交成功',
            type: 'success',
            onClose:function(){
              that.$router.push({ path: '/store/bypass-management/account-list' });
            }
          });
        }
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.listLoading = true;
            var para = new URLSearchParams();
            para.append('account',this.ruleForm.account);
            para.append('password',this.ruleForm.password);
            para.append('name',this.ruleForm.name);
            para.append('gender',this.ruleForm.gender);
            para.append('roleId',this.ruleForm.roleId);
            para.append('mobile',this.ruleForm.mobile);
            para.append('identityNumber',this.ruleForm.identityNumber);
            
            if(this.isAdd==2){//2是编辑
              para.append('storeOperatorId',this.ruleForm.storeOperatorId);
              operatorUpdate(para).then((res)=> {
                this.sucFun(res);
              }).catch((res)=> {
                this.listLoading = false;
              });
            }else{
              para.append('storeId',storeId);
              operatorSave(para).then((res)=> {
                this.sucFun(res);
              }).catch((res)=> {
                this.listLoading = false;
              });
            }
            
          } else {
            return false;
          }
        });
      }
    }
  }
</script>

<style lang="scss">
.add-sub-account{
  padding:40px 0 0 0;
  .wid280{
    width:280px;
  }
  .el-select{
    width:130px;
  }
  .el-button{
    width:100px;
    height:34px;
    line-height:34px;
    background:#41cac0;
    padding:0;
    border-color:#41cac0;
  }
}
</style>